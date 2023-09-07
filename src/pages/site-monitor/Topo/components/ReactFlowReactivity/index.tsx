import { useSize } from 'ahooks';
import type { FC } from 'react';
import { useEffect, useRef } from 'react';
import ReactFlow, { ConnectionLineType, Panel, ReactFlowProvider, useReactFlow } from 'reactflow';
import 'reactflow/dist/style.css';
import styles from './index.less';

type RFType = typeof ReactFlow;

export const LayoutFlow: FC<RFType['defaultProps']> = ({ children, ...restProps }) => {
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
        height: 'calc(100vh - 275px)',
        width: '100%',
      }}
    >
      <ReactFlow
        panOnDrag={true}
        fitView
        connectionLineType={ConnectionLineType.SmoothStep}
        minZoom={0.2}
        maxZoom={3}
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

export const ReactFlowReactivity: FC<RFType['defaultProps']> = (props) => (
  <ReactFlowProvider>
    <LayoutFlow {...props} />
  </ReactFlowProvider>
);
