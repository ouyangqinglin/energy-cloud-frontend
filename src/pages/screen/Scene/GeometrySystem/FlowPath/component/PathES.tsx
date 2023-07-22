import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import AnimationPoint from './AnimationPoint';

const PathES = ({ show, direction }: { show?: boolean; direction?: FlowDirection }) => {
  return show ? (
    <g transform="rotate(-29.745 509.571 -916.144)">
      <path
        stroke="url(#a)"
        strokeWidth={0.807}
        d="m-1.666 24.159 77.999.13"
        filter="url(#b)"
        opacity={0.6}
      />
      <path id="es" stroke="url(#c)" strokeWidth={3} d="m-4.89 19.719 77.999.129" />
      <AnimationPoint duration={4} direction={direction} pathId="#es" />
    </g>
  ) : (
    <></>
  );
};

export default PathES;
