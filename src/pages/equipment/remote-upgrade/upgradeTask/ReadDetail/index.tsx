import {
  getTaskDetail
} from '../service';
import { useCallback,  useState } from 'react';
import { useRequest, FormattedMessage } from 'umi';
import { formatMessage } from '@/utils'
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
    { label: formatMessage({id: 'upgradeManage.taskName',defaultMessage: '任务名称',}), field: 'taskName' },
    { label: formatMessage({id: 'common.model',defaultMessage: '产品型号',}), field: 'productModel' },
    { label: formatMessage({ id: 'common.module' ,defaultMessage: '模块'}),  field: 'moduleName' },
    { label: formatMessage({ id: 'common.productType' ,defaultMessage: '产品类型'}), field: 'productTypeName' },
    { label: formatMessage({id: 'common.softwarePackage',defaultMessage: '软件包名',}), field: 'packageName' },
    { label: formatMessage({id: 'common.version',defaultMessage: '版本号',}), field: 'version' },
    { label: formatMessage({id: 'upgradeManage.upgradeTime', defaultMessage: '升级时间',}),  field: 'upgradeTime' },
  ];
  const { data: logData, } = useRequest(getTaskDetail, {
    manual: true,
  });

  return (
    <>
      <DetailDialog
        width="420px"
        title={<FormattedMessage id='common.viewdetail' defaultMessage="查看详情" />}
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
