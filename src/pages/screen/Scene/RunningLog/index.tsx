import { List, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import DecorationCarousel from '../../components/DecorationCarousel';
import Cell from '../../components/LayoutCell';
import styles from './index.less';
import useSubscribe from './useSubscribe';
import { formatMessage } from '@/utils';

const RunningLog = () => {
  const listData = useSubscribe();

  return (
    <Cell cursor="default" width={972} height={151} left={474} top={910}>
      <DecorationCarousel scroll={true} title={formatMessage({ id:'screen.siteOperationLog', defaultMessage:'站点运行日志'})}>
        {!isEmpty(listData) && (
          <List
            className={styles.logWrapper}
            size="small"
            dataSource={listData}
            renderItem={(item) => (
              <div className={styles.log}>
                <div className={styles.mark}>
                  <div className={styles.rect} />
                </div>
                <div className={styles.date}>{item.createTime}</div>
                <div className={styles.deviceName}>
                  {/* <Tooltip title={item.deviceName}>{item.deviceName}</Tooltip> */}
                  {item.deviceName}
                </div>
                <div className={styles.content}>
                  {/* <Tooltip title={item.logContent}>{item.logContent}</Tooltip> */}
                  {item.logContent}
                </div>
              </div>
            )}
          />
        )}
      </DecorationCarousel>
    </Cell>
  );
};
export default RunningLog;
