import { Project } from 'ts-morph';
import type { InterfaceDeclaration, JSDocTag, PropertySignature } from 'ts-morph';
import type { ComponentDoc, PropDescriptor } from 'vue-docgen-api';

const project = new Project();

const formatterTags = (jsDocsTags: JSDocTag[]) => {
  const tags: PropDescriptor['tags'] = {};

  jsDocsTags.forEach((tag) => {
    const tagName = tag.getTagName();

    tags[tagName] = [
      {
        title: tagName,
        description: tag.getCommentText(),
      },
    ];
  });

  return tags;
};

const formatterProps = (properties: PropertySignature[]) => {
  const props: PropDescriptor[] = [];

  properties.forEach((p) => {
    const jsDocs = p.getJsDocs()[0];
    if (!jsDocs) {
      props.push({
        name: p.getName(),
        type: {
          name: p.getTypeNode()?.getText() || '',
        },
        description: p.getName(),
        tags: {},
      });
    } else {
      props.push({
        name: p.getName(),
        type: {
          name: p.getTypeNode()?.getText() || '',
        },
        description: jsDocs.getDescription(),
        tags: formatterTags(jsDocs.getTags()),
      });
    }
  });

  return props;
};

export default (filePath: string) => {
  project.addSourceFileAtPath(filePath);

  const sourceFile = project.getSourceFile(filePath);
  const componentDocList: ComponentDoc[] = [];

  if (sourceFile) {
    // const interfaces = sourceFile.getInterfaces();
    // interfaces.forEach((interfaceDeclaration) => {
    //   const properties = interfaceDeclaration.getProperties();
    //   const componentDoc = {
    //     displayName: interfaceDeclaration.getName(),
    //     exportName: interfaceDeclaration.getName(),
    //     props: formatterProps(properties),
    //     tags: {},
    //   };
    //   if (componentDoc.props.length) {
    //     componentDocList.push(componentDoc);
    //   }
    // });

    for (const [name, declarations] of sourceFile.getExportedDeclarations()) {
      declarations.forEach((d) => {
        if (d.getKindName() === 'InterfaceDeclaration') {
          const interfaceDeclaration = d as InterfaceDeclaration;
          const properties = interfaceDeclaration.getProperties();
          let description = '';
          if (interfaceDeclaration.getJsDocs().length > 0) {
            description = interfaceDeclaration.getJsDocs()[0].getDescription();
          }

          const componentDoc = {
            displayName: interfaceDeclaration.getName(),
            exportName: interfaceDeclaration.getName(),
            description,
            props: formatterProps(properties),
            tags: {},
          };
          if (componentDoc.props.length) {
            componentDocList.push(componentDoc);
          }
        }
      });
    }
  }

  return componentDocList;
};
