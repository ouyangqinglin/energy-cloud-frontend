import { Col, Row } from 'antd';
import type { DeviceConfigItem } from './type';
import styles from './index.less';
import Divider from './Divider';
import DeviceCardItem from './DeviceCardItem';
import type { ReactNode } from 'react';
import { uniqueId } from 'lodash';
import type { CombineDeviceRes } from '../type';

const DeviceCard = (props: DeviceConfigItem & { data: CombineDeviceRes }) => {
  const { icon, span, gutter = 0, child, ...restProps } = props;

  const renderChild = () => {
    if (!child) {
      return <></>;
    }
    const childNodes: ReactNode[] = [];
    child.forEach((it) => {
      if (!!it.dividerSpan) {
        childNodes.push(
          <Col span={it.dividerSpan} key={uniqueId()}>
            <Divider />
          </Col>,
        );
      }
      childNodes.push(
        <Col key={uniqueId()} span={it.span} style={{ flexFlow: 'row', display: 'flex' }}>
          {!it.dividerSpan && <Divider style={{ marginRight: 5 }} />}
          <DeviceCardItem data={props.data} {...it} />
        </Col>,
      );
    });
    return childNodes;
  };

  return (
    <div className={styles.segment}>
      <div className={styles.icon} style={{ backgroundImage: `url(${icon})` }} />
      <Row className={styles.rightContent}>
        <Col span={span}>
          <DeviceCardItem {...restProps} />
        </Col>
        {renderChild()}
      </Row>
    </div>
  );
};

export default DeviceCard;
