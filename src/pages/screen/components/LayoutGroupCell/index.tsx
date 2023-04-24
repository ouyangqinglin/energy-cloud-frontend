import type { FC } from 'react';
import classes from './index.less';
const GroupCell: FC = (props) => {
  return <div className={classes.cellGroup}>{props.children}</div>;
};
export default GroupCell;
