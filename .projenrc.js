const { typescript } = require("projen");
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@functionless/language-service",

  eslintOptions: {
    prettier: true,
    lintProjenRcFile: false,
  },
});
project.synth();
