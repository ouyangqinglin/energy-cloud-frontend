/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 14:26:38
 * @LastEditTime: 2023-04-25 17:52:56
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\Dialog\index.tsx
 */
import React, { ReactNode, useState } from 'react';
import { Modal, Spin } from 'antd';
import IconClose from '@/assets/image/screen/dialog/close.png';
import style from './index.less';

export type item = {
  label: string;
  children: ReactNode;
};

export type DialogProps = {
  open: boolean;
  width?: string | number;
  items: item[];
  loading?: boolean;
  onCancel: () => void;
};

export type BusinessDialogProps = {
  id: string | number;
  open: boolean;
  onCancel: () => void;
};

const Dialog: React.FC<DialogProps> = (props) => {
  const { width = '33.3%', open, onCancel, items, loading } = props;
  const tab: ReactNode[] = [],
    tabContent: ReactNode[] = [];
  const [activeTab, setActiveTab] = useState(0);
  const tabLength = items.length;

  const switchTab = (index: number) => {
    if (index !== activeTab) {
      setActiveTab(index);
    }
  };

  items.forEach((item, index) => {
    tab.push(
      <span
        className={`${style.tab} ${index === activeTab && tabLength > 1 ? style.active : ''}`}
        key={index}
        onClick={() => switchTab(index)}
      >
        {item.label}
      </span>,
    );
    tabContent.push(
      <div style={index === activeTab ? {} : { display: 'none' }} key={index}>
        {item.children}
      </div>,
    );
  });

  const modalContent = (
    <div className={`ant-modal-content ${style.dialogWrap}`}>
      <div className={style.dialogHead}>
        {tab}
        <img className={style.close} src={IconClose} onClick={onCancel} />
      </div>
      <div className={style.dialogContent}>{loading ? <Spin /> : tabContent}</div>
    </div>
  );

  return <Modal open={open} width={width} onCancel={onCancel} modalRender={() => modalContent} />;
};

export default Dialog;
