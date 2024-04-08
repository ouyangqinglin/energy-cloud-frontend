/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-17 15:45:18
 * @LastEditTime: 2024-04-01 18:55:39
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
  appStore:
    'https://apps.apple.com/cn/app/%E6%B0%B8%E6%B3%B0%E6%96%B0%E8%83%BD%E6%BA%90/id6473716201',
  logo: isZhCN ? YTLogo : YTLogoUS,
};
