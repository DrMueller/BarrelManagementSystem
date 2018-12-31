import { BarrelFile } from '../../models';

export const BarrelFileRepositoryServiceName = 'IBarrelFileRepositoryService';

export interface IBarrelFileRepositoryService {
  loadOrCreateAsync(directoryPath: string): Promise<BarrelFile>;
  saveAsync(barrelFile: BarrelFile): Promise<void>;
}
