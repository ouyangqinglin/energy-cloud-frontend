/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:21:56
 * @LastEditTime: 2023-09-18 10:49:52
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Alarm\AlarmTable.tsx
 */
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Modal, message, Space, Checkbox } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { useRequest, useHistory, FormattedMessage } from 'umi';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { ProFormInstance } from '@ant-design/pro-components';
import type { AlarmType } from './data';
import { alarmClearStatus, cleanUpType } from '@/utils/dictionary';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { getList, getDetail, cleanUpAlarm, getAlarmNum } from './service';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import { getStations } from '@/services/station';
import { debounce } from 'lodash';
import type { OptionType } from '@/utils/dictionary';
import { YTAlarmOutlined } from '@/components/YTIcons';
import styles from './index.less';
import { isEmpty } from '@/utils';
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
  ['error', '严重'],
  ['alarm', '重要'],
  ['warn', '次要'],
  ['info', '提示'],
]);

const getLevelByType = (type: string, num?: string) => {
  return (
    <span className={`${styles.alarmWrap} ${styles[type]}`}>
      {isEmpty(num) ? (
        <>
          <YTAlarmOutlined /> {levelMap.get(type)}
        </>
      ) : (
        <Checkbox className="py2" value={type}>
          <YTAlarmOutlined />
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
    label: '产生',
    value: 0,
  },
  {
    label: '消除',
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
          <FormattedMessage id="upgradeManage.clearConfirm" defaultMessage="清除确认" />
        </strong>
      ),
      content: '产生告警的故障可能尚未清除，是否强制清除选中的告警？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        return requestCleanUpAlarm({ ids: [record.id] }).then(({ data }) => {
          if (data) {
            message.success('保存成功');
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
    actionRef?.current?.reload?.();
  }, []);

  useEffect(() => {
    requestStation('');
  }, []);

  useEffect(() => {
    actionRef?.current?.reloadAndRest?.();
  }, [params]);

  const detailItems: DetailItem[] = [
    { label: '告警名称', field: 'name' },
    { label: '站点名称', field: 'siteName' },
    { label: '设备名称', field: 'deviceName' },
    { label: '产品类型', field: 'productTypeName' },
    { label: '告警等级', field: 'level', format: (value) => getLevelByType(value) },
    { label: '告警ID', field: 'id' },
    { label: '发生时间', field: 'alarmTime' },
    { label: '清除时间', field: 'recoveryTime', show: type === PageTypeEnum.History },
    {
      label: '清除类型',
      field: 'recoverType',
      format: (value) => cleanUpType[value],
      show: type === PageTypeEnum.History,
    },
  ];

  const columns = useMemo<ProColumns<AlarmType>[]>(() => {
    return [
      {
        title: '序号',
        dataIndex: 'index',
        valueType: 'index',
        width: 50,
      },
      ...(isStationChild
        ? []
        : [
            {
              title: '站点名称',
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
        title: '时间',
        dataIndex: 'alarmTime',
        width: 150,
        hideInSearch: true,
      },
      {
        title: '告警级别',
        dataIndex: 'level',
        valueType: 'select',
        valueEnum: alarmLevelMap,
        width: 120,
        hideInSearch: true,
      },
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        width: 150,
        ellipsis: true,
        initialValue: formParam?.deviceName,
        hideInSearch: isStationChild,
      },
      {
        title: '设备序列号',
        dataIndex: 'sn',
        width: 150,
        ellipsis: true,
        initialValue: formParam?.sn,
        hideInSearch: isStationChild,
      },
      {
        title: '站点名称',
        dataIndex: 'siteName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
        hideInTable: isStationChild,
      },
      {
        title: '状态',
        dataIndex: 'status',
        valueType: 'select',
        valueEnum: alarmClearStatus,
        width: 120,
        ellipsis: true,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.History,
      },
      {
        title: '告警信息',
        dataIndex: 'content',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, record) => {
          return <a onClick={() => onDetailClick(_, record)}>{record.content}</a>;
        },
      },
      {
        title: '告警码',
        dataIndex: 'id',
        width: 120,
        ellipsis: true,
      },
      {
        title: '时间',
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
        title: '清除类型',
        dataIndex: 'recoverType',
        valueType: 'select',
        valueEnum: cleanUpType,
        width: 120,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.Current,
      },
      {
        title: '清除时间',
        dataIndex: 'recoveryTime',
        width: 150,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.Current,
      },
      {
        title: '清除人',
        dataIndex: 'recoveryByName',
        width: 120,
        ellipsis: true,
        hideInSearch: true,
        hideInTable: type == PageTypeEnum.Current,
      },
      {
        title: '操作',
        valueType: 'option',
        width: 100,
        fixed: 'right',
        hideInTable: type == PageTypeEnum.History,
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
        <span>告警级别：</span>
        <Checkbox.Group
          className="mr24"
          onChange={(value) => onHeadChange(value, 'levels')}
          defaultValue={Array.from(levelMap.keys())}
        >
          <Space>{nums}</Space>
        </Checkbox.Group>
        {type == PageTypeEnum.Current ? (
          <>
            <span>告警状态：</span>
            <Checkbox.Group
              options={alarmStatusOptions}
              defaultValue={alarmStatusOptions.map((item) => item.value)}
              onChange={(value) => onHeadChange(value, 'status')}
            />
          </>
        ) : (
          <>
            <span>清除类型：</span>
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
        toolBarRender={() => [<></>]}
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
      />
      <DetailDialog
        width="600px"
        title="告警详情"
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
