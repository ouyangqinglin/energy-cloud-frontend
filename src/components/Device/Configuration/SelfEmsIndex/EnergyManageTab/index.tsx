import React, { useMemo, useCallback, useEffect } from 'react';
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
import ConfigModal from '../../../ConfigModal';
import { editSetting } from '@/services/equipment';
import { useRequest } from 'umi';
import moment from 'moment';
import { parseToArray } from '@/utils';
import { useBoolean } from 'ahooks';
import { useAuthority } from '@/hooks';
import { OnlineStatusEnum } from '@/utils/dictionary';
export type ConfigProps = {
  deviceId: string;
  productId: string;
  deviceData: DeviceDataType;
  realTimeData?: any;
};
const DatePick: any = DatePicker;
const timeFormat = 'HH:mm';
const { Option } = Select;

const timeFields = ['sharpTime', 'peakTime', 'flatTime', 'valleyTime'];

export const EnergyManageTab: React.FC<ConfigProps> = (props) => {
  const { realTimeData, deviceId, deviceData, productId } = props;

  const { authorityMap } = useAuthority([
    'iot:device:config:energyManage:manualModeSetting',
    'iot:device:config:energyManage:peakShaveModeSetting',
    'iot:device:config:energyManage:backupModeSetting',
    'iot:device:config:energyManage:peakValleyTimeSetting',
  ]);
  const [runPeakForm] = Form.useForm();
  const { loading, run: runSubmitFrom } = useRequest(editSetting, {
    manual: true,
  });
  const [disableRun, { setTrue: setDisableRunTrue, setFalse: setDisableRunFalse }] =
    useBoolean(true);

  const peakLoadSubmit = useCallback(
    (formData: any) => {
      runPeakForm?.submit();
    },
    [deviceId],
  );

  const peakValleyData = useMemo(() => {
    const timeData: Record<string, string[]> = {};
    const ElectrovalenceTimeFrame = parseToArray(realTimeData.ElectrovalenceTimeFrame).map(
      (item) => {
        timeData[timeFields[item?.ElectrovalenceType]] =
          timeData[timeFields[item?.ElectrovalenceType]] || [];
        timeData[timeFields[item?.ElectrovalenceType]].push(item?.TimeFrame);
        const timeFrame = item?.TimeFrame?.split?.('-') || [];
        return {
          ...item,
          TimeFrame:
            timeFrame.length > 1
              ? [moment('2023-01-01 ' + timeFrame[0]), moment('2023-01-01 ' + timeFrame[1])]
              : [],
        };
      },
    );
    const result: Record<string, any> = {
      ElectrovalenceTimeFrame,
    };
    timeFields.forEach((item) => {
      result[item] = timeData[item]?.join?.('，');
    });
    return result;
  }, [realTimeData]);

  const manaulModeSetting = useMemo<GroupItem[]>(() => {
    return [
      {
        label: (
          <Detail.Label title="手动模式设置">
            <ConfigModal
              title={'手动模式设置'}
              deviceId={deviceId}
              deviceData={deviceData}
              realTimeData={realTimeData}
              columns={manulSetColumns}
              serviceId={'ManualModeSetting'}
            />
          </Detail.Label>
        ),
        items: manaulParamsItems,
      },
    ];
  }, [deviceData, deviceId, realTimeData]);
  const backupModeSetting = useMemo<GroupItem[]>(() => {
    const result: GroupItem[] = [];
    if (authorityMap.get('iot:device:config:energyManage:backupModeSetting')) {
      result.push({
        label: (
          <Detail.Label title="备电模式设置">
            <ConfigModal
              title={'备电模式设置'}
              deviceId={deviceId}
              deviceData={deviceData}
              realTimeData={realTimeData}
              columns={BackupPowerSetColumns}
              serviceId={'BackupPowerModeSetting'}
            />
          </Detail.Label>
        ),
        items: backupModeItems,
      });
    }
    if (authorityMap.get('iot:device:config:energyManage:peakValleyTimeSetting')) {
      result.push({
        label: (
          <Detail.Label title="尖峰平谷时段设置">
            <ConfigModal
              width={'816px'}
              title={'尖峰平谷时段设置'}
              deviceId={deviceId}
              deviceData={deviceData}
              realTimeData={{
                ...realTimeData,
                ...peakValleyData,
              }}
              columns={PeakSetColumns}
              serviceId={'PeakAndValleyTimeSettings'}
              colProps={{
                span: 24,
              }}
            />
          </Detail.Label>
        ),
        items: peakTimeItems,
      });
    }
    return result;
  }, [deviceId, deviceData, productId, realTimeData, authorityMap, peakValleyData]);

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
        message.success('操作成功');
        setDisableRunTrue();
      }
    });
  }, []);

  useEffect(() => {
    if (disableRun) {
      runPeakForm?.setFieldsValue({
        peakShavingAndValleyFillingModeMaximumSOC:
          realTimeData?.peakShavingAndValleyFillingModeMaximumSOC,
        peakShavingAndValleyFillingModeLowestSOC:
          realTimeData?.peakShavingAndValleyFillingModeLowestSOC,
        PeriodOfTime: parseToArray(realTimeData?.PeriodOfTime).map((item) => {
          const timeFrame = item?.pcsRunningTimeFrame?.split?.('-') || [];
          item.CorD = item.CorD + '';
          return {
            ...item,
            pcsRunningTimeFrame:
              timeFrame.length > 1
                ? [moment('2023-01-01 ' + timeFrame[0]), moment('2023-01-01 ' + timeFrame[1])]
                : [],
          };
        }),
      });
    }
  }, realTimeData);

  return (
    <>
      <div className="px24">
        {authorityMap.get('iot:device:config:energyManage:manualModeSetting') ? (
          <Detail.Group
            data={realTimeData}
            items={manaulModeSetting}
            detailProps={{
              colon: false,
              labelStyle: { width: 140 },
              valueStyle: { width: '40%' },
            }}
          />
        ) : (
          <></>
        )}
        {authorityMap.get('iot:device:config:energyManage:peakShaveModeSetting') ? (
          <div>
            <Detail.Label title="削峰填谷模式设置">
              <Button
                type="primary"
                onClick={peakLoadSubmit}
                disabled={disableRun || deviceData?.status === OnlineStatusEnum.Offline}
              >
                下发参数
              </Button>
            </Detail.Label>
            {/* 动态增减表单 */}
            <Form
              form={runPeakForm}
              autoComplete="off"
              className="setting-form"
              layout="horizontal"
              labelAlign="right"
              labelCol={{ flex: '100px' }}
              onFinish={onFinish}
              key="PeakShavingAndValleyFillingModeSetting"
              onValuesChange={setDisableRunFalse}
            >
              <Row>
                <Col flex="25%">
                  <Form.Item
                    name="peakShavingAndValleyFillingModeMaximumSOC"
                    label="最高SOC"
                    rules={[{ required: true, message: '请输入最高SOC' }]}
                  >
                    <InputNumber className="w-full" addonAfter="%" />
                  </Form.Item>
                </Col>
                <Col flex="25%">
                  <Form.Item
                    name="peakShavingAndValleyFillingModeLowestSOC"
                    label="最低SOC"
                    rules={[{ required: true, message: '请输入最低SOC' }]}
                  >
                    <InputNumber className="w-full" addonAfter="%" />
                  </Form.Item>
                </Col>
              </Row>
              <Form.List name="PeriodOfTime">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Row>
                        <Col flex="25%">
                          <Form.Item
                            label={'时段' + (index + 1)}
                            {...restField}
                            name={[name, 'pcsRunningTimeFrame']}
                            rules={[{ required: true, message: '请选择时段' }]}
                          >
                            <TimePicker.RangePicker
                              className="w-full"
                              format={timeFormat}
                              placeholder={['开始', '结束']}
                              getPopupContainer={(triggerNode) =>
                                triggerNode.parentElement || document.body
                              }
                            />
                          </Form.Item>
                        </Col>
                        <Col flex="25%">
                          <Form.Item
                            {...restField}
                            name={[name, 'CorD']}
                            label="工作模式"
                            rules={[{ required: true, message: '请选择充电模式' }]}
                          >
                            <Select placeholder="请选择充电模式">
                              <Option value="0">放电</Option>
                              <Option value="1">充电</Option>
                            </Select>
                          </Form.Item>
                        </Col>
                        <Col flex="25%">
                          <Form.Item
                            {...restField}
                            name={[name, 'executionPower']}
                            label="执行功率"
                            rules={[{ required: true, message: '请输入执行功率' }]}
                          >
                            <InputNumber className="w-full" addonAfter="kW" min={-110} max={110} />
                          </Form.Item>
                        </Col>
                        <Col flex="25%">
                          <MinusCircleOutlined className="ml12 mt8" onClick={() => remove(name)} />
                        </Col>
                      </Row>
                    ))}
                    <Form.Item>
                      <Button
                        type="primary"
                        icon={<PlusOutlined />}
                        onClick={() => add()}
                        disabled={deviceData?.status === OnlineStatusEnum.Offline}
                      >
                        新增时段
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form>
          </div>
        ) : (
          <></>
        )}
        <Detail.Group
          data={{ ...realTimeData, ...peakValleyData }}
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
