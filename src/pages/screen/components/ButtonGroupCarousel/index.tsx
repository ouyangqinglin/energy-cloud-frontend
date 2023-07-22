import { FC, useRef, useState } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import decoration from './lottie/decoration.json';
import play from './lottie/play.json';
import { Lottie } from '@/components/Lottie';
import { Carousel, Radio, RadioChangeEvent } from 'antd';
import { CarouselRef } from 'antd/lib/carousel';
import { AppstoreOutlined, CodeSandboxOutlined } from '@ant-design/icons';
import Cell from '../LayoutCell';

export const enum SystemDiagramType {
  NORMAL = 'NORMAL',
  CUSTOMER = 'CUSTOMER',
}

const ButtonGroupCarousel: FC<{
  onChange?: (value: SystemDiagramType) => void;
}> = ({ onChange }) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [type, setType] = useState<SystemDiagramType>(SystemDiagramType.CUSTOMER);

  const goNextPage = () => {
    carouselRef?.current?.next();
  };

  const handleClick = (e: RadioChangeEvent) => {
    setType(e.target.value);
    onChange?.(e.target.value as SystemDiagramType);
    // goNextPage();
  };

  return (
    <Cell width={112} height={36} left={474} top={253} zIndex={3}>
      <Radio.Group
        className={styles.buttonGroupWrapper}
        size="small"
        value={type}
        onChange={handleClick}
      >
        <Radio.Button value={SystemDiagramType.CUSTOMER}>
          <CodeSandboxOutlined />
        </Radio.Button>
        <Radio.Button value={SystemDiagramType.NORMAL}>
          <AppstoreOutlined />
        </Radio.Button>
      </Radio.Group>
      {/* <Carousel className={styles.carousel} dots={false} ref={carouselRef}>
        {children}
      </Carousel> */}
    </Cell>
  );
};

export default ButtonGroupCarousel;
