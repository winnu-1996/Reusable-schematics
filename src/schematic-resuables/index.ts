import { Rule, SchematicContext, Tree, chain, schematic } from '@angular-devkit/schematics';
import { OverWriteFileOptions } from '../pt-reusables-schematic/schema';


// You don't have to export the function as default. You can also have more than one rule factory
// per file.
export function schematicResuables(_options: any): Rule {
  const compOptions = { "path": _options.path };
  // const reusables = _options.resuables.split(',');
  return (tree: Tree, _context: SchematicContext) => {
    return chain([
      schematic('create-reusable-comp', {
        ...compOptions
      }),
      extend(_options)
    ])(tree, _context)
  };
}

export function extend(_options: OverWriteFileOptions): Rule {
  const reusables = _options.resuables.split(',');
  return (tree: Tree, context: SchematicContext) => {
    context.logger.info("create componet")
    reusables.forEach((data: string) => {
     // context.logger.info("Create copmn exists" + tree.exists(data + "/" + data + ".component.html"))
      if (!tree.exists('src/app/components/' + data + "/" + data + ".component.html")) {
        const bufferHtml1 = tree.read('src/reusables/' + data + '/' + data + '.component.html');
        const bufferScss1 = tree.read('src/reusables/' + data + '/' + data + '.component.scss');
        const bufferTs1 = tree.read('src/reusables/' + data + '/' + data + '.component.ts');

        const contentHtml2 = bufferHtml1 ? bufferHtml1.toString() : '';
        const contentScss2 = bufferScss1 ? bufferScss1.toString() : '';
        const contentTs2 = bufferTs1 ? bufferTs1.toString() : '';

        tree.create('src/app/components/' + data + "/" + data + ".component.html", contentHtml2);
        tree.create('src/app/components/' + data + "/" + data + ".component.scss", contentScss2);
        tree.create('src/app/components/' + data + "/" + data + ".component.ts", contentTs2);
      }
      const bufferHtml = tree.read('src/app/' + _options.path + "/" + _options.path + ".component.html");
      const contentHtml = bufferHtml ? bufferHtml.toString() : '';
      const selectorToAdd = "<app-" + data + "></app-" + data + ">"
      tree.overwrite('src/app/' + _options.path + "/" + _options.path + ".component.html", contentHtml +"\n"+ selectorToAdd);
    })
    const bufferHtml = tree.read('src/app/' + _options.path + "/" + _options.path + ".component.html");
    const contentHtml = bufferHtml ? bufferHtml.toString() : '';
    tree.overwrite('src/app/' + _options.path + "/" + _options.path + ".component.html", contentHtml +"\n"+ "</div>");
    return tree;
  };
}
