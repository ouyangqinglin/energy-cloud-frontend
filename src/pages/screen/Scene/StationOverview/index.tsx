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

type StationOverviewType = {
  onChange?: (data: SiteInfoRes) => void;
};

const StationOverview: React.FC<StationOverviewType> = memo((props) => {
  const { onChange } = props;

  const { data: rawData } = useRequest(getStationInfo, {
    onSuccess: (res) => {
      onChange?.(res);
    },
  });
  const data: SiteInfoRes = defaults(rawData, DEFAULT_DATA);
  const child = useMemo(() => {
    return [<StationInfo data={data} key="1" />, <StationDevices data={data} key="2" />];
  }, [data]);
  return (
    <Cell cursor="default" width={400} height={363} left={24} top={81}>
      <DecorationCarousel valueType="pagination" panelStyle={{ padding: 0 }} title="站点信息概览">
        {child}
      </DecorationCarousel>
    </Cell>
  );
});
export default StationOverview;
