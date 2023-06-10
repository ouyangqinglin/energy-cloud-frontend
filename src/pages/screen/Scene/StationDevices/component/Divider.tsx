import classNames from 'classnames';
import { CSSProperties } from 'react';
import styles from './index.less';
const Divider = (props: { className?: string; style?: CSSProperties }) => {
  return <div className={classNames([styles.divider, props?.className])} style={props.style} />;
};

export default Divider;
