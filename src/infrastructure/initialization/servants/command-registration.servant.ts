import * as vscode from 'vscode';
import { ServiceLocatorService } from '../../dependency-injection';
import { IBarrelService, BarrelServiceName } from '../../../areas/services';

export class CommandRegistrationServant {
  public static registerCommands(context: vscode.ExtensionContext): void {
    CommandRegistrationServant.registerAlignBarrelInSelectedDirectory(context);
  }

  private static registerAlignBarrelInSelectedDirectory(context: vscode.ExtensionContext): void {
    const arrangeFileCommand = vscode.commands.registerCommand('extension.alignBarrelInSelectedDirecory', (contextData: any) => {
      try {
        if (!contextData) {
          return;
        }

        const selectedPath = contextData.fsPath;
        const fileArrangementService = ServiceLocatorService.resolveService<IBarrelService>(BarrelServiceName);
        fileArrangementService.alignBarrelInDirecoryAsync(selectedPath);
      } catch (err) {
        vscode.window.showErrorMessage(err.message);
      }
    });

    context.subscriptions.push(arrangeFileCommand);
  }
}
