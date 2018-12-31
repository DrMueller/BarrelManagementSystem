import { ITypeScriptFilesSearchingServant } from '../typescript-files-searching-servant.interface';
import { injectable, inject } from 'inversify';

import * as vscode from 'vscode';
import { IGlobFactoryServant, GlobFactoryServiceName } from '..';
import { BarrelFile } from '../../../models';

@injectable()
export class TypeScriptFilesSearchingServant implements ITypeScriptFilesSearchingServant {
  public constructor(
    @inject(GlobFactoryServiceName) private globFactory: IGlobFactoryServant
  ) { }

  public async searchTypeScriptFilesAsync(directoryPath: string): Promise<string[]> {
    const relativeGlob = this.globFactory.createRelativeGlob(directoryPath, '*.ts');
    const fileUris = await this.searchUrisAsync(relativeGlob);

    const result = fileUris.map(fileUri => fileUri.fsPath);
    return result;
  }

  private async searchUrisAsync(relativeGlob: string): Promise<vscode.Uri[]> {
    let fileUris = await vscode.workspace.findFiles(relativeGlob);
    fileUris = fileUris.filter(fileUri => !fileUri.path.toLowerCase().endsWith(BarrelFile.FileName));

    return fileUris;
  }
}
