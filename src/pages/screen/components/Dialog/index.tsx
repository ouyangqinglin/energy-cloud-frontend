/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 14:26:38
 * @LastEditTime: 2023-04-25 17:07:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Dialog\index.tsx
 */
import React, { ReactNode } from 'react';
import { Modal } from 'antd';
import IconClose from '@/assets/image/screen/close.png';
import style from './index.less';

export type item = {
  label: string;
  children: ReactNode;
};

export type DialogProps = {
  open: boolean;
  width?: string | number;
  items: item[];
  onCancel: () => void;
};

const Dialog: React.FC<DialogProps> = (props) => {
  const { width = '33.3%', open, onCancel, items } = props;

  const tab: ReactNode[] = [],
    tabContent: ReactNode[] = [];
  items.forEach((item, index) => {
    tab.push(
      <span className={style.tab} key={index}>
        {item.label}
      </span>,
    );
    tabContent.push(item.children);
  });

  const modalContent = (
    <div className={`ant-modal-content ${style.dialogWrap}`}>
      <div className={style.dialogHead}>
        {tab}
        <img className={style.close} src={IconClose} />
      </div>
      <div className={style.dialogContent}>{tabContent}</div>
    </div>
  );

  return <Modal open={open} width={width} onCancel={onCancel} modalRender={() => modalContent} />;
};

export default Dialog;
