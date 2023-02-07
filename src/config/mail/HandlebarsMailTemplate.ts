import fs from 'fs';
import Handlebars from 'handlebars';

interface ITemplateVariable {
  [key: string]: string | number;
}

interface IParseMailTemplate {
  file: string;
  variables: ITemplateVariable;
}

export default class handlebarsMailTempalte {
  public async parse({ file, variables }: IParseMailTemplate): Promise<string> {
    const templateFileContent = await fs.promises.readFile(file, {
      encoding: 'utf-8',
    });
    const parseTemplate = Handlebars.compile(templateFileContent);

    return parseTemplate(variables);
  }
}
