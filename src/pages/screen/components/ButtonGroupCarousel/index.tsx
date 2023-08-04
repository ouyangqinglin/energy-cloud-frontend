import { FC, useEffect, useState } from 'react';
import { useRequest } from 'umi';
import styles from './index.less';
import { Radio, RadioChangeEvent, Tooltip } from 'antd';
import { AppstoreOutlined, CodeSandboxOutlined } from '@ant-design/icons';
import Cell from '../LayoutCell';
import { getSiteScreenConfig } from '@/services/station';
import { getSiteId } from '../../Scene/helper';

export const enum SystemDiagramType {
  NORMAL = 'NORMAL',
  CUSTOMER = 'CUSTOMER',
}

const typeMap = {
  2: SystemDiagramType.CUSTOMER,
  1: SystemDiagramType.NORMAL,
};

const ButtonGroupCarousel: FC<{
  onChange?: (value: SystemDiagramType) => void;
}> = ({ onChange }) => {
  const [type, setType] = useState<SystemDiagramType>();
  const { data: screenConfigData } = useRequest(getSiteScreenConfig, {
    defaultParams: [{ siteId: getSiteId() }],
  });

  const handleClick = (e: RadioChangeEvent) => {
    setType(e.target.value);
    onChange?.(e.target.value as SystemDiagramType);
  };

  useEffect(() => {
    const value = typeMap[screenConfigData?.flowDiagramId?.[0] || ''];
    if (value) {
      setType(value);
      onChange?.(value);
    }
  }, [screenConfigData]);

  return (
    <Cell width={112} height={36} left={474} top={253} zIndex={3}>
      <Radio.Group
        className={styles.buttonGroupWrapper}
        size="small"
        value={type}
        onChange={handleClick}
      >
        {screenConfigData?.flowDiagramId?.includes?.('2') && (
          <Tooltip placement="top" title="定制能流图" color="#0f60a7">
            <Radio.Button value={SystemDiagramType.CUSTOMER}>
              <CodeSandboxOutlined />
            </Radio.Button>
          </Tooltip>
        )}
        {screenConfigData?.flowDiagramId?.includes?.('1') && (
          <Tooltip placement="top" title="标准能流图" color="#0f60a7">
            <Radio.Button value={SystemDiagramType.NORMAL}>
              <AppstoreOutlined />
            </Radio.Button>
          </Tooltip>
        )}
      </Radio.Group>
    </Cell>
  );
};

export default ButtonGroupCarousel;
