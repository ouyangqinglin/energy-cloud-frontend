import { getDetailData, addPackageData, editPackageData } from '../service';
import { getFileUrl } from '@/pages/system/version/service';

import { useCallback, useState, useEffect } from 'react';
import type { FormUpdateBaseProps } from '../type';
import { ProFormUploadButton } from '@ant-design/pro-form';

import { isCreate } from '@/components/YTModalForm/helper';
import type { dealTreeDataType } from '@/components/TableSelect';
import { FormTypeEnum } from '@/components/SchemaForm';
import SchemaForm from '@/components/SchemaForm';
import type { UploadFile } from 'antd';
import {
  TABLESELECT,
  TABLETREESELECT,
  tableSelectValueTypeMap,
  tableTreeSelectValueTypeMap,
} from '@/components/TableSelect';
import { getSitesList } from '@/services/station';

import {
  getProductSnList,
  getModuleList,
  getVersionList,
  getDeviceListBySiteId,
} from '../../comService';
import { getProductTypeList } from '@/services/equipment';
import type { DeviceDataType } from '@/services/equipment';
import type { UpdateTaskParam } from '../../upgradeTask/type';
import { api } from '@/services';
import type { TreeDataType } from '../config';
import { ProConfigProvider } from '@ant-design/pro-components';
import { FormOperations } from '@/components/YTModalForm/typing';
import { formatMessage } from '@/utils';
import { aLinkDownLoad } from '@/utils/downloadfile';
import { columns } from '@/components/CollectionModal/helper';

export type ConfigFormProps = {
  deviceData: DeviceDataType;
  onSuccess?: () => void;
};

const dealTreeData: dealTreeDataType<TreeDataType> = (item) => {
  item.selectable = true;
};

