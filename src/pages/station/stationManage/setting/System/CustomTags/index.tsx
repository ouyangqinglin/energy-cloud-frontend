import React, { memo, useCallback, useRef } from 'react';
import { Card, Button } from 'antd';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';
import { useModel } from 'umi';
import { useBoolean } from 'ahooks';
import { editData, getData } from './service';
import type { CustomDataType, CollectionDataType, DeviceDataType } from './helper';

import type { ProFormInstance } from '@ant-design/pro-components';
import SchemaForm, { FormTypeEnum } from '@/components/SchemaForm';
import { columns, defaultCollectionData, defaultDeviceData } from './helper';

type ConfigType = CollectionDataType & DeviceDataType;

const CustomTags: React.FC = () => {
  const formRef = useRef<ProFormInstance>(null);
  const { siteId } = useModel('station', (model) => ({ siteId: model.state?.id || '' }));
  const [loading, { setTrue, setFalse }] = useBoolean(true);
  const { authorityMap } = useAuthority(['siteManage:siteConfig:runManage:videoMonitor.custom']);
  const isEdit = authorityMap.get('siteManage:siteConfig:runManage:videoMonitor.custom');

  const onSaveClick = useCallback(() => {
    formRef?.current?.submit?.();
  }, []);

  const afterRequest = useCallback(
    (data: CustomDataType) => {
      console.log('RequestData>>', data);
      if (data?.charts.length) {
        data.charts = data?.charts?.map((i) => {
          i.curves = i?.curves?.map((item) => {
            item.collection = defaultCollectionData();
            item.device = defaultDeviceData();
            if (item?.config) {
              const config = JSON.parse(item?.config) as ConfigType[];
              if (config?.length > 0) {
                item.collection = [];
                item.device = [];
                config.forEach(({ key, keyName, deviceId, deviceName }) => {
                  item.collection.push({ key, keyName });
                  item.device.push({ deviceId, deviceName });
                });
              }
              delete item?.config;
            }
            return item;
          });
          return i;
        });
      }
      console.log('data>>', data);
      setFalse();
    },
    [setFalse],
  );

  const beforeSubmit = useCallback(
    (data: CustomDataType) => {
      if (data?.charts.length) {
        data.charts = data?.charts?.map((i) => {
          i.curves = i?.curves?.map((item) => {
            if (item?.collection?.length > 0) {
              item.config = item.collection.map(({ key, keyName }, index) => {
                const { deviceId, deviceName } = item.device[index];
                return { key, keyName, deviceId, deviceName };
              });
            } else {
              item.config = [];
            }
            item.config = JSON.stringify(item.config);
            const result = item as any;
            delete result.collection;
            delete result.device;
            return result;
          });
          return i;
        });
      }
      data.labelManage.siteId = siteId;
      setTrue();
    },
    [setTrue, siteId],
  );

  return (
    <>
      <Card
        className="my16 mx24"
        title={formatMessage({ id: 'siteManage.1046', defaultMessage: '自定义标签' })}
        extra={
          isEdit ? (
            <Button type="primary" loading={loading} onClick={onSaveClick}>
              {formatMessage({ id: 'common.save', defaultMessage: '保存' })}
            </Button>
          ) : (
            <></>
          )
        }
      >
        <SchemaForm
          formRef={formRef}
          layoutType="Form"
          type={FormTypeEnum.Edit}
          columns={columns}
          submitter={false}
          id={siteId}
          idKey="siteId"
          editData={editData}
          getData={getData}
          afterRequest={afterRequest}
          beforeSubmit={beforeSubmit}
          onSuccess={setFalse}
          onError={setFalse}
          grid={true}
          colProps={{
            span: 8,
          }}
        />
      </Card>
    </>
  );
};

export default memo(CustomTags);
