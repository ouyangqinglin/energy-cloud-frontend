import React, { useMemo, useCallback } from 'react';
import {
  Button,
  Row,
  Col,
  Form,
  InputNumber,
  Select,
  TimePicker,
  Space,
  DatePicker,
  message,
} from 'antd';
import Detail from '@/components/Detail';
import type { GroupItem } from '@/components/Detail';
import {
  manaulParamsItems,
  backupModeItems,
  peakTimeItems,
  manulSetColumns,
  BackupPowerSetColumns,
  PeakSetColumns,
} from './config';
import { PlusOutlined, MinusCircleOutlined } from '@ant-design/icons';
import type { DeviceDataType } from '@/services/equipment';
import ConfigModal from '../ConfigModal';
import { editSetting } from '@/services/equipment';
import { useRequest } from 'umi';
import moment from 'moment';
import { formatMessage } from '@/utils';
export type ConfigProps = {
  deviceId: string;
  productId: string;
  deviceData: DeviceDataType;
  realTimeData?: any;
};
const DatePick: any = DatePicker;
const timeFormat = 'HH:mm';
const { Option } = Select;
export const EnergyManageTab: React.FC<ConfigProps> = (props) => {
  const { realTimeData, deviceId, productId } = props;
  const [runPeakForm] = Form.useForm();
  const { loading, run: runSubmitFrom } = useRequest(editSetting, {
    manual: true,
  });
  const peakLoadSubmit = useCallback(
    (formData: any) => {
      runPeakForm?.submit();
    },
    [deviceId],
  );
  const manaulModeSetting = useMemo<GroupItem[]>(() => {
    return [
      {
        label: (
          <Detail.Label title={formatMessage({ id: 'device.manualModeSetting', defaultMessage: '手动模式设置' })}>
            <ConfigModal
              title={formatMessage({ id: 'device.manualModeSetting', defaultMessage: '手动模式设置' })}
              deviceId={deviceId}
              productId={productId}
              realTimeData={realTimeData}
              columns={manulSetColumns}
              serviceId={'ManualModeSetting'}
            />
          </Detail.Label>
        ),
        items: manaulParamsItems,
      },
    ];
  }, []);
  const backupModeSetting = useMemo<GroupItem[]>(() => {
    return [
      {
        label: (
          <Detail.Label title={formatMessage({ id: 'device.backupPowerModeSetting', defaultMessage: '备电模式设置' })}>
            <ConfigModal
              title={formatMessage({ id: 'device.backupPowerModeSetting', defaultMessage: '备电模式设置' })}
              deviceId={deviceId}
              productId={productId}
              realTimeData={realTimeData}
              columns={BackupPowerSetColumns}
              serviceId={'BackupPowerModeSetting'}
            />
          </Detail.Label>
        ),
        items: backupModeItems,
      },
      {
        label: (
          <Detail.Label title={formatMessage({ id: 'device.peakAndValleyTimeSetting', defaultMessage: '尖峰平谷时段设置' })}>
            <ConfigModal
              title={formatMessage({ id: 'device.peakAndValleyTimeSetting', defaultMessage: '尖峰平谷时段设置' })}
              deviceId={deviceId}
              productId={productId}
              realTimeData={realTimeData}
              columns={PeakSetColumns}
              serviceId={'PeakAndValleyTimeSettings'}
            />
          </Detail.Label>
        ),
        items: peakTimeItems,
      },
    ];
  }, []);

  const onFinish = useCallback((formData) => {
    let PeriodOfTime = formData.PeriodOfTime;
    if (PeriodOfTime && PeriodOfTime.length > 0) {
      PeriodOfTime = PeriodOfTime.map((item: any) => {
        return {
          ...item,
          pcsRunningTimeFrame:
            moment(item.pcsRunningTimeFrame[0]).format(timeFormat) +
            '-' +
            moment(item.pcsRunningTimeFrame[1]).format(timeFormat),
        };
      });
    }
    runSubmitFrom({
      deviceId,
      input: { ...formData, PeriodOfTime },
      serviceId: 'PeakShavingAndValleyFillingModeSetting',
    }).then((data) => {
      if (data) {
        message.success(formatMessage({ id: 'common.operateSuccess', defaultMessage: '操作成功' }));
      }
    });
  }, []);
  return (
    <>
      <div className="px24">
        <Detail.Group
          data={realTimeData}
          items={manaulModeSetting}
          detailProps={{
            colon: false,
            labelStyle: { width: 140 },
            valueStyle: { width: '40%' },
          }}
        />
        <div>
          <Detail.Label title={formatMessage({ id: 'device.peakShavingValleyFillingModeSetting', defaultMessage: '削峰填谷模式设置' })}>
            <Button type="primary" onClick={peakLoadSubmit}>
              {formatMessage({ id: 'siteMonitor.issueParameters', defaultMessage: '下发参数' })}
            </Button>
          </Detail.Label>
          {/* 动态增减表单 */}
          <Form
            form={runPeakForm}
            autoComplete="off"
            className="setting-form"
            layout="horizontal"
            labelAlign="right"
            labelCol={{ flex: '116px' }}
            onFinish={onFinish}
            key="PeakShavingAndValleyFillingModeSetting"
            // onValuesChange={setDisableRunFalse}
          >
            <Row>
              <Col flex="25%">
                <Form.Item
                  name="peakShavingAndValleyFillingModeMaximumSOC"
                  label={formatMessage({ id: 'device.maxSoc', defaultMessage: '最高SOC' })}
                  rules={[{ required: true, message: formatMessage({ id: 'device.pleaseEnterValue', defaultMessage: '请输入值' }) }]}
                >
                  <InputNumber className="w-full" addonAfter="%" />
                </Form.Item>
              </Col>
              <Col flex="25%">
                <Form.Item
                  name="peakShavingAndValleyFillingModeLowestSOC"
                  label={formatMessage({ id: 'device.minSoc', defaultMessage: '最低SOC' })}
                  rules={[{ required: true, message: formatMessage({ id: 'device.pleaseEnterValue', defaultMessage: '请输入值' }) }]}
                >
                  <InputNumber className="w-full" addonAfter="%" />
                </Form.Item>
              </Col>
            </Row>
            <Form.List name="PeriodOfTime">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        label={formatMessage({ id: 'device.timePeriod', defaultMessage: '时段' }) + "1"}
                        {...restField}
                        name={[name, 'pcsRunningTimeFrame']}
                        //rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <TimePicker.RangePicker
                          className="w-full"
                          format={timeFormat}
                          minuteStep={15}
                          placeholder={[formatMessage({ id: 'common.start', defaultMessage: '开始' }), formatMessage({ id: 'common.end', defaultMessage: '结束' })]}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentElement || document.body
                          }
                        />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'powerMode']} label={formatMessage({ id: 'device.chargeMode', defaultMessage: '充电模式' })}>
                        <Select placeholder={formatMessage({id: 'common.pleaseEnter', defaultMessage: '请选择' }) + formatMessage({id: 'device.chargeMode', defaultMessage: '充电模式' })} style={{ width: '70px' }}>
                          <Option value="0">{formatMessage({ id: 'device.discharge', defaultMessage: '放电' })}</Option>
                          <Option value="1">{formatMessage({ id: 'device.charge', defaultMessage: '充电' })}</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'executionPower']} label={formatMessage({ id: 'siteMonitor.executionPower', defaultMessage: '执行功率' })}>
                        <InputNumber className="w-full" addonAfter="kW" min={-110} max={110} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => add()}>
                      {formatMessage({ id: 'common.add', defaultMessage: '新建' }) + formatMessage({ id: 'device.timePeriod', defaultMessage: '时间段' })}
                    </Button>
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Form>
        </div>
        <Detail.Group
          data={realTimeData}
          items={backupModeSetting}
          detailProps={{
            colon: false,
            labelStyle: { width: 140 },
            valueStyle: { width: '40%' },
          }}
        />
      </div>
    </>
  );
};
export default EnergyManageTab;
