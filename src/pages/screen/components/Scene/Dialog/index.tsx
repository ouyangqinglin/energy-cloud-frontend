import React, { useEffect, useState } from 'react';
import EnergyDialog from '@/pages/screen/components/EnergyDialog';
import PvInverter from '@/pages/screen/components/PvInverter';
import HwCharge from '@/pages/screen/components/HwCharge';
import YtCharge from '@/pages/screen/components/YtCharge';
import Gateway from '@/pages/screen/components/YtCharge';
import ElectricTerminal from '@/pages/screen/components/ElectricTerminal';
import ElectricMeter from '@/pages/screen/components/ElectricMeter';
import Cabinet from '@/pages/screen/components/Cabinet';

type Props = {
  activeDeviceId: string;
  deviceType: DeviceType | null;
  resetActiveDeviceId: () => void;
};

const DEFAULT_STATUS = {
  energyDialog: false,
  pvInverter: false,
  hwCharge: false,
  ytCharge: false,
  gateway: false,
  electricTerminal: false,
  electricMeter: false,
  cabinet: false,
};

export const enum DeviceType {
  energyDialog = 1,
  pvInverter,
  hwCharge,
  ytCharge,
  gateway,
  electricTerminal,
  electricMeter,
  cabinet,
}

export const keyToType = {
  [DeviceType.energyDialog]: 'energyDialog',
  [DeviceType.pvInverter]: 'pvInverter',
  [DeviceType.hwCharge]: 'hwCharge',
  [DeviceType.ytCharge]: 'ytCharge',
  [DeviceType.gateway]: 'gateway',
  [DeviceType.electricTerminal]: 'electricTerminal',
  [DeviceType.electricMeter]: 'electricMeter',
  [DeviceType.cabinet]: 'cabinet',
};

const DeviceDialog: React.FC<Props> = (props) => {
  const [status, setStatus] = useState({ ...DEFAULT_STATUS });

  const close = () => {
    props?.resetActiveDeviceId();
    setStatus({ ...DEFAULT_STATUS });
  };

  useEffect(() => {
    if (props.activeDeviceId && props.deviceType) {
      const newStatus = { ...status, ...{ [keyToType[props.deviceType]]: true } };
      setStatus(newStatus);
    }
  }, [props.activeDeviceId, props.deviceType]);

  return (
    <>
      {/* 永泰示范站
      <Button onClick={showModal}>储能</Button>
      <Button className="ml12" onClick={switchPvModal}>
        光伏逆变器
      </Button>
      <Button className="ml12" onClick={switchHwChargeModal}>
        华为充电桩
      </Button>
      <Button className="ml12" onClick={switchYtChargeModal}>
        永泰充电桩
      </Button>
      </Button>
      <Button className="ml12" onClick={switchCabinetModal}>
        换电柜
      </Button>
      <Button className="ml12" onClick={switchElectricModal}>
        智慧用电终端
      </Button>
      <Button className="ml12" onClick={switchElectricMeterModal}>
        电表
      </Button>
      <Button className="ml12" onClick={switchGatewayModal}>
        网关 */}
      {/* <Gateway id={props.activeDeviceId} open={status.gateway} onCancel={close} model="screen" /> */}
      {/* <ElectricTerminal
        id={props.activeDeviceId}
        open={status.electricTerminal}
        onCancel={close}
        model="screen"
      />
      <ElectricMeter
        id={props.activeDeviceId}
        open={status.electricMeter}
        onCancel={close}
        model="screen"
      /> */}
      <EnergyDialog
        id={props.activeDeviceId}
        open={status.energyDialog}
        onCancel={close}
        model="screen"
      />
      <PvInverter
        id={props.activeDeviceId}
        open={status.pvInverter}
        onCancel={close}
        model="screen"
      />
      <HwCharge id={props.activeDeviceId} open={status.hwCharge} onCancel={close} model="screen" />
      <YtCharge id={props.activeDeviceId} open={status.ytCharge} onCancel={close} model="screen" />

      <Cabinet id={props.activeDeviceId} open={status.cabinet} onCancel={close} model="screen" />
    </>
  );
};

export default DeviceDialog;
