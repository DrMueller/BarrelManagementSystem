"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const vscode = require("vscode");
const __1 = require("..");
const models_1 = require("../../../models");
let TypeScriptFilesSearchingServant = class TypeScriptFilesSearchingServant {
    constructor(globFactory) {
        this.globFactory = globFactory;
    }
    searchTypeScriptFilesAsync(directoryPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const relativeGlob = this.globFactory.createRelativeGlob(directoryPath, '*.ts');
            const fileUris = yield this.searchUrisAsync(relativeGlob);
            const result = fileUris.map(fileUri => fileUri.fsPath);
            return result;
        });
    }
    searchUrisAsync(relativeGlob) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            let fileUris = yield vscode.workspace.findFiles(relativeGlob);
            fileUris = fileUris.filter(fileUri => !fileUri.path.toLowerCase().endsWith(models_1.BarrelFile.FileName));
            return fileUris;
        });
    }
};
TypeScriptFilesSearchingServant = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(__1.GlobFactoryServiceName)),
    tslib_1.__metadata("design:paramtypes", [Object])
], TypeScriptFilesSearchingServant);
exports.TypeScriptFilesSearchingServant = TypeScriptFilesSearchingServant;
//# sourceMappingURL=typescript-files-searching.servant.js.map