import type { FC } from 'react';
import Cell from '../LayoutCell';
import GroupCell from '../LayoutGroupCell';
import classes from './index.less';
import { ReactComponent as DemonstrationBackground } from '@/assets/image/screen/demonstration_bg.svg';
const Scene: FC = () => {
  return (
    <Cell width={1040} height={667} left={441} top={346}>
      <DemonstrationBackground width={1040} height={667} />
    </Cell>
  );
};
export default Scene;
