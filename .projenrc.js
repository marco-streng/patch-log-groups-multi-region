const { awscdk } = require('projen');
const project = new awscdk.AwsCdkConstructLibrary({
  author: 'Marco Streng',
  authorAddress: 'marco.streng@codecentric.de',
  cdkVersion: '2.1.0',
  defaultReleaseBranch: 'main',
  name: 'patch-log-groups-multi-region',
  repositoryUrl: 'https://github.com/marco.streng/patch-log-groups-multi-region.git',

  // deps: [],                /* Runtime dependencies of this module. */
  // description: undefined,  /* The description is just a string that helps people understand the purpose of the package. */
  // devDeps: [],             /* Build dependencies for this module. */
  // packageName: undefined,  /* The "name" in package.json. */
});
project.synth();