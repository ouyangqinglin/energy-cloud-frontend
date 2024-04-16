import React, { useState, useEffect, useMemo, useRef, LegacyRef, useCallback } from 'react';
import { Button, message, Row } from 'antd';
import { useLocation, useRequest } from 'umi';
import styles from './index.less';
import type { EquipmentType } from '@/pages/equipment/equipment-list/data';
import type { ProColumns } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchemaForm';
import { getDefaultSite, getTopo } from './service';
import classnames from 'classnames';
import SiteLabel from '@/components/SiteLabel';
import type { SiteDataType } from '@/services/station';
import LayoutFlow from './TypeAll';
import TopoTypeAll from './TypeAll';
import TopoTypeEnergyStorage from './TypeEnergyStorage';
import TopoTypePhotovoltaic from './TypePhotovoltaic';
import TypeCommunication from './TypeCommunication';
import TypePowerConsumption from './TypePowerComsumption';
import { formatMessage } from '@/utils';
import { SiteTypeEnum } from '@/utils/dict';

const keyToSystemTitle = new Map([
  [1, formatMessage({ id: 'siteMonitor.siteEnergyFlow', defaultMessage: '站点能量流' })],
  [2, formatMessage({ id: 'siteMonitor.pvSystemEnergyFlow', defaultMessage: '光伏系统能量流' })],
  [3, formatMessage({ id: 'siteMonitor.storageSystemEnergyFlow', defaultMessage: '储能能量流' })],
  [
    4,
    formatMessage({ id: 'siteMonitor.deviceSystemEnergyFlow', defaultMessage: '用电设备能量流' }),
  ],
  [5, formatMessage({ id: 'siteMonitor.communicationTopology', defaultMessage: '通信拓扑' })],
]);

type SiteType = {
  siteId?: string;
};

const Index: React.FC = () => {
  const [siteData, setSiteData] = useState<SiteDataType>();
  const [type, setType] = useState<number>(1);

  const { data: systemDiagramId, run } = useRequest(getTopo, { manual: true });

  useEffect(() => {
    if (siteData?.id && type) {
      run({ siteId: siteData?.id, type });
    }
  }, [run, siteData, type]);

  const onChange = useCallback((data: SiteDataType) => {
    if (data?.id) {
      setSiteData(data);
    }
  }, []);

  const columns = useMemo<ProColumns<EquipmentType>[]>(() => {
    return [
      {
        title: formatMessage({ id: 'siteMonitor.topology', defaultMessage: '拓扑' }),
        dataIndex: 'type',
        colProps: {
          sm: 8,
          xl: 6,
        },
        width: 200,
        initialValue: 1,
        fieldProps: {
          value: type,
          onChange: (value) => {
            setType(value);
          },
        },
        valueEnum: new Map([
          [1, formatMessage({ id: 'siteMonitor.siteTopology', defaultMessage: '站点拓扑' })],
          [
            SiteTypeEnum.PV + '',
            SiteTypeEnum.PV_CS + '',
            SiteTypeEnum.PV_ES + '',
            SiteTypeEnum.PV_ES_CS + '',
          ].includes(siteData?.siteType)
            ? [2, formatMessage({ id: 'siteMonitor.pvTopology', defaultMessage: '光伏拓扑' })]
            : ([] as any),
          [
            SiteTypeEnum.ES + '',
            SiteTypeEnum.ES_CS + '',
            SiteTypeEnum.PV_ES + '',
            SiteTypeEnum.PV_ES_CS + '',
          ].includes(siteData?.siteType)
            ? [3, formatMessage({ id: 'siteMonitor.storageTopology', defaultMessage: '储能拓扑' })]
            : ([] as any),
          [4, formatMessage({ id: 'siteMonitor.powerTopology', defaultMessage: '用电拓扑' })],
          [
            5,
            formatMessage({ id: 'siteMonitor.communicationTopology', defaultMessage: '通信拓扑' }),
          ],
        ]),
      },
    ];
  }, [type, siteData]);

  return (
    <>
      <div className="bg-white card-wrap p24">
        {/* <MicroApp name="goView" /> */}
        <div className={styles.stationHeader}>
          <div className={styles.rightSide}>
            <SiteLabel className={styles.siteName} onChange={onChange} />
            <SchemaForm<SiteType, 'text'>
              open={true}
              layoutType="Form"
              className={styles.formWrapper}
              layout="horizontal"
              grid={true}
              columns={columns}
              submitter={false}
              initialValues={{}}
            />
          </div>
          {/* <Button type="primary">编辑</Button> */}
        </div>
        <div className={styles.title}>{keyToSystemTitle.get(type)}</div>
        <div className={classnames(styles.systemDiagram)} style={{ width: '100%' }}>
          {type === 1 && <TopoTypeAll siteId={siteData?.id} />}
          {type === 2 && <TopoTypePhotovoltaic siteId={siteData?.id} />}
          {type === 3 && <TopoTypeEnergyStorage siteId={siteData?.id} />}
          {type === 4 && <TypePowerConsumption siteId={siteData?.id} />}
          {type === 5 && <TypeCommunication siteId={siteData?.id} />}
        </div>
      </div>
    </>
  );
};
export default Index;
