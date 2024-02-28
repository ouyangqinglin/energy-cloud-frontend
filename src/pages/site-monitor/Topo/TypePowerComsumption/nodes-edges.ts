import type { Edge, Node } from 'reactflow';
import IconDistributionCabinet from './svg-icon/icon_配电柜.svg';
import IconLoadCS from './svg-icon/icon_负载_充电桩.svg';
import IconLoadOther from './svg-icon/icon_负载.svg';
import IconChargingStackHW from './svg-icon/icon_华为充电堆.svg';
import IconChargingStack from './svg-icon/icon_永泰充电堆.svg';
import IconSuperChargingTerminalHW from './svg-icon/icon_华为超充终端.svg';
import IconChargingTerminalHW from './svg-icon/icon_华为充电终端.svg';
import IconChargingTerminal from './svg-icon/icon_永泰充电终端.svg';
import IconChargingStationDC from './svg-icon/icon_120kW直流充电桩.svg';
import IconChargingStationAC from './svg-icon/iocn_交流充电桩.svg';
import type { ExtraNodeData, GraphNode } from '../type';
import { deviceType } from './type';
import type { TypePowerConsumptionData } from './type';
import { isEmpty, uniqueId } from 'lodash';
import { buildEdges, flattenTree } from '../helper';
import { formatMessage } from '@/utils';

const position = { x: 0, y: 0 };

const getDefaultConfig = ({
  title,
  imageContent,
  direction = 'horizontal',
  width = 120,
  height = 82,
  data,
  layout = 'start',
  toCenter = false,
}: {
  width?: number;
  height?: number;
  title: string;
  imageContent: {
    width: number;
    icon: string;
    height: number;
  };
  direction?: string;
  layout?: ExtraNodeData['layout'];
  data: TypePowerConsumptionData;
  toCenter?: boolean;
}): GraphNode => ({
  id: uniqueId(),
  type: 'imageNode',
  data: {
    label: '',
    width: width,
    height: height,
    imageContent,
    title: data.name ?? title,
    textContent: {
      column: [
        {
          label: `${formatMessage({
            id: 'device.todayElectricityConsumption',
            defaultMessage: '今日用电',
          })}(kWh)`,
          value: data.elecToday,
        },
        {
          label: `${formatMessage({
            id: 'screen.powerConsumption',
            defaultMessage: '用电功率',
          })}(kW)：`,
          value: data.power,
        },
      ],
      direction: direction,
    },
    layout,
    toCenter,
  },
  position,
});

const getNodeByType = (type: deviceType, data: TypePowerConsumptionData) => {
  switch (type) {
    case deviceType.DistributionCabinet:
      return getDefaultConfig({
        title: formatMessage({ id: 'siteMonitor.TotalElectricity', defaultMessage: '用电总计' }),
        imageContent: {
          icon: IconDistributionCabinet,
          width: 77,
          height: 90,
        },
        data,
        toCenter: true,
      });
    case deviceType.LoadCS:
      return getDefaultConfig({
        title: formatMessage({ id: 'siteMonitor.TotalEVCharger', defaultMessage: '充电桩总计' }),
        imageContent: {
          icon: IconLoadCS,
          width: 80,
          height: 80,
        },
        data,
        toCenter: true,
      });
    case deviceType.ChargingStackHW:
      return getDefaultConfig({
        title: formatMessage({
          id: 'siteMonitor.yotai360kWChargerStack',
          defaultMessage: '华为600kW充电堆',
        }),
        imageContent: {
          icon: IconChargingStackHW,
          width: 80,
          height: 80,
        },
        height: 160,
        direction: 'vertical',
        data,
      });
    case deviceType.ChargingStack:
      return getDefaultConfig({
        title: formatMessage({
          id: 'siteMonitor.yotai360kWChargerStack',
          defaultMessage: '永泰360kW充电堆',
        }),
        imageContent: {
          icon: IconChargingStack,
          width: 80,
          height: 80,
        },
        height: 160,
        // layout: 'start',
        direction: 'vertical',
        data,
      });
    case deviceType.SuperChargingTerminalHW:
      return getDefaultConfig({
        title: formatMessage({
          id: 'siteMonitor.HuaweiOverchargeTerminal',
          defaultMessage: '华为超充终端',
        }),
        imageContent: {
          icon: IconSuperChargingTerminalHW,
          width: 31,
          height: 70,
        },
        direction: 'vertical',
        data,
      });
    case deviceType.ChargingTerminalHW:
      return getDefaultConfig({
        title: formatMessage({
          id: 'siteMonitor.HuaweiChargeTerminal',
          defaultMessage: '华为充电终端',
        }),
        imageContent: {
          icon: IconChargingTerminalHW,
          width: 20,
          height: 70,
        },
        direction: 'vertical',
        data,
      });
    case deviceType.ChargingTerminal:
      return getDefaultConfig({
        title: formatMessage({
          id: 'siteMonitor.yotaiChargeTerminal',
          defaultMessage: '永泰充电终端',
        }),
        imageContent: {
          icon: IconChargingTerminal,
          width: 38,
          height: 70,
        },
        direction: 'vertical',
        data,
      });
    case deviceType.ChargingStationDC160:
    case deviceType.ChargingStationDC120:
      return getDefaultConfig({
        title: formatMessage({
          id: 'siteMonitor.120kWDCEVCharger',
          defaultMessage: '120kW直流充电桩',
        }),
        imageContent: {
          icon: IconChargingStationDC,
          width: 42,
          height: 80,
        },
        height: 160,
        direction: 'vertical',
        data,
      });
    case deviceType.ChargingStationAC:
      return getDefaultConfig({
        title: formatMessage({ id: 'siteMonitor.7kWACEVCharger', defaultMessage: '7kW交流充电桩' }),
        imageContent: {
          icon: IconChargingStationAC,
          width: 42,
          height: 80,
        },
        height: 160,
        direction: 'vertical',
        data,
      });
    default:
      break;
  }
};

const buildTreeByData = (data: TypePowerConsumptionData, nodes: GraphNode[] = []) => {
  if (data) {
    const node = getNodeByType(data.type, data) as GraphNode;

    if (data.children && node) {
      (node as GraphNode).children = [];
      data.children.forEach((d) => {
        buildTreeByData(d, node?.children);
      });
    }

    if (node) {
      nodes.push(node);
    }
  }
  return nodes;
};

export const getNodesAndEdges = (data: TypePowerConsumptionData) => {
  if (isEmpty(data)) {
    return {
      initialNodes: [],
      initialEdges: [],
    };
  }
  const initialNodes = buildTreeByData(data);
  const initialEdges = buildEdges(initialNodes) as Edge[];
  return {
    initialNodes: flattenTree(initialNodes),
    initialEdges,
  };
};
