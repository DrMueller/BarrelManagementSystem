"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ExportEntry {
    constructor(_exportStatement) {
        this._exportStatement = _exportStatement;
    }
    static createFromFilePath(filePath) {
        let localFileName = this.getFileName(filePath);
        localFileName = './' + localFileName;
        localFileName = localFileName.replace('.ts', '');
        const exportStatement = `export * from '${localFileName}';`;
        return new ExportEntry(exportStatement);
    }
    static getFileName(filePath) {
        return filePath.replace(/^.*[\\\/]/, '');
    }
    get exportObject() {
        const startString = this._exportStatement.indexOf('\'') + 1;
        const endString = this._exportStatement.indexOf('\'', startString + 1);
        const exportObject = this._exportStatement.substring(startString, endString);
        return exportObject;
    }
    get exportStatement() {
        return this._exportStatement;
    }
    get isReExport() {
        return ExportEntry
            .getFileName(this._exportStatement)
            .indexOf('.') === -1;
    }
}
exports.ExportEntry = ExportEntry;
//# sourceMappingURL=export-entry.model.js.map