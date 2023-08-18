import { Col, Row } from 'antd';
import type { CSSProperties } from 'react';
import { Handle, Position } from 'reactflow';
import BoxText from '../../../components/BoxText';
import IconES_BMS from '../../svg-icon/icon_储能BMS.svg';
import IconES_PCS from '../../svg-icon/icon_储能pcs.svg';
import IconES_AIR from '../../svg-icon/icon_储能空调.svg';
import type { ExtraNodeData } from '../../../type';
import styles from './index.less';
const BatterySystem = ({ data }: { data: ExtraNodeData }) => {
  const { width = 80, height = 100 } = data;
  return (
    <>
      <div
        className={styles.wrapper}
        style={{
          width,
          height,
        }}
      >
        <BoxText
          boxStyle={{
            position: 'absolute',
            left: 45,
            top: -16,
            border: '1px solid #00B42A',
            background: '#fff',
          }}
          label={'电池系统'}
        />
        <Row className={styles.boxContent}>
          <Col span={8}>
            <div className={styles.boxImage}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  backgroundImage: `url(${IconES_PCS})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '100% 100%',
                }}
              />
              <div className={styles.boxTitle}>储能PCS</div>
            </div>
          </Col>
          <Col span={8}>
            <div className={styles.boxImage}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  backgroundImage: `url(${IconES_BMS})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '100% 100%',
                }}
              />
              <div className={styles.boxTitle}>储能BMS</div>
            </div>
          </Col>

          <Col span={8}>
            <div className={styles.boxImage}>
              <div
                style={{
                  width: 48,
                  height: 48,
                  backgroundImage: `url(${IconES_AIR})`,
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                  backgroundSize: '100% 100%',
                }}
              />
              <div className={styles.boxTitle}>储能空调</div>
            </div>
          </Col>
        </Row>
      </div>
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{
          visibility: 'hidden',
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        id="b"
        style={{
          visibility: 'hidden',
        }}
      />
    </>
  );
};

export default BatterySystem;
