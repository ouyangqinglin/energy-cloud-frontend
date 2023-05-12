/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 14:26:38
 * @LastEditTime: 2023-05-11 13:57:22
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\index.tsx
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
  footer?: React.ReactNode;
  onCancel: () => void;
  onOk?: () => void;
  destroyOnClose?: boolean;
};

export type BusinessDialogProps = {
  id: string;
  open: boolean;
  onCancel: () => void;
  model?: string;
};

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    title = '设备详情',
    width = '62.5vw',
    open,
    onCancel,
    onOk,
    loading,
    footer,
    destroyOnClose,
  } = props;

  return (
    <Modal
      open={open}
      title={title}
      width={width}
      closeIcon={<img className="close" src={IconClose} onClick={onCancel} />}
      wrapClassName="dialog-screen"
      footer={footer}
      onCancel={onCancel}
      onOk={onOk}
      destroyOnClose={destroyOnClose}
    >
      {loading ? <Spin /> : props.children}
    </Modal>
  );
};

export default Dialog;
