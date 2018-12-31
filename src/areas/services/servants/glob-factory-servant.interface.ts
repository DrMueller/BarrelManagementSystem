export const GlobFactoryServiceName = 'IGlobFactoryService';

export interface IGlobFactoryServant {
  createRelativeGlob(directoryPath: string, fileGlob: string): string;
}
