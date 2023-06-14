import { List, Tooltip } from 'antd';
import { isEmpty } from 'lodash';
import type { FC } from 'react';
import { useRequest } from 'umi';
import DecorationCarousel from '../../components/DecorationCarousel';
import Cell from '../../components/LayoutCell';
import { getBenefits } from './service';
import type { BenefitsRes } from './type';
import styles from './index.less';

const RunningLog: FC = () => {
  const { data: resData } = useRequest(getBenefits);
  const formatData = (res: BenefitsRes | undefined) => {
    const transformData = res ?? ({} as BenefitsRes);
    if (!res) {
      return transformData;
    }
    const excludeKeys = ['siteId'];
    Reflect.ownKeys(res).forEach((key) => {
      let value = res[key];
      if (!excludeKeys.includes(value)) {
        value = isEmpty(value) ? undefined : Math.floor(Number(value));
      }
      transformData[key] = value;
    });
    return transformData;
  };
  const data: BenefitsRes = formatData(resData);

  const listData = [
    {
      deviceName: '120kW直流桩',
      createTime: '2023-06-21 09:32:25',
      logContent: '充电设备接口状态产生变化,由：空闲变为：占用(充电中)',
    },
    {
      createTime: '2023-06-10 14:26:02',
      logContent: '充电设备接口状态产生变化,由：空闲变为：占用(充电中)',
      deviceName: '小桔充电枪_225816000200000102',
    },
    {
      deviceName: '120kW直流桩',
      createTime: '2023-06-21 09:32:25',
      logContent: '充电设备接口状态产生变化,由：空闲变为：占用(充电中)',
    },
    {
      createTime: '2023-06-10 14:26:02',
      logContent: '充电设备接口状态产生变化,由：空闲变为：占用(充电中)',
      deviceName: '小桔充电枪_225816000200000102',
    },
    {
      deviceName: '120kW直流桩',
      createTime: '2023-06-21 09:32:25',
      logContent: '充电设备接口状态产生变化,由：空闲变为：占用(充电中)',
    },
    {
      createTime: '2023-06-10 14:26:02',
      logContent:
        '充电设备接口状态产生变化,由：空闲变为：占用(充电中)电设备接口状态产生变化,由：空闲变为：占用(充电中)电设备接口状态产生变化,由：空闲变为：占用(充电中)',
      deviceName: '小桔充电枪_225816000200000102',
    },
  ];

  return (
    <Cell cursor="default" width={834} height={151} left={562} top={910}>
      <DecorationCarousel scroll={true} title="站点运行日志">
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
      </DecorationCarousel>
    </Cell>
  );
};
export default RunningLog;
