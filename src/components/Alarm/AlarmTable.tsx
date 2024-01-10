/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:21:56
 * @LastEditTime: 2023-12-27 16:04:01
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Alarm\AlarmTable.tsx
 */
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Modal, message, Space, Checkbox } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { useRequest, useHistory, FormattedMessage } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import type { AlarmType, TableSearchType } from './data';
import { alarmSource, alarmStatus } from '@/utils/dictionary';
import { alarmClearStatus, cleanUpType } from '@/utils/dict';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { getList, getDetail, cleanUpAlarm, getAlarmNum, exportList } from './service';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import { getStations } from '@/services/station';
import { debounce } from 'lodash';
import type { OptionType } from '@/types';
import { YTAlarmFullOutlined } from '@/components/YTIcons';
import styles from './index.less';
import { formatMessage, isEmpty } from '@/utils';
import eventBus from '@/utils/eventBus';

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

const alarmStatusOptions: OptionType[] = [
  {
    label: formatMessage({ id: 'dataManage.generate', defaultMessage: '告警中' }),
    value: 0,
  },
  {
    label: formatMessage({ id: 'dataManage.eliminate', defaultMessage: '已消除' }),
    value: 1,
  },
];

const Alarm: React.FC<AlarmProps> = (props) => {
  const { isStationChild, type = PageTypeEnum.Current, params, formParam } = props;

  const [headParams, setHeadParams] = useState<Record<string, string[]>>({});
  const formRef = useRef<ProFormInstance>();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [stationOptions, setStationOptions] = useState<OptionType[]>();
  const actionRef = useRef<ActionType>();
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
        ...(params || {}),
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
    debounce((searchText) => {
      getStations({ name: searchText }).then(({ data }) => {
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

  const onHeadChange = useCallback((value: string[], field) => {
    setHeadParams((prevData) => {
      if (field === 'levels') {
        return { ...prevData, [field]: value };
      } else {
        return { ...prevData, [field]: value.length == 1 ? value[0] : '' };
      }
    });
    //actionRef?.current?.reload?.();
    actionRef?.current?.reloadAndRest?.(); //回到第一页
  }, []);

  const requestExport = useCallback(
    (searchParams: TableSearchType) => {
      const date = searchParams?.alarmTime || [];
      return exportList({
        ...searchParams,
        ...params,
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
        type == PageTypeEnum.Current ? '当前告警' : '历史告警'
      }`;
    },
    [type, params],
  );

  useEffect(() => {
    requestStation('');
  }, []);

  useEffect(() => {
    actionRef?.current?.reloadAndRest?.();
  }, [params]);

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
      label: formatMessage({ id: 'alarmManage.alarm', defaultMessage: '告警' }) + 'ID',
      field: 'id',
    },
    {
      label: formatMessage({ id: 'alarmManage.occurrenceTime', defaultMessage: '发生时间' }),
      field: 'alarmTime',
    },
    {
      label: formatMessage({ id: 'alarmManage.clearTime', defaultMessage: '清除时间' }),
      field: 'recoveryTime',
      show: (_, data) => data?.status == 1,
    },
    {
      label: formatMessage({ id: 'alarmManage.clearType', defaultMessage: '清除类型' }),
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
              fieldProps: {
                showSearch: true,
                filterOption: false,
                onSearch: requestStation,
                options: stationOptions,
              },
              width: 150,
              ellipsis: true,
              initialValue: formParam?.siteId && formParam?.siteId * 1,
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
        initialValue: formParam?.deviceName,
        hideInSearch: isStationChild,
      },
      {
        title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        initialValue: formParam?.sn,
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
        title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: alarmStatus,
        width: 120,
        ellipsis: true,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.History,
      },
      {
        title: formatMessage({ id: 'alarmManage.reportSource', defaultMessage: '告警上报源' }),
        dataIndex: 'fromResource',
        valueEnum: alarmSource,
        width: 120,
        hideInSearch: true,
      },
      {
        title: formatMessage({ id: 'alarmManage.alarmInformation', defaultMessage: '告警信息' }),
        dataIndex: 'content',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, record) => {
          return <a onClick={() => onDetailClick(_, record)}>{record.content}</a>;
        },
      },
      {
        title: formatMessage({ id: 'alarmManage.alarmCode', defaultMessage: '告警码' }),
        dataIndex: 'id',
        width: 120,
        ellipsis: true,
      },
      {
        title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
        dataIndex: 'alarmTime',
        valueType: 'dateRange',
        width: 150,
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
        title: formatMessage({ id: 'alarmManage.clearType', defaultMessage: '清除类型' }),
        dataIndex: 'recoverType',
        valueType: 'select',
        valueEnum: cleanUpType,
        width: 120,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.Current,
      },
      {
        title: formatMessage({ id: 'alarmManage.clearTime', defaultMessage: '清除时间' }),
        dataIndex: 'recoveryTime',
        width: 150,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.Current,
      },
      {
        title: formatMessage({ id: 'alarmManage.alarmBy', defaultMessage: '清除人' }),
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
        <span>{formatMessage({ id: 'alarmManage.alarmLevel', defaultMessage: '告警级别' })}：</span>
        <Checkbox.Group
          className="mr24"
          onChange={(value) => onHeadChange(value, 'levels')}
          defaultValue={Array.from(levelMap.keys())}
        >
          <Space>{nums}</Space>
        </Checkbox.Group>
        {type == PageTypeEnum.Current ? (
          <>
            <span>
              {formatMessage({ id: 'alarmManage.alarmStatus', defaultMessage: '告警状态' })}：
            </span>
            <Checkbox.Group
              options={alarmStatusOptions}
              defaultValue={alarmStatusOptions.map((item) => item.value)}
              onChange={(value) => onHeadChange(value, 'status')}
            />
          </>
        ) : (
          <>
            <span>
              {formatMessage({ id: 'alarmManage.clearType', defaultMessage: '清除类型' })}：
            </span>
            <Checkbox.Group
              options={cleanUpOptions}
              defaultValue={cleanUpOptions.map((item) => item.value)}
              onChange={(value) => onHeadChange(value, 'recoverType')}
            />
          </>
        )}
      </>
    );
  }, [alarmNumData, type]);

  return (
    <>
      <YTProTable<AlarmType, AlarmType>
        className={styles.table}
        headerTitle={headerTitle}
        actionRef={actionRef}
        formRef={formRef}
        columns={columns}
        request={requestList}
        toolBarRenderOptions={{
          add: {
            show: false,
          },
          export: {
            show: true,
            requestExport: requestExport,
            getExportName: getExportName,
          },
        }}
        search={
          isStationChild
            ? {}
            : {
                labelWidth: 84,
              }
        }
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
        width="600px"
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
    </>
  );
};

export default Alarm;
