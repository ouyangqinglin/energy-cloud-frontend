/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-12-03 18:33:54
 * @LastEditTime: 2024-05-11 16:35:27
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\stationList\siteList.tsx
 */
import React, { useRef, useState, useCallback, useEffect, useMemo } from 'react';
import { Button, Modal, message } from 'antd';
import { useHistory, useModel } from 'umi';
import { PlusOutlined } from '@ant-design/icons';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { StationType } from './data.d';
import { buildStatus } from '@/utils/dict';
import { getList, removeData } from './service';
import StationForm from './components/edit';
import { siteType as siteTypeEnum } from '@/utils/dict';
import { FormTypeEnum } from '@/components/SchemaForm';
import { useArea, useAuthority } from '@/hooks';
import eventBus from '@/utils/eventBus';
import { formatMessage, getLocale } from '@/utils';

const StationList: React.FC = () => {
  const [open, setOpen] = useState(false);
  const [siteId, setSiteId] = useState('');
  const history = useHistory();
  const actionRef = useRef<ActionType>();
  const areaSelectRef = useRef<string[]>([]);
  const { state: areaOptions } = useArea();
  const { siteType } = useModel('site', (model) => ({ siteType: model?.state?.siteType }));
  const { authorityMap } = useAuthority([
    'system:site:config',
    'system:site:delete',
    'system:site:create',
    'oss:site:update',
  ]);

  const requestList = useCallback(
    (params) => {
      const [countryName, provinceName, cityName] = areaSelectRef.current || [];
      const [countryCode, provinceCode, cityCode] = countryName ? [] : params?.area || [];
      return getList({
        ...params,
        countryCode,
        provinceCode,
        cityCode,
        countryName,
        provinceName,
        cityName,
        energyOptions: siteType,
      });
    },
    [siteType],
  );

  const onAddClick = useCallback(() => {
    setOpen(true);
    setSiteId('');
  }, []);

  const onEditClick = useCallback((record: StationType) => {
    setOpen(true);
    setSiteId(record.id);
  }, []);

  const onSiteClick = useCallback((record: StationType) => {
    eventBus.emit('changeSite', record.id);
    history.push({
      pathname: '/site-monitor/overview',
      search: `?id=${record.id}`,
    });
  }, []);

  const onSettingClick = useCallback((record) => {
    history.push({
      pathname: `/station/setting`,
      search: `?id=${record.id}&siteType=${record.energyOptions}`,
    });
  }, []);

  const onSuccess = () => {
    actionRef?.current?.reload?.();
  };

  useEffect(() => {
    actionRef?.current?.reloadAndRest?.();
  }, [siteType]);

  const toolBar = () => [
    <Button type="primary" key="add" onClick={onAddClick}>
      <PlusOutlined />
      {formatMessage({ id: 'common.new', defaultMessage: '新建' })}
    </Button>,
  ];

  const rowBar = useCallback(
    (_: any, record: StationType) => (
      <>
        {authorityMap.get('oss:site:update') && (
          <Button type="link" size="small" key="in" onClick={() => onEditClick(record)}>
            {formatMessage({ id: 'common.edit', defaultMessage: '编辑' })}
          </Button>
        )}
        {authorityMap.get('system:site:delete') && (
          <Button
            type="link"
            size="small"
            key="delete"
            onClick={() => {
              Modal.confirm({
                title: formatMessage({ id: 'common.delete', defaultMessage: '删除' }),
                content: formatMessage({
                  id: 'common.confirmDelete',
                  defaultMessage: '请确认是否删除',
                }),
                okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
                cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
                onOk: () => {
                  removeData({ siteId: record.id }).then(() => {
                    message.success(
                      formatMessage({ id: 'common.del', defaultMessage: '删除成功' }),
                    );
                    if (actionRef.current) {
                      actionRef.current.reload();
                    }
                  });
                },
              });
            }}
          >
            {formatMessage({ id: 'common.delete', defaultMessage: '删除' })}
          </Button>
        )}
        {authorityMap.get('system:site:config') && (
          <Button type="link" size="small" key="in" onClick={() => onSettingClick(record)}>
            {formatMessage({ id: 'siteManage.siteList.siteConfig', defaultMessage: '站点配置' })}
          </Button>
        )}
      </>
    ),
    [authorityMap, onEditClick, onSettingClick],
  );

  const columns: ProColumns<StationType>[] = useMemo(() => {
    return [
      {
        title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
        dataIndex: 'index',
        valueType: 'index',
        width: 48,
      },
      {
        title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
        dataIndex: 'name',
        width: 250,
        ellipsis: true,
        render: (_, record) => {
          return <a onClick={() => onSiteClick(record)}>{record.name}</a>;
        },
      },
      {
        title: formatMessage({ id: 'siteManage.siteList.siteCode', defaultMessage: '站点编码' }),
        dataIndex: 'id',
        hideInSearch: true,
        width: 150,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'siteManage.siteList.siteType', defaultMessage: '站点类型' }),
        dataIndex: 'energyOptions',
        valueType: 'select',
        valueEnum: siteTypeEnum,
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.createPerson', defaultMessage: '创建人' }),
        dataIndex: 'createByName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.createTime', defaultMessage: '创建时间' }),
        dataIndex: 'createTime',
        valueType: 'dateRange',
        fieldProps: {
          format: getLocale().dateFormat,
        },
        render: (_, record) => record.createTime,
        search: {
          transform: (value) => {
            return {
              startTime: value[0],
              endTime: value[1],
            };
          },
        },
        width: 150,
      },
      {
        title: formatMessage({ id: 'common.deliveryTime', defaultMessage: '交付时间' }),
        dataIndex: 'deliveryTime',
        valueType: 'dateTime',
        hideInSearch: true,
        width: 150,
      },
      {
        title: formatMessage({ id: 'common.area', defaultMessage: '地区' }),
        dataIndex: 'area',
        valueType: 'cascader',
        hideInTable: true,
        fieldProps: {
          options: areaOptions,
          fieldNames: {
            value: 'id',
          },
          onChange: (_: any, options: any) => {
            if (options?.[0]?.areaCode) {
              areaSelectRef.current = [];
            } else {
              areaSelectRef.current = options?.map?.((item: any) => item.areaCode || item.label);
            }
          },
          changeOnSelect: true,
        },
      },
      {
        title: formatMessage({ id: 'common.country', defaultMessage: '国家' }),
        dataIndex: 'countryName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.province', defaultMessage: '省份' }),
        dataIndex: 'provinceName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.city', defaultMessage: '城市' }),
        dataIndex: 'cityName',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({
          id: 'siteManage.siteList.constructionStatus',
          defaultMessage: '建设状态',
        }),
        dataIndex: 'constructionStatus',
        valueType: 'select',
        valueEnum: buildStatus,
        width: 150,
        ellipsis: true,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'siteManage.siteList.installer', defaultMessage: '安装商' }),
        dataIndex: 'agent',
        hideInSearch: true,
        ellipsis: true,
        width: 150,
        render: (_, record) => {
          return record?.installers?.map?.((item) => item.orgName)?.join?.('，');
        },
      },
      {
        title: formatMessage({ id: 'common.operate', defaultMessage: '操作' }),
        valueType: 'option',
        width: getLocale().isZh ? 180 : 250,
        fixed: 'right',
        render: rowBar,
        hideInTable:
          !authorityMap.get('system:site:config') &&
          !authorityMap.get('system:site:delete') &&
          !authorityMap.get('oss:site:update'),
      },
    ];
  }, [onSiteClick, rowBar, authorityMap, areaOptions]);

  return (
    <>
      <YTProTable
        actionRef={actionRef}
        columns={columns}
        toolBarRender={authorityMap.get('system:site:create') ? toolBar : () => [<></>]}
        request={requestList}
        resizable={true}
      />
      <StationForm
        id={siteId}
        open={open}
        onOpenChange={setOpen}
        type={siteId ? FormTypeEnum.Edit : FormTypeEnum.Add}
        onSuccess={onSuccess}
        initValues={{ map: 0, timeZone: 0 }}
      />
    </>
  );
};

export default StationList;
