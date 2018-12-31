export const BarrelServiceName = 'IBarrelService';

export interface IBarrelService {
  alignBarrelInDirecoryAsync(directoryPath: string): Promise<void>;

  alignBarrelsInAllDirectoriesAsync(): Promise<void>;
}
