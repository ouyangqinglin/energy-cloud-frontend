/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-22 09:36:55
 * @LastEditTime: 2023-09-22 09:53:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\MultiSite\SiteRange\ElecPower\index.tsx
 */
import React, { useMemo } from 'react';
import Chart from '@/components/Chart';
import { defaultSankey } from '@/components/Chart/config';
import { getPowerData } from '../service';
import { useRequest } from 'umi';
import { REQUEST_INTERVAL_5_MINUTE } from '../../config';
import { merge } from 'lodash';
import Title from '../../../components/LayoutCell/title';
import { formatMessage } from '@/utils';

const targetItemColors = ['', '#159AFF', '#01CFA1', '#FFD15C', '#FF7B7B', '#FF8144'];

const sourceItem = {
  name: formatMessage({ id: 'screen.storageChargingStation', defaultMessage: '光储充站' }),
  type: 'source',
  count: 0,
  itemStyle: {
    color: '#20e7f0',
  },
  label: {
    show: true,
    position: 'right',
    formatter: (params: any) => {
      const { name, count } = params.data;
      return `{a|${name}}` + `{b|${count}}` + '{a|个}';
    },
    rich: {
      a: {
        color: '#fff',
        fontSize: '14px',
      },
      b: {
        color: ' #4DD6F0',
        fontSize: '16px',
      },
    },
  },
};

const targetItem = {
  name: 'A' + formatMessage({ id: 'device.site', defaultMessage: '站点' }),
  itemStyle: {
    color: '#34B9FF',
  },
  count: 12,
  label: {
    show: true,
    position: 'left',
    formatter: (params: any) => {
      const { name, count } = params.data;
      return `{a|${name}}` + ` ` + `{c|${count}}`;
    },
    rich: {
      a: {
        color: '#fff',
        fontSize: '14px',
      },
      b: {
        width: 40,
      },
      c: {
        color: ' #fff',
        fontSize: '14px',
      },
    },
  },
};

const ElecPower: React.FC = () => {
  const { data: installData } = useRequest(getPowerData, {
    pollingInterval: REQUEST_INTERVAL_5_MINUTE,
  });

  const options = useMemo(() => {
    const result: any = merge({}, defaultSankey);
    const source: any[] = [],
      target: any[] = [],
      links: any[] = [];
    let totalHasElseElec = false;
    let totalElseElec = 0;
    installData?.forEach?.((item) => {
      // 循环站点类型
      source.push(
        merge({}, sourceItem, {
          name: item.name,
          count: item.sites?.length,
        }),
      );
      let elseSiteElec: number = 0;
      let hasElseSite = false;
      item?.sites?.forEach?.((site) => {
        // 循环站点
        site.mainsElec = site.mainsElec || 0;
        if (site?.sort) {
          target.push(
            merge({}, targetItem, {
              name: site.name,
              count: site.mainsElec,
              sort: site.sort,
              itemStyle: {
                color: targetItemColors[site.sort],
              },
            }),
          );
          links.push({
            source: item.name,
            target: site.name,
            value: site.mainsElec || 10,
          });
        } else {
          elseSiteElec += site.mainsElec;
          totalElseElec += site.mainsElec;
          hasElseSite = true;
          totalHasElseElec = true;
        }
      });
      if (hasElseSite) {
        links.push({
          source: item.name,
          target: formatMessage({ id: 'screen.otherSites', defaultMessage: '其他站点' }),
          value: elseSiteElec || 10,
        });
      }
    });
    target.sort((a, b) => a.sort - b.sort);
    source.sort((a, b) => b.count - a.count);
    result.series.data = [...source, ...target];
    if (totalHasElseElec) {
      result.series.data.push(
        merge({}, targetItem, {
          name: formatMessage({ id: 'screen.otherSites', defaultMessage: '其他站点' }),
          count: totalElseElec,
        }),
      );
    }
    result.series.links = links;
    return result;
  }, [installData]);

  return (
    <>
      <Title
        className="mb8"
        title={formatMessage({
          id: 'siteMonitor.mainsCapacity',
          defaultMessage: '市电供电量',
        })}
        unit={`${formatMessage({ id: 'common.unit', defaultMessage: '单位' })}(kWh)`}
      />
      <Chart option={options} style={{ height: 300 }} calculateMax={false} />
    </>
  );
};

export default ElecPower;
