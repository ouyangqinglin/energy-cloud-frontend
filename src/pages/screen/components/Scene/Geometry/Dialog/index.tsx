import React from 'react';
import EnergyDialog from '@/pages/screen/components/EnergyDialog';
import PvInverter from '@/pages/screen/components/PvInverter';
import HwCharge from '@/pages/screen/components/HwCharge';
import YtCharge from '@/pages/screen/components/YtCharge';
import Cabinet from '@/pages/screen/components/Cabinet';
import PvInverterCabinet from '@/pages/screen/components/PvInverterCabinet';
import EnergyCabinet from '@/pages/screen/components/EnergyCabinet';
import BoxSubstation from '@/pages/screen/components/BoxSubstation';
import HwChargeChild from '@/pages/screen/components/HwChargeChild';
import HwChargeYt from '@/pages/screen/components/HwChargeYt';
import { assign } from 'lodash';

type Props = {
  deviceId: string | number;
  deviceType: DeviceType | null;
  onCancel: () => void;
  loopNum?: number;
};

const DEFAULT_STATUS = {
  energyStorageBox: false,
  pvInverter: false,
  hwChargingTerminal: false,
  ytChargingTerminal: false,
  hwChargingStack: false,
  dcPile: false,
  powerExchangeBox: false,
  pvCabinet: false,
  energyCabinet: false,
  boxTypeSubstation: false,
};

export const enum DeviceType {
  ENERGY_STORAGE_BOX = 1,
  PV_INVERTER,
  HW_CHARGING_TERMINAL,
  YT_CHARGING_TERMINAL,
  HW_CHARGING_STACK,
  DC_PILE,
  POWER_EXCHANGE_BOX,
  PV_CABINET,
  ENERGY_CABINET,
  BOX_TYPE_SUBSTATION,
}

export const keyToType = {
  [DeviceType.ENERGY_STORAGE_BOX]: 'energyStorageBox',
  [DeviceType.PV_INVERTER]: 'pvInverter',
  [DeviceType.HW_CHARGING_STACK]: 'hwChargingStack',
  [DeviceType.HW_CHARGING_TERMINAL]: 'hwChargingTerminal',
  [DeviceType.YT_CHARGING_TERMINAL]: 'ytChargingTerminal',
  [DeviceType.DC_PILE]: 'dcPile',
  [DeviceType.POWER_EXCHANGE_BOX]: 'powerExchangeBox',
  [DeviceType.PV_CABINET]: 'pvCabinet',
  [DeviceType.ENERGY_CABINET]: 'energyCabinet',
  [DeviceType.BOX_TYPE_SUBSTATION]: 'boxTypeSubstation',
};

const DeviceDialog: React.FC<Props> = (props) => {
  const status = { ...DEFAULT_STATUS };

  const close = () => {
    props?.onCancel();
    assign(status, DEFAULT_STATUS);
  };

  if (props.deviceId && props.deviceType) {
    assign(status, { [keyToType[props.deviceType]]: true });
  }

  const restProps = {
    id: props.deviceId as string,
    model: 'screen',
    onCancel: close,
    loopNum: props.loopNum as number,
  };

  return (
    <>
      <PvInverter open={status.pvInverter} {...restProps} />
      <HwCharge open={status.hwChargingStack} {...restProps} />
      <HwChargeChild open={status.hwChargingTerminal} {...restProps} />
      <HwChargeYt open={status.ytChargingTerminal} {...restProps} />
      <YtCharge open={status.dcPile} {...restProps} />
      <Cabinet open={status.powerExchangeBox} {...restProps} />
      <PvInverterCabinet open={status.pvCabinet} {...restProps} />
      <EnergyCabinet open={status.energyCabinet} {...restProps} />
      <BoxSubstation open={status.boxTypeSubstation} {...restProps} />
      <EnergyDialog open={status.energyStorageBox} {...restProps} />
    </>
  );
};

export default DeviceDialog;
