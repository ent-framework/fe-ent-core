import axios from 'axios';
import fs from 'fs-extra';
import consola from 'consola';

export default async function download(location: string, filePath: string, variableName: string) {
  try {
    const response = await axios.get(location, {
      timeout: 2000
    });

    if (response.status === 200) {
      const mdPath = `${filePath}/${variableName}.md`;
      fs.writeFileSync(mdPath, response.data);
      consola.success(`Download ${variableName} successfully.`);
    }
  } catch (error) {
    consola.error(`Can't download ${variableName} : ${error}`);
  }
}
