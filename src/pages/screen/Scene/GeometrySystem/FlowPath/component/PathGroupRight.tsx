import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import AnimationPoint from './AnimationPoint';
// 柴发
const PathGroupRight = ({ show, direction }: { show?: boolean; direction?: FlowDirection }) => {
  return show ? (
    <g transform="translate(378, 218)">
      <path
        id="fan2"
        stroke="#438BCC"
        strokeWidth="3"
        d="M64.7255094,0 L33.6316767,17.5432149 L33.6316767,25.6090466 L10.4122939,38.7160232 L10.4122638,59.8144497 L40.1036241,77.1015636 L-8.13931832e-12,102.80487"
        fill="none"
      />
      <AnimationPoint duration={4} direction={direction} pathId="#fan2" />
      <path
        stroke="url(#diesel)"
        opacity="0.600000024"
        filter="url(#diesel1)"
        d="M67.9464966,4.03291749 L36.8526639,21.5761324 L36.8526639,29.6419641 L13.456951,42.3269925 L13.456951,62.1775225 L43.4635582,81.0410375 L3.22098724,106.837787"
        fill="none"
      />
    </g>
  ) : (
    <></>
  );
};

export default PathGroupRight;
