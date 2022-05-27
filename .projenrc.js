const { typescript } = require("projen");
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@functionless/language-service",

  peerDeps: ["functionless@^0.6.20"],
  devDeps: ["functionless"],
  eslintOptions: {
    prettier: true,
    lintProjenRcFile: false,
  },
  releaseToNpm: true,
});
project.synth();
