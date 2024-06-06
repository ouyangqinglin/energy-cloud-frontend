import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import AnimationPoint from './AnimationPoint';

const PathFan = ({ show, direction }: { show?: boolean; direction?: FlowDirection }) => {
  return show ? (
    <g>
      {/* 光伏 */}
      <path
        stroke="#438BCC"
        strokeWidth={3}
        id="pv"
        d="128.36622 0 97.2723872 17.5432149 97.2723872 25.6090466 74.0530044 38.7160232 73.8616677 60.2218353 41.5088045 41.5283622 1.54890825e-13 66.7718772"
      />
      <AnimationPoint duration={4} direction={direction} pathId="#pv" />
      <path
        stroke="url(#fan)"
        d="131.587207 4.03291749 100.493374 21.5761324 100.493374 29.6419641 77.2739917 42.7489407 77.082685 64.6746733 44.7297917 45.5612797 3.22098724 70.8047947"
        filter="url(#fan1)"
        opacity={0.6}
        transform="translate(200.205 199.88)"
      />
    </g>
  ) : (
    <></>
  );
};

export default PathFan;
