import { Spin } from 'antd';
import { defaults } from 'lodash';
import { memo, useMemo } from 'react';
import { useRequest } from 'umi';
import DecorationCarousel from '../../components/DecorationCarousel';
import Cell from '../../components/LayoutCell';
import { DEFAULT_DATA } from './config';
import { getStationInfo } from './service';
import StationDevices from './StationDevices';
import StationInfo from './StationInfo';
import type { SiteInfoRes } from './type';
import { formatMessage } from '@/utils';
import type { UnitType } from '@/models/siteType';
import { config } from './StationDevices/config';

type StationOverviewType = {
  onChange?: (data: SiteInfoRes) => void;
  siteTypeConfig: UnitType;
};

const StationOverview: React.FC<StationOverviewType> = memo((props) => {
  const { onChange, siteTypeConfig } = props;
  const devicesConfig = config(siteTypeConfig);
  const [firstConfig, secondConfig] = [devicesConfig.slice(0, 4), devicesConfig.slice(4)];

  const { data: rawData } = useRequest(getStationInfo, {
    onSuccess: (res) => {
      onChange?.(res);
    },
  });
  const data = useMemo(() => {
    return defaults(rawData, DEFAULT_DATA);
  }, [rawData]);

  const child = useMemo(() => {
    const result = [
      <StationInfo siteTypeConfig={siteTypeConfig} data={data} key="1" />,
      <StationDevices config={firstConfig} data={data} key="2" />,
    ];
    if (secondConfig.length) {
      result.push(<StationDevices config={secondConfig} data={data} key="3" />);
    }
    return result;
  }, [data, firstConfig, secondConfig, siteTypeConfig]);

  return (
    <Cell cursor="default" width={400} height={400} left={24} top={81}>
      <DecorationCarousel
        totalPage={secondConfig.length ? 3 : 2}
        valueType="pagination"
        panelStyle={{ padding: 0 }}
        title={formatMessage({
          id: 'screen.overviewSiteInformation1',
          defaultMessage: '站点信息概览',
        })}
      >
        {child}
      </DecorationCarousel>
    </Cell>
  );
});
export default StationOverview;
