
export class ExportEntry {
  public constructor(private _exportStatement: string) {
  }

  public static createFromFilePath(filePath: string): ExportEntry {
    let localFileName = this.getFileName(filePath);
    localFileName = './' + localFileName;
    localFileName = localFileName.replace('.ts', '');
    const exportStatement = `export * from '${localFileName}';`;

    return new ExportEntry(exportStatement);
  }

  private static getFileName(filePath: string): string {
    return filePath.replace(/^.*[\\\/]/, '');
  }

  public get exportObject(): string {
    const startString = this._exportStatement.indexOf('\'') + 1;
    const endString = this._exportStatement.indexOf('\'', startString + 1);

    const exportObject = this._exportStatement.substring(startString, endString);
    return exportObject;
  }

  public get exportStatement(): string {
    return this._exportStatement;
  }

  public get isReExport(): boolean {
    return ExportEntry
      .getFileName(this._exportStatement)
      .indexOf('.') === -1;
  }
}
