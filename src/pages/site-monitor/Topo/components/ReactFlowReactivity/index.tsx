import { useSize } from 'ahooks';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import ReactFlow, { ConnectionLineType, Panel, ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './index.less';

type RFType = typeof ReactFlow;

export type LayoutFlowType = RFType['defaultProps'] & {
  height?: string;
};

export const LayoutFlow: FC<LayoutFlowType> = ({ children, height, ...restProps }) => {
  const flowWrapper = useRef<HTMLDivElement>(null);
  const size = useSize(flowWrapper.current);
  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    if (size) {
      reactFlowInstance.fitView({
        duration: 60,
      });
    }
  }, [size, restProps.nodes]);

  return (
    <div
      ref={flowWrapper}
      style={{
        height: height || 'calc(100vh - 232px)',
        width: '100%',
      }}
    >
      <ReactFlow
        panOnDrag={true}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        minZoom={0.2}
        maxZoom={3}
        nodesDraggable={false}
        {...restProps}
      >
        <Panel position="bottom-right" className={styles.coverTagPanel}>
          <div />
        </Panel>
        {children}
      </ReactFlow>
    </div>
  );
};

export const ReactFlowReactivity: FC<LayoutFlowType> = (props) => (
  <ReactFlowProvider>
    <LayoutFlow {...props} />
  </ReactFlowProvider>
);
