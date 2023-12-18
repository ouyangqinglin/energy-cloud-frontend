/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-15 14:50:06
 * @LastEditTime: 2023-09-20 11:21:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\CollectionModal\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Modal } from 'antd';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { CollectionSearchType } from '@/services/data';
import moment from 'moment';
import SchemaForm from '@/components/SchemaForm';
import { ProFormInstance } from '@ant-design/pro-components';
import { DeviceModelTypeEnum, formatMessage } from '@/utils';
import { parseToObj } from '@/utils';
import CollectionChart from './CollectionChart';
import { CollectionModalType } from './helper';

type Searchtype = CollectionSearchType & {
  date: string[];
};

const CollectionModal: React.FC<Omit<CollectionModalType, 'date'>> = (props) => {
  const { deviceId, collection, model, title, open, ...restProps } = props;

  const formRef = useRef<ProFormInstance>(null);
  const [date, setDate] = useState<string[]>();

  const modelData = useMemo(() => {
    const enumObj: any = parseToObj(model?.specs);
    let enumKeys: string[] = [];
    if (model?.type === DeviceModelTypeEnum.Enum) {
      enumKeys = ['wahaha'].concat(Object.keys(enumObj));
    }
    return {
      type: model?.type,
      keys: enumKeys,
      data: enumObj,
      unit: enumObj?.unit,
    };
  }, [model]);

  const onFinish = useCallback((formData: Searchtype) => {
    setDate(formData.date);
    return Promise.resolve(true);
  }, []);

  useEffect(() => {
    if (open && deviceId) {
      formRef?.current?.submit?.();
    }
  }, [deviceId, collection, open]);

  const searchColumns = useMemo<ProFormColumnsType<Searchtype>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'common.selectDate', defaultMessage: '选择日期' }),
        dataIndex: 'date',
        valueType: 'dateRange',
        formItemProps: {
          rules: [{ required: true }],
        },
        initialValue: [moment(), moment()],
      },
    ];
  }, []);

  return (
    <>
      <Modal
        width="1000px"
        footer={false}
        title={title + (modelData.unit ? `（${modelData.unit}）` : '')}
        open={open}
        centered
        {...restProps}
      >
        <SchemaForm<Searchtype>
          className="p0 mb24"
          formRef={formRef}
          columns={searchColumns}
          layout="inline"
          layoutType="QueryFilter"
          onFinish={onFinish}
        />
        <CollectionChart
          title={title}
          deviceId={deviceId}
          collection={collection}
          model={model}
          date={date}
        />
      </Modal>
    </>
  );
};

export default CollectionModal;
