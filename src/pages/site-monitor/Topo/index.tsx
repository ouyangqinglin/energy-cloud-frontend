import React, { useState, useEffect, useMemo, useRef, LegacyRef, useCallback } from 'react';
import { Button, message, Row } from 'antd';
import { useLocation, useRequest } from 'umi';
import styles from './index.less';
import type { EquipmentType } from '@/pages/equipment/equipment-list/data';
import type { ProColumns } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchamaForm';
import { getDefaultSite, getTopo } from './service';
import classnames from 'classnames';
import SiteLabel from '@/components/SiteLabel';
import type { SiteDataType } from '@/services/station';
import LayoutFlow from './TypeAll';
import TopoTypeAll from './TypeAll';
import TopoTypeEnergyStorage from './TypeEnergyStorage';
import TopoTypePhotovoltaic from './TypePhotovoltaic';
import TypeCommunication from './TypeCommunication';

const keyToSystemTitle = new Map([
  [1, '永泰光储能示范站能量流'],
  [2, '光伏站点能量流'],
  [3, '储能系统能量流'],
  [5, '通信拓扑'],
]);

type SiteType = {
  siteId?: string;
};

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();
  const [type, setType] = useState<number>(5);

  const { data: systemDiagramId, run } = useRequest(getTopo, { manual: true });

  useEffect(() => {
    if (siteId && type) {
      run({ siteId, type });
    }
  }, [run, siteId, type]);

  const onChange = useCallback((data: SiteDataType) => {
    if (data?.id) {
      setSiteId(Number(data.id));
    }
  }, []);

  const columns = useMemo<ProColumns<EquipmentType>[]>(() => {
    return [
      {
        title: '拓扑',
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
          [1, '站点概览'],
          [2, '光伏拓扑'],
          [3, '储能拓扑'],
          [4, '用电拓扑'],
          [5, '通信拓扑'],
        ]),
      },
    ];
  }, [type]);

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
          <Button type="primary">编辑</Button>
        </div>
        <div className={styles.title}>{keyToSystemTitle.get(type)}</div>
        <div className={classnames(styles.systemDiagram)} style={{ width: '100%' }}>
          {type === 1 && <TopoTypeAll />}
          {type === 2 && <TopoTypePhotovoltaic />}
          {type === 3 && <TopoTypeEnergyStorage />}
          {type === 5 && <TypeCommunication />}
        </div>
      </div>
    </>
  );
};
export default Index;
