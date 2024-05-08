import { keepTwoDecimalWithUnit } from '@/utils/math';
import classnames from 'classnames';
import { Handle, Position } from 'reactflow';
import type { ExtraNodeData } from '../../type';
import BoxText from '../BoxText';
import styles from './index.less';

export function ImageNode({ data }: { data: ExtraNodeData }) {
  const {
    width = 80,
    height = 100,
    imageContent,
    textContent,
    boxText,
    title,
    handle,
    layout = 'start',
  } = data;
  const defaultHandleWidth = !!textContent ? width / 2 : '50%';
  const defaultHandleHeight = !!textContent ? height / 2 : '50%';

  return (
    <div
      className={classnames(
        styles.boxContent,
        [textContent?.direction === 'vertical' ? styles.vertical : styles.horizontal],
        [layout === 'center' ? styles.center : layout === 'end' ? styles.end : styles.start],
      )}
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
              backgroundImage: `url(${imageContent.icon})`,
              backgroundRepeat: 'no-repeat',
              backgroundPosition: 'center',
              backgroundSize: '100% 100%',
            }}
          />
          {title && (
            <div className={`ellipsis ${styles.boxTitle}`} title={title}>
              {title}
            </div>
          )}
        </div>
      )}
      {textContent && (
        <div className={styles.boxTextContent}>
          {textContent.boxText && <BoxText {...textContent.boxText} />}
          {textContent.column?.map(({ label, value, render }) => {
            return (
              <div key={label} className={styles.boxItem}>
                <div className={styles.label}>{label}</div>
                <span className={styles.value}>
                  {render ? render() : keepTwoDecimalWithUnit(value)}
                </span>
              </div>
            );
          })}
        </div>
      )}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{
          left: handle?.end?.left ?? defaultHandleWidth,
          visibility: 'hidden',
        }}
        id="source-bottom"
      />
      <Handle
        type="source"
        position={Position.Left}
        style={{
          top: handle?.end?.top ?? defaultHandleHeight,
          visibility: 'hidden',
        }}
        id="source-left"
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{
          top: handle?.end?.top ?? defaultHandleHeight,
          visibility: 'hidden',
        }}
        id="source-right"
      />
      <Handle
        type="target"
        position={Position.Top}
        id="target-top"
        style={{
          left: handle?.start?.left ?? defaultHandleWidth,
          visibility: 'hidden',
        }}
      />
      <Handle
        type="target"
        position={Position.Left}
        id="target-left"
        style={{
          top: handle?.start?.top ?? defaultHandleHeight,
          visibility: 'hidden',
        }}
      />
      <Handle
        type="target"
        position={Position.Right}
        id="target-right"
        style={{
          top: handle?.start?.top ?? defaultHandleHeight,
          visibility: 'hidden',
        }}
      />
    </div>
  );
}
