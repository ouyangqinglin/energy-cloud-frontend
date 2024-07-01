import React, { useMemo, useState } from 'react';
import { Button, Tabs, message } from 'antd';
import type { TabsProps } from 'antd';
import { useAuthority } from '@/hooks';
import { formatMessage, saveFile } from '@/utils';
import Income from './Income';
import Power from './Power';
import RectData from './RectData';
import { useRequest } from 'umi';
import { exportDataType } from './service';

type RefreshtProps = {};

const Refresh: React.FC<RefreshtProps> = () => {
  const [activeKey, setActiveKey] = useState('0');
  const { run, loading } = useRequest(exportDataType, {
    manual: true,
    formatResult: (res) => res,
  });

  const { authorityMap } = useAuthority([
    'oss:dataStatistics:refresh:rect',
    'oss:dataStatistics:refresh:power',
    'oss:dataStatistics:refresh:income',
    'oss:dataStatistics:refresh:dataType',
  ]);

  const items = useMemo(() => {
    const result: TabsProps['items'] = [];
    if (authorityMap.get('oss:dataStatistics:refresh:rect')) {
      result.push({
        key: '0',
        label: formatMessage({ id: 'dataManage.1003', defaultMessage: '矩形数据同步' }),
        children: <RectData />,
      });
    }
    if (authorityMap.get('oss:dataStatistics:refresh:power')) {
      result.push({
        key: '1',
        label: formatMessage({ id: 'dataManage.1004', defaultMessage: '功率刷新' }),
        children: <Power />,
      });
    }
    if (authorityMap.get('oss:dataStatistics:refresh:rect')) {
      result.push({
        key: '2',
        label: formatMessage({ id: 'dataManage.1005', defaultMessage: '电量收益刷新' }),
        children: <Income />,
      });
    }
    if (authorityMap.get('oss:dataStatistics:refresh:dataType')) {
      result.push({
        key: 'dataType',
        label: formatMessage({ id: 'dataManage.1050', defaultMessage: '数据类型' }),
      });
    }
    return result;
  }, [authorityMap]);

  const onExportClick = () => {
    run().then((res) => {
      if (res) {
        saveFile(res, formatMessage({ id: 'dataManage.1050', defaultMessage: '数据类型' }));
      }
    });
  };

  return (
    <>
      <Tabs
        className="category-tabs p20"
        tabBarGutter={34}
        defaultActiveKey="1"
        items={items}
        tabBarExtraContent={
          activeKey == 'dataType' && (
            <Button type="primary" onClick={onExportClick} loading={loading}>
              {formatMessage({ id: 'common.export', defaultMessage: '导出' })}
            </Button>
          )
        }
        onChange={(key) => setActiveKey(key)}
      />
    </>
  );
};

export default Refresh;
