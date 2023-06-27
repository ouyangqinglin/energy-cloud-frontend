import YTProTable from '@/components/YTProTable';
import {
  BetaSchemaForm,
  ProFormDatePicker,
  ProFormText,
  QueryFilter,
} from '@ant-design/pro-components';
import type { TabsProps } from 'antd';
import { Tabs } from 'antd';
import RealTimePower from './Chart';
import { columns } from './config';
import styles from './index.less';

const Search = () => {
  return (
    <div className={styles.searchWrapper}>
      <div className={styles.tableWrapper}>
        <YTProTable<any>
          toolBarRender={() => <></>}
          tableExtraRender={() => (
            <>
              <div className={styles.chartWrapper}>
                <RealTimePower />
              </div>
              <span className={styles.title}>采样明细</span>
            </>
          )}
          columns={columns}
        />
      </div>
    </div>
  );
};

export default Search;
