import KeepAliveTabs from '@/components/KeepAliveTabs';
import defaultSettings from '../../config/defaultSettings';
import styles from './index.less';

const { tabsLayout } = defaultSettings;

/* *
 *
 * @author whiteshader@163.com
 * @datetime  2022/02/22
 *
 * */

const TabsLayout: React.FC = (props) => {
  const renderTabs = () => {
    if (tabsLayout) return <KeepAliveTabs />;
    else return null;
  };

  return (
    <div>
      {renderTabs()}
      <div className={styles.tabsContent}>
        <div
          className={styles.contain}
          style={
            [
              '/site-monitor/device-detail',
              '/equipment/device-detail',
              '/station/device-detail',
            ].includes(props?.location?.pathname?.replace?.(/\/$/, ''))
              ? { background: 'none' }
              : {}
          }
        >
          {props.children}
        </div>
      </div>
    </div>
  );
};

export default TabsLayout;
