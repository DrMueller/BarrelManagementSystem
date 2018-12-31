export const TypeScriptFilesSearchingServantName = 'ITypeScriptFilesSearchingServant';

export interface ITypeScriptFilesSearchingServant {
  searchTypeScriptFilesAsync(directoryPath: string): Promise<string[]>;
}
