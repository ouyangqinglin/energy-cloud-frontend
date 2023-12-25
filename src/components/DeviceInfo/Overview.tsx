/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:46:44
 * @LastEditTime: 2023-12-18 14:36:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\Overview.tsx
 */
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Image, Input, InputProps, Skeleton, message } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useBoolean, useToggle } from 'ahooks';
import { useRequest } from 'umi';
import { DeviceDataType, editDeviceInfo, getDeviceInfo } from '@/services/equipment';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import { OnlineStatusEnum } from '@/utils/dict';
import styles from './index.less';
import Dialog from '@/components/Dialog';
import { deviceAlarmStatusFormat, onlineStatusFormat } from '@/utils/format';
import IconEmpty from '@/assets/image/device/empty.png';
import DeviceImg from './DeviceImg';
import DeviceNameDialog from './DeviceNameDialog';
import { useSubscribe } from '@/hooks';
import { MessageEventType } from '@/utils/connection';
import { formatMessage } from '@/utils';

export type OverviewProps = {
  deviceData?: DeviceDataType;
  introImg?: string;
  loading?: boolean;
  onChange?: () => void;
  className?: string;
};

type DeviceNameInfoType = {
  name?: string;
  showEdit?: boolean;
  status?: InputProps['status'];
  masterSlaveMode: any; //判断是否为自研EMS
  masterSlaveSystemName: any;
};

