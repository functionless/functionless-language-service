import { makeFunctionlessChecker } from "functionless/lib/checker";
import { validate } from "functionless/lib/validate";

import type * as tsserver from "typescript/lib/tsserverlibrary";

// See: https://github.com/microsoft/TypeScript/wiki/Writing-a-Language-Service-Plugin

export = init;

function init(modules: { typescript: typeof tsserver }): any {
  const ts: typeof tsserver = modules.typescript;

  function create(info: ts.server.PluginCreateInfo) {
    const logger = info.project.projectService.logger;
    logger.info("Functionless Language Service Plugin has been loaded.");

    // Set up decorator object
    const proxy: ts.LanguageService = Object.create(null);

    for (let k of Object.keys(info.languageService) as Array<
      keyof ts.LanguageService
    >) {
      const x = info.languageService[k]!;
      // @ts-expect-error - JS runtime trickery which is tricky to type tersely
      proxy[k] = (...args: Array<{}>) => x.apply(info.languageService, args);
    }

    proxy.getSemanticDiagnostics = (fileName): ts.Diagnostic[] => {
      const errors = info.languageService.getSemanticDiagnostics(fileName);
      const program = info.languageService.getProgram();
      if (program) {
        const checker = makeFunctionlessChecker(program.getTypeChecker());
        const sf = program.getSourceFile(fileName);

        if (sf) {
          info.project.projectService.logger.info(
            `Calling validate on file: ${fileName}`
          );
          const customErrors = validate(ts as any, checker, sf);
          info.project.projectService.logger.info(
            `Detected ${customErrors.length} custom errors in file: ${fileName}`
          );
          return [...errors, ...customErrors];
        }
      }

      return errors;
    };

    return proxy;
  }

  return { create };
}
