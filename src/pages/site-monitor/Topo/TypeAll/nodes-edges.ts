import type { Edge, Node } from 'reactflow';
import IconME from './svg-icon/icon市电3.svg';
import IconDistributionCabinet from './svg-icon/icon_配电柜.svg';
import IconPowerGenerationUnit from './svg-icon/icon_发电单元.svg';
import IconES from './svg-icon/icon_储能.svg';
import IconPV from './svg-icon/icon_光伏.svg';
import IconLoadCS from './svg-icon/icon_负载_充电桩.svg';
import IconLoadOther from './svg-icon/icon_负载.svg';
import type { ExtraNodeData, GraphNode } from '../type';
import type { AllTypeData, MainsSupply } from './type';
import { SubsystemTypeForNode } from './type';
import { isEmpty, uniqueId } from 'lodash';
import { isEmpty as utilIsEmpty } from '@/utils';
import { SiteTypeEnum, masterSlave2Enum } from '@/utils/dict';
import { formatMessage } from '@/utils';

const position = { x: 0, y: 0 };
const edgeType = 'smoothstep';

const hasPVInSiteType = (energyOptions: SiteTypeEnum) =>
  [SiteTypeEnum.PV, SiteTypeEnum.PV_ES, SiteTypeEnum.PV_ES_CS].includes(energyOptions);

// 获取概览统计
const genOverViewStatistic = (data: AllTypeData) => {
  const column = [
    {
      label: `${formatMessage({
        id: 'siteMonitor.parkTotalElectricity',
        defaultMessage: '园区总用电',
      })}(kWh)：`,
      value: data.siteTotal,
      field: 'todayConsumption',
    },
  ];
  if (hasPVInSiteType(data.energyOptions)) {
    column.push({
      label: `${formatMessage({
        id: 'siteMonitor.PVTotalElectricity',
        defaultMessage: '光伏总发电',
      })}(kWh)：`,
      value: data.photovoltaicTotal,
      field: 'todayConsumption',
    });
  }
  return {
    id: uniqueId(),
    type: 'statisticCard',
    position: {
      x: 31,
      y: 0,
    },
    data: {
      label: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
      width: 'auto',
      height: 76,
      textContent: {
        column,
        direction: 'horizontal',
      },
    },
  };
};

const genElectricSupplyNode = (data: MainsSupply) => {
  const parentId = uniqueId();
  return [
    {
      id: parentId,
      type: 'imageNode',
      data: {
        label: formatMessage({ id: 'device.electricSupply', defaultMessage: '市电' }),
        width: 96,
        height: 120,
        imageContent: {
          icon: IconME,
          width: 96,
          height: 120,
        },
      },
      position: {
        x: 280,
        y: 0,
      },
    },
    {
      id: uniqueId(),
      type: 'statisticCardForME',
      position: {
        x: 160,
        y: 0,
      },
      parentNode: parentId,
      extent: 'parent' as 'parent',
      data: {
        label: formatMessage({ id: 'siteMonitor.GridDataCard', defaultMessage: '市电数据卡片' }),
        width: 270,
        height: 106,
        textContent: {
          column: [
            {
              label: `${formatMessage({
                id: 'siteMonitor.top.1002',
                defaultMessage: '今日供电量',
              })}(kWh)：`,
              value: data.todayConsumption,
              field: 'todayConsumption',
            },
            {
              label: `${formatMessage({
                id: 'siteMonitor.top.1003',
                defaultMessage: '今日馈网电量',
              })}(kWh)：`,
              value: data.todayProduction,
              field: 'todayConsumption',
            },
            {
              label: `${formatMessage({
                id: 'siteMonitor.top.1004',
                defaultMessage: '市电',
              })}(kWh)：`,
              value: data.power,
              field: 'todayConsumption',
            },
          ],
          direction: 'horizontal',
        },
      },
    },
  ];
};

