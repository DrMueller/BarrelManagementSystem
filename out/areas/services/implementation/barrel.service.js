"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const inversify_1 = require("inversify");
const models_1 = require("../../models");
const servants_1 = require("../servants");
let BarrelService = class BarrelService {
    constructor(barrelFileReposistory, fileServant, folderServant) {
        this.barrelFileReposistory = barrelFileReposistory;
        this.fileServant = fileServant;
        this.folderServant = folderServant;
    }
    alignBarrelInDirecoryAsync(directoryPath) {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const barrelFile = yield this.barrelFileReposistory.loadOrCreateAsync(directoryPath);
            const filesInDirectory = yield this.fileServant.searchTypeScriptFilesAsync(directoryPath);
            const exportEntries = filesInDirectory.map(file => models_1.ExportEntry.createFromFilePath(file));
            const alignmentResult = barrelFile.alignExportEntries(exportEntries);
            if (alignmentResult.itemsChanged) {
                yield this.barrelFileReposistory.saveAsync(barrelFile);
            }
        });
    }
    alignBarrelsInAllDirectoriesAsync() {
        return tslib_1.__awaiter(this, void 0, void 0, function* () {
            const subFolders = this.folderServant.getFoldersToCheckForBarrels();
            const allPromises = subFolders.map(folderPath => this.alignBarrelInDirecoryAsync(folderPath));
            yield allPromises;
        });
    }
};
BarrelService = tslib_1.__decorate([
    inversify_1.injectable(),
    tslib_1.__param(0, inversify_1.inject(servants_1.BarrelFileRepositoryServiceName)),
    tslib_1.__param(1, inversify_1.inject(servants_1.TypeScriptFilesSearchingServantName)),
    tslib_1.__param(2, inversify_1.inject(servants_1.FolderServantName)),
    tslib_1.__metadata("design:paramtypes", [Object, Object, Object])
], BarrelService);
exports.BarrelService = BarrelService;
//# sourceMappingURL=barrel.service.js.map