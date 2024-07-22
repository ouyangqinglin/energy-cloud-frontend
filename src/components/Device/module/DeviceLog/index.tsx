import Detail from '@/components/Detail';
import { Button, Modal, Form, message } from 'antd';
import { useRef, useState, useContext } from 'react';
import { formatMessage, getLocale } from '@/utils';
import { DeviceProductTypeEnum } from '@/utils/dictionary';
import YTProTable from '@/components/YTProTable';
import type { ProColumns, ActionType } from '@ant-design/pro-components';
import type { ConfigDataType } from './data';
import { columns } from './config';
import { ProConfigProvider } from '@ant-design/pro-components';
import { ProFormDatePicker } from '@ant-design/pro-form';
import { YTDateRangeValueTypeMap } from '@/components/YTDateRange';
import { getDeviceLocalLog, getLocalLog } from '@/services/equipment';
import moment from 'moment';
import { aLinkDownLoad } from '@/utils/downloadfile';
import DeviceContext from '@/components/Device/Context/DeviceContext';

export type EVChargerOrderInfoType = {
  deviceId?: string;
};

const DeviceLog: React.FC<EVChargerOrderInfoType> = (props) => {
  const { deviceId } = props;
  const [form] = Form.useForm();
  const [visible, setVisible] = useState<boolean>(false);
  const { data: deviceData } = useContext(DeviceContext);
  const actionRef = useRef<ActionType>();
  const handleRequest = (params: any) => {
    return getDeviceLocalLog({
      deviceId,
      ...params,
    });
  };

  const handleOk = () => {
    form.submit();
  };

  const downloadLog = (rowData: ConfigDataType) => {
    aLinkDownLoad(rowData.downLoadUrl || '', rowData.logName || '');
  };

  const handleFinish = async (rowData?: ConfigDataType) => {
    getLocalLog({
      deviceId,
      context: { logDate: rowData ? moment(rowData.logDate).format('YYYY-MM-DD') : '' },
    }).then((res: any) => {
      if (res?.data?.succeed) {
        message.success(res?.data?.message);
      }
    });
  };

  const actionColumn: ProColumns[] = [
    {
      title: formatMessage({ id: 'alarmManage.operate', defaultMessage: '操作' }),
      valueType: 'option',
      width: 100,
      fixed: 'right',
      render: (_, record) => {
        const rowData = record as ConfigDataType;
        return [
          <Button
            type="link"
            size="small"
            key="doload"
            onClick={() => {
              downloadLog(rowData);
            }}
          >
            {formatMessage({ id: 'common.download', defaultMessage: '下载' })}
          </Button>,
        ];
      },
    },
  ];
  return (
    <div>
      <Detail.Label
        title={formatMessage({ id: 'device.deviceLog', defaultMessage: '设备日志' })}
        className="mt16"
      />
      <ProConfigProvider
        valueTypeMap={{
          ...YTDateRangeValueTypeMap,
        }}
      >
        <YTProTable<ConfigDataType>
          actionRef={actionRef}
          columns={[...columns, ...actionColumn]}
          request={handleRequest}
          scroll={{ y: 'auto' }}
          toolBarRender={() => [
            <Button
              type="primary"
              key="get"
              onClick={async () => {
                if (DeviceProductTypeEnum.ExchangeCabinet == deviceData?.productTypeId) {
                  setVisible(true);
                } else {
                  handleFinish();
                }
              }}
            >
              {formatMessage({ id: 'device.getDeviceLog', defaultMessage: '获取设备日志' })}
            </Button>,
          ]}
        />
      </ProConfigProvider>
      <Modal
        width={800}
        title={formatMessage({ id: 'device.exportLog', defaultMessage: '日志导出' })}
        visible={visible}
        destroyOnClose
        onOk={handleOk}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <Form form={form} onFinish={handleFinish} layout="vertical">
          <ProFormDatePicker
            name="logDate"
            label={formatMessage({
              id: 'device.selectDate',
              defaultMessage: '请选择日期',
            })}
            width="xl"
            format={getLocale().dateFormat}
            placeholder={formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' })}
            rules={[
              {
                required: true,
                message: formatMessage({ id: 'common.pleaseSelect', defaultMessage: '请选择' }),
              },
            ]}
          />
        </Form>
      </Modal>
    </div>
  );
};
export default DeviceLog;