const genDistributionCabinetNode = (data: MainsSupply, type: any) => {
  let label = '';
  switch (type) {
    case 1:
      label = `${formatMessage({
        id: 'device.todayElectricitygeneration',
        defaultMessage: '今日发电量',
      })}(kWh)：`;
      break;
    case 2:
      label = `${formatMessage({
        id: 'siteMonitor.todayCharge',
        defaultMessage: '今日充电量',
      })}(kWh)：`;
      break;
    case 3:
    case 4:
      label = `${formatMessage({
        id: 'device.todayElectricityConsumption',
        defaultMessage: '今日用电量',
      })}(kWh)：`;
      break;
  }

  const result = {
    id: uniqueId(),
    type: 'imageNode',
    data: {
      label: 'input',
      width: 77,
      height: 90,
      title: formatMessage({ id: 'siteMonitor.DistributionCabinet', defaultMessage: '配电柜' }),
      imageContent: {
        icon: IconDistributionCabinet,
        width: 77,
        height: 90,
      },
      textContent: {
        column: [
          {
            label: label,
            value: data.todayConsumption,
            field: 'todayConsumption',
          },
          {
            label:
              type == 2
                ? `${formatMessage({
                    id: 'device.realTimePower',
                    defaultMessage: '实时功率',
                  })}(kW)：`
                : type == 1
                ? `${formatMessage({
                    id: 'screen.powerGeneration',
                    defaultMessage: '发电功率',
                  })}(kW)：`
                : `${formatMessage({
                    id: 'screen.powerConsumption',
                    defaultMessage: '用电功率',
                  })}(kW)：`,
            value: data.power,
            field: 'todayConsumption',
          },
        ],
        direction: 'horizontal',
      },
    },
    position,
  };

  if (type == 2) {
    result.data.textContent.column.splice(1, 0, {
      label:
        formatMessage({
          id: 'siteMonitor.todayDischarge',
          defaultMessage: '今日放电量',
        }) + '(kWh)：',
      value: data.todayProduction,
      field: 'todayProduction',
    });
  }

  return result;
};

const genPVNode = (data: MainsSupply) => {
  const pId = uniqueId();
  return [
    {
      id: pId,
      type: 'imageNode',
      data: {
        label: 'input',
        width: 100,
        height: 82,
        imageContent: {
          icon: IconPowerGenerationUnit,
          width: 65,
          height: 62,
        },
        title: formatMessage({
          id: 'siteMonitor.generatingUnit',
          defaultMessage: '发电单元',
        }),
        textContent: {
          column: [
            {
              label:
                formatMessage({
                  id: 'device.todayElectricitygeneration',
                  defaultMessage: '今日发电量',
                }) + '(kWh)：',
              value: data.todayConsumption,
              field: 'todayConsumption',
            },
            {
              label:
                formatMessage({
                  id: 'screen.powerGeneration',
                  defaultMessage: '发电功率(kWh)',
                }) + '：',
              value: data.power,
              field: 'todayConsumption',
            },
          ],
          direction: 'horizontal',
        },
      },
      position,
    },
    {
      id: uniqueId(),
      type: 'imageNode',
      parent: pId,
      data: {
        label: 'input',
        imageContent: {
          width: 65,
          height: 62,
          icon: IconPV,
        },
        width: 65,
        height: 62,
        textContent: {
          column: [
            {
              label:
                formatMessage({
                  id: 'siteMonitor.NumberOfStrings',
                  defaultMessage: '组串数',
                }) + '：',
              value: data.pvNum,
              field: 'todayConsumption',
            },
          ],
          direction: 'vertical',
        },
      },
      position,
    },
  ];
};

const genESNode = (data: MainsSupply) => ({
  id: uniqueId(),
  type: 'imageNode',
  data: {
    label: 'input',
    imageContent: {
      width: 70,
      height: 80,
      icon: IconES,
    },
    width: 70,
    height: 80,

    title: `${
      utilIsEmpty(data?.masterSlaveMode)
        ? ''
        : '(' + masterSlave2Enum[data?.masterSlaveMode as string]?.text + ')'
    }${data?.deviceName ?? ''}`,
    textContent: {
      column: [
        {
          label: `SOC(%)：`,
          value: data?.soc,
          field: 'todayConsumption',
        },
        {
          label: `${formatMessage({
            id: 'siteMonitor.todayCharge',
            defaultMessage: '今日充电量',
          })}(kWh)：`,
          value: data.todayConsumption,
          field: 'todayConsumption',
        },
        {
          label:
            formatMessage({
              id: 'siteMonitor.todayDischarge',
              defaultMessage: '今日放电量',
            }) + '(kWh)：',
          value: data.todayProduction,
          field: 'todayConsumption',
        },
        {
          label: `${formatMessage({
            id: 'device.realTimePower',
            defaultMessage: '实时功率',
          })}(kW)：`,
          value: data.power,
          field: 'todayConsumption',
        },
      ],
      direction: 'vertical',
    },
  },
  position,
});

