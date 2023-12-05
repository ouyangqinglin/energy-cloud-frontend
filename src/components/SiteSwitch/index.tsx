/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-05 14:50:51
 * @LastEditTime: 2023-12-05 14:24:54
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\SiteSwitch\index.tsx
 */
import { useEffect, useMemo, useRef, useCallback, useState } from 'react';
import { useModel } from 'umi';
import { ProFormColumnsType, ProFormInstance } from '@ant-design/pro-form';
import SchemaForm, { SchemaFormProps } from '@/components/SchemaForm';
import { useLocation, useSiteColumn } from '@/hooks';
import type { ProColumns } from '@ant-design/pro-table';
import { SiteDataType, getSiteType } from '@/services/station';
import { getRoutersInfo } from '@/services/session';
import { formatMessage, getLocaleMenus, getMenus, getPathTitleMap } from '@/utils';
import eventBus from '@/utils/eventBus';

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
  const location = useLocation();

  const changeSite = useCallback(
    (data: SiteDataType, type?: string) => {
      const result = type ?? (data?.energyOptions || '');
      formRef?.current?.setFieldValue?.('type', type ?? (data?.energyOptions || ''));
      formRef?.current?.setFieldValue?.('siteType', data?.energyOptions);
      getRoutersInfo({ siteId: data?.id })
        .then((requestMenus) => {
          const menus = getLocaleMenus(requestMenus);
          const antMenus = menus && getMenus(menus);
          setInitialState((prevData: any) => {
            return {
              ...prevData,
              menus,
              antMenus,
              menuPathTitleMap: getPathTitleMap(antMenus),
            };
          });
          dispatch({
            type: 'change',
            payload: { ...data, siteType: result },
          });
        })
        .catch(() => {
          dispatch({
            type: 'change',
            payload: { ...data, siteType: result },
          });
        });
    },
    [formRef],
  );

  const siteColumnOption = useMemo<ProColumns<SiteType, ValueType>>(() => {
    return {
      title: formatMessage({ id: 'common.site.siteName', defaultMessage: '站点名称' }),
      width: 200,
      fieldProps: (form) => {
        return {
          allowClear: false,
          onChange: (_: any, option: any) => {
            changeSite(option);
          },
        };
      },
      hideInForm:
        location?.pathname?.indexOf?.('/index/station') > -1 ||
        location?.pathname?.indexOf?.('/station/station-list') > -1,
      ...(columnProps || {}),
    };
  }, [columnProps, location]);

  const [siteColumn, siteOptions] = useSiteColumn<SiteType, ValueType>(siteColumnOption);

  const requestSiteType = useCallback(() => {
    return getSiteType().then(({ data }) => {
      return data?.map?.((item) => {
        return {
          value: item.value || '',
          label: item.name,
        };
      });
    });
  }, []);

  const siteOptionsMap = useMemo<Record<string, SiteDataType>>(() => {
    const result = {};
    siteOptions?.forEach((item) => {
      if (item.id) {
        result[item.id] = item;
      }
    });
    return result;
  }, [siteOptions]);

  const onSiteTypeChange = useCallback(
    (value) => {
      const result =
        siteOptions?.find?.((item) => item.energyOptions === value) || siteOptions?.[0];
      if (result && result.id) {
        formRef?.current?.setFieldValue?.('siteId', result.id);
        changeSite(siteOptionsMap[result.id], value);
      } else {
        dispatch({
          type: 'change',
          payload: { siteType: value },
        });
      }
    },
    [siteOptions],
  );

  const changeSiteBus = useCallback(
    (id) => {
      formRef?.current?.setFieldValue?.('siteId', id);
      changeSite(siteOptionsMap[id]);
    },
    [siteOptionsMap],
  );

  useEffect(() => {
    if (siteOptions?.[0]) {
      formRef?.current?.setFieldValue?.('siteId', siteOptions[0].value);
      changeSite(siteOptions[0], '');
    }
  }, [siteOptions]);

  useEffect(() => {
    eventBus.on('changeSite', changeSiteBus);
    return () => {
      eventBus.off('changeSite', changeSiteBus);
    };
  }, [changeSiteBus]);

  const formColumns = useMemo<ProFormColumnsType<SiteType, ValueType>[]>(() => {
    return [
      siteColumn,
      {
        title: formatMessage({ id: 'common.site.siteType', defaultMessage: '站点类型' }),
        dataIndex: 'siteType',
        valueType: 'select',
        request: requestSiteType,
        readonly: true,
        hideInForm:
          location?.pathname?.indexOf?.('/index/station') > -1 ||
          location?.pathname?.indexOf?.('/station/station-list') > -1,
      },
      {
        title: formatMessage({ id: 'common.site.siteType', defaultMessage: '站点类型' }),
        dataIndex: 'type',
        valueType: 'select',
        request: requestSiteType,
        width: 200,
        fieldProps: {
          allowClear: false,
          onChange: onSiteTypeChange,
        },
        hideInForm: location?.pathname?.indexOf?.('/site-monitor') > -1,
      },
    ];
  }, [siteColumn, onSiteTypeChange, location]);

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
