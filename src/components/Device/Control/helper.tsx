/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-11-27 16:00:49
 * @LastEditTime: 2023-11-27 16:17:07
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\Device\Control\helper.tsx
 */
import { MinusCircleOutlined, PlusCircleOutlined } from '@ant-design/icons';
import { ProFormColumnsType } from '@ant-design/pro-components';
import { Col, Row, TimePicker } from 'antd';

export const timeRangeColumn: ProFormColumnsType = {
  valueType: 'formList',
  // dataIndex: 'ElectrovalenceTimeFrame',
  // initialValue: [{ effectiveTime: [] }],
  initialValue: [],
  fieldProps: {
    copyIconProps: false,
    creatorButtonProps: {
      className: 'pl0',
      creatorButtonText: '新增时间段',
      icon: <PlusCircleOutlined />,
      type: 'link',
      style: { width: 'unset' },
    },
    min: 1,
    deleteIconProps: {
      Icon: (prop: any) => {
        return <MinusCircleOutlined {...prop} style={{ color: '#165dff' }} />;
      },
      tooltipText: '删除',
    },
    itemRender: ({ listDom, action }: any) => {
      return (
        <div>
          <Row>
            <Col style={{ display: 'inline-flex', alignItems: 'flex-end' }} span={24}>
              {listDom}
              {action}
            </Col>
          </Row>
        </div>
      );
    },
  },
  colProps: {
    span: 24,
  },
  columns: [
    {
      title: '时间段',
      dataIndex: 'TimeFrame',
      valueType: 'timeRange',
      colProps: {
        span: 24,
      },
      formItemProps: {
        validateTrigger: 'submit',
        rules: [
          {
            required: true,
            message: '请选择时间段',
          },
        ],
      },
      renderFormItem: () => <TimePicker.RangePicker order={true} format={'HH:mm'} />,
    },
  ],
};
