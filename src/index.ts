import {
  aws_events,
  aws_events_targets,
  aws_iam,
  aws_stepfunctions,
  aws_stepfunctions_tasks,
} from "aws-cdk-lib";
import { Construct } from "constructs";
import { PatchFunction } from "./patch-function";
export interface PatchLogGroupsProps {
  /**
   * List of AWS regions in which the function should run
   */
  readonly regions: string[];

  /**
   * Schedule event for the event rule
   */
  readonly schedule: aws_events.Schedule;

  /**
   * Number of days to which log retention should be set. If not set, the defaults will be used.
   * @default 90 days
   */
  readonly retentionInDays?: number;

  /**
   * Prefix for log group names that should be effected (e.g. "aws/lambda"). If not set, it will be ignored.
   * @default - no prefix
   */
  readonly logGroupNamePrefix?: string;

  /**
   * Resource ARNs to add to the Lambda execution role policy statement. If not set, the defaults will be used.
   * @default "*" - all resources
   */
  readonly logsResources?: string[];
}

export class PatchLogGroups extends Construct {
  constructor(scope: Construct, id: string, props: PatchLogGroupsProps) {
    super(scope, id);

    const {
      regions,
      schedule,
      retentionInDays = 90,
      logsResources = ["*"],
      logGroupNamePrefix = "aws/lambda",
    } = props;

    validateRegions(regions);

    // ---------------
    // Lambda Function
    // ---------------
    const patchLambda = new PatchFunction(this, "PatchLambda");
    patchLambda.addEnvironment("LOG_GROUP_NAME_PREFIX", logGroupNamePrefix);
    patchLambda.addEnvironment("RETENTION_IN_DAYS", retentionInDays.toString());
    patchLambda.addToRolePolicy(
      new aws_iam.PolicyStatement({
        effect: aws_iam.Effect.ALLOW,
        actions: ["logs:Describe*", "logs:List*", "logs:PutRetentionPolicy"],
        resources: logsResources,
      })
    );

    // ------------
    // StateMachine
    // ------------
    const lambdaInvoke = new aws_stepfunctions_tasks.LambdaInvoke(
      this,
      "LambdaInvoke",
      {
        lambdaFunction: patchLambda,
        payload: aws_stepfunctions.TaskInput.fromObject({
          "region.$": "$",
        }),
      }
    );
    const regionIterator = new aws_stepfunctions.Map(this, "RegionIterator", {
      maxConcurrency: 3,
      itemsPath: "$.regions",
    }).iterator(lambdaInvoke);

    const stateMachine = new aws_stepfunctions.StateMachine(
      this,
      "StateMachine",
      {
        definition: aws_stepfunctions.Chain.start(regionIterator),
      }
    );
    patchLambda.grantInvoke(stateMachine);

    // ----------
    // Event Rule
    // ----------
    new aws_events.Rule(this, "EventRule", {
      schedule,
      targets: [
        new aws_events_targets.SfnStateMachine(stateMachine, {
          input: aws_events.RuleTargetInput.fromObject({
            regions,
          }),
        }),
      ],
    });
  }
}

export const validateRegions = (regions: string[]) => {
  regions.forEach((region) => {
    if (
      !/(us(-gov)?|ap|ca|cn|eu|sa)-(central|(north|south)?(east|west)?)-\d/g.test(
        region
      )
    ) {
      throw new Error(`Malformed region "${region}"`);
    }
  });
};
