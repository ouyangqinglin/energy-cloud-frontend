/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:21:56
 * @LastEditTime: 2024-07-24 14:14:26
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Alarm\AlarmTable.tsx
 */
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Modal, message, Space, Checkbox, Button } from 'antd';
import { ClearOutlined, DeleteOutlined } from '@ant-design/icons';
import { useRequest, useHistory, FormattedMessage } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import type { AlarmType, TableSearchType } from './data';
import { alarmSource, buildStatus } from '@/utils/dict';
import { ProConfigProvider } from '@ant-design/pro-components';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';
import { cleanUpType } from '@/utils/dict';
import YTProTable from '@/components/YTProTable';
import { useAuthority } from '@/hooks';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { getList, getDetail, cleanUpAlarm, getAlarmNum, exportList } from './service';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import { getSitesList } from '@/services/station';
import { debounce } from 'lodash';
import type { OptionType } from '@/types';
import { YTAlarmFullOutlined } from '@/components/YTIcons';
import styles from './index.less';
import { formatMessage, isEmpty, getLocale } from '@/utils';
import eventBus from '@/utils/eventBus';
import { YTDATERANGE } from '@/components/YTDateRange';
import { ModelSizeEnum } from '@/utils/enum';

export enum PageTypeEnum {
  Current,
  History,
}

export type AlarmProps = {
  isStationChild?: boolean;
  type?: PageTypeEnum;
  params?: Record<string, any>;
  formParam?: Record<string, any>;
};

const levelMap = new Map([
  ['error', formatMessage({ id: 'alarmManage.emergent', defaultMessage: '严重' })],
  ['alarm', formatMessage({ id: 'alarmManage.importance', defaultMessage: '重要' })],
  ['warn', formatMessage({ id: 'alarmManage.secondary', defaultMessage: '次要' })],
  ['info', formatMessage({ id: 'alarmManage.tips', defaultMessage: '提示' })],
]);

const getLevelByType = (type: string, num?: string) => {
  return (
    <span className={`${styles.alarmWrap} ${styles[type]}`}>
      {isEmpty(num) ? (
        <>
          <YTAlarmFullOutlined /> {levelMap.get(type)}
        </>
      ) : (
        <Checkbox className="py2" value={type}>
          <YTAlarmFullOutlined />
          {levelMap.get(type)} {num}
        </Checkbox>
      )}
    </span>
  );
};

export const alarmLevelMap = new Map([
  ['error', getLevelByType('error')],
  ['alarm', getLevelByType('alarm')],
  ['warn', getLevelByType('warn')],
  ['info', getLevelByType('info')],
]);

const alarmSourceOptions = Object.entries(alarmSource).map(([key, { text }]) => ({
  label: text,
  value: key,
}));

