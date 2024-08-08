import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import AnimationPoint from './AnimationPoint';

const PathElectricSupply = ({
  show = true,
  direction,
}: {
  show?: boolean;
  direction?: FlowDirection;
}) => {
  return show ? (
    <g stroke="url(#h)" transform="translate(302.511 121.543)">
      <path
        d="m-4.1 21.433 66 .036"
        filter="url(#i)"
        opacity={0.6}
        transform="rotate(29.745 28.9 21.451)"
      />
      <path id="eSupply" strokeWidth={3} d="m2.447.419 57.286 32.776" />
      <AnimationPoint reverse={true} direction={direction} pathId="#eSupply" />
    </g>
  ) : (
    <></>
  );
};

export default PathElectricSupply;
