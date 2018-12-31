"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const vscode = require("vscode");
const dependency_injection_1 = require("../../dependency-injection");
const services_1 = require("../../../areas/services");
class CommandRegistrationServant {
    static registerCommands(context) {
        CommandRegistrationServant.registerAlignBarrelInSelectedDirectory(context);
        CommandRegistrationServant.registerAlignAllBarrels(context);
    }
    static registerAlignBarrelInSelectedDirectory(context) {
        const arrangeFileCommand = vscode.commands.registerCommand('extension.alignBarrelInSelectedDirecory', (contextData) => {
            try {
                if (!contextData) {
                    return;
                }
                const selectedPath = contextData.fsPath;
                const fileArrangementService = dependency_injection_1.ServiceLocatorService.resolveService(services_1.BarrelServiceName);
                fileArrangementService.alignBarrelInDirecoryAsync(selectedPath);
            }
            catch (err) {
                vscode.window.showErrorMessage(err.message);
            }
        });
        context.subscriptions.push(arrangeFileCommand);
    }
    static registerAlignAllBarrels(context) {
        const arrangeFileCommand = vscode.commands.registerCommand('extension.alignBarrelsInAllDirectories', () => {
            try {
                const fileArrangementService = dependency_injection_1.ServiceLocatorService.resolveService(services_1.BarrelServiceName);
                fileArrangementService.alignBarrelsInAllDirectoriesAsync();
            }
            catch (err) {
                vscode.window.showErrorMessage(err.message);
            }
        });
        context.subscriptions.push(arrangeFileCommand);
    }
}
exports.CommandRegistrationServant = CommandRegistrationServant;
//# sourceMappingURL=command-registration.servant.js.map