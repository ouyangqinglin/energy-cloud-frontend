import classnames from 'classnames';
import { Handle, Position } from 'reactflow';
import BoxText from '../../../components/BoxText';
import { ExtraNodeData } from '../../../type';
import IconBatteryCluster from '../../svg-icon/icon_电池簇.svg';
import IconBatteryClusterEmpty from '../../svg-icon/icon_电池簇.svg';

import styles from './index.less';
import { keepTwoDecimalWithUnit } from '@/utils/math';

export function BatteryCluster({ data }: { data: ExtraNodeData }) {
  const { width = 80, height = 100, imageContent, textContent, boxText, handle } = data;
  const defaultHandleLeft = !!textContent ? width / 2 : '50%';

  return (
    <div
      className={classnames(styles.boxContent, [
        textContent?.direction === 'vertical' ? styles.vertical : styles.horizontal,
      ])}
      style={{
        width,
        height,
      }}
    >
      {boxText && <BoxText {...boxText} />}
      {imageContent && (
        <div className={styles.boxImage}>
          <div
            style={{
              width: imageContent.width ?? 80,
              height: imageContent.height ?? 100,
              backgroundImage: `url(${
                (imageContent?.soc ?? 0) > 0 ? IconBatteryCluster : IconBatteryClusterEmpty
              })`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '100% 100%',
            }}
          />
        </div>
      )}
      {textContent && (
        <div className={styles.boxTextContent}>
          {textContent.boxText && <BoxText {...textContent.boxText} />}
          {textContent.column?.map(({ label, value, field }) => {
            return (
              <div key={label} className={styles.boxItem}>
                <div className={styles.label}>{label}</div>
                <span className={styles.value}>{keepTwoDecimalWithUnit(value)}</span>
              </div>
            );
          })}
        </div>
      )}
      <Handle
        type="target"
        position={Position.Top}
        id="a"
        style={{
          left: handle?.start?.left ?? defaultHandleLeft,
          visibility: 'hidden',
        }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          left: handle?.end?.left ?? defaultHandleLeft,
          visibility: 'hidden',
        }}
        id="b"
      />
    </div>
  );
}