const genLoadCSNode = (data: MainsSupply) => ({
  id: uniqueId(),
  type: 'imageNode',
  data: {
    label: 'input',
    imageContent: {
      width: 80,
      height: 78,
      icon: IconLoadCS,
    },
    width: 70,
    height: 78,

    title: formatMessage({ id: 'device.chargingPile', defaultMessage: '充电桩' }),
    textContent: {
      column: [
        {
          label: `${formatMessage({
            id: 'siteMonitor.todayCharge',
            defaultMessage: '今日充电量',
          })}(kWh)：`,
          value: data.todayConsumption,
          field: 'todayConsumption',
        },
        {
          label: `${formatMessage({
            id: 'screen.powerConsumption',
            defaultMessage: '用电功率',
          })}(kW)：`,
          value: data.power,
          field: 'todayConsumption',
        },
      ],
      direction: 'vertical',
    },
  },
  position,
});

const genLoadOtherNode = (data: MainsSupply) => ({
  id: uniqueId(),
  type: 'imageNode',
  data: {
    label: 'input',
    imageContent: {
      width: 80,
      height: 78,
      icon: IconLoadOther,
    },
    width: 70,
    height: 78,
    title: formatMessage({ id: 'siteMonitor.otherPowereDevice', defaultMessage: '其他用电设备' }),
    textContent: {
      column: [
        {
          label: `${formatMessage({
            id: 'device.todayElectricityConsumption',
            defaultMessage: '今日用电量',
          })}(kWh)：`,
          value: data.todayConsumption,
          field: 'todayConsumption',
        },
        {
          label: `${formatMessage({
            id: 'screen.powerConsumption',
            defaultMessage: '用电功率',
          })}(kW)：`,
          value: data.power,
          field: 'todayConsumption',
        },
      ],
      direction: 'vertical',
    },
  },
  position,
});

const buildTreeByData = (data: MainsSupply, nodes: GraphNode[] = []) => {
  if (data) {
    let node: GraphNode | undefined;
    switch (data.type) {
      case SubsystemTypeForNode.PV:
        // 特殊处理，这里实际上数据应该给出俩个子节点的，现在融合成一个了，前端稍微处理一下
        const [pNode, child] = genPVNode(data);
        (pNode as GraphNode).children = [child as GraphNode];
        node = pNode;
        break;
      case SubsystemTypeForNode.CS:
        node = genLoadCSNode(data);
        break;
      case SubsystemTypeForNode.ES:
        node = genESNode(data);
        break;
      case SubsystemTypeForNode.OTHER:
        node = genLoadOtherNode(data);
        break;
      case SubsystemTypeForNode.SUPPLY:
        const [pSNode, sChild] = genElectricSupplyNode(data);
        (pSNode as GraphNode).relation = [sChild as GraphNode];
        node = pSNode;
        break;
      case SubsystemTypeForNode.DC:
        const type = data.children[0].type;
        node = genDistributionCabinetNode(data, type);
        break;
      default:
        break;
    }

    if (data.children && node) {
      (node as GraphNode).children = [];
      let isMasterSlaveEnergy = false;
      if (data.children?.[1]?.type === SubsystemTypeForNode.ES) {
        isMasterSlaveEnergy = true;
      }
      data.children.forEach((d, index) => {
        if (isMasterSlaveEnergy) {
          d.extraName = index
            ? `${formatMessage({ id: 'common.slave', defaultMessage: '从' })}`
            : `${formatMessage({ id: 'common.master', defaultMessage: '主' })}`;
        }
        buildTreeByData(d, node?.children);
      });
    }

    if (node) {
      nodes.push(node);
    }
  }
  return nodes;
};

const buildEdges = (nodes: GraphNode[] = [], edges: Edge[] = [], sourceId?: string) => {
  if (!nodes.length) {
    return;
  }
  nodes.forEach((node) => {
    if (sourceId) {
      edges.push({
        id: uniqueId(),
        source: sourceId,
        target: node.id,
        type: edgeType,
        animated: true,
      });
    }
    if (node.children) {
      buildEdges(node.children, edges, node.id);
    }
  });
  return edges;
};

const flattenTree = (nodes: GraphNode[] = [], arr: Node<ExtraNodeData>[] = []) => {
  if (nodes?.length) {
    nodes.forEach((node) => {
      arr.push(node);
      if (node.relation) {
        arr.push(...node.relation);
      }

      if (node?.children) {
        flattenTree(node.children, arr);
      }
    });
  }
  return arr;
};

export const getNodesAndEdges = (data: AllTypeData) => {
  if (isEmpty(data)) {
    return {
      immutableNodes: [],
      initialNodes: [],
      initialEdges: [],
    };
  }
  const immutableNodes = [genOverViewStatistic(data)] as Node<ExtraNodeData>[];
  const initialNodes = buildTreeByData(data?.mainsSupply);
  const initialEdges = buildEdges(initialNodes) as Edge[];
  return {
    immutableNodes,
    initialNodes: flattenTree(initialNodes),
    initialEdges,
  };
};
