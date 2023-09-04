/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-08-30 15:24:41
 * @LastEditTime: 2023-08-31 11:38:59
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\LayoutCell\title.tsx
 */
import React from 'react';
import styles from './index.less';

export type TitleProps = {
  className?: string;
  title: string;
  unit?: string;
};

const Title: React.FC<TitleProps> = (props) => {
  const { title, unit, className = '' } = props;

  return (
    <>
      <div className={'flex ' + className}>
        <div className={styles.title}>{title}</div>
        <span className={'flex1 tx-right ' + styles.unit}>{unit}</span>
      </div>
    </>
  );
};

export default Title;
