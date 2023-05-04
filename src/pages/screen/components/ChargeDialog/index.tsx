/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 19:17:46
 * @LastEditTime: 2023-04-27 10:45:11
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\ChargeDialog\index.tsx
 */

import React, { useEffect } from 'react';
import { Row, Col, Button } from 'antd';
import { Area } from '@ant-design/charts';
import { useRequest } from 'umi';
import Dialog from '@/pages/screen/components/Dialog';
import type { item, BusinessDialogProps } from '@/pages/screen/components/Dialog';
import ImgCharge from '@/assets/image/screen/dialog/charge.png';
import styles from '../Dialog/index.less';
import { getDeviceInfo } from '../Dialog/service';
import Detail from '@/components/Detail';
import type { DetailItem } from '@/components/Detail';
import { arrayToMap } from '@/utils';
import { useInfo } from '@/utils/dictionary';
import { getAreaOption } from '@/utils/chartOption';

const useInfoMap = arrayToMap(useInfo);

const ChargeDialog: React.FC<BusinessDialogProps> = (props) => {
  const { id, open, onCancel } = props;
  const {
    data = {},
    loading,
    run,
  } = useRequest(getDeviceInfo, {
    manual: true,
  });
  const gunInfoItem: DetailItem[] = [
    { label: '枪A状态', field: 'aGun1' },
    { label: '枪B状态', field: 'bGun1' },
    { label: '枪A状态', field: 'aGun2' },
    { label: '枪B状态', field: 'bGun2' },
    { label: '枪A状态', field: 'aGun3' },
    { label: '枪B状态', field: 'bGun3' },
    { label: '枪A状态', field: 'aGun4' },
    { label: '枪B状态', field: 'bGun4' },
  ];
  const deviceInfoItem: DetailItem[] = [
    { label: 'A相电压', field: 'aVoltage' },
    { label: 'A相电流', field: 'aElectric' },
    { label: 'B相电压', field: 'bVoltage' },
    { label: 'B相电流', field: 'bElectric' },
    { label: 'C相电压', field: 'cVoltage' },
    { label: 'C相电流', field: 'cElectric' },
    { label: '实时充电功率', field: 'currentPower', span: 2 },
    { label: '今日充电量', field: 'todayCharge' },
    { label: '累计充电量', field: 'totalCharge' },
    { label: '今日充电收益', field: 'todayChargeRevenue' },
    { label: '累计充电收益', field: 'totalChargeRevenue' },
  ];
  const loopInfoItem: DetailItem[] = [
    { label: 'A相电压', field: 'aVoltage' },
    { label: 'AB线电压', field: 'abVoltage' },
    { label: 'A相电流', field: 'aElectric', span: 2 },
    { label: 'B相电压', field: 'bVoltage' },
    { label: 'BC线电压', field: 'bcVoltage' },
    { label: 'B相电流', field: 'bElectric', span: 2 },
    { label: 'C相电压', field: 'cVoltage' },
    { label: 'CA线电压', field: 'caVoltage' },
    { label: 'C相电流', field: 'cElectric', span: 2 },
    { label: '总有功功率', field: 'totalActive' },
    { label: '总无功功率', field: 'totalReactive' },
    { label: '总视在功率', field: 'totalApparent' },
    { label: '总功率因素', field: 'totalPower' },
    { label: '正向有功电能', field: 'forwardActive' },
    { label: '反向有功电能', field: 'reverseActive' },
    { label: '正向无功电能', field: 'forwardReactive' },
    { label: '反向无功电能', field: 'reverseReactive' },
  ];
  const productInfoItem: DetailItem[] = [
    { label: '产品型号', field: 'model' },
    { label: '产品类型', field: 'type' },
    { label: '产品厂商', field: 'company' },
  ];
  const formatGun = (value: any) => {
    return (
      <div className={`flex ${styles.dotWrap} ${value ? styles.active : ''}`}>
        <span className={styles.dot} />
        {useInfoMap[value]}
      </div>
    );
  };
  const chartOption = getAreaOption({
    data: data?.chart || [],
    tooltip: {
      formatter: (res: any) => {
        return { value: res.value, name: '功率' };
      },
    },
  });

  const runInfo = (
    <div>
      <Row>
        <Col flex="0 0 10.41vw">
          <img className={styles.productLogo} src={ImgCharge} />
          <Detail
            items={gunInfoItem}
            data={data}
            column={2}
            labelStyle={{ color: '#A7B7CA', fontSize: '1.11vh' }}
            contentStyle={{ color: 'white', fontSize: '1.11vh' }}
            format={formatGun}
          />
        </Col>
        <Col className={styles.productInfo} flex="1">
          <div className={styles.label}>
            <span className={`flex ${styles.labelLine}`} />
            设备名称：{data?.name}
          </div>
          <Detail
            items={deviceInfoItem}
            data={data}
            column={2}
            labelStyle={{ width: '4.5vw', color: '#A7B7CA', fontSize: '1.11vh' }}
            contentStyle={{ color: 'white', fontSize: '1.11vh' }}
          />
          <div className={styles.areaChart}>
            <div className={styles.chartTitle}>充电功率曲线(KW)</div>
            <Area {...chartOption} />
          </div>
        </Col>
      </Row>
      <div className={styles.splitLine} />
      <div className={styles.label}>
        <span className={`flex ${styles.labelLine}`} />
        电气回路信息
      </div>
      <Detail
        items={loopInfoItem}
        data={data.loop || {}}
        column={4}
        labelStyle={{ width: '4.5vw', color: '#A7B7CA', fontSize: '1.11vh' }}
        contentStyle={{ color: 'white', fontSize: '1.11vh' }}
      />
    </div>
  );
  const introInfo = (
    <div>
      <Row>
        <Col flex="0 0 10.41vw">
          <img className={styles.productLogo} src={ImgCharge} />
        </Col>
        <Col className={styles.productInfo} flex="1">
          <Detail
            items={productInfoItem}
            data={data.product || {}}
            column={2}
            labelStyle={{ color: '#A7B7CA', fontSize: '1.11vh' }}
            contentStyle={{ color: 'white', fontSize: '1.11vh' }}
          />
          <div className={styles.label}>
            <span className={`flex ${styles.labelLine}`} />
            产品介绍
          </div>
          <div className={styles.desc}>{data?.product?.desc}</div>
          <Button className={styles.btnMore} type="link">{`了解更多>`}</Button>
        </Col>
      </Row>
    </div>
  );
  const items: item[] = [
    { label: '运行信息', children: runInfo },
    { label: '产品介绍', children: introInfo },
  ];

  useEffect(() => {
    run(id);
  }, [id]);

  return <Dialog open={open} onCancel={onCancel} items={items} loading={loading} />;
};

export default ChargeDialog;
