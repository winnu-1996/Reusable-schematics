import { Rule, SchematicContext, Tree, schematic, chain } from '@angular-devkit/schematics';
import { OverWriteFileOptions } from './schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function pTReusablesSchematic(_options: any): Rule {
  const compOptions = { "path": _options.path }
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      schematic('create-component', {
        ...compOptions
      }),
      extend(_options)
    ])(tree, _context)
  };
}

export function extend(_options: OverWriteFileOptions): Rule {
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info('Extending schematic 1' + _options.resuables);
    const reusables = _options.resuables.split(',');
    reusables.forEach(data => {
      const bufferHtml1 = tree.read('src/app/' + _options.path + "/" + _options.path + ".component.html");
      const bufferScss1 = tree.read('src/app/' + _options.path + "/" + _options.path + ".component.scss");
      const bufferTs1 = tree.read('src/app/' + _options.path + "/" + _options.path + ".component.ts");

      const bufferHtml2 = tree.read('src/reusables/' + data + '/' + data + '.component.html');
      const bufferScss2 = tree.read('src/reusables/' + data + '/' + data + '.component.scss');
      const bufferTs2 = tree.read('src/reusables/' + data + '/' + data + '.component.ts');

      const contentHtml1 = bufferHtml1 ? bufferHtml1.toString() : '';
      const contentScss1 = bufferScss1 ? bufferScss1.toString() : '';
      const contentTs1 = bufferTs1 ? bufferTs1.toString() : '';
      const contentHtml2 = bufferHtml2 ? bufferHtml2.toString() : '';
      const contentScss2 = bufferScss2 ? bufferScss2.toString() : '';
      const contentTs2 = bufferTs2 ? bufferTs2.toString() : '';

      tree.overwrite('src/app/' + _options.path + "/" + _options.path + ".component.scss", contentScss1 + contentScss2 + "\n");
      tree.overwrite('src/app/' + _options.path + "/" + _options.path + ".component.html", contentHtml1 + contentHtml2 + "\n");
      tree.overwrite('src/app/' + _options.path + "/" + _options.path + ".component.ts", contentTs1 + contentTs2 + "\n");
    })
    const bufferHtml = tree.read('src/app/' + _options.path + "/" + _options.path + ".component.html");
    const contentHtml = bufferHtml ? bufferHtml.toString() : '';
    const bufferTs = tree.read('src/app/' + _options.path + "/" + _options.path + ".component.ts");
    const contentTs = bufferTs ? bufferTs.toString() : '';

    const classStructure = "constructor()  { } \n ngOnInit() { \n } \n}"

    tree.overwrite('src/app/' + _options.path + "/" + _options.path + ".component.html", contentHtml + "</div>");
    tree.overwrite('src/app/' + _options.path + "/" + _options.path + ".component.ts", contentTs + classStructure);
    return tree;
  };
}
