import { memo, useMemo } from 'react';
import type { CSSProperties, FC } from 'react';
import { useState } from 'react';
import { useRef } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { Carousel, Pagination } from 'antd';
import { ReactComponent as DotsIcon } from '@/assets/image/screen/decorationCarousel/dots.svg';
import { ReactComponent as PartIcon } from '@/assets/image/screen/decorationCarousel/part.svg';
import type { TimeType } from '../TimeButtonGroup';
import TimeButtonGroup from '../TimeButtonGroup';
import { DatePicker } from 'antd';
import dayjs from 'dayjs';
import type { RangePickerProps } from 'antd/lib/date-picker';
import type { CarouselRef } from 'antd/lib/carousel';
import { noop } from 'lodash';
import ButtonGroupSiteType from '../ButtonGroupSiteType';
import type { SiteType } from '../ButtonGroupSiteType';

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
  totalPage?: number;
};

const DecorationCarousel: FC<DecorationProp> = memo(
  ({
    title,
    panelStyle,
    valueType,
    scroll,
    totalPage = 2,
    onTimeButtonChange = noop,
    onSiteTypeButtonChange = noop,
    children,
  }) => {
    const carouselRef = useRef<CarouselRef>(null);
    const carouselSiteTypeRef = useRef<CarouselRef>(null);
    const [currentPage, setCurrentPage] = useState<number>(valueType === 'siteType' ? 0 : 1);
    const goToPage = (page: number) => {
      carouselRef?.current?.goTo(page - 1);
      setCurrentPage(page);
    };
    const goSiteType = (value: SiteType) => {
      onSiteTypeButtonChange?.(value);
      carouselSiteTypeRef?.current?.goTo(value);
    };
    const afterChange = (current: number) => {
      setCurrentPage(current);
    };
    const getValueType = useMemo(() => {
      if (valueType === 'pagination') {
        return {
          Operation: (
            <Pagination
              size="small"
              className={styles.pagination}
              current={currentPage}
              total={totalPage}
              defaultPageSize={1}
              onChange={goToPage}
            />
          ),
          Panel: (
            <Carousel
              className={styles.carousel}
              dots={false}
              ref={carouselRef}
              autoplay
              autoplaySpeed={5000}
              afterChange={(current) => afterChange(current + 1)}
            >
              {children}
            </Carousel>
          ),
        };
      }

      if (valueType === 'timeButtonGroup') {
        return {
          Operation: <TimeButtonGroup onChange={onTimeButtonChange} />,
          Panel: children,
        };
      }

      if (valueType === 'siteType') {
        return {
          Operation: (
            <ButtonGroupSiteType
              isUseInterval={false}
              current={currentPage}
              onChange={goSiteType}
            />
          ),
          Panel: (
            <Carousel
              className={styles.carousel}
              dots={false}
              ref={carouselSiteTypeRef}
              autoplay
              autoplaySpeed={5000}
              afterChange={afterChange}
            >
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
