/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-07-20 16:17:35
 * @LastEditTime: 2023-12-22 15:21:30
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\DeviceDetail\index.tsx
 */
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Skeleton, Space, Tree } from 'antd';
import { useRequest } from 'umi';
import { DeviceDataType, getWholeDeviceTree } from '@/services/equipment';
import styles from './index.less';
import { isEmpty } from '@/utils';
import { TreeNode } from './config';
import { productTypeIconMap } from '@/utils/IconUtil';
import DeviceProvider from '../Device/Context/DeviceProvider';
import Device from './Device';

const dealTreeData = (data: TreeNode[]) => {
  const result: TreeNode[] = [];
  data?.forEach?.((item) => {
    const node: TreeNode = {
      key: item?.id + '',
      deviceId: item?.id,
      name: item?.name,
      productId: item?.productId,
    };
    if (item?.productTypeId) {
      node.icon = productTypeIconMap.get(item?.productTypeId);
    }
    if (item.children && item.children.length) {
      node.children = dealTreeData(item.children as any);
    }
    result.push(node);
  });
  return result;
};

export type DeviceDetailProps = {
  id: string;
};

const DeviceDetail: React.FC<DeviceDetailProps> = (props) => {
  const { id } = props;

  const [selectOrg, setSelectOrg] = useState<DeviceDataType>({
    deviceId: parseInt(id) as any,
    key: id,
  });
  const {
    data: treeData,
    loading,
    run: runGetDeviceTree,
  } = useRequest(getWholeDeviceTree, {
    manual: true,
    formatResult: (res) => {
      return dealTreeData([res.data] as any);
    },
  });

  const selectedKeys = useMemo<string[]>(() => {
    return isEmpty(selectOrg?.deviceId) ? [] : [selectOrg?.deviceId as string];
  }, [selectOrg]);

  const onSelect = useCallback(
    (_, { selected, node }: { selected: boolean; node: DeviceDataType }) => {
      if (selected) {
        setSelectOrg(node);
      }
    },
    [],
  );

  const onChange = useCallback(() => {
    runGetDeviceTree({
      deviceId: id,
      component: 0,
      containTopParentDevice: 1,
    });
  }, [id]);

  useEffect(() => {
    runGetDeviceTree({
      deviceId: id,
      component: 0,
      containTopParentDevice: 1,
    });
  }, [id]);

  return (
    <>
      <div
        className={`${styles.contain} ${
          treeData?.[0]?.children && treeData?.[0]?.children?.length ? styles.open : ''
        }`}
      >
        <div className={styles.tree}>
          {loading ? (
            <Space direction="vertical">
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
              <Skeleton.Input size="small" active />
            </Space>
          ) : (
            <Tree<TreeNode>
              treeData={treeData}
              defaultExpandAll={true}
              fieldNames={{
                title: 'name',
                key: 'deviceId',
                children: 'children',
              }}
              selectedKeys={selectedKeys}
              onSelect={onSelect}
              showIcon
            />
          )}
        </div>
        <div className={styles.content}>
          <DeviceProvider deviceId={selectOrg.deviceId} onChange={onChange}>
            <Device />
          </DeviceProvider>
        </div>
      </div>
    </>
  );
};

export default DeviceDetail;
