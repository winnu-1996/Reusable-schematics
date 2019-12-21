import { Rule, SchematicContext, Tree, Source, apply, template, move, mergeWith, url } from '@angular-devkit/schematics';
import { strings, normalize } from '@angular-devkit/core';
//import { strings, normalize } from '@angular-devkit/core';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function createComponent(_options: any): Rule {
  return (tree: Tree, _context: SchematicContext) => {
    _context.logger.info("dattaat --- "+JSON.stringify(_options))
    // return chain([
    //   externalSchematic("@schematics/angular", "component", { ..._options },{interactive:false}),
    //   extend(_options)
    // ])(tree, _context);

    const source: Source = url("./files");
    const transformedSource: Source = apply(source, [
      template({
        filename: _options.path,
        ...strings // dasherize, classify, camelize, etc
      }),
      move(normalize("src/app/"+_options.path))
    ]);

    return mergeWith(transformedSource)(tree, _context);
  };
}

export function extend(_options: any): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Extending schematic', _options);
    
    return tree;
  };
}