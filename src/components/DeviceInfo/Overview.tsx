/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:46:44
 * @LastEditTime: 2023-09-11 17:48:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\Overview.tsx
 */
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Image, Input, InputProps, Skeleton, message } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useBoolean } from 'ahooks';
import { useRequest } from 'umi';
import { editDeviceInfo, getDeviceInfo } from '@/services/equipment';
import Detail from '../Detail';
import type { DetailItem } from '../Detail';
import { OnlineStatusEnum } from '@/utils/dictionary';
import styles from './index.less';
import Dialog from '@/components/Dialog';
import { deviceAlarmStatusFormat, onlineStatusFormat } from '@/utils/format';
import IconEmpty from '@/assets/image/device/empty.png';
import DeviceImg from './DeviceImg';

export type OverviewProps = {
  deviceId: string;
  introImg?: string;
  setLoading?: (loading: boolean) => void;
  onChange?: (value: Record<string, any>) => void;
  className?: string;
};

type DeviceNameInfoType = {
  name?: string;
  showEdit?: boolean;
  status?: InputProps['status'];
};

const Overview: React.FC<OverviewProps> = (props) => {
  const { deviceId, setLoading, onChange, introImg, className = '' } = props;

  const [openIntro, { setFalse, setTrue }] = useBoolean(false);
  const [openImg, { set: setOpenImg }] = useBoolean(false);
  const [deviceNameInfo, setDeviceNameInfo] = useState<DeviceNameInfoType>({
    name: '',
    showEdit: false,
    status: '',
  });
  const {
    loading: getLoading,
    data: deviceData,
    run: runGetDevice,
  } = useRequest(getDeviceInfo, {
    manual: true,
    onSuccess: (data: any) => {
      onChange?.(data);
    },
  });
  const { run, loading: editNameloading } = useRequest(editDeviceInfo, {
    manual: true,
  });

  const onEditNameClick = useCallback(() => {
    setDeviceNameInfo((prevData) => ({ ...prevData, showEdit: true }));
  }, []);

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
            message.success('保存成功');
            setDeviceNameInfo((prevData) => ({ ...prevData, showEdit: false }));
            runGetDevice({ deviceId: deviceData?.deviceId });
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
    message.success('保存成功');
    runGetDevice({ deviceId: deviceId });
  }, []);

  useEffect(() => {
    setDeviceNameInfo({
      name: deviceData?.name,
      showEdit: false,
      status: '',
    });
  }, [deviceData]);

  useEffect(() => {
    setLoading?.(true);
    runGetDevice({ deviceId: deviceId }).finally(() => {
      setLoading?.(false);
    });
  }, [deviceId, onChange]);

  const equipInfoItems = useMemo<DetailItem[]>(() => {
    return [
      {
        label: '通信',
        field: 'status',
        format: onlineStatusFormat,
      },
      {
        label: '告警',
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
        label: '最近离线时间',
        field: 'offlineTime',
        show: deviceData?.status === OnlineStatusEnum.Offline,
      },
      {
        label: '最近在线时间',
        field: 'sessionStartTime',
        show: deviceData?.status !== OnlineStatusEnum.Offline,
      },
      { label: '设备序列号', field: 'sn' },
      { label: '产品型号', field: 'model' },
      { label: '产品类型', field: 'productTypeName' },
      { label: '软件包名称', field: 'b' },
      { label: '软件版本号', field: 'a' },
      { label: '激活时间', field: 'activeTime' },
      { label: '录入时间', field: 'createTime' },
      { label: '录入人', field: 'updateUserName' },
      { label: '所属站点', field: 'siteName' },
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
      {getLoading ? (
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
                产品介绍
              </Button>
            )}
          </Detail.Label>
          <Detail items={equipInfoItems} data={deviceData} column={4} />
        </div>
      )}
      <Dialog title="产品介绍" open={openIntro} onCancel={setFalse} footer={null}>
        <img className="w-full" src={introImg} />
      </Dialog>
      <DeviceImg
        open={openImg}
        onOpenChange={setOpenImg}
        deviceData={deviceData}
        onSuccess={onEditImgSuccess}
      />
    </>
  );
};

export default Overview;
