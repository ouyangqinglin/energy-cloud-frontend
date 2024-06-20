import type { SystemDiagramRes } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { SubSystemType } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import type { SVGProps } from 'react';
import PathES from './component/PathES';
import PathElectricSupply from './component/PathElectricSupply';
import PathLoad from './component/PathLoad';
import PathPowerConsumption from './component/PathPowerConsumption';
import PathGroup from './component/PathGroup';

const FlowPath = ({
  data,
  siteTypeArray,
  ...restProp
}: { data?: SystemDiagramRes; siteTypeArray: string[] } & SVGProps<SVGSVGElement>) => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width={894} height={419} {...restProp}>
      <defs>
        <linearGradient id="a" x1="0%" x2="0%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#65D5FF" />
          <stop offset="100%" stopColor="#0263C2" />
        </linearGradient>
        <linearGradient id="c" x1="0%" x2="78.215%" y1="49.992%" y2="50%">
          <stop offset="0%" stopColor="#0263C2" />
          <stop offset="100%" stopColor="#438BCC" />
        </linearGradient>
        <linearGradient id="j" x1="0%" x2="100%" y1="100%" y2="100%">
          <stop offset="0%" stopColor="#0F6" />
          <stop offset="100%" stopColor="#428ACA" stopOpacity={0.5} />
        </linearGradient>
        <radialGradient id="grad1" cx="50%" cy="50%" r="50%" fx="50%" fy="50%">
          <stop offset="0%" stopColor="#0F6" />
          <stop offset="100%" stopColor="#428ACA" stopOpacity={0} />
        </radialGradient>
        <linearGradient id="d" x1="0%" x2="100%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#65D5FF" />
          <stop offset="100%" stopColor="#0263C2" />
        </linearGradient>
        <linearGradient id="k" x1="-20.904%" x2="128.065%" y1="0%" y2="79.144%">
          <stop offset="0%" stopColor="#428ACA" stopOpacity={0} />
          <stop offset="100%" stopColor="#0F6" />
        </linearGradient>
        <linearGradient id="f" x1="0%" x2="100%" y1="50%" y2="50%">
          <stop offset="0%" stopColor="#65D5FF" />
          <stop offset="100%" stopColor="#0263C2" />
        </linearGradient>
        <linearGradient id="h" x1="0%" x2="0%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="#65D5FF" />
          <stop offset="100%" stopColor="#0263C2" />
        </linearGradient>
        <linearGradient id="diesel" x1="0%" y1="50%" x2="100%" y2="50%">
          <stop stopColor="#65D5FF" offset="0%" />
          <stop stopColor="#0263C2" offset="100%" />
        </linearGradient>
        <linearGradient x1="0%" y1="50%" x2="100%" y2="50%" id="pv">
          <stop stopColor="#65D5FF" offset="0%" />
          <stop stopColor="#0263C2" offset="100%" />
        </linearGradient>
        <filter
          id="b"
          width="112.4%"
          height="983.9%"
          x="-6.2%"
          y="-442%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={1.484} />
        </filter>
        <filter
          id="e"
          width="110.7%"
          height="111.8%"
          x="-5.3%"
          y="-5.9%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={1.484} />
        </filter>
        <filter
          id="g"
          width="110.1%"
          height="111.6%"
          x="-5.1%"
          y="-5.8%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={1.484} />
        </filter>
        <filter
          id="i"
          width="115%"
          height="993.9%"
          x="-7.5%"
          y="-446.9%"
          filterUnits="objectBoundingBox"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={1.484} />
        </filter>
        <filter
          x="-3.9%"
          y="-7.4%"
          width="107.7%"
          height="114.8%"
          filterUnits="objectBoundingBox"
          id="diesel1"
        >
          <feGaussianBlur in="SourceGraphic" stdDeviation={1.48} />
        </filter>
        <filter
          x="-3.9%"
          y="-7.4%"
          width="107.7%"
          height="114.8%"
          filterUnits="objectBoundingBox"
          id="pv1"
        >
          <feGaussianBlur stdDeviation="1.48377908" in="SourceGraphic" />
        </filter>
      </defs>
      <g fill="none" fillRule="evenodd" strokeLinecap="round" strokeLinejoin="round">
        <PathElectricSupply
          show={data?.[SubSystemType.E].flag}
          direction={data?.[SubSystemType.E].direction}
        />
        <PathLoad
          show={!data?.[SubSystemType.CS].flag}
          direction={data?.[SubSystemType.CS].direction}
        />
        <PathPowerConsumption
          show={data?.[SubSystemType.CS].flag}
          direction={data?.[SubSystemType.L].direction}
        />
        <PathES
          show={data?.[SubSystemType.ES].flag}
          direction={data?.[SubSystemType.ES].direction}
        />
        <PathGroup
          siteTypeArray={siteTypeArray}
          direction={{
            pv: data?.[SubSystemType.PV].direction || 0,
            fan: data?.[SubSystemType.F].direction || 0,
            diesel: data?.[SubSystemType.D].direction || 0,
          }}
        />
      </g>
    </svg>
  );
};
export default FlowPath;
