/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-23 19:07:33
 * @LastEditTime: 2023-08-23 19:08:29
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\Task\config.ts
 */
import { DigitStatItemType } from '../../components/DigitStat';

export const items: DigitStatItemType[] = [
  {
    items: [
      {
        title: '安装工单',
        unit: '单',
        field: 'a',
        valueStyle: {
          color: '#34E1B6',
        },
      },
      {
        title: '待处理',
        unit: '单',
        field: 'b',
        valueStyle: {
          color: '#FFD15C',
        },
      },
      {
        title: '超24h未处理工单',
        unit: '单',
        field: 'c',
      },
    ],
  },
  {
    items: [
      {
        title: '维护工单',
        unit: '单',
        field: 'd',
        valueStyle: {
          color: '#34E1B6',
        },
      },
      {
        title: '待处理',
        unit: '单',
        field: 'e',
        valueStyle: {
          color: '#FFD15C',
        },
      },
      {
        title: '超24h未处理工单',
        unit: '单',
        field: 'f',
      },
    ],
  },
  {
    items: [
      {
        title: '客户报障单',
        unit: '单',
        field: 'g',
        valueStyle: {
          color: '#34E1B6',
        },
      },
      {
        title: '待处理',
        unit: '单',
        field: 'h',
        valueStyle: {
          color: '#FFD15C',
        },
      },
      {
        title: '超24h未处理工单',
        unit: '单',
        field: 'i',
      },
    ],
  },
];
