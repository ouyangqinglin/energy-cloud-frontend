import React, { useState, useEffect, useMemo, useRef, LegacyRef } from 'react';
import { Button, message, Row } from 'antd';
import { useLocation, useRequest } from 'umi';
import styles from './index.less';
import type { LocationType } from '@/utils/dictionary';
import { ReactComponent as SystemDiagram } from './SystemDiagram.svg';
import useSiteColumn from '@/hooks/useSiteColumn';
import type { EquipmentType } from '@/pages/equipment/equipment-list/data';
import type { ProColumns } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchamaForm';
import { getDefaultSite } from './service';

type SiteType = {
  siteId?: string;
};

const Index: React.FC = () => {
  const [siteId, setSiteId] = useState<number>();
  const location = useLocation();

  useEffect(() => {
    const { query } = location as LocationType;
    if (query?.id) {
      setSiteId(query?.id);
    }
  }, [location]);

  const { data } = useRequest(getDefaultSite);
  const [siteColumn] = useSiteColumn<EquipmentType>({
    hideInTable: true,
    colProps: {
      sm: 8,
      xl: 6,
    },
    fieldProps: {
      value: data?.id,
    },
  });
  console.log(siteColumn);

  const columns = useMemo<ProColumns<EquipmentType>[]>(() => {
    return [
      siteColumn,
      {
        title: '拓扑',
        dataIndex: 'deviceId',
        colProps: {
          sm: 8,
          xl: 6,
        },
        width: 200,
        initialValue: 1,
        valueEnum: new Map([
          [1, '电站概览'],
          [2, '光伏拓扑'],
          [3, '储能拓扑'],
          [4, '用电拓扑'],
          [5, '通信拓扑'],
        ]),
      },
    ];
  }, [siteColumn]);

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
        <div className={styles.stationHeader}>
          <SchemaForm<SiteType, 'text'>
            open={true}
            layoutType="Form"
            className={styles.formWrapper}
            layout="horizontal"
            grid={true}
            columns={columns}
            submitter={false}
            initialValues={{}}
            onValuesChange={() => {}}
          />
          <Button type="primary">编辑</Button>
        </div>
        {/* <SystemDiagram className={styles.systemDiagram} /> */}
        <svg
          ref={svgRef}
          className={styles.systemDiagram}
          // onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          style={{ cursor: 'grab' }}
          width="100%"
          height="100%"
          viewBox="0 0 5000 3100"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          strokeLinecap="round"
          strokeLinejoin="round"
          fillRule="evenodd"
          id="svg_No15"
        >
          <g
            className="svg_zoom"
            id="Layer_1"
            transform={`scale(${scale}) translate(${translateX}, ${translateY})`}
          >
            <SystemDiagram className={styles.systemDiagram} />
          </g>
        </svg>
      </div>
    </>
  );
};
export default Index;
