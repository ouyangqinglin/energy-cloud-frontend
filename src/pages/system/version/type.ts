export interface ServiceUpdateInfo {
  platform: string;
  appType: string;
  systemName: string;
}

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
}
