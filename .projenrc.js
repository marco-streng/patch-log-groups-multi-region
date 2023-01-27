const { awscdk } = require("projen");

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
  license: "MIT",
  cdkVersion: "2.62.1",
  defaultReleaseBranch: "main",
  repositoryUrl:
    "https://github.com/marco-streng/patch-log-groups-multi-region.git",
  prettier: true,
  bundledDeps: [
    "@aws-sdk/client-cloudwatch-logs",
    "@aws-lambda-powertools/logger",
  ],
  devDeps: ["@types/aws-lambda"],
  lambdaOptions: {
    runtime: awscdk.LambdaRuntime.NODEJS_18_X,
  },
  releaseToNpm: true,
});

project.synth();
