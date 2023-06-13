export const enum HomeTypeEnum {
  STANDARD,
  CUSTOM,
}

export interface DefaultPageResult {
  siteId: number;
  // 0-标准首页 1-定制页
  homeType: HomeTypeEnum;
  customPageId: number;
  // 定制页路径
  customPagePath: string;
}
