import { StatisticCard } from '@ant-design/pro-components';
import { ReactComponent as IconTree } from '@/assets/image/station/overview/icon_等效植树.svg';
import { ReactComponent as IconCoal } from '@/assets/image/station/overview/icon_煤炭.svg';
import { ReactComponent as IconCarbonEmission } from '@/assets/image/station/overview/icon_碳排放.svg';
import { Col, Descriptions, Divider, Row } from 'antd';
import RowBox from '../components/RowBox';
import styles from './index.less';
import { useRequest } from 'umi';
import { getBenefit } from './service';
import { isNil } from 'lodash';
import { useEffect } from 'react';
import { keepTwoDecimalWithUnit } from '@/utils/math';
import { DEFAULT_REQUEST_INTERVAL } from '@/utils/request';

const Benefit = ({ siteId }: { siteId?: number }) => {
  const { data, run } = useRequest(getBenefit, {
    manual: true,
    pollingInterval: DEFAULT_REQUEST_INTERVAL,
  });

  useEffect(() => {
    if (!isNil(siteId)) {
      run(siteId);
    }
  }, [run, siteId]);

  return (
    <RowBox span={6} className={styles.benefitWrapper}>
      <Row gutter={0} className={styles.boxContent}>
        <Col span={6} className={styles.leftBox}>
          <IconCarbonEmission className={styles.icon} />
        </Col>
        <Col span={18} className={styles.rightBox}>
          <div className={styles.desc}>
            <span className={styles.label}>年CO2减排量(t)：</span>
            <span className={styles.value}>{keepTwoDecimalWithUnit(data?.yearCo2)}</span>
          </div>
          <div className={styles.desc}>
            <span className={styles.label}>累计减排量(t)：</span>
            <span className={styles.value}>
              {keepTwoDecimalWithUnit(data?.conserveEnergyReduceEmissions)}
            </span>
          </div>
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} type={'horizontal'} />
      <Row className={styles.boxContent}>
        <Col span={6} className={styles.leftBox}>
          <IconCoal className={styles.icon} />
        </Col>
        <Col span={18} className={styles.rightBox}>
          <div className={styles.desc}>
            <span className={styles.label}>年节约标准煤(t)：</span>
            <span className={styles.value}>{keepTwoDecimalWithUnit(data?.yearCoal)}</span>
          </div>
          <div className={styles.desc}>
            <span className={styles.label}>累计节约(t)：</span>
            <span className={styles.value}>{keepTwoDecimalWithUnit(data?.coal)}</span>
          </div>
        </Col>
      </Row>
      <Divider style={{ margin: 0 }} type={'horizontal'} />
      <Row className={styles.boxContent}>
        <Col span={6} className={styles.leftBox}>
          <IconTree className={styles.icon} />
        </Col>
        <Col span={18} className={styles.rightBox}>
          <div className={styles.desc}>
            <span className={styles.label}>年等效植树(棵)：</span>
            <span className={styles.value}>{keepTwoDecimalWithUnit(data?.yearCumulativeTree)}</span>
          </div>
          <div className={styles.desc}>
            <span className={styles.label}>累计等效植树(棵)：</span>
            <span className={styles.value}>{keepTwoDecimalWithUnit(data?.cumulativeTree)}</span>
          </div>
        </Col>
      </Row>
    </RowBox>
  );
};

export default Benefit;
