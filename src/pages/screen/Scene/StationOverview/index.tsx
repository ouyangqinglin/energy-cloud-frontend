import { Spin } from 'antd';
import { defaults } from 'lodash';
import { useMemo } from 'react';
import { useRequest } from 'umi';
import DecorationCarousel from '../../components/DecorationCarousel';
import Cell from '../../components/LayoutCell';
import { DEFAULT_DATA } from './config';
import { getStationInfo } from './service';
import StationDevices from './StationDevices';
import StationInfo from './StationInfo';
import type { SiteInfoRes } from './type';

const StationOverview = () => {
  const { data: rawData } = useRequest(getStationInfo);
  const data: SiteInfoRes = defaults(rawData, DEFAULT_DATA);
  return (
    <Cell cursor="default" width={400} height={363} left={24} top={81}>
      <DecorationCarousel valueType="pagination" panelStyle={{ padding: 0 }} title="站点信息概览">
        {/* TODO: 需要做性能优化 */}
        {[<StationInfo data={data} key="1" />, <StationDevices data={data} key="2" />]}
      </DecorationCarousel>
    </Cell>
  );
};
export default StationOverview;
