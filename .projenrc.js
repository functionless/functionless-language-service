const { typescript } = require("projen");
const project = new typescript.TypeScriptProject({
  defaultReleaseBranch: "main",
  name: "@functionless/language-service",
  description:
    "A TypeScript Language Service Plugin that shows Functionless errors in the IDE",
  peerDeps: ["functionless@^0.6.20"],
  devDeps: ["functionless"],
  eslintOptions: {
    prettier: true,
    lintProjenRcFile: false,
  },
  releaseToNpm: true,
});
project.synth();
