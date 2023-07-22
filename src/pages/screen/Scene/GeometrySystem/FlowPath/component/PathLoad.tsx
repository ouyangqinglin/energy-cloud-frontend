import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import AnimationPoint from './AnimationPoint';

const PathLoad = ({ show, direction }: { show?: boolean; direction?: FlowDirection }) => {
  return show ? (
    <g>
      <path
        id="load"
        stroke="#438BCC"
        strokeWidth={3}
        d="m485.86 200.419 31.094 17.543v8.066l23.22 13.107-.202 20.567 43.697 26.229"
      />
      <AnimationPoint duration={4} pathId="#load" />
      <path
        stroke="url(#f)"
        d="m0 4.033 31.094 17.543v8.066l23.22 13.107-.203 20.568 43.697 26.228"
        filter="url(#g)"
        opacity={0.6}
        transform="translate(483.64 200.419)"
      />
    </g>
  ) : (
    <></>
  );
};

export default PathLoad;
