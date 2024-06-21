import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import AnimationPoint from './AnimationPoint';

const PathGroupLeft = ({ show, direction }: { show?: boolean; direction?: FlowDirection }) => {
  return show ? (
    <g transform="translate(240, 173)">
      {/* 光伏 */}
      <path
        stroke="#438BCC"
        strokeWidth={3}
        id="pve"
        d="M128.36622,0 L97.2723872,17.5432149 L97.2723872,25.6090466 L74.0530044,38.7160232 L73.8616677,60.2218353 L41.5088045,41.5283622 L1.54890825e-13,66.7718772"
      />
      <AnimationPoint duration={4} direction={direction} pathId="#pve" />
      <path
        stroke="url(#pv)"
        d="M131.587207,4.03291749 L100.493374,21.5761324 L100.493374,29.6419641 L77.2739917,42.7489407 L77.082685,64.6746733 L44.7297917,45.5612797 L3.22098724,70.8047947"
        filter="url(#pv1)"
        opacity={0.6}
      />
    </g>
  ) : (
    <></>
  );
};

export default PathGroupLeft;
