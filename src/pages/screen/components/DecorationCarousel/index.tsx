import { CSSProperties, FC, memo, useMemo } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import decoration from './lottie/decoration.json';
import { Lottie } from '@/components/Lottie';
import { CodeSandboxOutlined } from '@ant-design/icons';
import { Carousel, Pagination, RadioChangeEvent } from 'antd';
import { ReactComponent as DotsIcon } from '@/assets/image/screen/decorationCarousel/dots.svg';
import { ReactComponent as PartIcon } from '@/assets/image/screen/decorationCarousel/part.svg';
import { ReactComponent as TagIcon } from '@/assets/image/screen/decorationCarousel/tag.svg';
import type { TimeType } from '../TimeButtonGroup';
import TimeButtonGroup from '../TimeButtonGroup';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { CarouselRef } from 'antd/lib/carousel';
import { noop } from 'lodash';
import ButtonGroupSiteType, { SiteType } from '../ButtonGroupSiteType';

export type DecorationValueType =
  | 'pagination'
  | 'timeButtonGroup'
  | 'datePicker'
  | 'siteType'
  | undefined;
export type DecorationProp = {
  title: string;
  valueType?: DecorationValueType;
  disableDecoration?: boolean;
  panelStyle?: CSSProperties;
  onTimeButtonChange?: (time: TimeType) => void;
  onSiteTypeButtonChange?: (time: SiteType) => void;
  scroll?: boolean;
};

const DecorationCarousel: FC<DecorationProp> = memo(
  ({
    title,
    panelStyle,
    valueType,
    scroll,
    onTimeButtonChange = noop,
    onSiteTypeButtonChange = noop,
    children,
  }) => {
    const carouselRef = useRef<CarouselRef>(null);
    const carouselSiteTypeRef = useRef<CarouselRef>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const goToPage = (page: number) => {
      carouselRef?.current?.goTo(page - 1);
      setCurrentPage(page);
    };
    const goSiteType = (value: SiteType) => {
      onSiteTypeButtonChange?.(value);
      carouselSiteTypeRef?.current?.goTo(value);
    };
    const changePagination = (currentSlider: number) => {
      setCurrentPage(currentSlider + 1);
    };
    const getValueType = useMemo(() => {
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
          Operation: <TimeButtonGroup onChange={goToPage} />,
          Panel: children,
        };
      }

      if (valueType === 'siteType') {
        return {
          Operation: <ButtonGroupSiteType onChange={goSiteType} />,
          Panel: (
            <Carousel className={styles.carousel} dots={false} ref={carouselSiteTypeRef}>
              {children}
            </Carousel>
          ),
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
    }, [children, currentPage, onTimeButtonChange, valueType]);

    const { Operation, Panel } = getValueType;

    return (
      <div className={classnames([styles.wrapper, styles.wrapperRect])}>
        <div className={classnames(styles.boxHeader)}>
          <div className={styles.leftContent}>
            <div className={styles.iconWrapper} />
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
        <div
          className={classnames(styles.boxContent, [scroll ? styles.boxContentScroll : ''])}
          style={panelStyle}
        >
          {Panel}
        </div>
      </div>
    );
  },
);

export default DecorationCarousel;
