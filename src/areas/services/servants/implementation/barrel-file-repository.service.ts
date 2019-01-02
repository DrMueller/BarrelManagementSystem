import * as fs from 'fs';
import { inject, injectable } from 'inversify';
import * as vscode from 'vscode';

import { BarrelFile, ExportEntry } from '../../../models';
import { IBarrelFileRepositoryService } from '../barrel-file-repository-service.interface';
import { GlobFactoryServiceName, IGlobFactoryServant } from '../glob-factory-servant.interface';

@injectable()
export class BarrelFileRepositoryService implements IBarrelFileRepositoryService {
  public constructor(
    @inject(GlobFactoryServiceName) private globFactory: IGlobFactoryServant
  ) { }

  public async loadOrCreateAsync(directoryPath: string): Promise<BarrelFile> {
    const relativeBarrelFilePath = this.globFactory.createRelativeGlob(directoryPath, BarrelFile.FileName);
    const barrelFiles = await vscode.workspace.findFiles(relativeBarrelFilePath);

    let barrelFileEntryLines: string[];
    if (barrelFiles.length === 0) { // No Barrel file found
      barrelFileEntryLines = [];
    } else {
      barrelFileEntryLines = await this.getTextLinesAsync(barrelFiles[0].fsPath);
    }

    barrelFileEntryLines = barrelFileEntryLines.filter(entry => !!entry);
    const exportEntries = barrelFileEntryLines.map(fileEntry => new ExportEntry(fileEntry));
    return new BarrelFile(directoryPath, exportEntries);
  }

  public async saveAsync(barrelFile: BarrelFile): Promise<void> {
    const barrelFilePath = this.createBarrelFilePath(barrelFile.directoryPath);

    if (fs.existsSync(barrelFilePath)) {
      fs.unlinkSync(barrelFilePath);
    }

    fs.writeFileSync(barrelFilePath, barrelFile.createTextOuput());
  }

  private async getTextLinesAsync(directoryPath: string): Promise<string[]> {
    const textDocument = await vscode.workspace.openTextDocument(directoryPath);
    const text = textDocument.getText();
    const lines = text.split('\n');

    return lines;
  }

  private createBarrelFilePath(directoryPath: string): string {
    return directoryPath + '\\' + BarrelFile.FileName;
  }
}
