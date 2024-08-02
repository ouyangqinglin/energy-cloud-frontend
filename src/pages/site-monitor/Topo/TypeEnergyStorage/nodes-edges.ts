import { Edge, Node } from 'reactflow';
import { ExtraNodeData, GraphNode } from '../type';
import IconPCS from './svg-icon/icon_储能pcs.svg';
import IconSubControlBox from './svg-icon/icon_分控箱.svg';
import IconBatteryPack from './svg-icon/icon_batteryPack.svg';
import { isEmpty, uniqueId } from 'lodash';
import { AllTypeData, PcsVo, VoltaicPileVo, WorkStatusMap } from './type';
import { buildEdges, flattenTree } from '../helper';
import { formatMessage } from '@/utils';

const position = { x: 0, y: 0 };

const getRootNode = () => ({
  id: uniqueId(),
  type: 'ACBus',
  position,
  data: {
    //
    label: formatMessage({ id: 'siteMonitor.acBus', defaultMessage: '交流母线' }),
    width: 744,
    height: 42,
  },
});

const genPSC = (data: PcsVo) => ({
  id: uniqueId(),
  type: 'imageNode',
  position,
  data: {
    label: 'pcs',
    width: 744,
    height: 100,
    layout: 'center',
    boxText: {
      width: 136,
      height: 42,
      label:
        data?.pcsName ??
        formatMessage({ id: 'device.energyStorageInverter', defaultMessage: '储能变流器' }) + 'PCS',
    },
    imageContent: {
      width: 100,
      height: 100,
      icon: IconPCS,
    },
    textContent: {
      column: [
        {
          label: `${formatMessage({
            id: 'siteMonitor.runningState',
            defaultMessage: '运行状态',
          })}：`,
          render: () => data?.workStatusName,
          field: 'todayConsumption',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.activePower',
            defaultMessage: '有功功率',
          })}(kW)：`,
          value: data?.p,
          field: 'todayConsumption',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.reactivePower',
            defaultMessage: '无功功率',
          })}(kvar)：`,
          value: data?.q,
          field: 'todayConsumption',
        },
      ],
      direction: 'horizontal',
    },
  },
});

const genBatterySystemBox = (pId: string, childNum = 1) => {
  return {
    id: uniqueId(),
    type: 'BatterySystem',
    position: {
      x: 0,
      y: 160,
    },
    parentNode: pId,
    extent: 'parent',
    data: {
      label: formatMessage({
        id: 'siteMonitor.batterySystem',
        defaultMessage: '电池系统',
      }),
      width: 544 + 300 * childNum,
      // 设置高度会使整个pcs变得很高，这样的结果就是距离母线很远
      height: 650,
    },
  };
};

const genBatteryControlBox = () => ({
  id: uniqueId(),
  type: 'imageNode',
  position: {
    x: 20,
    y: 36,
  },
  zIndex: 1,
  data: {
    label: formatMessage({
      id: 'siteMonitor.ControlBox',
      defaultMessage: '分控箱',
    }),
    width: 180,
    height: 90,
    imageContent: {
      width: 90,
      height: 90,
      icon: IconSubControlBox,
    },
    textContent: {
      boxText: {
        width: 74,
        height: 42,
        label: formatMessage({
          id: 'siteMonitor.ControlBox',
          defaultMessage: '分控箱',
        }),
      },
      direction: 'horizontal',
    },
  },
});

const genBatteryCluster = (data: VoltaicPileVo) => {
  return [
    {
      id: uniqueId(),
      type: 'BatteryCluster',
      position,
      zIndex: 1,
      data: {
        label: 'soc',
        width: 180,
        height: 102,
        imageContent: {
          width: 74,
          height: 101,
        },
        textContent: {
          boxText: {
            width: 146,
            height: 74,
            label: data?.voltaicPileName,
          },
          column: [
            {
              label: `${formatMessage({
                id: 'device.totalVoltage',
                defaultMessage: '总电压',
              })}(V):`,
              value: data?.totalBatteryVoltage,
              field: 'todayConsumption',
            },
            {
              label: `${formatMessage({
                id: 'device.totalCurrent',
                defaultMessage: '总电流',
              })}(A):`,
              value: data?.totalBatteryCurrent,
              field: 'todayConsumption',
            },
            {
              label: 'SOC(%):',
              value: data?.soc,
              field: 'todayConsumption',
            },
          ],
          direction: 'horizontal',
        },
      },
    },
    {
      id: uniqueId(),
      type: 'imageNode',
      position,
      zIndex: 1,
      data: {
        label: formatMessage({
          id: 'siteMonitor.Battery',
          defaultMessage: '电池',
        }),
        width: 180,
        height: 160,
        imageContent: {
          width: 160,
          height: 160,
          icon: IconBatteryPack,
        },
        textContent: {
          column: [
            {
              label: `${formatMessage({
                id: 'siteMonitor.MonomerMaxVoltage',
                defaultMessage: '单体最高电压',
              })}(℃):`,
              value: data?.mvvoasu,
              field: 'todayConsumption',
            },
            {
              label: `${formatMessage({
                id: 'siteMonitor.MonomerMinVoltage',
                defaultMessage: '单体最低电压',
              })}(℃):`,
              value: data?.mvvosu,
              field: 'todayConsumption',
            },
            {
              label: `${formatMessage({
                id: 'siteMonitor.MonomerMaxHeat',
                defaultMessage: '单体最高温度',
              })}(℃):`,
              value: data?.maximumIndividualTemperature,
              field: 'todayConsumption',
            },
            {
              label: `${formatMessage({
                id: 'siteMonitor.MonomerMaxHeat',
                defaultMessage: '单体最低温度',
              })}(℃):`,
              value: data?.lvomt,
              field: 'todayConsumption',
            },
          ],
          direction: 'horizontal',
        },
      },
    },
  ];
};

const convertListToTree = (list: GraphNode[]) => {
  list.forEach((node, index) => {
    const isLastIndex = index === list.length - 1;
    if (isLastIndex) {
      return;
    }
    node.children = [list[index + 1]];
  });
  return list[0];
};

const buildTreeByData = (data: AllTypeData[], nodes: GraphNode[] = []): GraphNode[] => {
  if (isEmpty(data)) {
    return [];
  }
  if (!nodes.length) {
    const node = getRootNode() as GraphNode;
    node.children =
      data?.map?.(({ pcsVo, voltaicPileVos }) => {
        const child = genPSC(pcsVo) as GraphNode;
        const controlBoxNode = genBatteryControlBox() as GraphNode;
        child.children = [controlBoxNode];
        controlBoxNode.children =
          voltaicPileVos?.map?.((voltaicPile) => {
            const listNode = genBatteryCluster(voltaicPile);
            return convertListToTree(listNode);
          }) ?? [];
        child.relation = [
          genBatterySystemBox(child.id, controlBoxNode.children.length) as GraphNode,
        ];
        return child;
      }) ?? [];

    if (node) {
      nodes.push(node);
    }
  }

  return nodes;
};

export const getNodesAndEdges = (data: AllTypeData[]) => {
  if (isEmpty(data)) {
    return {
      immutableNodes: [],
      initialNodes: [],
      initialEdges: [],
    };
  }
  // const immutableNodes = [genOverViewStatistic(data)] as Node<ExtraNodeData>[];
  const initialNodes = buildTreeByData(data);
  const initialEdges = buildEdges(initialNodes) as Edge[];
  return {
    // immutableNodes,
    initialNodes: flattenTree(initialNodes),
    initialEdges,
  };
};
