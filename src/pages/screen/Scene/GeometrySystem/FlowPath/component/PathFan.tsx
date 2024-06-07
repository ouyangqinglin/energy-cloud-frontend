import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import AnimationPoint from './AnimationPoint';
//风机
const PathFan = ({ show, direction }: { show?: boolean; direction?: FlowDirection }) => {
  return show ? (
    <g transform="translate(311,197)">
      <path
        stroke="#438BCC"
        strokeWidth={3}
        id="feng"
        d="M92.7255094,0 L61.6316767,17.5432149 L61.6316767,25.6090466 L38.4122939,38.7160232 L38.6141944,59.283925 L-1.34786901e-13,83.8048696"
      />
      <AnimationPoint duration={4} direction={direction} pathId="#feng" />
      <path
        stroke="url(#d)"
        d="M95.9464966,4.03291749 L64.8526639,21.5761324 L64.8526639,29.6419641 L41.6332811,42.7489407 L41.8351816,63.3168425 L3.22098724,87.8377871"
        filter="url(#e)"
        opacity={0.6}
      />
    </g>
  ) : (
    <></>
  );
};

export default PathFan;
