import { IGlobFactoryServant } from '../glob-factory-servant.interface';
import * as vscode from 'vscode';
import * as path from 'path';
import { injectable } from 'inversify';

@injectable()
export class GlobFactoryServant implements IGlobFactoryServant {
  public createRelativeGlob(directoryPath: string, fileGlob: string): string {
    const basePath = vscode.workspace.rootPath!;
    directoryPath = directoryPath.replace(basePath, '');
    let relativeGlob = `${directoryPath}${path.sep}${fileGlob}`;
    relativeGlob = relativeGlob.substr(1, relativeGlob.length - 1);
    return relativeGlob;
  }
}
