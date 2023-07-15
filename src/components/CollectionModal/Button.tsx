/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-15 14:50:15
 * @LastEditTime: 2023-07-15 16:47:19
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\CollectionModal\Button.tsx
 */
import React, { useCallback } from 'react';
import { LineChartOutlined } from '@ant-design/icons';
import LineChartImg from '@/assets/image/line-chart.png';
import styles from './index.less';
import CollectionModal from '.';
import { useBoolean } from 'ahooks';
import { DetailItem } from '@/components/Detail';

export type ButtonProps = {
  title: string;
  className?: string;
  deviceId: string;
  collection: string;
  onClick?: (item: DetailItem, value?: any) => void;
};

const Button: React.FC<ButtonProps> = (props) => {
  const { title, children, className, deviceId, collection, onClick, ...restProps } = props;

  const [open, { setTrue, setFalse }] = useBoolean(false);

  const onIconClick = useCallback(() => {
    setTrue();
    onClick?.({} as any);
  }, []);

  return (
    <>
      {children || (
        <img
          src={LineChartImg}
          className={`${styles.img} ${className}`}
          onClick={onIconClick}
          {...restProps}
        />
      )}
      <CollectionModal
        title={title}
        open={open}
        onCancel={setFalse}
        deviceId={deviceId}
        keys={[collection]}
      />
    </>
  );
};

export default Button;
