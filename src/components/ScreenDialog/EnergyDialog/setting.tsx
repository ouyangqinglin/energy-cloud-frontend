/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-05-09 11:09:19
 * @LastEditTime: 2023-09-25 10:47:14
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\ScreenDialog\EnergyDialog\setting.tsx
 */

import React, { useCallback, useEffect, useState } from 'react';
import {
  Row,
  Col,
  Switch,
  Form,
  InputNumber,
  Button,
  TimePicker,
  DatePicker,
  message,
  Modal,
} from 'antd';
import type { FormInstance } from 'antd';
import Label from '@/components/Detail/DotLabel';
import { default as LineLabel } from '@/components/Detail/LineLabel';
import moment from 'moment';
import type { Moment } from 'moment';
import { useRequest } from 'umi';
import { editSetting } from '@/services/equipment';
import { isEmpty } from '@/utils';
import { closeFormat } from '@/utils/format';
import lodash from 'lodash';
import { useBoolean } from 'ahooks';
import { DeviceTypeEnum } from '@/utils/dictionary';

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
  settingData?: Record<string, any>;
  isLineLabel?: boolean;
  isDeviceChild?: boolean;
  type?: DeviceTypeEnum;
};

const powerMap = new Map([
  ['power1', 'PCSPeriodPowerOne'],
  ['power2', 'PCSPeriodPowerTwo'],
  ['power3', 'PCSPeriodPowerThree'],
  ['power4', 'PCSPeriodPowerFour'],
  ['power5', 'PCSPeriodPowerFive'],
]);

const timeMap = new Map([
  [
    'time1',
    [
      'AtTheBeginningOfThePeriodOne',
      'StartingPointOfTimePeriodOne',
      'AtTheEndOfThePeriodOne',
      'PeriodEndMinuteOne',
    ],
  ],
  [
    'time2',
    [
      'AtTheBeginningOfThePeriodTwo',
      'StartingPointOfTimePeriodTwo',
      'AtTheEndOfThePeriodTwo',
      'PeriodEndMinuteTwo',
    ],
  ],
  [
    'time3',
    [
      'AtTheBeginningOfThePeriodThree',
      'StartingPointOfTimePeriodThree',
      'AtTheEndOfThePeriodThree',
      'PeriodEndMinuteThree',
    ],
  ],
  [
    'time4',
    [
      'AtTheBeginningOfThePeriodFour',
      'StartingPointOfTimePeriodFour',
      'AtTheEndOfThePeriodFour',
      'PeriodEndMinuteFour',
    ],
  ],
  [
    'time5',
    [
      'AtTheBeginningOfThePeriodFive',
      'StartingPointOfTimePeriodFive',
      'AtTheEndOfThePeriodFive',
      'PeriodEndMinuteFive',
    ],
  ],
]);