export const UpdatePackageForm = (props: FormUpdateBaseProps) => {
  const { operations } = props; //获取操作弹窗的类型
  const { visible } = props; //弹窗是否可见
  const [selectDevice, setSelectDevice] = useState(true); //是否选择设备
  const [selectVersion, setSelectVersion] = useState(true); //是否选择可升级版本
  const [productModel, setProductModel] = useState(); //回显产品型号名字
  const [platform, setPlatform] = useState('1'); //回显平台类型字段

  //监听operations的变化--当为新建弹窗时，清空软件包;不影响编辑弹窗
  useEffect(() => {
    if (!visible) {
      setSelectDevice(true);
      setSelectVersion(true);
    }
  }, [operations, visible]);

  //获取产品类型
  const requestProductType = useCallback((searchParams: any) => {
    return getProductTypeList(searchParams).then(({ data }) => {
      return data?.map?.((item) => {
        return {
          label: item?.name || '',
          value: item?.id || '',
        };
      });
    });
  }, []);
  const productTypeColumn = {
    title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    dataIndex: 'productTypeId', //产品类型id
    formItemProps: {
      name: 'productTypeId', //产品类型id
      rules: [{ required: true, message: '请输入' }],
    },
    colProps: {
      span: 12,
    },
    fieldProps: (form: any) => {
      return {
        disabled: operations == FormOperations.UPDATE,
        onChange: () => {
          form.setFieldValue('productId', null);
          form.setFieldValue('moduleId', null);
        },
      };
    },
    hideInTable: true,
    request: requestProductType,
  };

  //获取产品型号--依赖产品类型
  const requestProductSn = useCallback((params) => {
    if (params?.productTypeId) {
      return getProductSnList({
        productTypeId: params?.productTypeId, //传递产品类型id
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            ...item,
            label: item?.model || '',
            value: item?.id || '',
            //value:item
          };
        });
      });
    } else {
      return Promise.resolve([]);
    }
  }, []);
  const productSnColumn = {
    title: formatMessage({ id: 'common.model', defaultMessage: '产品型号' }),
    dataIndex: 'productId',
    valueType: 'select',
    formItemProps: {
      name: 'productId', //产品型号名称
      rules: [{ required: true, message: '请输入' }],
    },
    colProps: {
      span: 12,
    },
    hideInTable: true,
    dependencies: ['productTypeId'], //依赖产品类型--dataIndex
    fieldProps: (form: any) => {
      return {
        disabled: operations == FormOperations.UPDATE,
        onChange: () => {
          form.setFieldValue('moduleId', null);
        },
      };
    },
    request: requestProductSn,
  };

  //获取模块下拉框数据--依赖产品型号id
  const requestModule = useCallback((params) => {
    if (params?.productId) {
      return getModuleList({
        productId: params?.productId,
      }).then(({ data }) => {
        return data?.map?.((item: any) => {
          return {
            label: item?.moduleName || '',
            value: item?.id || '', //模块id
          };
        });
      });
    } else {
      return Promise.resolve([]);
    }
  }, []);

  const moduleColumn = {
    title: formatMessage({ id: 'common.module', defaultMessage: '模块' }),
    dataIndex: 'moduleName',
    valueType: 'select',
    formItemProps: {
      name: 'moduleId', //改了后回显有问题
      rules: [{ required: true, message: '请输入' }],
    },
    colProps: {
      span: 12,
    },
    hideInTable: true,
    dependencies: ['productId'],
    fieldProps: {
      disabled: operations == FormOperations.UPDATE,
    },
    request: requestModule,
  };
  //状态表单
  const statusList = {
    [1]: formatMessage({ id: 'common.enable', defaultMessage: '启用' }),
    [0]: formatMessage({ id: 'common.disable', defaultMessage: '禁用' }),
  };
  const algorithmList = {
    1: 'MD5',
    0: formatMessage({ id: 'common.not', defaultMessage: '无' }),
  };
  const platformList = {
    1: 'minio ',
    2: 'oss',
  };

  const beforeUpload = useCallback(
    (file, form, field) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('platform', platform);
      api.uploadFile(formData).then(({ data }) => {
        if (data.url) {
          form.setFieldValue(field, `${data.url}`);
        }
      });
      return false;
    },
    [platform],
  );

  //关联设备字段
  const deviceSelectColumns = [
    {
      title: formatMessage({ id: 'common.deviceName', defaultMessage: '设备名称' }),
      dataIndex: 'deviceName',
      width: 150,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
      dataIndex: 'deviceSn',
      width: 150,
      ellipsis: true,
    },
    {
      title: formatMessage({ id: 'common.currentVersion', defaultMessage: '当前版本' }),
      dataIndex: 'version',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.siteName', defaultMessage: '站点名称' }),
      dataIndex: 'siteName',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
  ];
  //可升级版本列表
  const versionSelectColumns = [
    {
      title: formatMessage({ id: 'common.softwarePackage', defaultMessage: '软件包名' }),
      dataIndex: 'packageName',
      width: 150,
      ellipsis: true,
      hideInSearch: false,
    },
    {
      title: formatMessage({ id: 'common.currentVersion', defaultMessage: '当前版本' }),
      dataIndex: 'version',
      width: 100,
      ellipsis: true,
      hideInSearch: false,
    },
    {
      title: formatMessage({ id: 'common.uploadDate', defaultMessage: '上传时间' }),
      dataIndex: 'uploadTime',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
    },
  ];
  const requestTree = useCallback(() => {
    return getSitesList().then(({ data }) => {
      const list = [
        {
          name: formatMessage({ id: 'common.all', defaultMessage: '全部' }),
          id: -1,
          children: data,
        },
      ];
      return { data: list };
    });
  }, []);

  const columns = [
    {
      title: formatMessage({ id: 'common.version', defaultMessage: '版本号' }),
      dataIndex: 'version',
      formItemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
      fieldProps: {
        disabled: operations == FormOperations.UPDATE,
      },
      colProps: {
        span: 12,
      },
    },
    {
      title: formatMessage({ id: 'common.softwarePackage', defaultMessage: '软件包名' }),
      dataIndex: 'packageName',
      formItemProps: {
        rules: [{ required: true, message: '请输入' }],
      },
      fieldProps: {
        disabled: operations == FormOperations.UPDATE,
      },
      colProps: {
        span: 12,
      },
    },
    productTypeColumn,
    productSnColumn,
    moduleColumn,
    {
      title: formatMessage({ id: 'upgradeManage.platform', defaultMessage: '平台类型' }),
      dataIndex: 'platform',
      valueType: 'select',
      valueEnum: platformList,
      formItemProps: {},
      initialValue: '1',
      colProps: {
        span: 6,
      },
      fieldProps: (form: any) => {
        return {
          onChange: (e: any) => {
            setPlatform(e);
            form.setFieldValue('softwarePackageUrl', '');
          },
          disabled: form.getFieldValue('softwarePackageUrl') > 0,
        };
      },
    },
    {
      title: formatMessage({ id: 'common.software', defaultMessage: '软件包' }),
      dataIndex: 'softwarePackageUrl',
      valueType: 'upload',
      formItemProps: {
        rules: [
          {
            required: true,
            message: formatMessage({ id: 'common.updataSoftware', defaultMessage: '请上传软件包' }),
          },
        ], //软件包地址
      },
      renderFormItem: (schema: any, config: any, form: any) => {
        const value = form.getFieldValue('softwarePackageUrl') || '';
        const name = value.split('/').pop() || '';
        const isOss = form.getFieldValue('platform') == 2;
        return (
          <ProFormUploadButton
            title={formatMessage({ id: 'common.upload', defaultMessage: '上传' })}
            accept="*"
            max={1}
            fieldProps={{
              listType: 'text',
              fileList: value ? ([{ url: value, uid: '1', name }] as UploadFile[]) : [],
              name: 'file',
              beforeUpload: (file) => beforeUpload(file, form, 'softwarePackageUrl'),
              onChange: () => form.setFieldValue('softwarePackageUrl', ''),
              onPreview: (file) => {
                if (isOss) {
                  getFileUrl({ url: file.url, platform: 2 }).then((res) => {
                    file.url = res.data;
                    aLinkDownLoad(file.url || '', file.name);
                  });
                } else {
                  aLinkDownLoad(file.url || '', file.name);
                }
              },
            }}
          />
        );
      },
      colProps: {
        span: 6,
      },
    },
    {
      title: formatMessage({ id: 'common.selectDevice', defaultMessage: '选择设备' }),
      dataIndex: 'selectDevice',
      valueType: 'switch',
      formItemProps: {
        name: 'selectDevice',
        initialValue: true,
        rules: [{ required: true }],
      },
      fieldProps: (form) => {
        return {
          onChange: (e: boolean) => {
            setSelectDevice(e);
          },
        };
      },
      colProps: {
        span: 24,
      },
    },
    //选择设备表单：列表
    {
      title: '',
      dataIndex: 'upgradeDeviceDetailList',
      valueType: TABLETREESELECT,
      colProps: {
        span: 24,
      },
      hideInForm: selectDevice == false,
      formItemProps: {
        //hidden: selectDevice == false,
        rules: [{ required: true, message: '请选择关联设备' }],
      },
      dependencies: ['packageName'],
      fieldProps: (form: any) => {
        return {
          title: formatMessage({ id: 'common.selectDevice', defaultMessage: '选择设备' }),
          treeProps: {
            fieldNames: {
              title: 'name',
              key: 'id',
              children: 'children',
            },
            request: requestTree,
          },
          proTableProps: {
            columns: deviceSelectColumns,
            request: (params: any) => {
              return getDeviceListBySiteId({
                ...params,
                productId: form?.getFieldValue?.('productId'),
                siteId: params.deviceId == -1 ? '' : params.deviceId,
              });
            },
          },
          onFocus: () => {
            return form?.validateFields(['productId']);
          },
          valueId: 'deviceId',
          valueName: 'deviceName',
          valueFormat: (value: any, item: any) => {
            if (item.siteName) {
              return item.siteName + '-' + item.deviceName;
            }
            return value;
          },
          dealTreeData,
        };
      },
      //fieldProps: tableTreeSelectProps,
    },
    {
      title: formatMessage({ id: 'upgradeManage.upgradable', defaultMessage: '可升级版本' }),
      dataIndex: 'selectVersion',
      valueType: 'switch',
      formItemProps: {
        name: 'selectVersion',
        initialValue: false,
        //rules: [{ required: true, message: '请选择' }],
      },
      fieldProps: (form) => {
        return {
          onChange: (e: boolean) => {
            setSelectVersion(e);
          },
        };
      },
      colProps: {
        span: 24,
      },
    },
    //选择可升级版本
    {
      valueType: 'dependency',
      name:['selectVersion'],
      //@ts-ignore
      columns:({selectVersion})=>{
        return selectVersion?[{
            title: '',
            dataIndex: 'upgradeDeviceVersionDetailList',
            valueType: TABLESELECT,
            colProps: {
              span: 24,
            },
            dependencies: ['productId'],
            hideInForm: selectVersion == false,
            formItemProps: {
              //hidden: selectVersion == false,
              rules: [{ required: true }],
            },
            fieldProps: (form: any) => {
              return {
                proTableProps: {
                  columns: versionSelectColumns,
                  request: (params: any) => {
                    return getVersionList({
                      ...params,
                      productId: form?.getFieldValue?.('productId'),
                    }).then(({ data }) => {
                      return {
                        data: data?.list,
                        total: data?.total,
                        success: true,
                      };
                    });
                  },
                },
                onFocus: () => {
                  return form?.validateFields(['productId']);
                },
                valueId: 'id',
                valueName: 'version',
                tableId: 'id',
                tableName: 'version',
              };
            },
          }]:[];
      }
    },
    {
      title: formatMessage({ id: 'upgradeManage.signature', defaultMessage: '签名算法' }),
      dataIndex: 'signature',
      valueType: 'select',
      valueEnum: algorithmList,
      formItemProps: {
        rules: [{ required: true }],
      },
      colProps: {
        span: 24,
      },
    },
    {
      title: formatMessage({ id: 'common.status', defaultMessage: '状态' }),
      dataIndex: 'status', //升级包状态 1 启动 0禁用
      colProps: {
        span: 24,
      },
      valueType: 'radio',
      valueEnum: statusList,
      formItemProps: {
        initialValue: '1',
        rules: [{ required: true, message: '请选择' }],
      },
      fieldProps: (form: any) => {},
    },
    {
      title: formatMessage({ id: 'common.description', defaultMessage: '描述' }),
      dataIndex: 'description',
      valueType: 'textarea',
      formItemProps: {
        //rules: [{ required: true, message: '请输入内容' }],
      },
      colProps: {
        span: 24,
      },
    },
  ];
  //回显数据处理
  const convertRequestData = useCallback(
    (res: UpdateTaskParam) => {
      //编辑才会走到这里
      if (res) {
        res.signature = res.signature ? res.signature + '' : '0';
        res.status = res.status ? res.status + '' : '0';
        res.platform = res.platform ? res.platform + '' : '1';
        if (res?.upgradeDeviceDetailList && res.upgradeDeviceDetailList.length > 0) {
          res.selectDevice = true;
          setSelectDevice(true);
        } else {
          res.selectDevice = false;
          setSelectDevice(false);
          res.upgradeDeviceDetailList = [];
        }
        if (!res.upgradeDeviceVersionDetailList) {
          res.selectVersion = false;
          setSelectVersion(false);
          res.upgradeDeviceVersionDetailList = [];
        } else {
          res.selectVersion = true;
          setSelectVersion(true);
          res.upgradeDeviceVersionDetailList.map((item: any) => {
            item.id = item.versionId;
            delete item.versionId;
          });
        }
        if (res?.productModel) {
          setProductModel(res?.productModel);
        }
      }
      return res;
    },
    [requestModule, requestProductSn],
  );

  //提交前的处理函数
  const convertUpdateParams = useCallback(
    (params: UpdateTaskParam) => {
      params.upgradeDevice = params.upgradeDeviceDetailList
        ? params.upgradeDeviceDetailList.map((item) => item.deviceId).join(',')
        : '';
      params.upgradableVersion = params.upgradeDeviceVersionDetailList
        ? params.upgradeDeviceVersionDetailList.map((item) => item.id).join(',')
        : '';
      params.productTypeId = params.productTypeId;
      params.productModel = productModel || '';
      params.signature = +params.signature;
      params.status = +params.status;
      params.platform = +params.platform;
      const allowedKeys = [
        'version',
        'packageName',
        'productTypeId',
        'productModel',
        'moduleId',
        'softwarePackageUrl',
        'upgradeDevice',
        'upgradableVersion',
        'signature',
        'status',
        'description',
        'platform',
        'productId',
      ];
      const filteredObj = Object.keys(params)
        .filter((key) => allowedKeys.includes(key))
        .reduce((result, key) => {
          result[key] = params[key];
          return result;
        }, {});
      return filteredObj;
    },
    [productModel],
  );

  //const getConfig = useCallback(() => Columns(props?.operations), [props.operations]);
  return (
    <>
      <ProConfigProvider
        valueTypeMap={{ ...tableTreeSelectValueTypeMap, ...tableSelectValueTypeMap }}
      >
        <SchemaForm
          width="900px"
          id={props.id}
          type={isCreate(props.operations) ? FormTypeEnum.Add : FormTypeEnum.Edit}
          columns={columns as any}
          open={visible}
          onOpenChange={props.onVisibleChange}
          addData={addPackageData}
          editData={editPackageData}
          //获取编辑的接口
          getData={getDetailData}
          beforeSubmit={convertUpdateParams}
          afterRequest={convertRequestData} //获取编辑详情后执行的函数--对回显数据进行处理
          // extraData={{ siteId }}
          onSuccess={props?.onSuccess}
          onFocus={props?.onFocus}
          grid={true}
          colProps={{
            span: 8,
          }}
          initialValues={props?.initialValues}
        />
      </ProConfigProvider>
    </>
  );
};
export default UpdatePackageForm;
