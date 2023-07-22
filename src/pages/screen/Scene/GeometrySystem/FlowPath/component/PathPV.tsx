import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import AnimationPoint from './AnimationPoint';

const PathPV = ({ show, direction }: { show?: boolean; direction?: FlowDirection }) => {
  return show ? (
    <g>
      {/* 光伏 */}
      <path
        stroke="#438BCC"
        strokeWidth={3}
        id="pv"
        d="m408.93 199.88-31.094 17.544v8.066l-23.219 13.107.202 20.567-38.614 24.521"
      />
      <AnimationPoint duration={4} direction={direction} pathId="#pv" />
      <path
        stroke="url(#d)"
        d="M95.946 4.033 64.853 21.576v8.066l-23.22 13.107.202 20.568-38.614 24.52"
        filter="url(#e)"
        opacity={0.6}
        transform="translate(316.205 199.88)"
      />
    </g>
  ) : (
    <></>
  );
};

export default PathPV;
