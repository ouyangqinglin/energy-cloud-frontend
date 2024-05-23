import React, { memo } from 'react';
import Income from './Income';
import Charge from './Charge';
import { SiteTypeStrEnum } from '@/utils/enum';

type RealTimeType = {
  siteId?: number;
  siteType: SiteTypeStrEnum;
};

const RealTime: React.FC<RealTimeType> = (props) => {
  const { siteId, siteType } = props;

  return (
    <>
      {[SiteTypeStrEnum.CS].includes(siteType) ? (
        <Charge siteId={siteId} />
      ) : (
        <Income siteId={siteId} siteType={siteType} />
      )}
    </>
  );
};

export default memo(RealTime);
