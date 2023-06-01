/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-04-25 14:26:38
 * @LastEditTime: 2023-05-15 17:24:12
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Dialog\index.tsx
 */
import React, { ReactNode, useState } from 'react';
import { Modal, Spin } from 'antd';
import IconClose from '@/assets/image/screen/dialog/close.png';
import './index.less';

export type DialogProps = {
  model?: string;
  title?: string;
  open: boolean;
  width?: string | number;
  loading?: boolean;
  footer?: React.ReactNode;
  onCancel: () => void;
  onOk?: () => void;
  destroyOnClose?: boolean;
  wrapClassName?: string;
  confirmLoading?: boolean;
};

export const getModalProps = (model: string | undefined, wrapClassName = '') => {
  return model === 'screen'
    ? {
        closeIcon: <img className="close" src={IconClose} />,
        wrapClassName: `dialog-screen ${wrapClassName}`,
      }
    : {
        wrapClassName: `dialog-equipment ${wrapClassName}`,
      };
};

const Dialog: React.FC<DialogProps> = (props) => {
  const {
    model,
    title = '设备详情',
    width = '1200px',
    open,
    onCancel,
    onOk,
    loading,
    footer,
    destroyOnClose,
    wrapClassName,
    confirmLoading,
  } = props;

  const modalProps = getModalProps(model, wrapClassName);

  return (
    <Modal
      open={open}
      title={title}
      width={width}
      footer={footer}
      onCancel={onCancel}
      onOk={onOk}
      destroyOnClose={destroyOnClose}
      {...modalProps}
      confirmLoading={confirmLoading}
      centered
      bodyStyle={width === '1200px' ? { height: '780px', overflow: 'auto' } : {}}
    >
      {loading ? <Spin /> : props.children}
    </Modal>
  );
};

export default Dialog;
