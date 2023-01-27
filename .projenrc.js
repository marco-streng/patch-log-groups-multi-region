const { awscdk, javascript } = require("projen");

const project = new awscdk.AwsCdkConstructLibrary({
  author: "Marco Streng",
  authorAddress: "marcostreng@me.com",
  name: "patch-log-groups-multi-region",
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
