/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-13 21:46:44
 * @LastEditTime: 2024-01-10 11:52:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceInfo\Overview.tsx
 */
import React, { ChangeEvent, useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Image, Input, InputProps, Skeleton, message } from 'antd';
import { EditOutlined, LoadingOutlined } from '@ant-design/icons';
import { useBoolean, useToggle } from 'ahooks';
import { useRequest } from 'umi';
import { DeviceDataType, editDeviceInfo } from '@/services/equipment';
import Detail from '../Detail';
import styles from './index.less';
import Dialog from '@/components/Dialog';
import IconEmpty from '@/assets/image/device/empty.png';
import DeviceImg from './DeviceImg';
import DeviceNameDialog from './DeviceNameDialog';
import { formatMessage, isEmpty } from '@/utils';
import { DeviceMasterMode } from '@/utils/dictionary';
import { topItems, bottomItems, getDetailItems } from './helper';
import { useSubscribe } from '@/hooks';

export type OverviewProps = {
  deviceData?: DeviceDataType;
  deviceTreeData?: DeviceDataType[];
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
  const { deviceData, deviceTreeData, loading = false, onChange, introImg, className = '' } = props;

  const [openIntro, { setFalse, setTrue }] = useBoolean(false);
  const [openImg, { set: setOpenImg }] = useBoolean(false);
  const [deviceNameInfo, setDeviceNameInfo] = useState<DeviceNameInfoType>({
    name: '',
    showEdit: false,
    status: '',
    masterSlaveMode: '',
    masterSlaveSystemName: '',
  });
  const realTimeData = useSubscribe(deviceData?.deviceId, true);

  const [editNameOpen, { set: setEditNameOpen }] = useToggle<boolean>(false);
  const [emsNameValues, setEmsNameValues] = useState({});
  const { run, loading: editNameloading } = useRequest(editDeviceInfo, {
    manual: true,
  });

  const middleItems = useMemo(() => {
    return getDetailItems(deviceData);
  }, [deviceData?.productId, deviceData?.productTypeId]);

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
          {!isEmpty(deviceData?.masterSlaveMode) &&
            `(${
              deviceData?.masterSlaveMode === DeviceMasterMode.Master
                ? formatMessage({ id: 'device.host', defaultMessage: '主机' })
                : formatMessage({ id: 'device.slave', defaultMessage: '从机' })
            })`}
          {deviceNameInfo?.name}
          <EditOutlined className="ml8 cl-primary" onClick={onEditNameClick} />
        </>
      );
    }
  }, [deviceNameInfo, editNameloading, deviceData]);

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
          <Detail
            items={[...topItems, ...middleItems, ...bottomItems]}
            data={{ ...deviceData, deviceTreeData, ...realTimeData }}
            column={4}
          />
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
