import React from 'react';
import EnergyDialog from '@/components/ScreenDialog/EnergyDialog';
import PvInverter from '@/components/ScreenDialog/PvInverter';
import HwCharge from '@/components/ScreenDialog/HwCharge';
import YtCharge from '@/components/ScreenDialog/YtCharge';
import Cabinet from '@/components/ScreenDialog/Cabinet';
import PvInverterCabinet from '@/components/ScreenDialog/PvInverterCabinet';
import EnergyCabinet from '@/components/ScreenDialog/EnergyCabinet';
import BoxSubstation from '@/components/ScreenDialog/BoxSubstation';
import HwChargeChild from '@/components/ScreenDialog/HwChargeChild';
import HwChargeYt from '@/components/ScreenDialog/HwChargeYt';
import { assign } from 'lodash';
import Device from '@/components/ScreenDialog/Device';

type Props = {
  deviceId?: number;
  deviceType?: DeviceType;
  onCancel?: () => void;
  loopNum?: number;
  open: boolean;
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
  chargingHost: false,
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
  CHARGING_HOST,
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
  [DeviceType.CHARGING_HOST]: 'chargingHost',
};

const DeviceDialog: React.FC<Props> = (props) => {
  const status = { ...DEFAULT_STATUS };

  const close = () => {
    props?.onCancel?.();
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
      <PvInverter open={props.open && status.pvInverter} {...restProps} />
      <HwCharge open={props.open && status.hwChargingStack} {...restProps} />
      <HwChargeChild open={props.open && status.hwChargingTerminal} {...restProps} />
      <HwChargeYt open={props.open && status.ytChargingTerminal} {...restProps} />
      <YtCharge open={props.open && status.dcPile} {...restProps} />
      <Cabinet open={props.open && status.powerExchangeBox} {...restProps} />
      <PvInverterCabinet open={props.open && status.pvCabinet} {...restProps} />
      <EnergyCabinet open={props.open && status.energyCabinet} {...restProps} />
      <BoxSubstation open={props.open && status.boxTypeSubstation} {...restProps} />
      <Device open={props.open && status.chargingHost} {...restProps} />
      <EnergyDialog open={props.open && status.energyStorageBox} {...restProps} />
    </>
  );
};

export default DeviceDialog;
