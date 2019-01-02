"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const language_extensions_1 = require("@drmueller/language-extensions");
const _1 = require("./");
class BarrelFile {
    constructor(_directoryPath, _exportEntries) {
        this._directoryPath = _directoryPath;
        this._exportEntries = _exportEntries;
    }
    alignExportEntries(exportEntries) {
        const exportEntriesToAdd = language_extensions_1.ArrayExtensions.getItemsNotInOtherArray(exportEntries, this._exportEntries, (a1, a2) => a1.exportObject === a2.exportObject);
        this._exportEntries.push(...exportEntriesToAdd);
        const nonReExportEntries = this._exportEntries.filter(entry => !entry.isReExport);
        const exportEntriesToDelete = language_extensions_1.ArrayExtensions.getItemsNotInOtherArray(nonReExportEntries, exportEntries, (a1, a2) => a1.exportObject === a2.exportObject);
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