import { DatePicker, Form } from 'antd';
import type { ProRenderFieldPropsType } from '@ant-design/pro-components';
import moment from 'moment';

const { RangePicker } = DatePicker;

const YTDateRange = (props: any) => {
  const [form] = Form.useForm();
  const { format, ...resetProps } = props;
  const handleRangeChange = (dates: any) => {
    form.setFieldsValue({ date: dates });
  };
  return <RangePicker format={format} onChange={handleRangeChange} {...resetProps} />;
};
const valueRender: ProRenderFieldPropsType['render'] = (value) => {
  return value;
};
const formRender: ProRenderFieldPropsType['renderFormItem'] = (value, props) => {
  return (
    <>
      <YTDateRange {...props.fieldProps} />
    </>
  );
};
export const YTDATERANGE = 'YTDateRange';
export type YTDATERANGEVALUETYPE = typeof YTDATERANGE;
export const YTDateRangeValueTypeRender: ProRenderFieldPropsType = {
  render: valueRender,
  renderFormItem: formRender,
};
export const YTDateRangeValueTypeMap = {
  [YTDATERANGE]: YTDateRangeValueTypeRender,
};
export default YTDateRange;
