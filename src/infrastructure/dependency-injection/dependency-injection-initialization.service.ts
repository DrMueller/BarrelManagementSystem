import { Container } from 'inversify';
import 'reflect-metadata';

import { BarrelServiceName, IBarrelService } from '../../areas/services';
import { BarrelService } from '../../areas/services/implementation';
import {
  BarrelFileRepositoryServiceName, FolderServantName, GlobFactoryServiceName,
  IBarrelFileRepositoryService, IFolderServant, IGlobFactoryServant,
  ITypeScriptFilesSearchingServant, TypeScriptFilesSearchingServantName
} from '../../areas/services/servants';
import {
  BarrelFileRepositoryService, FolderServant, GlobFactoryServant, TypeScriptFilesSearchingServant
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
