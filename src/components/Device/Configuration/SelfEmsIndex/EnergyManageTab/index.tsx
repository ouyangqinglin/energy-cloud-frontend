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
          <Detail.Label title="手动模式设置">
            <ConfigModal
              title={'手动模式设置'}
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
          <Detail.Label title="备电模式设置">
            <ConfigModal
              title={'备电模式设置'}
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
          <Detail.Label title="尖峰平谷时段设置">
            <ConfigModal
              title={'尖峰平谷时段设置'}
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
    runSubmitFrom({
      deviceId,
      input: { ...formData },
      serviceId: 'PeakShavingAndValleyFillingModeSetting',
    }).then((data) => {
      if (data) {
        message.success('操作成功');
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
          <Detail.Label title="削峰填谷模式设置">
            <Button type="primary" onClick={peakLoadSubmit}>
              下发参数
            </Button>
          </Detail.Label>
          {/* 动态增减表单 */}
          <Form
            form={runPeakForm}
            //name="dynamic_form_nest_item"
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
                <Form.Item name="peakShavingAndValleyFillingModeMaximumSOC" label="最高SOC">
                  <InputNumber className="w-full" addonAfter="%" />
                </Form.Item>
              </Col>
              <Col flex="25%">
                <Form.Item name="peakShavingAndValleyFillingModeLowestSOC" label="最低SOC">
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
                        label="时段1"
                        {...restField}
                        name={[name, 'pcsRunningTimeFrame']}
                        //rules={[{ required: true, message: 'Missing first name' }]}
                      >
                        <TimePicker.RangePicker
                          className="w-full"
                          format={timeFormat}
                          minuteStep={15}
                          placeholder={['开始', '结束']}
                          getPopupContainer={(triggerNode) =>
                            triggerNode.parentElement || document.body
                          }
                        />
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'powerMode']} label="充电模式">
                        <Select placeholder="请选择充电模式" style={{ width: '70px' }}>
                          <Option value="0">放电</Option>
                          <Option value="1">充电</Option>
                        </Select>
                      </Form.Item>
                      <Form.Item {...restField} name={[name, 'executionPower']} label="执行功率">
                        <InputNumber className="w-full" addonAfter="kW" min={-110} max={110} />
                      </Form.Item>
                      <MinusCircleOutlined onClick={() => remove(name)} />
                    </Space>
                  ))}
                  <Form.Item>
                    <Button type="primary" icon={<PlusOutlined />} onClick={() => add()}>
                      新增时段
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
