import { readdirSync, statSync } from 'fs';
import { injectable } from 'inversify';
import * as path from 'path';
import { workspace } from 'vscode';

import { IFolderServant } from '../';

@injectable()
export class FolderServant implements IFolderServant {
  public getFoldersToCheckForBarrels(): string[] {
    const subFolders: string[] = [];
    if (workspace.workspaceFolders) {
      workspace.workspaceFolders.forEach(folder => {
        this.getAllSubFolders(folder.uri.fsPath, subFolders);
      });
    }

    return subFolders;
  }

  private checkIfFolderIsIgnored(folder: string): boolean {
    const ignoredFolders = [
      'node_modules',
      'out'
    ];

    if (ignoredFolders.indexOf(folder) > -1) {
      return true;
    }

    if (folder.startsWith('.')) {
      return true;
    }

    return false;
  }

  private getAllSubFolders(baseFolder: string, folderList: string[]): void {
    const folders: string[] = readdirSync(baseFolder).filter(file => statSync(path.join(baseFolder, file)).isDirectory());

    folders.forEach(folder => {
      if (this.checkIfFolderIsIgnored(folder)) {
        return;
      }

      folderList.push(path.join(baseFolder, folder));
      this.getAllSubFolders(path.join(baseFolder, folder), folderList);
    });
  }
}
