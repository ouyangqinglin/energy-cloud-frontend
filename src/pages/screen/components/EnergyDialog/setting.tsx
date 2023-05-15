/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-09 11:09:19
 * @LastEditTime: 2023-05-15 10:18:08
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\screen\components\EnergyDialog\setting.tsx
 */

import React from 'react';
import { Row, Col, Switch, Form, Input, Button, TimePicker, DatePicker } from 'antd';
import Label from '@/components/Detail/label';
import moment from 'moment';
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

const Setting: React.FC = () => {
  const onControlChange = (field: ControlType) => {
    // request
  };

  return (
    <>
      <Label title="控制指令" />
      <Form className="setting-form" layout="horizontal" onValuesChange={onControlChange}>
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
      <Label title="保护参数设置" operate={<Button type="primary">下发参数</Button>} />
      <Form className="setting-form" layout="horizontal" labelCol={{ flex: '116px' }}>
        <Row>
          <Col flex="25%">
            <Form.Item name="a" label="过充保护">
              <Input addonAfter="V" />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="b" label="过充释放">
              <Input addonAfter="V" />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="c" label="过放保护">
              <Input addonAfter="V" />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="d" label="过放释放">
              <Input addonAfter="V" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      <Label title="运行参数设置" operate={<Button type="primary">下发参数</Button>} />
      <Form
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
      <Label title="校时设置" operate={<Button type="primary">下发参数</Button>} />
      <Form layout="horizontal" labelCol={{ flex: '116px' }}>
        <Row>
          <Col flex="25%">
            <Form.Item name="a" label="系统校时">
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="a" label="系统年">
              <DatePick showTime />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </>
  );
};

export default Setting;
