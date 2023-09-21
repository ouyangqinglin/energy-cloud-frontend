import { Columns } from './config';
import type { ProColumns } from '@ant-design/pro-table';
import YTProTable from '@/components/YTProTable';
import {
  getTaskDetail
} from '../service';
import { useCallback,  useState } from 'react';
import { useRequest } from 'umi';
import DetailDialog from '@/components/DetailDialog';
import type { DetailItem } from '@/components/Detail';
export type OperationLogProps = {
  isDeviceChild?: boolean;
  deviceId?: string;
};
export const ReadDetail: React.FC<OperationLogProps> = (props) => {
  const [open, setOpen] = useState(false);
  const switchOpen = useCallback(() => {
    setOpen((value) => !value);
  }, []);
  const detailItems: DetailItem[] = [
    { label: '任务名称', field: 'taskName' },
    { label: '产品型号', field: 'productModel' },
    { label: '模块', field: 'moduleName' },
    { label: '产品类型', field: 'productTypeName' },
    { label: '软件包名', field: 'packageName' },
    { label: '版本号', field: 'version' },
    { label: '升级时间', field: 'upgradeTime' },
  ];
  const { data: logData, } = useRequest(getTaskDetail, {
    manual: true,
  });

  return (
    <>
      <DetailDialog
        width="420px"
        title="查看详情"
        open={open}
        onCancel={switchOpen}
        detailProps={{
          data: logData,
          items: detailItems,
          column: 4,
          labelStyle: { width: '90px' },
        }}
      />
    </>
  );
};
