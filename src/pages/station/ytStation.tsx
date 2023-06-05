/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 15:48:18
 * @LastEditTime: 2023-06-05 13:46:15
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\ytStation.tsx
 */

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import EnergyDialog from '@/components/ScreenDialog/EnergyDialog';
import Weather from '@/pages/screen/components/Weather';
import PvInverter from '@/components/ScreenDialog/PvInverter';
import HwCharge from '@/components/ScreenDialog/HwCharge';
import YtCharge from '@/components/ScreenDialog/YtCharge';
import Gateway from '@/components/ScreenDialog/Gateway';
import ElectricTerminal from '@/components/ScreenDialog/ElectricTerminal';
import ElectricMeter from '@/components/ScreenDialog/ElectricMeter';
import Cabinet from '@/components/ScreenDialog/Cabinet';
import PvInverterCabinet from '@/components/ScreenDialog/PvInverterCabinet';
import EnergyCabinet from '@/components/ScreenDialog/EnergyCabinet';
import BoxSubstation from '@/components/ScreenDialog/BoxSubstation';
import HwChargeChild from '@/components/ScreenDialog/HwChargeChild';
import HwChargeYt from '@/components/ScreenDialog/HwChargeYt';
import Position from '@/components/ScreenDialog/Position';

const YtStation: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [energyOpen, setEnergyOpen] = useState(false);
  const [chargeId, setChargeId] = useState('10001');
  const [pvOpen, setPvOpen] = useState(false);
  const [pvOpen2, setPvOpen2] = useState(false);
  const [hwChargeOpen, setHwChargeOpen] = useState(false);
  const [hwChargeChildOpen, setHwChargeChildOpen] = useState(false);
  const [hwChargeYtOpen, setHwChargeYtOpen] = useState(false);
  const [ytChargeOpen, setYtChargeOpen] = useState(false);
  const [gatewayOpen, setGatewayOpen] = useState(false);
  const [electricOpen, setElectricOpen] = useState(false);
  const [electricMeterOpen, setElectricMeterOpen] = useState(false);
  const [cabinet, setCabinet] = useState(false);
  const [pvInverterCabinet, setPvInverterCabinet] = useState(false);
  const [energyCabinet, setEnergyCabinet] = useState(false);
  const [boxSubstation, setBoxSubstation] = useState(false);
  const [positionOpen, setPositionOpen] = useState(false);

  const showModal = () => {
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);
  };

  const switchEnergyModal = () => {
    setEnergyOpen(!energyOpen);
  };

  const switchPvModal = () => {
    setPvOpen(!pvOpen);
  };
  const switchPv2Modal = () => {
    setPvOpen2(!pvOpen2);
  };

  const switchHwChargeModal = () => {
    setHwChargeOpen(!hwChargeOpen);
  };

  const switchHwChargeChildModal = () => {
    setHwChargeChildOpen(!hwChargeChildOpen);
  };

  const switchHwChargeYtModal = () => {
    setHwChargeYtOpen(!hwChargeYtOpen);
  };

  const switchYtChargeModal = () => {
    setYtChargeOpen(!ytChargeOpen);
  };

  const switchGatewayModal = () => {
    setGatewayOpen(!gatewayOpen);
  };

  const switchElectricModal = () => {
    setElectricOpen(!electricOpen);
  };

  const switchElectricMeterModal = () => {
    setElectricMeterOpen(!electricMeterOpen);
  };

  const switchCabinetModal = () => {
    setCabinet(!cabinet);
  };

  const switchPvInverterCabinet = () => {
    setPvInverterCabinet(!pvInverterCabinet);
  };

  const switchEnergyCabinet = () => {
    setEnergyCabinet(!energyCabinet);
  };

  const switchBoxSubstation = () => {
    setBoxSubstation(!boxSubstation);
  };

  const switchPosition = () => {
    setPositionOpen(!positionOpen);
  };

  return (
    <div>
      永泰示范站
      <Button onClick={showModal}>储能</Button>
      <Button onClick={switchEnergyModal}>储能1</Button>
      <Button className="ml12" onClick={switchPvModal}>
        光伏逆变器
      </Button>
      <Button className="ml12" onClick={switchPv2Modal}>
        光伏逆变器2
      </Button>
      <Button className="ml12" onClick={switchHwChargeModal}>
        华为充电桩
      </Button>
      <Button className="ml12" onClick={switchHwChargeChildModal}>
        华为充电桩华为分体
      </Button>
      <Button className="ml12" onClick={switchHwChargeYtModal}>
        华为充电桩永泰分体
      </Button>
      <Button className="ml12" onClick={switchYtChargeModal}>
        永泰充电桩
      </Button>
      <Button className="ml12" onClick={switchGatewayModal}>
        网关
      </Button>
      <Button className="ml12" onClick={switchElectricModal}>
        智慧用电终端
      </Button>
      <Button className="ml12" onClick={switchElectricMeterModal}>
        电表
      </Button>
      <Button className="ml12" onClick={switchCabinetModal}>
        换电柜
      </Button>
      <Button className="ml12" onClick={switchPvInverterCabinet}>
        光伏并网柜
      </Button>
      <Button className="ml12" onClick={switchEnergyCabinet}>
        储能并网柜
      </Button>
      <Button className="ml12" onClick={switchBoxSubstation}>
        箱式变电站
      </Button>
      <Button className="ml12" onClick={switchPosition}>
        站点位置
      </Button>
      <EnergyDialog id={'10273'} open={isOpen} onCancel={closeModal} model="screen" />
      <EnergyDialog id={chargeId} open={energyOpen} onCancel={switchEnergyModal} />
      <PvInverter id={'10016'} open={pvOpen} onCancel={switchPvModal} model="screen" loopNum={12} />
      <PvInverter
        id={chargeId}
        open={pvOpen2}
        onCancel={switchPv2Modal}
        model="screen"
        loopNum={4}
      />
      <HwCharge id={chargeId} open={hwChargeOpen} onCancel={switchHwChargeModal} model="screen" />
      <HwChargeChild
        id={chargeId}
        open={hwChargeChildOpen}
        onCancel={switchHwChargeChildModal}
        model="screen"
      />
      <HwChargeYt
        id={chargeId}
        open={hwChargeYtOpen}
        onCancel={switchHwChargeYtModal}
        model="screen"
      />
      <YtCharge id={'10013'} open={ytChargeOpen} onCancel={switchYtChargeModal} model="screen" />
      <Gateway id={chargeId} open={gatewayOpen} onCancel={switchGatewayModal} model="screen" />
      <ElectricTerminal
        id={chargeId}
        open={electricOpen}
        onCancel={switchElectricModal}
        model="screen"
      />
      <ElectricMeter
        id={'10027'}
        open={electricMeterOpen}
        onCancel={switchElectricMeterModal}
        model="screen"
      />
      <Cabinet id={'10067'} open={cabinet} onCancel={switchCabinetModal} model="screen" />
      <PvInverterCabinet
        id={'10027'}
        open={pvInverterCabinet}
        onCancel={switchPvInverterCabinet}
        model="screen"
      />
      <EnergyCabinet
        id={chargeId}
        open={energyCabinet}
        onCancel={switchEnergyCabinet}
        model="screen"
      />
      <Position
        id=""
        open={positionOpen}
        point={{ lng: 114.067836, lat: 22.681899 }}
        onCancel={switchPosition}
        model="screen"
      />
      <BoxSubstation
        id={chargeId}
        open={boxSubstation}
        onCancel={switchBoxSubstation}
        model="screen"
      />
      <Weather id={'1'} />
    </div>
  );
};

export default YtStation;
