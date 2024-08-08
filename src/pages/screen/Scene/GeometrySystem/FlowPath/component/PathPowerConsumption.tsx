import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import AnimationPoint from './AnimationPoint';

const PathPowerConsumption = ({
  show = true,
  direction,
}: {
  show?: boolean;
  direction?: FlowDirection;
}) => {
  return show ? (
    <g>
      {/* 有充电桩的情况 */}
      <path
        stroke="#438BCC"
        id="chargeStack"
        strokeWidth={3}
        d="m454.86 215.419 31.094 17.543v8.066l23.22 13.107-.202 20.567 43.697 26.229"
      />
      <AnimationPoint direction={direction} pathId="#chargeStack" />
      <path
        stroke="url(#j)"
        d="m150.128 109.056 31.094 17.543v8.066l23.22 13.107-.203 20.568 43.697 26.228"
        filter="url(#filter-79)"
        opacity={0.6}
        transform="translate(302.511 110.396)"
      />
      <path
        stroke="#438BCC"
        strokeWidth={3}
        id="others"
        d="m512.808 181.34 31.094 17.544v8.065l23.219 13.107-.202 20.568 44 26.388"
      />
      <AnimationPoint direction={direction} pathId="#others" />
      <path
        stroke="url(#k)"
        d="M208.076 75.978 239.17 93.52v8.066l23.219 13.107-.202 20.568 44 26.387"
        filter="url(#filter-82)"
        opacity={0.6}
        transform="translate(302.511 110.396)"
      />
      )
    </g>
  ) : (
    <></>
  );
};

export default PathPowerConsumption;
