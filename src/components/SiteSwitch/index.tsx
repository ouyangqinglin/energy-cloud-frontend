/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-05 14:50:51
 * @LastEditTime: 2023-07-05 14:50:51
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\SiteSwitch\index.tsx
 */
import React, { useMemo, useRef } from 'react';
import { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-components';
import SchemaForm, { SchemaFormProps } from '@/components/SchamaForm';
import { useSiteColumn } from '@/hooks';

type SiteType = {
  siteId?: string;
};

export type SiteSwitchProps = {
  initialValues?: SiteType;
  onChange?: (data: SiteType) => void;
};

const SiteSwitch = <ValueType = 'text',>(
  props: Omit<SchemaFormProps<SiteType, ValueType>, 'layoutType' | 'columns'> & SiteSwitchProps,
) => {
  const { initialValues, onChange, ...restProps } = props;

  const formRef = useRef<ProFormInstance>();
  const [siteColumn] = useSiteColumn<SiteType, ValueType>({
    title: '选择站点',
    width: 200,
  });

  const formColumns = useMemo<ProFormColumnsType<SiteType, ValueType>[]>(() => {
    return [siteColumn];
  }, [siteColumn]);

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

export default SiteSwitch;
