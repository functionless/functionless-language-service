const { typescript } = require("projen");
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@functionless/language-service",

  deps: ["functionless"],
  eslintOptions: {
    prettier: true,
    lintProjenRcFile: false,
  },
  releaseToNpm: true,
});
project.synth();
