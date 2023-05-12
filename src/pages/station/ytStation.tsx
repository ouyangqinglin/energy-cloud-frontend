/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 15:48:18
 * @LastEditTime: 2023-05-12 11:28:17
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\YtStation.tsx
 */

import React, { useEffect, useState } from 'react';
import { Button } from 'antd';
import EnergyDialog from '@/pages/screen/components/EnergyDialog';
import Weather from '@/pages/screen/components/Weather';
import PvInverter from '@/pages/screen/components/PvInverter';
import HwCharge from '@/pages/screen/components/HwCharge';
import YtCharge from '@/pages/screen/components/YtCharge';
import Gateway from '@/pages/screen/components/YtCharge';
import ElectricTerminal from '@/pages/screen/components/ElectricTerminal';
import ElectricMeter from '@/pages/screen/components/ElectricMeter';
import Cabinet from '@/pages/screen/components/Cabinet';

const YtStation: React.FC = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [energyOpen, setEnergyOpen] = useState(false);
  const [chargeId, setChargeId] = useState('10001');
  const [pvOpen, setPvOpen] = useState(false);
  const [pvOpen2, setPvOpen2] = useState(false);
  const [hwChargeOpen, setHwChargeOpen] = useState(false);
  const [ytChargeOpen, setYtChargeOpen] = useState(false);
  const [gatewayOpen, setGatewayOpen] = useState(false);
  const [electricOpen, setElectricOpen] = useState(false);
  const [electricMeterOpen, setElectricMeterOpen] = useState(false);
  const [cabinet, setCabinet] = useState(false);

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
      <EnergyDialog id={chargeId} open={isOpen} onCancel={closeModal} model="screen" />
      <EnergyDialog id={chargeId} open={energyOpen} onCancel={switchEnergyModal} />
      <PvInverter
        id={chargeId}
        open={pvOpen}
        onCancel={switchPvModal}
        model="screen"
        loopNum={11}
      />
      <PvInverter
        id={chargeId}
        open={pvOpen2}
        onCancel={switchPv2Modal}
        model="screen"
        loopNum={4}
      />
      <HwCharge id={chargeId} open={hwChargeOpen} onCancel={switchHwChargeModal} model="screen" />
      <YtCharge id={chargeId} open={ytChargeOpen} onCancel={switchYtChargeModal} model="screen" />
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
      <Cabinet id={chargeId} open={cabinet} onCancel={switchCabinetModal} model="screen" />
      <Weather code={'1'} />
    </div>
  );
};

export default YtStation;
