export interface VersionInfo {
  id: number;
  appType: number;
  platform: number;
  userId: number;
  userName: string;
  releaseTime: string;
  systemName: string;
  version: string;
  url: string;
  details?: string;
  isCoerce?: number;
}

export type AppTypeDataType = {
  id?: number;
  name?: string;
};
