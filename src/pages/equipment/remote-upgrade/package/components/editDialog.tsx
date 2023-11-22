import { getDetailData, addPackageData, editPackageData } from '../service';
import { useCallback, useState, useEffect } from 'react';
import type { PackageListType, FormUpdateBaseProps } from '../type';
import { isCreate } from '@/components/YTModalForm/helper';
import type { dealTreeDataType } from '@/components/TableSelect';
import { FormTypeEnum } from '@/components/SchemaForm';
import SchemaForm from '@/components/SchemaForm';
import {
  TABLESELECT,
  TABLETREESELECT,
  tableSelectValueTypeMap,
  tableTreeSelectValueTypeMap,
} from '@/components/TableSelect';
import { getStations } from '../service';
import {
  getProductSnList,
  getModuleList,
  getVersionList,
  getDeviceListBySiteId,
} from '../../comService';
import { DeviceDataType, getProductTypeList } from '@/services/equipment';
import { UpdateTaskParam } from '../../upgradeTask/type';
import { api } from '@/services';
import { Form, Button, Upload } from 'antd';
import { TreeDataType } from '../config';
import { ProConfigProvider } from '@ant-design/pro-components';
import { FormOperations } from '@/components/YTModalForm/typing';
import { formatMessage } from '@/utils';
import { FormattedMessage } from 'umi';
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
  const [snList, setSnList] = useState(); //产品型号下拉框列表
  const [modelList, setModelList] = useState(); //模块下拉框列表
  const [selectDevice, setSelectDevice] = useState(true); //是否选择设备
  const [selectVersion, setSelectVersion] = useState(true); //是否选择可升级版本
  const [softwareList, setSoftwareList] = useState(); //软件包路径回显
  const [productModel, setProductModel] = useState(); //回显产品型号名字
  const [platform, setPlatform] = useState('1'); //回显平台类型字段
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
  //监听operations的变化--当为新建弹窗时，清空软件包;不影响编辑弹窗
  useEffect(() => {
    if (!visible) {
      setSoftwareList([]);
      setSelectDevice(true);
      setSelectVersion(true);
    }
  }, [operations, visible]);
  //获取产品型号--依赖产品类型
  const requestProductSn = useCallback((params) => {
    if (params) {
      return getProductSnList({
        productType: params, //传递产品类型id
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
  const productTypeColumn = {
    title: formatMessage({ id: 'common.productType', defaultMessage: '产品类型' }),
    dataIndex: 'productType', //产品类型id
    formItemProps: {
      name: 'productType', //产品类型id
      rules: [{ required: true, message: '请输入' }],
    },
    colProps: {
      span: 12,
    },
    fieldProps: {
      disabled: operations == FormOperations.UPDATE,
      rules: [{ required: true, message: '请输入' }],
      onChange: (productType: any) => {
        requestProductSn(productType).then((list) => {
          setSnList(list);
        }); //获取产品型号
      },
    },
    hideInTable: true,
    request: requestProductType,
  };
  //获取模块下拉框数据--依赖产品型号id
  const requestModule = useCallback((params) => {
    if (params) {
      return getModuleList({
        productId: params,
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
    dependencies: ['productType'], //依赖产品类型--dataIndex
    fieldProps: {
      disabled: operations == FormOperations.UPDATE,
      options: snList,
      rules: [{ required: true, message: '请输入' }],
      onChange: (productId: any, item: any) => {
        requestModule(productId).then((list) => {
          setModelList(list);
        }); //获取模块
        setProductModel(item?.label);
      },
    },
  };
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
    dependencies: ['productModel'],
    fieldProps: {
      disabled: operations == FormOperations.UPDATE,
      options: modelList,
      rules: [{ required: true, message: '请输入' }],
      onChange: (moduleName: any) => {
        //requestVersionName(moduleName);//获取软件包名
      },
    },
    //request: requestModule,
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
  const [packageForm] = Form.useForm<PackageListType>();

  const beforeUpload = useCallback(
    (file, field) => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('platform', platform);
      api.uploadFile(formData).then(({ data }) => {
        if (data.url) {
          packageForm.setFieldValue(field, data.url);
          packageForm.setFieldValue('softwareList', [{ url: data.url, name: data.name }]);
          setSoftwareList([{ url: data.url, name: data.name }]); //上传后回显
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
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.equipmentSerial', defaultMessage: '设备序列号' }),
      dataIndex: 'deviceSn',
      width: 150,
      ellipsis: true,
      hideInSearch: true,
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
      hideInSearch: true,
    },
    {
      title: formatMessage({ id: 'common.currentVersion', defaultMessage: '当前版本' }),
      dataIndex: 'version',
      width: 100,
      ellipsis: true,
      hideInSearch: true,
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
    return getStations().then(({ data }) => {
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

  const uploadProps = {
    beforeUpload: (file) => beforeUpload(file, 'softwarePackageUrl'),
    onChange: (info) => {
      console.log(info.fileList);
    },
  };
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
      formItemProps: {
        //rules: [{ required: true,}],
      },
      initialValue: '1',
      colProps: {
        span: 6,
      },
      fieldProps: (form: any) => {
        return {
          onChange: (e: any) => {
            setPlatform(e);
          },
          disabled: softwareList.length > 0,
        };
      },
    },
    {
      title: formatMessage({ id: 'common.software', defaultMessage: '软件包' }),
      dataIndex: 'softwareList',
      valueType: 'uploadFile',
      formItemProps: {
        name: 'softwarePackageUrl',
        //rules: [{ required: true, message: '请上传软件包' }],//软件包地址
      },
      labelAlign: 'left',
      renderFormItem: () => {
        return (
          <Upload
            {...uploadProps}
            accept="*"
            name="softwarePackageUrl"
            maxCount={1}
            fileList={softwareList}
          >
            <Button type="primary">
              <FormattedMessage id="common.upload" defaultMessage="上传" />
            </Button>
          </Upload>
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
            pagination: false,
            columns: deviceSelectColumns,
            request: (params: any) => {
              return getDeviceListBySiteId({
                ...params,
                productId: form?.getFieldValue?.('productId'),
                siteId: params.deviceId == -1 ? '' : params.deviceId,
                current: 1,
                pageSize: 20,
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
        initialValue: true,
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
    //选择可升级版本号
    {
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
          //tableId: 'id',
          tableName: 'version',
        };
      },
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
        requestProductSn(res?.productType).then((list) => {
          setSnList(list);
        }); //获取产品型号
        requestModule(res?.productId).then((data) => {
          setModelList(data);
        }); //获取模块
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
        //对软件包上传路径进行回显
        if (res?.softwarePackageUrl) {
          const pathList = res.softwarePackageUrl.split('/');
          const pathName = pathList[pathList.length - 1];
          res.softwareList = [{ url: res?.softwarePackageUrl, name: pathName }];
          setSoftwareList(res.softwareList);
        }
      }
      return res;
    },
    [productModel, selectDevice, selectVersion],
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
      params.productTypeId = params.productType;
      params.productModel = productModel || '';
      params.signature = +params.signature;
      params.status = +params.status;
      params.softwarePackageUrl = softwareList ? softwareList[0].url : '';
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
    [productModel, softwareList],
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
