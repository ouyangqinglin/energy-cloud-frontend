import React, { useEffect } from 'react';
import { useRequest, useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { Card, Button, Image, Modal, message } from 'antd';
import { getStation } from '@/services/station';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import CustomPageForm from '../../../info/stationInfo/components/customPageForm';
import { setComplete, getDefaultPage } from '../../../info/stationInfo/service';

const OverviewSetting: React.FC = () => {
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [openCustomPage, { set, setTrue }] = useBoolean(false);
  const {
    loading,
    data: pageData,
    run: runGetDefaultPage,
  } = useRequest(getDefaultPage, {
    manual: true,
  });

  useEffect(() => {
    if (siteId) {
      runGetDefaultPage(siteId);
    }
  }, [siteId]);

  const pageDetailItems: DetailItem[] = [
    {
      label: '当前设置',
      field: 'homeType',
      format: () => (pageData?.homeType ? pageData?.customPageName : '默认首页'),
    },
  ];

  return (
    <>
      <Card
        className="mt16 px24"
        title="默认监控首页"
        extra={
          <Button type="primary" loading={loading} onClick={setTrue}>
            编辑
          </Button>
        }
      >
        <Detail
          data={pageData}
          items={pageDetailItems}
          labelStyle={{ width: '100px' }}
          column={3}
        />
      </Card>
      {openCustomPage && (
        <CustomPageForm open={openCustomPage} onOpenChange={set} siteId={siteId} />
      )}
    </>
  );
};

export default OverviewSetting;
