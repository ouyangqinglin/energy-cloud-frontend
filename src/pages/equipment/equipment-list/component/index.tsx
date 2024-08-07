import React, { useCallback, useRef, useState } from 'react';
import { Modal, Button, Descriptions } from 'antd';
import { ModalProps, Tabs } from 'antd';
import { formatMessage } from '@/utils';
import YTProTable from '@/components/YTProTable';
import { ActionType, ProConfigProvider } from '@ant-design/pro-components';
import { YTProColumns } from '@/components/YTProTable/typing';
import { FormattedMessage } from 'umi';

// export type lifeCycleProps = ModalProps & {
//   summaryInfo?: React.ReactNode;
//   onOffRecord?: React.ReactNode;
// }

export interface AuthDataType {
  id: string;
  secret?: string;
  encryptKey?: string;
  status?: number;
}

export const onOffType = {
  1: {
    text: formatMessage({ id: 'equipmentList.on', defaultMessage: '上线' }),
    status: 'On',
  },
  0: {
    text: formatMessage({ id: 'equipmentList.off', defaultMessage: '下线' }),
    status: 'Off',
  },
}

export const getOnOffColumns: YTProColumns<AuthDataType>[] = [
  //数据来源
  {
    title: formatMessage({ id: 'common.index', defaultMessage: '序号' }),
    dataIndex: 'index',
    valueType: 'index',
    width: 48,
  },
  {
    title: formatMessage({ id: 'common.time', defaultMessage: '时间' }),
    dataIndex: 'time',
    valueType: 'dateTimeRange',
    hideInSearch: false,
    width: 120,
  },
  {
    title: formatMessage({ id: 'equipmentList.nodeId', defaultMessage: '节点ID' }),
    dataIndex: 'nodeId',
    hideInSearch: true,
    width: 48,
  },
  {
    title: formatMessage({ id: 'equipmentList.type', defaultMessage: '类型' }),
    dataIndex: 'type',
    hideInSearch: false,
    valueEnum:onOffType,
    width: 48,
  },
  {
    title: formatMessage({ id: 'equipmentList.reason', defaultMessage: '原因' }),
    dataIndex: 'reason',
    hideInSearch: true,
    width: 200,
  },
]


const LifeCycleDialog: React.FC<ModalProps> = (props) => {
  const { onCancel, confirmLoading, ...reseProps } = props;
  const actionRef = useRef<ActionType>();

  const onChange = (key: string) => {
    console.log(key);
  };


  return (
    <>
      <Modal
        title={formatMessage({ id: 'equipmentList.lifeCycle', defaultMessage: '生命周期' })}
        footer={[
          <Button key="back" onClick={onCancel} loading={confirmLoading}>
            {formatMessage({ id: 'common.close', defaultMessage: '关闭' })}
          </Button>,
        ]}
        onCancel={onCancel}
        width={800}
        destroyOnClose
        {...reseProps}
      >
        <Tabs
          defaultActiveKey="1"
          onChange={onChange}
          items={[
            {
              label: `概要信息`,
              key: '1',
              children: (
                <Descriptions column={24}>
                  <Descriptions.Item
                    span={12}
                    label={<FormattedMessage id="common.index" defaultMessage="序号" />}
                  >
                    {1}
                  </Descriptions.Item>
                  <Descriptions.Item
                    span={12}
                    label={<FormattedMessage id="common.time" defaultMessage="时间" />}
                  >
                    {1}
                  </Descriptions.Item>
                  <Descriptions.Item
                    span={12}
                    label={<FormattedMessage id="equipmentList.operate" defaultMessage="操作" />}
                  >
                    {1}
                  </Descriptions.Item>
                </Descriptions>
              ),
            },
            {
              label: `上下线记录`,
              key: '2',
              children: (
                <YTProTable
                  actionRef={actionRef}
                  columns={getOnOffColumns}
                  toolBarRender={() => []}
                >

                </YTProTable>
              ),
            },
          ]}
        />
      </Modal>
    </>

  );
};

export default LifeCycleDialog;