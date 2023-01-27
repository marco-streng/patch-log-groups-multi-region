const { awscdk, javascript } = require("projen");

const project = new awscdk.AwsCdkConstructLibrary({
  author: "Marco Streng",
  authorAddress: "marcostreng@me.com",
  name: "patch-log-groups-multi-region",
  description:
    "Set log retention on CloudWatch log groups over multiple AWS regions. Usefull to fullfill compliance requirements also for dynamically generated log groups worldwide (e.g. by Lambda@Edge).",
  keywords: [
    "AWS",
    "CDK",
    "LogGroup",
    "LogRetention",
    "CloudWatch",
    "MultiRegion",
  ],
  packageManager: javascript.NodePackageManager.YARN,
  license: "MIT",
  cdkVersion: "2.62.1",
  defaultReleaseBranch: "main",
  repositoryUrl:
    "https://github.com/marco-streng/patch-log-groups-multi-region.git",
  prettier: true,
  devDeps: [
    "@types/aws-lambda",
    "@aws-sdk/client-cloudwatch-logs",
    "@aws-lambda-powertools/logger",
  ],
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_18_X,
    bundlingOptions: {
      externals: ["@aws-sdk/*"],
    },
  },
  releaseToNpm: true,
});

project.synth();
