import { toCamelCase } from '@bhouston/common-lib';
import { createRequire } from 'module';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import fs from 'fs';

const require = createRequire(import.meta.url);
const packageInfo = require('../package.json');

type CommandLineArgs = {
  error: boolean;
  path: string;
};

export const main = async () => {
  const argv = (await yargs(hideBin(process.argv))
    .version(packageInfo.version)
    .options({
      error: {
        type: 'boolean',
        default: false,
        description: 'Throw an error'
      },
      path: {
        type: 'string',
        default: ''
      }
    }).argv) as CommandLineArgs;

  if (argv.error) {
    throw new Error();
  }

  if (!argv.path) {
    throw new Error('can not resolve path');
  }

  const path = argv.path;
  const dotIndex = path.lastIndexOf('.');
  const newPath =
    path.slice(0, dotIndex) + `_clean.` + path.slice(dotIndex + 1);

  const htmlContent = fs.readFileSync(`${argv.path}`, 'utf-8');

  const aTagRegex = /<a\b([^>]*)>([\s\S]*?)<\/a>/g;

  const newHtmlContent = htmlContent.replace(
    aTagRegex,
    (match, attributes, innerText) => {
      return `<a${attributes}>[xxx]</a>`;
    }
  );
  fs.writeFileSync(newPath, newHtmlContent);
};
