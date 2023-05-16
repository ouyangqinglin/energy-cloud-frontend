/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-09 11:09:19
 * @LastEditTime: 2023-05-16 11:40:04
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\setting.tsx
 */

import React from 'react';
import {
  Row,
  Col,
  Switch,
  Form,
  Input,
  Button,
  TimePicker,
  DatePicker,
  message,
  Modal,
} from 'antd';
import Label from '@/components/Detail/label';
import moment from 'moment';
import { useRequest } from 'umi';
import { editSetting } from './service';

export type ControlType = {
  systemFiring: boolean;
  systemStop: boolean;
  flash: boolean;
  bmsConnect: boolean;
  bmsBreak: boolean;
};

const DatePick: any = DatePicker;
const timeFormat = 'HH:mm';

type SettingProps = {
  id: string;
};

const Setting: React.FC<SettingProps> = ({ id }) => {
  const [controlForm] = Form.useForm();
  const [protectFrom] = Form.useForm();
  const [runForm] = Form.useForm();
  const [timeForm] = Form.useForm();
  const { loading, run } = useRequest(editSetting, {
    manual: true,
  });

  const onControlChange = (fieldValue: ControlType) => {
    const field = Object.keys(fieldValue)[0];
    let content = '';
    switch (field) {
      case 'systemFiring':
        content = '当前系统为停止状态，是否执行系统启动指令';
        break;
      case 'systemStop':
        content = '当前系统为启动状态，是否执行系统停止指令';
        break;
      case 'flash':
        content = '当前设置参数将储存至EMS中，是否执行falsh保存指令';
        break;
      case 'bmsConnect':
        content = '当前BMS主接触器为断开状态，是否执行BMS主接触器为闭合指令';
        break;
      case 'bmsBreak':
        content = '当前BMS主接触器为闭合状态，是否执行BMS主接触器为断开指令';
        break;
    }
    Modal.confirm({
      title: '确认',
      content: content,
      okText: '确认',
      cancelText: '取消',
      onOk: () =>
        run({ deviceId: id, input: { ...fieldValue }, serviceId: '' }).then((res) => {
          message.success('下发成功');
          controlForm.setFieldValue(field, false);
        }),
    });
  };

  const onProtectClick = () => {
    protectFrom.submit();
  };

  const onRunClick = () => {
    run({ deviceId: id, input: { ...runForm.getFieldsValue() }, serviceId: '' }).then((res) => {
      message.success('下发成功');
    });
  };

  const onTimeClick = () => {
    timeForm.submit();
  };

  const onTimeFormFinish = (formData: any) => {
    let content = '';
    if (formData.time) {
      content = '是否执行系统校时指令并进行校时参数下发';
    } else {
      content = '是否执行当前校时参数下发';
    }
    Modal.confirm({
      title: '确认',
      content: content,
      okText: '确认',
      cancelText: '取消',
      onOk: () =>
        run({ deviceId: id, input: { ...formData }, serviceId: '' }).then((res) => {
          message.success('下发成功');
          timeForm.setFieldValue('time', false);
        }),
    });
  };

  return (
    <>
      <Label title="控制指令" />
      <Form
        form={controlForm}
        className="setting-form"
        layout="horizontal"
        onValuesChange={onControlChange}
      >
        <Row>
          <Col flex="20%">
            <Form.Item name="systemFiring" label="系统启动" labelCol={{ flex: '116px' }}>
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="20%">
            <Form.Item name="systemStop" label="系统停止" labelCol={{ flex: '116px' }}>
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="20%">
            <Form.Item name="flash" label="falsh保存" labelCol={{ flex: '116px' }}>
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="20%">
            <Form.Item name="bmsConnect" label="BMS主接触器闭合">
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="20%">
            <Form.Item name="bmsBreak" label="BMS主接触器断开">
              <Switch />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Label
        title="保护参数设置"
        operate={
          <Button type="primary" onClick={onProtectClick}>
            下发参数
          </Button>
        }
      />
      <Form
        form={protectFrom}
        className="setting-form"
        layout="horizontal"
        labelCol={{ flex: '116px' }}
        onFinish={(formData) =>
          run({ deviceId: id, input: { ...formData }, serviceId: '' }).then((res) => {
            message.success('下发成功');
          })
        }
      >
        <Row>
          <Col flex="25%">
            <Form.Item
              name="a"
              label="过充保护"
              rules={[{ required: true, message: '过充保护必填' }]}
            >
              <Input addonAfter="V" />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="b"
              label="过充释放"
              rules={[{ required: true, message: '过充释放必填' }]}
            >
              <Input addonAfter="V" />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="c"
              label="过放保护"
              rules={[{ required: true, message: '过放保护必填' }]}
            >
              <Input addonAfter="V" />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="d"
              label="过放释放"
              rules={[{ required: true, message: '过放释放必填' }]}
            >
              <Input addonAfter="V" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Label
        title="运行参数设置"
        operate={
          <Button type="primary" onClick={onRunClick}>
            下发参数
          </Button>
        }
      />
      <Form
        form={runForm}
        className="setting-form"
        layout="horizontal"
        labelAlign="right"
        labelCol={{ flex: '116px' }}
      >
        <Row>
          <Col flex="25%">
            <Form.Item name="a" label="手/自动切换">
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="b" label="手动PCS功率">
              <Input addonAfter="KW" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="25%">
            <Form.Item name="c" label="时段1">
              <TimePicker.RangePicker
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="g" label="执行功率">
              <Input addonAfter="KW" min={-110} max={110} />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="c" label="时段2">
              <TimePicker.RangePicker
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="g" label="执行功率">
              <Input addonAfter="KW" min={-110} max={110} />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="c" label="时段3">
              <TimePicker.RangePicker
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="g" label="执行功率">
              <Input addonAfter="KW" min={-110} max={110} />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="c" label="时段4">
              <TimePicker.RangePicker
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="g" label="执行功率">
              <Input addonAfter="KW" min={-110} max={110} />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="c" label="时段5">
              <TimePicker.RangePicker
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="g" label="执行功率">
              <Input addonAfter="KW" min={-110} max={110} />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="c" label="时段6">
              <TimePicker.RangePicker
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="g" label="执行功率">
              <Input addonAfter="KW" min={-110} max={110} />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="aa" label="时段7">
              <TimePicker.RangePicker
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="g" label="执行功率">
              <Input addonAfter="KW" min={-110} max={110} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Label
        title="校时设置"
        operate={
          <Button type="primary" onClick={onTimeClick}>
            下发参数
          </Button>
        }
      />
      <Form
        form={timeForm}
        layout="horizontal"
        labelCol={{ flex: '116px' }}
        onFinish={onTimeFormFinish}
      >
        <Row>
          <Col flex="25%">
            <Form.Item name="time" label="系统校时">
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="a"
              label="系统时间"
              rules={[{ required: true, message: '系统时间必填' }]}
            >
              <DatePick showTime />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Setting;
