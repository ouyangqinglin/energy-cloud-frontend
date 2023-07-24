/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-05 14:50:51
 * @LastEditTime: 2023-07-24 12:56:49
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
import { getMenus, getPathTitleMap, getPathArrary, arrayToMap } from '@/utils';

type SiteType = {
  siteId?: string;
};

export type SiteSwitchProps<ValueType> = {
  initialValues?: SiteType;
  onChange?: (data: SiteType) => void;
  columnProps?: ProColumns<SiteType, ValueType>;
};

const SiteSwitch = <ValueType = 'text',>(
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
      getRoutersInfo({ siteId: data?.id }).then((menus) => {
        const antMenus = menus && getMenus(menus);
        setInitialState((prevData) => {
          return {
            ...prevData,
            menus,
            antMenus,
            menuPathTitleMap: getPathTitleMap(antMenus),
          };
        });
      });
    },
    [formRef],
  );

  const [siteColumn, siteOptions] = useSiteColumn<SiteType, ValueType>({
    title: '站点',
    width: 200,
    fieldProps: (form) => {
      return {
        allowClear: false,
        onChange: (_: any, option: any) => {
          changeSite(option);
        },
      };
    },
    ...(columnProps || {}),
  });

  const formColumns = useMemo<ProFormColumnsType<SiteType, ValueType>[]>(() => {
    return [
      siteColumn,
      {
        title: '类型',
        dataIndex: 'type',
        valueType: 'select',
        valueEnum: siteType,
        dependencies: ['siteId'],
        readonly: true,
      },
    ];
  }, [siteColumn]);

  useEffect(() => {
    if (siteOptions?.[0]) {
      formRef?.current?.setFieldValue?.('siteId', siteOptions[0].value);
      changeSite(siteOptions[0]);
    }
  }, [siteOptions]);

  // 临时解决，待优化
  useEffect(() => {
    window.changeTopSite = (data) => {
      const idMap = arrayToMap(siteOptions || [], 'id', 'energyOptions');
      formRef?.current?.setFieldValue?.('siteId', data.id);
      changeSite({ ...data, energyOptions: idMap[data.id] });
    };
  }, [siteOptions]);

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
