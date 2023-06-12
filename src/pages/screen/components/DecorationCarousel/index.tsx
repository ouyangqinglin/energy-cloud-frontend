import type { CSSProperties, FC } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import decoration from './lottie/decoration.json';
import { Lottie } from '@/components/Lottie';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { Carousel, Pagination } from 'antd';
import { ReactComponent as DotsIcon } from '@/assets/image/screen/decorationCarousel/dots.svg';
import { ReactComponent as PartIcon } from '@/assets/image/screen/decorationCarousel/part.svg';
import { ReactComponent as TagIcon } from '@/assets/image/screen/decorationCarousel/tag.svg';
import TimeButtonGroup from '../TimeButtonGroup';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { CarouselRef } from 'antd/lib/carousel';

export type DecorationValueType = 'pagination' | 'timeButtonGroup' | 'datePicker' | undefined;
export type DecorationProp = {
  title: string;
  valueType?: DecorationValueType;
  disableDecoration?: boolean;
  panelStyle?: CSSProperties;
};

const DecorationCarousel: FC<DecorationProp> = ({ title, panelStyle, valueType, children }) => {
  const carouselRef = useRef<CarouselRef>(null);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const goToPage = (page: number) => {
    carouselRef?.current?.goTo(page - 1);
    setCurrentPage(page);
  };
  const changePagination = (currentSlider: number) => {
    setCurrentPage(currentSlider + 1);
  };
  const getValueType = () => {
    if (valueType === 'pagination') {
      return {
        Operation: (
          <Pagination
            size="small"
            className={styles.pagination}
            // defaultCurrent={1}
            current={currentPage}
            total={2}
            defaultPageSize={1}
            onChange={goToPage}
          />
        ),
        Panel: (
          <Carousel
            // autoplay={true}
            // beforeChange={changePagination}
            className={styles.carousel}
            dots={false}
            ref={carouselRef}
          >
            {children}
          </Carousel>
        ),
      };
    }

    if (valueType === 'timeButtonGroup') {
      return {
        Operation: <TimeButtonGroup />,
        Panel: children,
      };
    }

    const disabledDate: RangePickerProps['disabledDate'] = (current) => {
      return current && current > dayjs().endOf('day');
    };
    if (valueType === 'datePicker') {
      return {
        Operation: (
          <div className={styles.datePicker}>
            <DatePicker
              popupClassName={styles.datePicker}
              disabledDate={disabledDate}
              size="small"
            />
          </div>
        ),
        Panel: children,
      };
    }
    return {
      Operation: null,
      Panel: children,
    };
  };

  const { Operation, Panel } = getValueType();

  return (
    <div className={classnames([styles.wrapper, styles.wrapperRect])}>
      <div className={classnames(styles.boxHeader)}>
        <div className={styles.leftContent}>
          <div className={styles.iconWrapper}>{/* <TagIcon className={styles.tagIcon} /> */}</div>
          <span className={styles.text}>{title}</span>
        </div>
        <div className={styles.rightContent}>{Operation}</div>
      </div>
      <div className={styles.decoration}>
        <div className={styles.left}>
          <PartIcon className={styles.partIcon} />
          <div className={styles.line} />
        </div>
        <DotsIcon className={styles.dotsIcon} />
      </div>
      <div className={styles.boxContent} style={panelStyle}>
        {Panel}
      </div>
    </div>
  );
};

export default DecorationCarousel;
