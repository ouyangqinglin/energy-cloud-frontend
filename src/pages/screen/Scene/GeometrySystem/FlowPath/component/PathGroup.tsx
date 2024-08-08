import type { FlowDirection } from '@/pages/site-monitor/Overview/EnergyFlow/type';
import { useMemo } from 'react';
import PathGroupLeft from './PathGroupLeft';
import PathGroupCenter from './PathGroupCenter';
import PathGroupRight from './PathGroupRight';

const PathGroup = ({
  direction,
  siteTypeArray,
}: {
  direction: { pv: FlowDirection; fan: FlowDirection; diesel: FlowDirection };
  siteTypeArray: string[];
}) => {
  const renderLine = useMemo(() => {
    switch (siteTypeArray.length) {
      case 0:
        return <></>;
      case 1:
        return (
          <PathGroupCenter direction={direction[siteTypeArray[0] as keyof typeof direction]} />
        );
      case 2:
        return (
          <>
            <PathGroupCenter
              transform="translate(279,179)"
              direction={direction[siteTypeArray[0] as keyof typeof direction]}
            />
            <PathGroupCenter
              transform="translate(340,216)"
              direction={direction[siteTypeArray[1] as keyof typeof direction]}
            />
          </>
        );
      case 3:
        return (
          <>
            <PathGroupLeft direction={direction[siteTypeArray[0] as keyof typeof direction]} />
            <PathGroupCenter direction={direction[siteTypeArray[1] as keyof typeof direction]} />
            <PathGroupRight direction={direction[siteTypeArray[2] as keyof typeof direction]} />
          </>
        );
      default:
        return <></>;
    }
  }, [direction, siteTypeArray]);

  return renderLine;
};

export default PathGroup;
