import { Rule, SchematicContext, Tree, Source, template, move, mergeWith, url, apply } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createReusableComp(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    const source: Source = url("./files");
    const transformedSource: Source = apply(source, [
      template({
        filename: _options.path,
        ...strings // dasherize, classify, camelize, etc
      }),
      move(normalize("src/app/" + _options.path))
    ]);

    return mergeWith(transformedSource)(tree, _context);
  };
}
