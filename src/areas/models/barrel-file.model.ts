import { ExportEntryAlignmentResult } from './';
import { ExportEntry } from './export-entry.model';

export class BarrelFile {
  public static readonly FileName: string = 'index.ts';

  public constructor(private _directoryPath: string, private _exportEntries: ExportEntry[]) {
  }

  public alignExportEntries(exportEntries: ExportEntry[]): ExportEntryAlignmentResult {
    const exportEntriesToAdd = exportEntries
      .filter(entry => !this._exportEntries.some(existingEntry => existingEntry.exportObject === entry.exportObject));

    this._exportEntries.push(...exportEntriesToAdd);

    const exportEntriesToDelete = this.
      _exportEntries
      .filter(entry => !entry.isReExport)
      .filter(existingEntry => !exportEntries.some(entry => existingEntry.exportObject === entry.exportObject));

    exportEntriesToDelete.forEach(entry => {
      this._exportEntries.splice(this._exportEntries.indexOf(entry), 1);
    });

    const itemsChanged = exportEntriesToAdd.length > 0 || exportEntriesToDelete.length > 0;
    return new ExportEntryAlignmentResult(itemsChanged);
  }

  public createTextOuput(): string {
    let entryLines = this._exportEntries
      .sort((a: ExportEntry, b: ExportEntry) => (a.exportObject > b.exportObject ? -1 : 1))
      .map(entry => entry.exportStatement)
      .join('\n');

    entryLines += '\n'; // One empty line at the end
    return entryLines;
  }

  public get directoryPath(): string {
    return this._directoryPath;
  }
}
