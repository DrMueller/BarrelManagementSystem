import { inject, injectable } from 'inversify';

import { ExportEntry } from '../../models';
import { IBarrelService } from '../barrel-service.interface';
import {
  BarrelFileRepositoryServiceName, FolderServantName, IBarrelFileRepositoryService,
  IFolderServant, ITypeScriptFilesSearchingServant, TypeScriptFilesSearchingServantName
} from '../servants';

@injectable()
export class BarrelService implements IBarrelService {
  public constructor(
    @inject(BarrelFileRepositoryServiceName) private barrelFileReposistory: IBarrelFileRepositoryService,
    @inject(TypeScriptFilesSearchingServantName) private fileServant: ITypeScriptFilesSearchingServant,
    @inject(FolderServantName) private folderServant: IFolderServant
  ) { }

  public async alignBarrelInDirecoryAsync(directoryPath: string): Promise<void> {
    const barrelFile = await this.barrelFileReposistory.loadOrCreateAsync(directoryPath);
    const filesInDirectory = await this.fileServant.searchTypeScriptFilesAsync(directoryPath);
    const exportEntries = filesInDirectory.map(file => ExportEntry.createFromFilePath(file));

    const alignmentResult = barrelFile.alignExportEntries(exportEntries);

    if (alignmentResult.itemsChanged) {
      await this.barrelFileReposistory.saveAsync(barrelFile);
    }
  }

  public async alignBarrelsInAllDirectoriesAsync(): Promise<void> {
    const subFolders = this.folderServant.getFoldersToCheckForBarrels();
    const allPromises = subFolders.map(folderPath => this.alignBarrelInDirecoryAsync(folderPath));
    await allPromises;
  }
}
