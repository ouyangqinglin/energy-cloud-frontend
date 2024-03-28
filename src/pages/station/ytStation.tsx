/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-23 15:48:18
 * @LastEditTime: 2023-07-19 16:41:18
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\station\ytStation.tsx
 */

import React, { useEffect, useState, useCallback } from 'react';
import { Button } from 'antd';
import { useBoolean } from 'ahooks';
import type { ProColumns } from '@ant-design/pro-table';
import EnergyDialog from '@/components/ScreenDialog/EnergyDialog';
import Weather from '@/pages/screen/components/Weather';
import PvInverter from '@/components/ScreenDialog/PvInverter';
import HwCharge from '@/components/ScreenDialog/HwCharge';
import YtCharge from '@/components/ScreenDialog/YtCharge';
import Gateway from '@/components/ScreenDialog/Gateway';
import ElectricMeter from '@/components/ScreenDialog/ElectricMeter';
import Cabinet from '@/components/ScreenDialog/Cabinet';
import PvInverterCabinet from '@/components/ScreenDialog/PvInverterCabinet';
import EnergyCabinet from '@/components/ScreenDialog/EnergyCabinet';
import BoxSubstation from '@/components/ScreenDialog/BoxSubstation';
import HwChargeChild from '@/components/ScreenDialog/HwChargeChild';
import HwChargeYt from '@/components/ScreenDialog/HwChargeYt';
import Position from '@/components/ScreenDialog/Position';
import Device from '@/components/ScreenDialog/Device';
import Time from '../screen/components/Time';
import EnergyData from '../screen/Scene/EnergyData';
import RealTimePower from '../screen/Scene/RealTimePower';
import RevenueProportion from '../screen/Scene/RevenueProportion';
import Alarm from '@/components/ScreenDialog/Alarm';
import moment from 'moment';
import { TableTreeModal, SelectTypeEnum } from '@/components/TableSelect';
import { getDeviceTree, getDeviceCollection } from '@/services/equipment';
import type { dealTreeDataType } from '@/components/TableSelect';
import { formatMessage } from '@/utils';

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
  const [alarmOpen, setAlarmOpen] = useState(false);
  const [openTableSelect, { setTrue, setFalse }] = useBoolean(false);
  const [openDevice, { setTrue: setDeviceTrue, setFalse: setDeviceFalse }] = useBoolean(false);

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

  const switchAlarm = () => {
    setAlarmOpen(!alarmOpen);
  };

  const requestTree = useCallback(() => {
    return getDeviceTree({ siteId: 1 });
  }, []);

  const dealTreeData = useCallback<dealTreeDataType>((item) => {
    item.checkable = item.productTypeId == 516;
  }, []);

  const tableSelectColumns: ProColumns[] = [
    {
      title: formatMessage({
        id: 'siteManage.set.dataCollectionPoints',
        defaultMessage: '数据采集点',
      }),
      dataIndex: 'paramName',
      width: 200,
      ellipsis: true,
    },
    {
      title: formatMessage({
        id: 'siteManage.set.dataCollectionPointIdIdentify',
        defaultMessage: '数据采集点标识',
      }),
      dataIndex: 'paramCode',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
  ];

  return (
    <div className="p16" style={{ height: '100%', background: '#04091c', overflow: 'auto' }}>
      永泰示范站
      <div>
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
        <Button className="ml12" onClick={setDeviceTrue}>
          通用设备弹窗
        </Button>
        <Button className="ml12" onClick={switchPosition}>
          站点位置
        </Button>
        <Button className="ml12" onClick={switchAlarm}>
          站点告警列表
        </Button>
        <Button className="ml12" onClick={setTrue}>
          设备绑定
        </Button>
        <EnergyDialog id={'10273'} open={isOpen} onCancel={closeModal} model="screen" />
        <EnergyDialog id={chargeId} open={energyOpen} onCancel={switchEnergyModal} />
        <PvInverter
          id={'10016'}
          open={pvOpen}
          onCancel={switchPvModal}
          model="screen"
          loopNum={12}
        />
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
        <Device id={chargeId} open={openDevice} onCancel={setDeviceFalse} model="screen" />
        <Alarm
          id={'1'} // 站点id
          open={alarmOpen}
          onCancel={switchAlarm}
          model="screen"
        />
        <TableTreeModal
          model="screen"
          multiple={false}
          selectType={SelectTypeEnum.Device}
          title="选择设备"
          open={openTableSelect}
          onCancel={setFalse}
          treeProps={{
            fieldNames: {
              title: 'deviceName',
              key: 'id',
              children: 'children',
            },
            request: requestTree,
          }}
          proTableProps={{
            columns: tableSelectColumns,
            request: getDeviceCollection,
          }}
          valueId="id"
          valueName="deviceName"
          dealTreeData={dealTreeData}
          // value={[]}
          // onChange={}
        />
      </div>
      <Weather />
      <Time />
      <div style={{ width: '400px' }}>
        <EnergyData timeType={0} />
        <RealTimePower date={moment()} />
        <RevenueProportion timeType={0} />
      </div>
    </div>
  );
};

export default YtStation;
