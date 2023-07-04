/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-04 15:12:07
 * @LastEditTime: 2023-07-04 19:38:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Overview\index.tsx
 */
import React, { useMemo, useCallback, useRef } from 'react';
import { message } from 'antd';
import { useLocation } from 'umi';
import { FundProjectionScreenOutlined } from '@ant-design/icons';
import { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchamaForm';
import EmptyPage from '@/components/EmptyPage';
import { useSiteColumn } from '@/hooks';
import styles from './index.less';
import type { LocationType } from '@/utils/dictionary';

type SiteType = {
  siteId?: string;
};

const Index: React.FC = () => {
  const formRef = useRef<ProFormInstance>();
  const location = useLocation();
  const [siteColumn] = useSiteColumn<SiteType>({
    title: '选择站点',
    width: 200,
  });
  const siteId = useMemo(() => {
    const id = (location as LocationType).query?.id;
    return id ? id * 1 : '';
  }, (location as LocationType).query?.id);

  const formColumns = useMemo<ProFormColumnsType<SiteType>[]>(() => {
    return [siteColumn];
  }, [siteColumn]);

  const onScreenClick = useCallback(() => {
    const id = formRef?.current?.getFieldValue('siteId');
    if (id) {
      window.open(`/screen/demo-station?id=${id}`);
    } else {
      message.success('请选择站点');
    }
  }, []);

  return (
    <>
      <div className="h-full bg-white card-wrap p24">
        <FundProjectionScreenOutlined className={styles.screen} onClick={onScreenClick} />
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
        <EmptyPage />
      </div>
    </>
  );
};

export default Index;
