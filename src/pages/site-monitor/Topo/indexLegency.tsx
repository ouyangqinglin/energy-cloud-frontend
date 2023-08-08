import React, { useState, useEffect, useMemo, useRef, LegacyRef, useCallback } from 'react';
import { Button, message, Row } from 'antd';
import { MicroApp, useLocation, useRequest } from 'umi';
import styles from './index.less';
import type { LocationType } from '@/utils/dictionary';
import { ReactComponent as SystemDiagram11 } from './svg/11.svg';
import { ReactComponent as SystemDiagram21 } from './svg/21.svg';
import { ReactComponent as SystemDiagram31 } from './svg/31.svg';
import useSiteColumn from '@/hooks/useSiteColumn';
import type { EquipmentType } from '@/pages/equipment/equipment-list/data';
import type { ProColumns } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchamaForm';
import { getDefaultSite, getTopo } from './service';
import { getTopoOffset } from './useTopoResize';
import classnames from 'classnames';
import SiteLabel from '@/components/SiteLabel';
import { SiteDataType } from '@/services/station';

const keyToSystemTitle = new Map([
  ['11', '永泰光储能示范站能量流'],
  ['31', '储能站点能量流'],
  ['21', '光伏站点能量流'],
]);

type SiteType = {
  siteId?: string;
};

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();
  const [type, setType] = useState<number>(1);

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

  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);
  const svgRef = useRef<SVGElement>(null);

  useEffect(() => {
    const handleWheel = (event: WheelEvent) => {
      event.preventDefault();
      event.stopPropagation();
      const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1; // 缩放因子
      setScale((prevScale) => prevScale * scaleFactor);
    };
    if (svgRef.current) {
      svgRef.current.addEventListener('wheel', handleWheel, {
        passive: false,
      });
    }
    return () => {
      if (svgRef.current) {
        svgRef.current.removeEventListener('wheel', handleWheel);
      }
    };
  }, [svgRef]);

  const handleMouseMove = (event: MouseEvent) => {
    const deltaX = event.movementX;
    const deltaY = event.movementY;
    setTranslateX((prevTranslateX) => prevTranslateX + deltaX);
    setTranslateY((prevTranslateY) => prevTranslateY + deltaY);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (event: MouseEvent) => {
    event.preventDefault();
    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

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
        <div className={styles.title}>{keyToSystemTitle.get(systemDiagramId)}</div>
        <svg
          ref={svgRef}
          className={classnames(styles.systemDiagram)}
          // onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          style={{ cursor: 'grab' }}
          width="100%"
          height="calc(100vh - 240px)"
          // viewBox="0 0 5000 3100"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="evenodd"
        >
          <g
            className="svg_zoom"
            id="Layer_1"
            transform={`scale(${scale}) translate(${translateX}, ${translateY})`}
          >
            {systemDiagramId === '11' && <SystemDiagram11 />}
            {systemDiagramId === '21' && <SystemDiagram31 />}
            {systemDiagramId === '31' && <SystemDiagram21 />}
          </g>
        </svg>
      </div>
    </>
  );
};
export default Index;
