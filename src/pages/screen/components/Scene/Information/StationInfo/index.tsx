import type { FC } from 'react';
import Decoration from '../../../Decoration';
import Cell from '../../../LayoutCell';
import { stationInfoConfig } from './config';

const StationInfo: FC = () => {
  function RenderList() {
    const list = stationInfoConfig.map((item) => {
      const Icon = item.icon;
      return (
        <li key={item.name}>
          <Icon width={24} height={24} />
          {item.name} {item.value}
        </li>
      );
    });
    return <ul>{list}</ul>;
  }

  return (
    <Cell width={400} height={354} left={24} top={114}>
      <Decoration title="站点信息概览">
        <RenderList></RenderList>
      </Decoration>
    </Cell>
  );
};
export default StationInfo;
