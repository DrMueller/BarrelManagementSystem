"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _1 = require("./");
class BarrelFile {
    constructor(_directoryPath, _exportEntries) {
        this._directoryPath = _directoryPath;
        this._exportEntries = _exportEntries;
    }
    alignExportEntries(exportEntries) {
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
        return new _1.ExportEntryAlignmentResult(itemsChanged);
    }
    createTextOuput() {
        let entryLines = this._exportEntries
            .sort((a, b) => (a.exportObject > b.exportObject ? -1 : 1))
            .map(entry => entry.exportStatement)
            .join('\n');
        entryLines += '\n'; // One empty line at the end
        return entryLines;
    }
    get directoryPath() {
        return this._directoryPath;
    }
}
BarrelFile.FileName = 'index.ts';
exports.BarrelFile = BarrelFile;
//# sourceMappingURL=barrel-file.model.js.map