const Alarm: React.FC<AlarmProps> = (props) => {
  const { isStationChild, type = PageTypeEnum.Current, params, formParam } = props;
  const { authorityMap } = useAuthority(['oss:historyAlarm:page:batchDelete']);
  const isBatchDelete =
    authorityMap.get('oss:historyAlarm:page:batchDelete') && type == PageTypeEnum.History;

  const formParamRef = useRef(formParam);
  const [headParams, setHeadParams] = useState<Record<string, any[]>>({
    fromResources: ['0'],
  });
  const formRef = useRef<ProFormInstance>();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [stationOptions, setStationOptions] = useState<OptionType[]>();
  const actionRef = useRef<ActionType>();
  const [selectedRowsState, setSelectedRows] = useState<OptionType[]>([]);

  const { data: detailData, run } = useRequest(getDetail, {
    manual: true,
  });
  const { data: alarmNumData, run: runGetAlarmNum } = useRequest(getAlarmNum, {
    manual: true,
  });

  const cleanUpOptions = useMemo<OptionType[]>(() => {
    const result: OptionType[] = [];
    for (const key in cleanUpType) {
      result.push({
        label: cleanUpType[key],
        value: key,
      });
    }
    return result;
  }, []);

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const requestList: YTProTableCustomProps<AlarmType, AlarmType>['request'] = useCallback(
    (paramsData) => {
      const requestParams = {
        ...paramsData,
        ...formParamRef.current,
        ...(params || {}),
        ...(isStationChild && {
          deviceName: undefined,
        }),
        isHistoryAlarm: type,
        ...headParams,
      };
      runGetAlarmNum(requestParams);
      return getList(requestParams);
    },
    [params, type, headParams],
  );

  const requestCleanUpAlarm = useCallback((paramsData) => {
    return cleanUpAlarm(paramsData);
  }, []);

  const onSiteClick = useCallback((record: AlarmType) => {
    if (record.siteId) {
      eventBus.emit('changeSite', record.siteId);
      history.push({
        pathname: '/site-monitor/overview',
        search: `?id=${record.siteId}`,
      });
    }
  }, []);

  const onDetailClick = useCallback((_, record) => {
    switchOpen();
    run(record.id);
  }, []);

  const onCleanClick = useCallback((record: AlarmType) => {
    Modal.confirm({
      title: (
        <strong>
          <FormattedMessage
            id="upgradeManage.clearConfirm"
            defaultMessage={formatMessage({
              id: 'alarmManage.clearConfirm',
              defaultMessage: '清除确认',
            })}
          />
        </strong>
      ),
      content: formatMessage({
        id: 'alarmManage.clearConfirmContent',
        defaultMessage: '产生告警的故障可能尚未清除，是否强制清除选中的告警？',
      }),
      okText: formatMessage({ id: 'common.confirm', defaultMessage: '确认' }),
      cancelText: formatMessage({ id: 'common.cancel', defaultMessage: '取消' }),
      onOk: () => {
        return requestCleanUpAlarm({ ids: [record.id] }).then(({ data }) => {
          if (data) {
            message.success(
              formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }),
            );
            actionRef?.current?.reload?.();
          }
        });
      },
    });
  }, []);

  const requestStation = useCallback(
    debounce(({ text, siteConstructionStatus }) => {
      const query = { name: text } as any;
      if (siteConstructionStatus !== undefined) {
        query.siteConstructionStatus = siteConstructionStatus;
      }
      getSitesList(query).then(({ data }) => {
        setStationOptions(
          data?.map?.((item: any) => {
            return {
              label: item.name,
              value: item.id,
            };
          }),
        );
      });
    }, 700),
    [],
  );

  const onHeadChange = useCallback((value: any[], field) => {
    setHeadParams((prevData) => {
      if (field === 'recoverType') {
        return { ...prevData, [field]: value.length == 1 ? value[0] : '' };
      } else {
        return { ...prevData, [field]: value };
      }
    });
    actionRef?.current?.reloadAndRest?.();
  }, []);

  const requestExport = useCallback(
    (searchParams: TableSearchType) => {
      const date = searchParams?.alarmTime || [];
      return exportList({
        ...searchParams,
        ...formParamRef.current,
        ...params,
        ...(isStationChild && {
          deviceName: undefined,
        }),
        isHistoryAlarm: type,
        ...headParams,
        ...(date.length
          ? {
              startTime: (date[0] as any)?.format?.('YYYY-MM-DD'),
              endTime: (date[1] as any)?.format?.('YYYY-MM-DD'),
            }
          : {}),
      });
    },
    [type, params, headParams],
  );

  const getExportName = useCallback(
    (searchParams: TableSearchType) => {
      return `${params?.deviceName ? params?.deviceName + '-' : ''}${
        type == PageTypeEnum.Current
          ? formatMessage({ id: 'alarmManage.currentAlarm', defaultMessage: '当前告警' })
          : formatMessage({ id: 'alarmManage.historicalAlarm', defaultMessage: '历史告警' })
      }`;
    },
    [type, params],
  );

  const onDeviceClick = useCallback(
    (rowData: AlarmType) => {
      history.push({
        pathname: '/equipment/device-detail',
        search: `?id=${rowData.deviceId}`,
      });
    },
    [isStationChild],
  );

  useEffect(() => {
    requestStation('');
  }, []);

  useEffect(() => {
    actionRef?.current?.reloadAndRest?.();
  }, [params]);

  useEffect(() => {
    formParamRef.current = formParam;
    formRef.current?.setFieldsValue({
      ...formParam,
      siteId: formParam?.siteId && formParam?.siteId * 1,
    });
    actionRef.current?.reload?.();
  }, [formParam]);

  const detailItems: DetailItem[] = [
    {
      label: formatMessage({ id: 'alarmManage.alarmName', defaultMessage: '告警名称' }),
      field: 'name',
    },
    {
      label: formatMessage({ id: 'alarmManage.siteName', defaultMessage: '站点名称' }),
      field: 'siteName',
    },
    {
      label: formatMessage({ id: 'alarmManage.deviceName', defaultMessage: '设备名称' }),
      field: 'deviceName',
    },
    {
      label: formatMessage({ id: 'alarmManage.productType', defaultMessage: '产品类型' }),
      field: 'productTypeName',
    },
    {
      label: formatMessage({ id: 'alarmManage.alarmLevel', defaultMessage: '告警级别' }),
      field: 'level',
      format: (value) => getLevelByType(value),
    },
    {
      label: formatMessage({ id: 'alarmManage.occurrenceTime', defaultMessage: '发生时间' }),
      field: 'alarmTime',
    },
    {
      label: formatMessage({ id: 'alarmManage.clearTime', defaultMessage: '消除时间' }),
      field: 'recoveryTime',
      show: (_, data) => data?.status == 1,
    },
    {
      label: formatMessage({ id: 'alarmManage.clearType', defaultMessage: '消除类型' }),
      field: 'recoverType',
      format: (value) => cleanUpType[value],
      show: (_, data) => data?.status == 1,
    },
  ];

  const columns = useMemo<ProColumns<AlarmType>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
        dataIndex: 'index',
        valueType: 'index',
        width: 50,
      },
      ...(isStationChild
        ? []
        : [
            {
              title: formatMessage({
                id: 'siteManage.siteList.constructionStatus',
                defaultMessage: '建设状态',
              }),
              dataIndex: 'siteConstructionStatus',
              valueType: 'select',
              valueEnum: buildStatus,
              width: 150,
              ellipsis: true,
              hideInTable: true,
              fieldProps: {
                onChange: (siteConstructionStatus) =>
                  requestStation({ siteConstructionStatus, text: '' }),
              },
            },
            {
              title: formatMessage({
                id: 'siteManage.siteList.siteName',
                defaultMessage: '站点名称',
              }),
              dataIndex: 'siteName',
              valueType: 'select',
              render: (_, record) => {
                return <a onClick={() => onSiteClick(record)}>{record.siteName ?? '-'}</a>;
              },
              formItemProps: {
                name: 'siteId',
              },
              fieldProps: (form) => {
                const siteConstructionStatus = form.getFieldValue('siteConstructionStatus');

                return {
                  showSearch: true,
                  filterOption: false,
                  onSearch: (text: string) => requestStation({ siteConstructionStatus, text }),
                  options: stationOptions,
                };
              },
              width: 150,
              ellipsis: true,
              hideInTable: true,
            } as ProColumns<AlarmType>,
          ]),
      {
        title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
        dataIndex: 'alarmTime',
        width: 150,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'alarmManage.alarmLevel', defaultMessage: '告警级别' }),
        dataIndex: 'level',
        valueType: 'select',
        valueEnum: alarmLevelMap,
        width: 120,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
        dataIndex: 'deviceName',
        width: 150,
        ellipsis: true,
        hideInSearch: isStationChild,
        render: (_, record) => {
          return isStationChild ? (
            record.deviceName
          ) : (
            <span
              className="cl-primary cursor"
              onClick={() => onDeviceClick(record)}
              title={record.deviceName}
            >
              {record.deviceName}
            </span>
          );
        },
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        hideInSearch: isStationChild,
      },
      {
        title: formatMessage({ id: 'siteManage.siteList.siteName', defaultMessage: '站点名称' }),
        dataIndex: 'siteName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
        hideInTable: isStationChild,
      },
      {
        title: formatMessage({ id: 'alarmManage.reportSource', defaultMessage: '告警来源' }),
        dataIndex: 'fromResource',
        valueEnum: alarmSource,
        width: 120,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'alarmManage.alarmName', defaultMessage: '告警名称' }),
        dataIndex: 'alarmName',
        width: 150,
        ellipsis: true,
        render: (_, record) => {
          return <a onClick={() => onDetailClick(_, record)}>{record.content}</a>;
        },
      },
      {
        title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
        dataIndex: 'alarmTime',
        valueType: YTDATERANGE,
        width: 150,
        fieldProps: {
          dateFormat: getLocale().dateFormat,
          format: 'YYYY-MM-DD',
        },
        render: (_, record) => record.alarmTime,
        search: {
          transform: (value) => {
            return {
              startTime: value[0],
              endTime: value[1],
            };
          },
        },
        hideInTable: true,
      },
      {
        title: formatMessage({ id: 'alarmManage.clearType', defaultMessage: '消除类型' }),
        dataIndex: 'recoverType',
        valueType: 'select',
        valueEnum: cleanUpType,
        width: 120,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.Current,
      },
      {
        title: formatMessage({ id: 'alarmManage.clearTime', defaultMessage: '消除时间' }),
        dataIndex: 'recoveryTime',
        width: 150,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.Current,
      },
      {
        title: formatMessage({ id: 'alarmManage.alarmBy', defaultMessage: '消除人' }),
        dataIndex: 'recoveryByName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.Current,
      },
      {
        title: formatMessage({ id: 'alarmManage.operate', defaultMessage: '操作' }),
        valueType: 'option',
        width: 100,
        fixed: 'right',
        hideInTable: true,
        render: (_, record) => {
          return !record.status ? (
            <ClearOutlined className={styles.cleanUp} onClick={() => onCleanClick(record)} />
          ) : (
            ''
          );
        },
      },
    ];
  }, [
    formParam,
    requestStation,
    isStationChild,
    stationOptions,
    type,
    onSiteClick,
    onDetailClick,
    onCleanClick,
  ]);

  const headerTitle = useMemo(() => {
    const nums: React.ReactNode[] = [];
    levelMap.forEach((_, key) => {
      nums.push(getLevelByType(key, alarmNumData?.[key + 'Num'] || 0));
    });
    return (
      <>
        <div className="my6">
          <span>
            {formatMessage({ id: 'alarmManage.alarmLevel', defaultMessage: '告警级别' })}：
          </span>
          <Checkbox.Group
            className="mr24"
            onChange={(value) => onHeadChange(value, 'levels')}
            defaultValue={Array.from(levelMap.keys())}
          >
            <Space>{nums}</Space>
          </Checkbox.Group>
        </div>
        {type == PageTypeEnum.History && (
          <>
            <div className="mr12 my6">
              <span>
                {formatMessage({ id: 'alarmManage.clearType', defaultMessage: '消除类型' })}：
              </span>
              <Checkbox.Group
                options={cleanUpOptions}
                defaultValue={cleanUpOptions.map((item) => item.value)}
                onChange={(value) => onHeadChange(value, 'recoverType')}
              />
            </div>
          </>
        )}
        <div className="my6">
          <span>
            {formatMessage({ id: 'alarmManage.reportSource', defaultMessage: '告警来源' })}：
          </span>
          <Checkbox.Group
            options={alarmSourceOptions}
            defaultValue={['0']}
            onChange={(value) => onHeadChange(value, 'fromResources')}
          />
        </div>
      </>
    );
  }, [alarmNumData, type]);

  /**
   * 删除节点
   *
   * @param selectedRows
   */
  const handleRemove = async (selectedRows: AlarmType[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
      const resp = await removeMenu(selectedRows.map((row) => row.menuId).join(','));
      hide();
      if (resp.code === 200) {
        message.success('删除成功，即将刷新');
      } else {
        message.error(resp.msg);
      }
      return true;
    } catch (error) {
      hide();
      message.error('删除失败，请重试');
      return false;
    }
  };

  return (
    <>
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
        <YTProTable<AlarmType, AlarmType>
          className={styles.table}
          headerTitle={headerTitle}
          actionRef={actionRef}
          formRef={formRef}
          columns={columns}
          request={requestList}
          rowSelection={
            isBatchDelete
              ? {
                  onChange: (_, selectedRows) => {
                    setSelectedRows(selectedRows);
                  },
                }
              : false
          }
          toolBarRenderOptions={{
            add: {
              show: false,
            },
            export: {
              show: true,
              requestExport: requestExport,
              getExportName: getExportName,
            },
            ...(isBatchDelete
              ? {
                  prepend: (
                    <Button
                      type="primary"
                      key="remove"
                      hidden={selectedRowsState?.length === 0}
                      onClick={async () => {
                        const success = await handleRemove(selectedRowsState);
                        if (success) {
                          setSelectedRows([]);
                          actionRef.current?.reloadAndRest?.();
                        }
                      }}
                    >
                      <DeleteOutlined />
                      <FormattedMessage
                        id="pages.searchTable.batchDeletion"
                        defaultMessage="批量删除"
                      />
                    </Button>
                  ),
                }
              : {}),
          }}
          onSubmit={() => (formParamRef.current = {})}
          search={{
            ...(isStationChild
              ? {}
              : {
                  labelWidth: 'auto',
                }),
          }}
          form={
            isStationChild
              ? {}
              : {
                  labelAlign: 'left',
                }
          }
          scroll={
            isStationChild
              ? {
                  y: 490,
                }
              : {}
          }
        />
        <DetailDialog
          width={ModelSizeEnum.TwoCol}
          title={formatMessage({ id: 'alarmManage.alarmDetails', defaultMessage: '告警详情' })}
          open={open}
          onCancel={switchOpen}
          detailProps={{
            data: detailData,
            items: detailItems,
            column: 1,
            labelStyle: { width: '80px' },
          }}
        />
      </ProConfigProvider>
    </>
  );
};

export default Alarm;
