/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-30 15:12:51
 * @LastEditTime: 2023-05-30 15:23:20
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DetailDialog\index.tsx
 */
import React from 'react';
import { Modal, Button } from 'antd';
import type { ModalProps } from 'antd';
import Detail from '../Detail';
import type { DetailProps } from '../Detail';

export type DetailDialogProps = ModalProps & {
  detailProps: DetailProps;
};

const DetailDialog: React.FC<DetailDialogProps> = (props) => {
  const { detailProps, onCancel } = props;

  return (
    <>
      <Modal
        title="详情"
        footer={[
          <Button type="primary" key="confirm" onClick={onCancel}>
            确定
          </Button>,
        ]}
        {...props}
      >
        <Detail {...detailProps} />
      </Modal>
    </>
  );
};

export default DetailDialog;