const Setting: React.FC<SettingProps> = (props) => {
  const { id, isLineLabel = false, isDeviceChild, type } = props;
  const settingData = props.settingData || {};
  const [controlForm] = Form.useForm();
  const [protectFrom] = Form.useForm();
  const [runForm] = Form.useForm();
  const [timeForm] = Form.useForm();
  const [disableProtect, { setTrue: setDisableProtectTrue, setFalse: setDisableProtectFlalse }] =
    useBoolean(true);
  const [disableRun, { setTrue: setDisableRunTrue, setFalse: setDisableRunFalse }] =
    useBoolean(true);
  const [disableTime, { setTrue: setDisableTimeTrue, setFalse: setDisableTimeFalse }] =
    useBoolean(true);
  const { loading, run } = useRequest(editSetting, {
    manual: true,
  });

  const onControlChange = useCallback(
    (fieldValue: ControlType) => {
      const field = Object.keys(fieldValue)[0];
      let content: React.ReactNode;
      switch (field) {
        case 'sysStart':
        case 'sysStop':
          const runStatus = settingData?.emsSysStatus ? '启动' : '停止';
          content = (
            <span>
              当前系统为<span className="cl-primary">{runStatus}状态</span>，是否执行系统
              {field === 'sysStart' ? '启动' : '停止'}指令
            </span>
          );
          break;
        case 'bmsClose':
        case 'bmsBreak':
          const contactStatus = closeFormat(settingData?.MainContactorStatus);
          content = (
            <span>
              当前BMS主接触器为<span className="cl-primary">{contactStatus}状态</span>
              ，是否执行BMS主接触器为{field === 'bmsClose' ? '闭合' : '断开'}指令
            </span>
          );
          break;
        case 'manualAutomaticSwitch':
          const systemStatus = settingData?.sysModel ? '自动' : '手动';
          content = (
            <span>
              当前系统模式为<span className="cl-primary">{systemStatus}状态</span>
              是否执行手/自动模式切换指令
            </span>
          );
          break;
        case 'sysReset':
          content = <span>是否执行系统复位指令</span>;
          break;
      }
      Modal.confirm({
        title: '确认',
        content: content,
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          if (field == 'sysReset') {
            message.success('下发成功');
            controlForm.setFieldValue(field, false);
            return Promise.resolve();
          }
          return run({
            deviceId: id,
            input: { [field]: 1 },
            serviceId: field == 'manualAutomaticSwitch' ? 'operateModel' : field,
          })
            .then((data) => {
              if (data) {
                message.success('下发成功');
              }
            })
            .finally(() => {
              controlForm.setFieldValue(field, false);
            });
        },
        onCancel: () => {
          controlForm.setFieldValue(field, false);
        },
      });
    },
    [controlForm],
  );

  const onProtectClick = useCallback(() => {
    protectFrom.submit();
  }, [protectFrom]);
  const requestProtect = useCallback((formData) => {
    Modal.confirm({
      title: '确认',
      content: '是否执行当前保护参数下发',
      okText: '确认',
      cancelText: '取消',
      onOk: () =>
        run({ deviceId: id, input: { ...formData }, serviceId: 'setChargeReleaseProtect' }).then(
          (data) => {
            if (data) {
              message.success('下发成功');
              setDisableProtectTrue();
            }
          },
        ),
    });
  }, []);

  const onRunClick = useCallback(() => {
    runForm.submit();
  }, [runForm]);
  const requestRun = useCallback(
    (formData) => {
      Modal.confirm({
        title: '确认',
        content: '是否执行当前运行参数下发',
        okText: '确认',
        cancelText: '取消',
        onOk: () => {
          const inputData: any = { handOpePcsPower: formData.handOpePcsPower };
          let fields = [];
          for (const key in formData) {
            if (key.includes('power')) {
              inputData[powerMap.get(key) || ''] = formData[key];
            } else if (key.includes('time') && formData[key] && formData[key].length) {
              fields = timeMap.get(key) || [];
              inputData[fields[0]] = formData[key][0].hour();
              inputData[fields[1]] = formData[key][0].minute();
              inputData[fields[2]] = formData[key][1].hour();
              inputData[fields[3]] = formData[key][1].minute();
            }
          }
          run({
            deviceId: id,
            input: inputData,
            serviceId: 'pcsPowerSetting',
          }).then((data) => {
            if (data) {
              message.success('下发成功');
              setDisableRunTrue();
            }
          });
        },
      });
    },
    [runForm],
  );

  const onTimeClick = useCallback(() => {
    timeForm.submit();
  }, [timeForm]);
  const onTimeFormFinish = useCallback((formData: any) => {
    Modal.confirm({
      title: '确认',
      content: '是否执行当前校时参数下发',
      okText: '确认',
      cancelText: '取消',
      onOk: () => {
        const time: Moment = formData.time;
        run({
          deviceId: id,
          input: {
            yearWait: time.year(),
            monthWait: time.month() + 1,
            dayWait: time.date(),
            hourWait: time.hour(),
            minuteWait: time.minute(),
            secondWait: time.second(),
            weekWait: time.day() || 7,
          },
          serviceId: 'correctionTime',
        }).then((data) => {
          if (data) {
            message.success('下发成功');
            setDisableTimeTrue();
          }
        });
      },
    });
  }, []);

  const validatorTime = useCallback((getFieldValue: FormInstance['getFieldValue'], num: number) => {
    const prevValue: Moment[] = getFieldValue('time' + (num - 1));
    const nextValue: Moment[] = getFieldValue('time' + (num + 1));
    return {
      validator: (_: any, value: Moment[]) => {
        if (value && value.length) {
          if (nextValue && nextValue.length && value[1].isAfter(nextValue[0])) {
            return Promise.reject(`时段${num}应小于时段${num + 1}`);
          }
          if (num > 1 && prevValue && prevValue.length && value[0].isBefore(prevValue[1])) {
            return Promise.reject(`时段${num}应大于时段${num - 1}`);
          }
        } else {
          if (nextValue && nextValue.length) {
            return Promise.reject(`时段${num}必填`);
          }
          if (getFieldValue('power' + num)) {
            return Promise.reject(`时段${num}必填`);
          }
        }
        return Promise.resolve();
      },
    };
  }, []);
  const validatorPower = useCallback(
    (getFieldValue: FormInstance['getFieldValue'], num: number) => {
      const timeValue: Moment[] = getFieldValue('time' + num);
      return {
        validator: (_: any, value: string) => {
          if (timeValue && timeValue.length) {
            if (isEmpty(value)) {
              return Promise.reject(`功率不能为空`);
            }
          }
          return Promise.resolve();
        },
      };
    },
    [],
  );

  useEffect(() => {
    if (!lodash.isEmpty(settingData)) {
      if (disableProtect && !isDeviceChild) {
        protectFrom.setFieldsValue({
          OverchargeProtection: settingData?.OverchargeProtection ?? '',
          OverchargeRelease: settingData?.OverchargeRelease ?? '',
          OverdischargeProtection: settingData?.OverdischargeProtection ?? '',
          Overrelease: settingData?.Overrelease ?? '',
        });
      }
      if (disableRun) {
        const runData: any = {};
        timeMap.forEach((item, key) => {
          runData[key] = settingData?.[item[0]]
            ? [
                moment(`2023-06-07 ${settingData?.[item[0]]}:${settingData?.[item[1]]}`),
                moment(`2023-06-07 ${settingData?.[item[2]]}:${settingData?.[item[3]]}`),
              ]
            : [];
        });
        powerMap.forEach((item, key) => {
          runData[key] = settingData?.[item];
        });
        runForm.setFieldsValue({
          handOpePcsPower: settingData?.handOpePcsPower ?? '',
          ...runData,
        });
      }
      if (disableTime && !isDeviceChild) {
        timeForm.setFieldsValue({
          time: settingData?.sysTem ? moment(settingData?.sysTem) : null,
        });
      }
    }
  }, [settingData, protectFrom, runForm, timeForm]);

  return (
    <>
      {isLineLabel ? <LineLabel title="控制指令" /> : <Label title="控制指令" />}
      <Form
        form={controlForm}
        className="setting-form"
        layout="horizontal"
        onValuesChange={onControlChange}
      >
        <Row>
          <Col flex="25%">
            <Form.Item
              name="sysStart"
              label="系统启动"
              labelCol={{ flex: '116px' }}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="sysStop"
              label="系统停止"
              labelCol={{ flex: '116px' }}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="bmsClose" label="BMS主接触器闭合" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item name="bmsBreak" label="BMS主接触器断开" valuePropName="checked">
              <Switch />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="manualAutomaticSwitch"
              label="手/自动切换"
              labelCol={{ flex: '116px' }}
              valuePropName="checked"
            >
              <Switch />
            </Form.Item>
          </Col>
          {type === DeviceTypeEnum.BWattEms ? (
            <Col flex="25%">
              <Form.Item
                name="sysReset"
                label="系统复位"
                labelCol={{ flex: '116px' }}
                valuePropName="checked"
              >
                <Switch />
              </Form.Item>
            </Col>
          ) : (
            <></>
          )}
        </Row>
      </Form>
      {!isDeviceChild ? (
        <>
          {isLineLabel ? (
            <LineLabel title="电池保护参数设置">
              <Button
                type="primary"
                onClick={onProtectClick}
                loading={loading}
                disabled={disableProtect}
              >
                下发参数
              </Button>
            </LineLabel>
          ) : (
            <Label
              title="电池保护参数设置"
              operate={
                <Button
                  type="primary"
                  onClick={onProtectClick}
                  loading={loading}
                  disabled={disableProtect}
                >
                  下发参数
                </Button>
              }
            />
          )}
          <Form
            form={protectFrom}
            className="setting-form"
            layout="horizontal"
            labelCol={{ flex: '116px' }}
            onFinish={requestProtect}
            onValuesChange={setDisableProtectFlalse}
          >
            <Row>
              <Col flex="25%">
                <Form.Item
                  name="OverchargeProtection"
                  label="过充保护"
                  rules={[{ required: true, message: '过充保护必填' }]}
                >
                  <InputNumber className="w-full" addonAfter="V" />
                </Form.Item>
              </Col>
              <Col flex="25%">
                <Form.Item
                  name="OverchargeRelease"
                  label="过充释放"
                  rules={[{ required: true, message: '过充释放必填' }]}
                >
                  <InputNumber className="w-full" addonAfter="V" />
                </Form.Item>
              </Col>
              <Col flex="25%">
                <Form.Item
                  name="OverdischargeProtection"
                  label="过放保护"
                  rules={[{ required: true, message: '过放保护必填' }]}
                >
                  <InputNumber className="w-full" addonAfter="V" />
                </Form.Item>
              </Col>
              <Col flex="25%">
                <Form.Item
                  name="Overrelease"
                  label="过放释放"
                  rules={[{ required: true, message: '过放释放必填' }]}
                >
                  <InputNumber className="w-full" addonAfter="V" />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <></>
      )}
      {isLineLabel ? (
        <LineLabel title="运行参数设置">
          <Button type="primary" onClick={onRunClick} loading={loading} disabled={disableRun}>
            下发参数
          </Button>
        </LineLabel>
      ) : (
        <Label
          title="运行参数设置"
          operate={
            <Button type="primary" onClick={onRunClick} loading={loading} disabled={disableRun}>
              下发参数
            </Button>
          }
        />
      )}
      <Form
        form={runForm}
        className="setting-form"
        layout="horizontal"
        labelAlign="right"
        labelCol={{ flex: '116px' }}
        onFinish={requestRun}
        onValuesChange={setDisableRunFalse}
      >
        <Row>
          <Col flex="25%">
            <Form.Item name="handOpePcsPower" label="手动PCS功率">
              <InputNumber className="w-full" addonAfter="kW" />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="25%">
            <Form.Item
              name="time1"
              label="时段1"
              rules={[({ getFieldValue }) => validatorTime(getFieldValue, 1)]}
            >
              <TimePicker.RangePicker
                className="w-full"
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
                getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="power1"
              label="执行功率"
              rules={[({ getFieldValue }) => validatorPower(getFieldValue, 1)]}
            >
              <InputNumber className="w-full" addonAfter="kW" min={-110} max={110} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="25%">
            <Form.Item
              name="time2"
              label="时段2"
              rules={[({ getFieldValue }) => validatorTime(getFieldValue, 2)]}
            >
              <TimePicker.RangePicker
                className="w-full"
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
                getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="power2"
              label="执行功率"
              rules={[({ getFieldValue }) => validatorPower(getFieldValue, 2)]}
            >
              <InputNumber className="w-full" addonAfter="kW" min={-110} max={110} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="25%">
            <Form.Item
              name="time3"
              label="时段3"
              rules={[({ getFieldValue }) => validatorTime(getFieldValue, 3)]}
            >
              <TimePicker.RangePicker
                className="w-full"
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
                getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="power3"
              label="执行功率"
              rules={[({ getFieldValue }) => validatorPower(getFieldValue, 3)]}
            >
              <InputNumber className="w-full" addonAfter="kW" min={-110} max={110} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="25%">
            <Form.Item
              name="time4"
              label="时段4"
              rules={[({ getFieldValue }) => validatorTime(getFieldValue, 4)]}
            >
              <TimePicker.RangePicker
                className="w-full"
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
                getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="power4"
              label="执行功率"
              rules={[({ getFieldValue }) => validatorPower(getFieldValue, 4)]}
            >
              <InputNumber className="w-full" addonAfter="kW" min={-110} max={110} />
            </Form.Item>
          </Col>
        </Row>
        <Row>
          <Col flex="25%">
            <Form.Item
              name="time5"
              label="时段5"
              rules={[({ getFieldValue }) => validatorTime(getFieldValue, 5)]}
            >
              <TimePicker.RangePicker
                className="w-full"
                format={timeFormat}
                minuteStep={15}
                placeholder={['开始', '结束']}
                getPopupContainer={(triggerNode) => triggerNode.parentElement || document.body}
              />
            </Form.Item>
          </Col>
          <Col flex="25%">
            <Form.Item
              name="power5"
              label="执行功率"
              rules={[({ getFieldValue }) => validatorPower(getFieldValue, 5)]}
            >
              <InputNumber className="w-full" addonAfter="kW" min={-110} max={110} />
            </Form.Item>
          </Col>
        </Row>
      </Form>
      {!isDeviceChild ? (
        <>
          {isLineLabel ? (
            <LineLabel title="校时设置">
              <Button type="primary" onClick={onTimeClick} loading={loading} disabled={disableTime}>
                下发参数
              </Button>
            </LineLabel>
          ) : (
            <Label
              title="校时设置"
              operate={
                <Button
                  type="primary"
                  onClick={onTimeClick}
                  loading={loading}
                  disabled={disableTime}
                >
                  下发参数
                </Button>
              }
            />
          )}
          <Form
            form={timeForm}
            layout="horizontal"
            labelCol={{ flex: '116px' }}
            onFinish={onTimeFormFinish}
            onValuesChange={setDisableTimeFalse}
          >
            <Row>
              <Col flex="25%">
                <Form.Item
                  name="time"
                  label="系统时间"
                  rules={[{ required: true, message: '系统时间必填' }]}
                >
                  <DatePick
                    className="w-full"
                    getPopupContainer={(triggerNode: any) => triggerNode.parentElement}
                    showTime
                  />
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </>
      ) : (
        <></>
      )}
    </>
  );
};

export default Setting;
