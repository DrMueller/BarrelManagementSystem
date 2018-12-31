import { Container } from 'inversify';

import { BarrelServiceName, IBarrelService } from '../../areas/services';
import { BarrelService } from '../../areas/services/implementation';
import {
  BarrelFileRepositoryServiceName, GlobFactoryServiceName,
  IBarrelFileRepositoryService, IGlobFactoryServant,
  ITypeScriptFilesSearchingServant, TypeScriptFilesSearchingServantName, IFolderServant, FolderServantName
} from '../../areas/services/servants';
import {
  BarrelFileRepositoryService, GlobFactoryServant, TypeScriptFilesSearchingServant, FolderServant
} from '../../areas/services/servants/implementation';

import { ServiceLocatorService } from './service-locator.service';

export class DependencyInjectionInitializationService {
  public static initialize(): void {
    const container = new Container();
    this.applyMappings(container);
    ServiceLocatorService.initialize(container);
  }

  private static applyMappings(container: Container): void {
    container.bind<IBarrelFileRepositoryService>(BarrelFileRepositoryServiceName).to(BarrelFileRepositoryService);
    container.bind<IBarrelService>(BarrelServiceName).to(BarrelService);
    container.bind<ITypeScriptFilesSearchingServant>(TypeScriptFilesSearchingServantName).to(TypeScriptFilesSearchingServant);
    container.bind<IGlobFactoryServant>(GlobFactoryServiceName).to(GlobFactoryServant);
    container.bind<IFolderServant>(FolderServantName).to(FolderServant);
  }
}
