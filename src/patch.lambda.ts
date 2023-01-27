import { Logger } from "@aws-lambda-powertools/logger";
import {
  CloudWatchLogsClient,
  DescribeLogGroupsCommand,
  LogGroup,
  PutRetentionPolicyCommand,
} from "@aws-sdk/client-cloudwatch-logs";
import { Context } from "aws-lambda";

const RETENTION_DAYS = 90;

type Event = {
  region?: string;
};

const logger = new Logger({ serviceName: "patchLogGroups" });

const fetchLogGroups = async (
  client: CloudWatchLogsClient,
  nextToken?: string
): Promise<LogGroup[]> => {
  const describeCommand = new DescribeLogGroupsCommand({
    logGroupNamePrefix: process.env.LOG_GROUP_NAME_PREFIX,
    nextToken,
  });

  const result = await client.send(describeCommand);

  return result.nextToken
    ? (result.logGroups || []).concat(
        await fetchLogGroups(client, result.nextToken)
      )
    : result.logGroups || [];
};

export async function handler(event: Event, context: Context) {
  logger.addContext(context);

  const { RETENTION_IN_DAYS } = process.env;

  if (!event.region) {
    throw new Error('Missing "region"');
  }

  if (!RETENTION_IN_DAYS) {
    throw new Error('Missing "RETENTION_IN_DAYS" environment variable');
  }

  const cwClient = new CloudWatchLogsClient({ region: event.region });

  try {
    const logGroups = await fetchLogGroups(cwClient);

    if (logGroups?.length && logGroups.length > 0) {
      await Promise.all(
        logGroups.map(async ({ retentionInDays, logGroupName }) => {
          if (!retentionInDays || retentionInDays < RETENTION_DAYS) {
            const putRetentionCommand = new PutRetentionPolicyCommand({
              logGroupName,
              retentionInDays: parseInt(RETENTION_IN_DAYS),
            });

            await cwClient.send(putRetentionCommand);

            logger.info(
              `Set retention to ${RETENTION_DAYS} days for "${logGroupName}" in "${event.region}"`
            );
          }
        })
      );
    }
  } catch (error) {
    logger.error(`Could not update log groups`, error as Error);
  }
}
