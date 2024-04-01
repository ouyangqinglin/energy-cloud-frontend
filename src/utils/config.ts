/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-17 15:45:18
 * @LastEditTime: 2024-04-01 17:59:16
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\utils\config.ts
 */
import YTIcon from '@/assets/image/icon-yt.png';
import YTLogo from '@/assets/image/logo-yt.png';
import YTLogoUS from '@/assets/image/logo-yt-us.png';
import { getLocale } from '@/utils';
const isZhCN = getLocale().isZhCN;

export const adminAuthority = '*:*:*';

export const defaultSystemInfo = {
  title: '新能源能量管理云平台',
  icon: YTIcon,
  appStore: '//itunes.apple.com/app/6473716201',
  logo: isZhCN ? YTLogo : YTLogoUS,
};
