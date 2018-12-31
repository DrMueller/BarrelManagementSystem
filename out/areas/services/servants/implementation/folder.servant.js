"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const fs_1 = require("fs");
const inversify_1 = require("inversify");
const path = require("path");
const vscode_1 = require("vscode");
let FolderServant = class FolderServant {
    getFoldersToCheckForBarrels() {
        const subFolders = [];
        if (vscode_1.workspace.workspaceFolders) {
            vscode_1.workspace.workspaceFolders.forEach(folder => {
                this.getAllSubFolders(folder.uri.fsPath, subFolders);
            });
        }
        return subFolders;
    }
    checkIfFolderIsIgnored(folder) {
        const ignoredFolders = [
            'node_modules',
            'out'
        ];
        if (ignoredFolders.indexOf(folder) > -1) {
            return true;
        }
        if (folder.startsWith('.')) {
            return true;
        }
        return false;
    }
    getAllSubFolders(baseFolder, folderList) {
        const folders = fs_1.readdirSync(baseFolder).filter(file => fs_1.statSync(path.join(baseFolder, file)).isDirectory());
        folders.forEach(folder => {
            if (this.checkIfFolderIsIgnored(folder)) {
                return;
            }
            folderList.push(path.join(baseFolder, folder));
            this.getAllSubFolders(path.join(baseFolder, folder), folderList);
        });
    }
};
FolderServant = tslib_1.__decorate([
    inversify_1.injectable()
], FolderServant);
exports.FolderServant = FolderServant;
//# sourceMappingURL=folder.servant.js.map