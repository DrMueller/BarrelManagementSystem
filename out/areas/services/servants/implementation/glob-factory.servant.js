"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const vscode = require("vscode");
const inversify_1 = require("inversify");
let GlobFactoryServant = class GlobFactoryServant {
    createRelativeGlob(directoryPath, fileGlob) {
        const basePath = vscode.workspace.rootPath;
        directoryPath = directoryPath.replace(basePath, '');
        let relativeGlob = `${directoryPath}\\${fileGlob}`;
        relativeGlob = relativeGlob.substr(1, relativeGlob.length - 1);
        return relativeGlob;
    }
};
GlobFactoryServant = tslib_1.__decorate([
    inversify_1.injectable()
], GlobFactoryServant);
exports.GlobFactoryServant = GlobFactoryServant;
//# sourceMappingURL=glob-factory.servant.js.map