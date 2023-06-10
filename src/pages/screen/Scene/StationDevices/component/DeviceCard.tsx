import { Col, Row } from 'antd';
import type { DeviceConfigItem } from './type';
import styles from './index.less';
import Divider from './Divider';
import DeviceCardItem from './DeviceCardItem';

const DeviceCard = (props: DeviceConfigItem) => {
  const { icon, span, gutter = 0, child, ...restProps } = props;
  const renderChild = child.map((it) => {
    return (
      <>
        {!!it.dividerSpan && (
          <Col span={it.dividerSpan}>
            <Divider />
          </Col>
        )}
        <Col span={it.span} style={{ flexFlow: 'row', display: 'flex' }}>
          {!it.dividerSpan && <Divider style={{ marginRight: 5 }} />}
          <DeviceCardItem {...it} />
        </Col>
      </>
    );
  });

  return (
    <div className={styles.segment}>
      <div className={styles.icon} style={{ backgroundImage: `url(${icon})` }} />
      <Row className={styles.rightContent}>
        <Col span={span}>
          <DeviceCardItem {...restProps} />
        </Col>
        {renderChild}
      </Row>
    </div>
  );
};

export default DeviceCard;
