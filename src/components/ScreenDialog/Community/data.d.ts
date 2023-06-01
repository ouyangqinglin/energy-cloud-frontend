export type StationCommunityType = {
  thirdSiteId?: string;
};

export type CommunityType = {
  thirdSiteId?: string;
  anyGnSn?: string;
};

export type MeterCommunityType = {
  password: string;
  userName: string;
  powerRatio: string;
  energyRatio: string;
  currentRatio: string;
  voltageRatio: string;
};
