/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-22 15:11:07
 * @LastEditTime: 2024-05-23 15:33:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\enum.ts
 */

export const enum SiteTypeStrEnum {
  PV = '1', //光
  ES = '2', //储
  CS = '3', //充
  ES_CS = '23',
  PV_CS = '13',
  PV_ES = '12',
  PV_ES_CS = '123',
  Exchange = '4',
  FAN = '6',
  DIESEL = '7',
  OTHER = '100',
}

export const enum ModelSizeEnum {
  TwoCol = '552px',
  ThreeCol = '816px',
  FourCol = '1080px',
}
