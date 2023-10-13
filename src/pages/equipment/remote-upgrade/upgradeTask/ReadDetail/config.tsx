import { formatMessage } from '@/utils'

export const TaskDetail = [
  { label: formatMessage({id: 'upgradeManage.taskName',defaultMessage: '任务名称',}), field: 'taskName' },
    { label: formatMessage({id: 'common.model',defaultMessage: '产品型号',}), field: 'productModel' },
    { label: formatMessage({ id: 'common.module' ,defaultMessage: '模块'}),  field: 'moduleName' },
    { label: formatMessage({ id: 'common.productType' ,defaultMessage: '产品类型'}), field: 'productTypeName' },
    { label: formatMessage({id: 'common.softwarePackage',defaultMessage: '软件包名',}), field: 'packageName' },
    { label: formatMessage({id: 'common.version',defaultMessage: '版本号',}), field: 'version' },
    { label: formatMessage({id: 'upgradeManage.upgradeTime', defaultMessage: '升级时间',}),  field: 'upgradeTime' },
];
