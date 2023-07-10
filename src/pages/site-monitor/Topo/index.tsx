import React, { useState, useEffect, useMemo } from 'react';
import { message, Row } from 'antd';
import { useLocation } from 'umi';
import styles from './index.less';
import type { LocationType } from '@/utils/dictionary';
import { ReactComponent as SystemDiagram } from './SystemDiagram.svg';
import useSiteColumn from '@/hooks/useSiteColumn';
import type { EquipmentType } from '@/pages/equipment/equipment-list/data';
import type { ProColumns } from '@ant-design/pro-components';
import SchemaForm from '@/components/SchamaForm';

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

  const [siteColumn] = useSiteColumn<EquipmentType>({
    hideInTable: true,
    fieldProps: {
      width: 200,
    },
  });

  const columns = useMemo<ProColumns<EquipmentType>[]>(() => {
    return [
      siteColumn,
      {
        title: '拓扑',
        dataIndex: 'deviceId',
        width: 200,
        // ellipsis: true,
        hideInTable: true,
        valueEnum: new Map([
          [0, '储能拓扑'],
          [1, '光伏拓扑'],
          [2, '市电拓扑'],
          [3, '负载拓扑'],
        ]),
      },
    ];
  }, [siteColumn]);

  const [scale, setScale] = useState(1);
  const [translateX, setTranslateX] = useState(0);
  const [translateY, setTranslateY] = useState(0);

  const handleWheel = (event) => {
    event.preventDefault();
    const scaleFactor = event.deltaY > 0 ? 0.9 : 1.1; // 缩放因子
    setScale((prevScale) => prevScale * scaleFactor);
  };

  const handleMouseMove = (event) => {
    const deltaX = event.movementX;
    const deltaY = event.movementY;
    setTranslateX((prevTranslateX) => prevTranslateX + deltaX);
    setTranslateY((prevTranslateY) => prevTranslateY + deltaY);
  };

  const handleMouseUp = () => {
    document.removeEventListener('mousemove', handleMouseMove);
    document.removeEventListener('mouseup', handleMouseUp);
  };

  const handleMouseDown = (event) => {
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
            layout="inline"
            columns={columns}
            submitter={false}
            initialValues={{}}
            onValuesChange={() => {}}
          />
        </div>
        {/* <SystemDiagram className={styles.systemDiagram} /> */}
        <svg
          className={styles.systemDiagram}
          onWheel={handleWheel}
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
