/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-25 10:21:56
 * @LastEditTime: 2023-07-27 09:46:05
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Alarm\AlarmTable.tsx
 */
import React, { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { Modal, message, Space } from 'antd';
import { ClearOutlined } from '@ant-design/icons';
import { useRequest, useHistory } from 'umi';
import type { ProColumns, ProTableProps, ActionType } from '@ant-design/pro-table';
import { ProFormInstance } from '@ant-design/pro-components';
import type { AlarmType } from './data';
import { cleanUpType } from '@/utils/dictionary';
import YTProTable from '@/components/YTProTable';
import type { YTProTableCustomProps } from '@/components/YTProTable/typing';
import { getList, getDetail, cleanUpAlarm, getAlarmNum } from './service';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
import { getStations } from '@/services/station';
import { debounce } from 'lodash';
import type { OptionType } from '@/utils/dictionary';
import { useSearchSelect } from '@/hooks';
import { SearchParams } from '@/hooks/useSearchSelect';
import { getProductTypeList } from '@/services/equipment';
import { YTAlarmOutlined } from '@/components/YTIcons';
import styles from './index.less';

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

export const alarmLevelMap = new Map([
  [
    'error',
    <span className={`${styles.alarmWrap} ${styles.error}`}>{<YTAlarmOutlined />}严重</span>,
  ],
  [
    'alarm',
    <span className={`${styles.alarmWrap} ${styles.alarm}`}>{<YTAlarmOutlined />}重要</span>,
  ],
  ['warn', <span className={`${styles.alarmWrap} ${styles.warn}`}>{<YTAlarmOutlined />}次要</span>],
  ['info', <span className={`${styles.alarmWrap} ${styles.info}`}>{<YTAlarmOutlined />}提示</span>],
]);

const Alarm: React.FC<AlarmProps> = (props) => {
  const { isStationChild, type = PageTypeEnum.Current, params, formParam } = props;

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

  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);

  const requestProductType = useCallback((searchParams: SearchParams) => {
    return getProductTypeList(searchParams).then(({ data }) => {
      return data?.map?.((item) => {
        return {
          label: item?.name || '',
          value: item?.id || '',
        };
      });
    });
  }, []);

  const [productTypeColumn] = useSearchSelect<AlarmType>({
    proColumns: {
      title: '产品类型',
      dataIndex: 'productTypeName',
      width: 150,
      ellipsis: true,
      formItemProps: {
        name: 'productTypeId',
      },
    },
    request: requestProductType,
  });

  const requestList: YTProTableCustomProps<AlarmType, AlarmType>['request'] = (paramsData) => {
    const requestParams = { ...paramsData, ...(params || {}), status: type };
    runGetAlarmNum(requestParams);
    return getList(requestParams);
  };

  const requestCleanUpAlarm = useCallback((paramsData) => {
    return cleanUpAlarm(paramsData);
  }, []);

  const onSiteClick = useCallback((record: AlarmType) => {
    history.push({
      pathname: '/station-manage/operation-monitor',
      search: `?id=${record.siteId}`,
    });
  }, []);

  const onDetailClick = useCallback((_, record) => {
    switchOpen();
    run(record.id);
  }, []);

  const onCleanClick = useCallback((record: AlarmType) => {
    Modal.confirm({
      title: <strong>清除确认</strong>,
      content: '产生告警的故障可能尚未清除，是否强制清除选中的告警？',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        return requestCleanUpAlarm({ id: record.id }).then(({ data }) => {
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

  useEffect(() => {
    requestStation('');
  }, []);

  const detailItems: DetailItem[] = [
    { label: '告警名称', field: 'name' },
    { label: '站点名称', field: 'siteName' },
    { label: '设备名称', field: 'deviceName' },
    { label: '产品类型', field: 'productTypeName' },
    { label: '告警等级', field: 'level', format: (value) => alarmLevelMap.get(value) },
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
      {
        title: '告警级别',
        dataIndex: 'level',
        valueType: 'select',
        valueEnum: alarmLevelMap,
        width: 120,
        hideInSearch: true,
      },
      ...(isStationChild
        ? []
        : [
            {
              title: '站点名称',
              dataIndex: 'siteName',
              valueType: 'select',
              render: (_, record) => {
                return <a onClick={() => onSiteClick(record)}>{record.siteName}</a>;
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
            } as ProColumns<AlarmType>,
          ]),
      productTypeColumn,
      {
        title: '设备名称',
        dataIndex: 'deviceName',
        width: 150,
        ellipsis: true,
        initialValue: formParam?.deviceName,
      },
      {
        title: '告警ID',
        dataIndex: 'id',
        width: 120,
        ellipsis: true,
      },
      {
        title: '告警内容',
        dataIndex: 'content',
        width: 150,
        ellipsis: true,
        hideInSearch: true,
        render: (_, record) => {
          return <a onClick={() => onDetailClick(_, record)}>{record.content}</a>;
        },
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
        title: '发生时间',
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
      },
      {
        title: '操作',
        valueType: 'option',
        width: 100,
        fixed: 'right',
        hideInTable: type == PageTypeEnum.History,
        render: (_, record) => {
          return <ClearOutlined className={styles.cleanUp} onClick={() => onCleanClick(record)} />;
        },
      },
    ];
  }, [
    formParam,
    productTypeColumn,
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
    alarmLevelMap.forEach((text, key) => {
      nums.push(
        <span>
          {text} {alarmNumData?.[key + 'Num'] || 0}
        </span>,
      );
    });
    return <Space size="large">{nums}</Space>;
  }, [alarmNumData]);

  return (
    <>
      <YTProTable<AlarmType, AlarmType>
        headerTitle={headerTitle}
        actionRef={actionRef}
        formRef={formRef}
        columns={columns}
        request={requestList}
        toolBarRender={() => [<></>]}
      />
      <DetailDialog
        width="700px"
        title="告警详情"
        open={open}
        onCancel={switchOpen}
        detailProps={{
          data: detailData,
          items: detailItems,
          column: 2,
          labelStyle: { width: '90px' },
        }}
      />
    </>
  );
};

export default Alarm;
