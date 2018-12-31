"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs = require("fs");
const inversify_1 = require("inversify");
const vscode = require("vscode");
const models_1 = require("../../../models");
const glob_factory_servant_interface_1 = require("../glob-factory-servant.interface");
let BarrelFileRepositoryService = class BarrelFileRepositoryService {
    constructor(globFactory) {
        this.globFactory = globFactory;
    }
    loadOrCreateAsync(directoryPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const relativeBarrelFilePath = this.globFactory.createRelativeGlob(directoryPath, models_1.BarrelFile.FileName);
            const barrelFiles = yield vscode.workspace.findFiles(relativeBarrelFilePath);
            let barrelFileEntryLines;
            if (barrelFiles.length === 0) {
                barrelFileEntryLines = [];
            }
            else {
                barrelFileEntryLines = yield this.getTextLinesAsync(barrelFiles[0].fsPath);
            }
            barrelFileEntryLines = barrelFileEntryLines.filter(entry => !!entry);
            const exportEntries = barrelFileEntryLines.map(fileEntry => new models_1.ExportEntry(fileEntry));
            return new models_1.BarrelFile(directoryPath, exportEntries);
        });
    }
    saveAsync(barrelFile) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const barrelFilePath = this.createBarrelFilePath(barrelFile.directoryPath);
            if (fs.existsSync(barrelFilePath)) {
                fs.unlinkSync(barrelFilePath);
            }
            fs.writeFileSync(barrelFilePath, barrelFile.createTextOuput());
        });
    }
    getTextLinesAsync(directoryPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const textDocument = yield vscode.workspace.openTextDocument(directoryPath);
            const text = textDocument.getText();
            const lines = text.split('\n');
            return lines;
        });
    }
    createBarrelFilePath(directoryPath) {
        return directoryPath + '\\' + models_1.BarrelFile.FileName;
    }
};
BarrelFileRepositoryService = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(glob_factory_servant_interface_1.GlobFactoryServiceName)),
    tslib_1.__metadata("design:paramtypes", [Object])
], BarrelFileRepositoryService);
exports.BarrelFileRepositoryService = BarrelFileRepositoryService;
//# sourceMappingURL=barrel-file-repository.service.js.map