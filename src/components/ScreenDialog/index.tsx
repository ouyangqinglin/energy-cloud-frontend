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
import './index.less';

export type DialogProps = {
  title?: string;
  open: boolean;
  width?: string | number;
  loading?: boolean;
  onCancel: () => void;
};

export type BusinessDialogProps = {
  id: string | number;
  open: boolean;
  onCancel: () => void;
  model?: string;
};

const Dialog: React.FC<DialogProps> = (props) => {
  const { title = '设备详情', width = '62.5vw', open, onCancel, loading } = props;

  const modalContent = (
    <div className="ant-modal-content dialog-screen">
      <div className="dialog-head">
        <span className="dialog-tab">{title}</span>
        <img className="close" src={IconClose} onClick={onCancel} />
      </div>
      <div className="dialog-content">{loading ? <Spin /> : props.children}</div>
    </div>
  );

  return <Modal open={open} width={width} onCancel={onCancel} modalRender={() => modalContent} />;
};

export default Dialog;
