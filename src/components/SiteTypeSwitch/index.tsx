/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-05 14:50:51
 * @LastEditTime: 2023-07-21 18:10:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\SiteSwitch\index.tsx
 */
import React, { useEffect, useMemo, useRef, useCallback } from 'react';
import { useModel } from 'umi';
import { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-form';
import SchemaForm, { SchemaFormProps } from '@/components/SchamaForm';
import { useSiteColumn } from '@/hooks';
import type { ProColumns } from '@ant-design/pro-table';
import { siteType } from '@/utils/dictionary';
import { SiteDataType } from '@/services/station';
import { getRoutersInfo } from '@/services/session';
import { getMenus, getPathTitleMap, getPathArrary } from '@/utils';

type SiteType = {
  siteId?: string;
};

export type SiteSwitchProps<ValueType> = {
  initialValues?: SiteType;
  onChange?: (data: SiteType) => void;
  columnProps?: ProColumns<SiteType, ValueType>;
};

const SiteTypeSwitch = <ValueType = 'text',>(
  props: Omit<SchemaFormProps<SiteType, ValueType>, 'layoutType' | 'columns'> &
    SiteSwitchProps<ValueType>,
) => {
  const { initialValues, onChange, columnProps, ...restProps } = props;

  const { dispatch } = useModel('site');
  const { setInitialState } = useModel('@@initialState');
  const formRef = useRef<ProFormInstance>();

  const changeSite = useCallback(
    (data: SiteDataType) => {
      formRef?.current?.setFieldValue?.('type', data?.energyOptions);
      dispatch({
        type: 'change',
        payload: data,
      });
    },
    [formRef],
  );

  const formColumns = useMemo<ProFormColumnsType<SiteType, ValueType>[]>(() => {
    return [
      {
        title: '站点类型',
        dataIndex: 'siteType',
        valueType: 'select',
        fieldProps: {
          allowClear: false,
        },
        valueEnum: siteType,
      },
    ];
  }, []);

  return (
    <>
      <SchemaForm<SiteType, ValueType>
        formRef={formRef}
        open={true}
        layoutType="Form"
        layout="inline"
        columns={formColumns}
        submitter={false}
        initialValues={initialValues}
        onValuesChange={onChange}
        {...restProps}
      />
    </>
  );
};

export default SiteTypeSwitch;
