import { BetaSchemaForm, ProFormColumnsType, ProFormLayoutType } from '@ant-design/pro-form';
import { Button, DatePicker, Modal } from 'antd';
import dayjs from 'dayjs';
import { useState } from 'react';

const valueEnum = {
  all: { text: '全部', status: 'Default' },
  open: {
    text: '未解决',
    status: 'Error',
  },
  closed: {
    text: '已解决',
    status: 'Success',
    disabled: true,
  },
  processing: {
    text: '解决中',
    status: 'Processing',
  },
};

type DataItem = {
  name: string;
  state: string;
};

const columns: ProFormColumnsType<DataItem>[] = [
  {
    title: '标题',
    dataIndex: 'title',
    formItemProps: {
      rules: [
        {
          required: true,
          message: '此项为必填项',
        },
      ],
    },
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
    initialValue: '默认值',
    render: (value) => '' + value,
    convertValue: (value) => {
      return `标题：${value}`;
    },
    transform: (value) => {
      return {
        title: `${value}-转换`,
      };
    },
  },
  {
    title: '状态',
    dataIndex: 'state',
    valueType: 'select',
    valueEnum,
    width: 'md',
    render: (value) => '' + value,
    colProps: {
      xs: 24,
      md: 12,
    },
  },
  {
    title: '创建时间',
    key: 'showTime',
    dataIndex: 'createName',
    initialValue: [dayjs().add(-1, 'm'), dayjs()],
    render: (value) => '' + value,
    renderFormItem: () => <DatePicker.RangePicker />,
    transform: (value) => {
      return {
        startTime: value[0],
        endTime: value[1],
      };
    },
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
  },
  {
    title: '更新时间',
    dataIndex: 'updateName',
    initialValue: [dayjs().add(-1, 'm'), dayjs()],
    render: (value) => '' + value,
    renderFormItem: () => <DatePicker.RangePicker />,
    transform: (value) => {
      return {
        startTime: value[0],
        endTime: value[1],
      };
    },
    width: 'md',
    colProps: {
      xs: 24,
      md: 12,
    },
  },
];

export const YTModalForm = (props: { open: boolean; onClose: () => void }) => {
  const [layoutType, setLayoutType] = useState<ProFormLayoutType>('Form');
  const [readonly, setReadonly] = useState(false);
  return (
    <Modal title="Title" open={props.open} onOk={props.onClose} onCancel={props.onClose}>
      <Button onClick={() => setReadonly(true)}>qiehuan</Button>
      <BetaSchemaForm<DataItem>
        readonly={readonly}
        rowProps={{
          gutter: [16, 16],
        }}
        colProps={{
          span: 8,
        }}
        grid={true}
        onFinish={async (values) => {
          console.log(values);
        }}
        columns={columns}
      />
    </Modal>
  );
};
