/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:12:07
 * @LastEditTime: 2023-07-04 19:38:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\index.tsx
 */
import React, { useMemo, useCallback, useRef, useState, useEffect } from 'react';
import { message, Row } from 'antd';
import { useLocation } from 'umi';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import type { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchamaForm';
import EmptyPage from '@/components/EmptyPage';
import { useSiteColumn } from '@/hooks';
import styles from './index.less';
import type { LocationType } from '@/utils/dictionary';
import Statistics from './Statistics';
import CardDecoration from './components/CardDecoration';
import EnergyFlow from './EnergyFlow';
import SiteDropdown from './SiteDropdown';
import SiteInfo from './SiteInfo';
import Benefit from './Benefits';
import ElectricityChart from './ElectricityChart';

type SiteType = {
  siteId?: string;
};

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState();
  const formRef = useRef<ProFormInstance>();
  const location = useLocation();
  const [siteColumn] = useSiteColumn<SiteType>({
    title: '选择站点',
    fieldProps: {
      bordered: false,
      showSearch: false,
      showArrow: false,
      allowClear: false,
      onChange: () => {},
    },
    width: 200,
  });

  useEffect(() => {
    const { query } = location as LocationType;
    if (query?.id) {
      setSiteId(query?.id);
    }
  }, [location]);

  const formColumns = useMemo<ProFormColumnsType<SiteType>[]>(() => {
    return [siteColumn];
  }, [siteColumn]);

  const onScreenClick = () => {
    if (siteId) {
      window.open(`/screen/demo-station?id=${siteId}`);
    } else {
      message.success('请选择站点');
    }
  };

  return (
    <>
      <div className="bg-white card-wrap p24">
        <div className={styles.stationHeader}>
          <SchemaForm
            formRef={formRef}
            open={true}
            layoutType="Form"
            layout="inline"
            columns={formColumns}
            submitter={false}
            initialValues={{
              siteId,
            }}
          />
          {/* <SiteDropdown defaultSiteId={siteId}></SiteDropdown> */}
          <FundProjectionScreenOutlined className={styles.screen} onClick={onScreenClick} />
        </div>
        <Row gutter={[16, 16]}>
          <Statistics />
          <EnergyFlow />
          <Benefit />
          <ElectricityChart />
          <SiteInfo />
        </Row>
      </div>
    </>
  );
};

export default Index;