const Overview: React.FC<OverviewProps> = (props) => {
  const { deviceData, loading = false, onChange, introImg, className = '' } = props;

  const [openIntro, { setFalse, setTrue }] = useBoolean(false);
  const [openImg, { set: setOpenImg }] = useBoolean(false);
  const realtimeNetwork = useSubscribe(
    deviceData?.deviceId ?? '',
    true,
    MessageEventType.NETWORKSTSTUS,
  );
  const [deviceNameInfo, setDeviceNameInfo] = useState<DeviceNameInfoType>({
    name: '',
    showEdit: false,
    status: '',
    masterSlaveMode: '',
    masterSlaveSystemName: '',
  });

  const [editNameOpen, { set: setEditNameOpen }] = useToggle<boolean>(false);
  const [emsNameValues, setEmsNameValues] = useState({});
  const { run, loading: editNameloading } = useRequest(editDeviceInfo, {
    manual: true,
  });

  const onEditNameClick = useCallback(() => {
    setDeviceNameInfo((prevData) => ({ ...prevData, showEdit: true })); //input输入框出现
    if (deviceNameInfo.masterSlaveMode !== '' && deviceNameInfo.masterSlaveMode == 0) {
      //ems修改名字弹窗出现
      setEditNameOpen(true);
      setEmsNameValues(deviceNameInfo);
    }
  }, [deviceNameInfo]);

  const onDeviceNameChange = useCallback((e: ChangeEvent) => {
    setDeviceNameInfo((prevData) => ({
      ...prevData,
      status: '',
      name: (e.target as HTMLInputElement).value.trim(),
    }));
  }, []);

  const editName = useCallback(() => {
    if (deviceNameInfo.name) {
      if (deviceNameInfo.name != deviceData?.name) {
        run({ name: deviceNameInfo.name, deviceId: deviceData?.deviceId }).then((data) => {
          if (data) {
            message.success(
              formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }),
            );
            setDeviceNameInfo((prevData) => ({ ...prevData, showEdit: false }));
            onChange?.();
          }
        });
      } else {
        setDeviceNameInfo((prevData) => ({ ...prevData, showEdit: false }));
      }
    } else {
      setDeviceNameInfo((prevData) => ({ ...prevData, status: 'error' }));
    }
  }, [deviceNameInfo, deviceData]);

  const onVisibleChange = useCallback(() => {
    setOpenImg(true);
  }, []);

  const onEditImgSuccess = useCallback((img) => {
    message.success(formatMessage({ id: 'common.successSaved', defaultMessage: '保存成功' }));
  }, []);

  //更新ems名字
  const onEditEmsNameSuccess = useCallback(() => {
    setDeviceNameInfo((prevData) => ({ ...prevData, showEdit: false }));
    onChange?.();
  }, [deviceData]);

  const beforeSubmitEditName = useCallback(
    (params) => {
      params.id = deviceData?.deviceId;
      params.deviceId = deviceData?.deviceId;
      return params;
    },
    [deviceData],
  );

  useEffect(() => {
    setDeviceNameInfo({
      name: deviceData?.name,
      showEdit: false,
      status: '',
      masterSlaveMode: deviceData?.masterSlaveMode,
      masterSlaveSystemName: deviceData?.masterSlaveSystemName,
    });
  }, [deviceData]);

  const equipInfoItems = useMemo<DetailItem[]>(() => {
    return [
      {
        label: formatMessage({ id: 'siteMonitor.communication', defaultMessage: '通信' }),
        field: 'status',
        format: onlineStatusFormat,
      },
      {
        label: formatMessage({ id: 'common.warning', defaultMessage: '告警' }),
        field: 'alarmStatus',
        format: (value) => {
          return (
            <>
              {deviceAlarmStatusFormat(value)}
              <span className="ml8">{deviceData?.alarmCount}</span>
            </>
          );
        },
      },
      {
        label: formatMessage({
          id: 'siteMonitor.recentOfflineTime',
          defaultMessage: '最近离线时间',
        }),
        field: 'offlineTime',
        show: deviceData?.status === OnlineStatusEnum.Offline,
      },
      {
        label: formatMessage({
          id: 'siteMonitor.recentOnlineTime',
          defaultMessage: '最近在线时间',
        }),
        field: 'sessionStartTime',
        show: deviceData?.status !== OnlineStatusEnum.Offline,
      },
      {
        label: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
        field: 'sn',
      },
      { label: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }), field: 'model' },
      {
        label: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
        field: 'productTypeName',
      },
      {
        label: formatMessage({ id: 'siteMonitor.packageName', defaultMessage: '软件包名称' }),
        field: 'softPackageName',
      },
      {
        label: formatMessage({
          id: 'siteMonitor.softwareVersionNumber',
          defaultMessage: '软件版本号',
        }),
        field: 'softVersion',
      },
      {
        label: formatMessage({ id: 'siteMonitor.activationTime', defaultMessage: '激活时间' }),
        field: 'activeTime',
      },
      {
        label: formatMessage({ id: 'siteMonitor.entryTime', defaultMessage: '录入时间' }),
        field: 'createTime',
      },
      {
        label: formatMessage({ id: 'siteMonitor.enteredBy', defaultMessage: '录入人' }),
        field: 'updateUserName',
      },
      {
        label: formatMessage({ id: 'siteMonitor.owningSite', defaultMessage: '所属站点' }),
        field: 'siteName',
      },
    ];
  }, [deviceData]);

  const title = useMemo(() => {
    if (deviceNameInfo.showEdit) {
      return (
        <Input
          prefix={editNameloading ? <LoadingOutlined className="cl-primary" /> : <></>}
          value={deviceNameInfo?.name}
          onChange={onDeviceNameChange}
          onBlur={editName}
          onPressEnter={editName}
        />
      );
    } else {
      return (
        <>
          {deviceNameInfo?.name}
          <EditOutlined className="ml8 cl-primary" onClick={onEditNameClick} />
        </>
      );
    }
  }, [deviceNameInfo, editNameloading]);

  return (
    <>
      {loading ? (
        <>
          <Skeleton active paragraph={{ rows: 4 }} />
        </>
      ) : (
        <div className={`${styles.overview} ${className}`}>
          <Image
            rootClassName={styles.productImg}
            src={deviceData?.photos || IconEmpty}
            width={135}
            height={135}
            preview={{
              visible: false,
              onVisibleChange: onVisibleChange,
            }}
          />
          <Detail.Label className="mb16" title={title} showLine={false}>
            {introImg && (
              <Button className="pr0" type="link" onClick={setTrue}>
                {formatMessage({
                  id: 'siteMonitor.productIntroduction',
                  defaultMessage: '产品介绍',
                })}
              </Button>
            )}
          </Detail.Label>
          <Detail items={equipInfoItems} data={{ ...deviceData, ...realtimeNetwork }} column={4} />
        </div>
      )}
      <Dialog
        title={formatMessage({ id: 'siteMonitor.productIntroduction', defaultMessage: '产品介绍' })}
        open={openIntro}
        onCancel={setFalse}
        footer={null}
      >
        <img className="w-full" src={introImg} />
      </Dialog>
      <DeviceImg
        open={openImg}
        onOpenChange={setOpenImg}
        deviceData={deviceData}
        onSuccess={onEditImgSuccess}
      />
      {/* 修改设备名字弹窗 */}
      <DeviceNameDialog
        id={deviceData?.id}
        open={editNameOpen}
        onOpenChange={setEditNameOpen}
        onSuccess={onEditEmsNameSuccess}
        initialValues={emsNameValues}
        beforeSubmit={beforeSubmitEditName}
      />
    </>
  );
};

export default Overview;
