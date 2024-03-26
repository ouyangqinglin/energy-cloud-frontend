/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-18 14:46:46
 * @LastEditTime: 2023-08-22 13:35:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\product-manage\ProductDetail\Detail\index.tsx
 */

import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useRequest } from 'umi';
import type { CollectionDetailType } from './config';
import { detailItems, columns } from './config';
import Detail from '@/components/Detail';
import { getData, importPruductFile, updateProductIntroduce } from '../../Product/service';
import { InboxOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { TabsProps, UploadFile } from 'antd';
import { message, Upload, Tabs } from 'antd';
import { getCollection } from './service';
import type { DevicePropsType } from '@/types/device';
import { DeviceModelTypeEnum, formatMessage, getUniqueNumber } from '@/utils';
import { cloneDeep } from 'lodash';
const { Dragger } = Upload;
import styles from './index.less';

export type MyDetailProps = {
  id?: string;
};

const dealCollection = (data: DevicePropsType & CollectionDetailType) => {
  switch (data?.dataType?.type) {
    case DeviceModelTypeEnum.Int:
    case DeviceModelTypeEnum.Long:
    case DeviceModelTypeEnum.Double:
      data.value = data?.dataType?.specs?.min + '~' + data?.dataType?.specs?.max;
      data.unit = data?.dataType?.specs?.unit;
      break;
    case DeviceModelTypeEnum.Boolean:
    case DeviceModelTypeEnum.Enum:
      try {
        const values: string[] = [];
        for (const key in data?.dataType?.specs) {
          values.push(data?.dataType?.specs?.[key]);
        }
        data.value = values.join(',');
      } catch {}
      break;
    default:
  }
  data.type = data?.dataType?.type;
};

const MyDetail: React.FC<MyDetailProps> = (props) => {
  const { id } = props;
  const [fileList, setFileList] = useState<UploadFile<any>[]>([]);
  const [activeTab, setActiveTab] = useState('properties');
  const { data: detailData, run } = useRequest(getData, {
    manual: true,
  });
  const { data: collectionData, run: runGetCollection } = useRequest(getCollection, {
    manual: true,
    formatResult: ({ data }) => {
      data?.properties?.forEach?.((item) => {
        dealCollection(item as any);
      });
      return data;
    },
  });

  const tableData = useMemo(() => {
    return collectionData?.[activeTab];
  }, [collectionData, activeTab]);

  const onTabsChange = useCallback((key) => {
    setActiveTab(key);
  }, []);

  useEffect(() => {
    if (id) {
      run(id);
      runGetCollection(id);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);
  useEffect(() => {
    if (detailData?.productIntroduce) {
      setFileList(JSON.parse(detailData.productIntroduce) || []);
    }
  }, [detailData?.productIntroduce]);

  const items: TabsProps['items'] = [
    {
      key: 'properties',
      label: formatMessage({ id: 'user.attribute', defaultMessage: '属性' }),
    },
    {
      key: 'events',
      label: formatMessage({ id: 'user.event', defaultMessage: '事件' }),
    },
    {
      key: 'services',
      label: formatMessage({ id: 'user.service', defaultMessage: '服务' }),
    },
  ];
  const importFile = async (file: any) => {
    const hide = message.loading('正在导入');
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('platform', '1');
      const res = await importPruductFile(formData);
      if (res.code == 200) {
        const currentFileList = cloneDeep(fileList);
        currentFileList.push({ ...res.data, uid: getUniqueNumber() });
        setFileList(currentFileList);
      }
      hide();
      message.success('导入成功');
    } catch (error) {
      hide();
      message.error('导出失败，请重试');
    }
    return false;
  };

  const removeFile = (file: UploadFile) => {
    const currentFileList = cloneDeep(fileList);
    const index = currentFileList.findIndex((i) => i.uid == file.uid);
    currentFileList.splice(index, 1);
    setFileList(currentFileList);
  };

  useEffect(() => {
    updateProductIntroduce({ productIntroduce: fileList, id: detailData?.id });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fileList]);

  return (
    <>
      <Detail className="p24" items={detailItems} data={detailData} column={4} />
      <div className={styles.dragger_wrapper}>
        {formatMessage({ id: 'siteMonitor.productIntroduction', defaultMessage: '产品介绍' })}：
        <Dragger
          beforeUpload={importFile}
          fileList={fileList}
          onRemove={removeFile}
          className={styles.dragger}
        >
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            {formatMessage({ id: 'common.upload', defaultMessage: '上传' })}
          </p>
          <p className="ant-upload-hint">
            {formatMessage({ id: 'common.supportFile', defaultMessage: '支持扩展名' })}
            ：.rar .zip .doc .doxc .pdf..
          </p>
        </Dragger>
      </div>
      <Tabs
        activeKey={activeTab}
        className="page-tabs"
        tabBarGutter={34}
        items={items}
        onChange={onTabsChange}
      />
      <YTProTable
        className="p24"
        toolBarRender={false}
        columns={columns}
        dataSource={tableData}
        search={false}
        pagination={false}
      />
    </>
  );
};

export default MyDetail;
