import { Col, Descriptions, Row, Tooltip } from 'antd';
import BackgroundImg from '@/assets/image/station/overview/img_home.png';
import RowBox from '../components/RowBox';
import styles from './index.less';

const SiteInfo = () => {
  return (
    <RowBox span={6} className={styles.siteInfo}>
      <ul className={styles.desc}>
        <li>
          <div className={styles.label}>电站名称：</div>
          <div className={styles.value}>永泰光储充示范站</div>
        </li>
        <li>
          <div className={styles.label}>地理位置：</div>
          <Tooltip placement="topRight" title={'广东省深圳市龙华区观盛五路永泰科技园'}>
            <div className={styles.value}>广东省深圳市龙华区观盛五路永泰科技园</div>
          </Tooltip>
        </li>
        <li>
          <div className={styles.label}>电站状态：</div>
          <div className={styles.value}>告警</div>
        </li>
        <li>
          <div className={styles.label}>组件总容量：</div>
          <div className={styles.value}>915.6kWp</div>
        </li>
        <li>
          <div className={styles.label}>储能容量：</div>
          <div className={styles.value}>250kW/ 589kWh</div>
        </li>
        <li>
          <div className={styles.label}>并网时间：</div>
          <div className={styles.value}>2023-05-25</div>
        </li>
      </ul>
      <div className={styles.img}>
        <img className={styles.innerImg} src={BackgroundImg} />
      </div>
    </RowBox>
  );
};

export default SiteInfo;
