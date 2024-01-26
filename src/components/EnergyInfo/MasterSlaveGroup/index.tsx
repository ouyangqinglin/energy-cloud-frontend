import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Skeleton } from 'antd';
import { Tabs, TabsProps, Typography } from 'antd';
import { DeviceDataType, editGroupName } from '@/services/equipment';
import GroupItem from './groupItem';
import DeviceItemDetail from './deviceItemDetail';
import { EditOutlined } from '@ant-design/icons';
import styles from './index.less';
import SchemaForm from '@/components/SchemaForm';
import { GroupDataType, groupColumns } from './config';
import { useBoolean } from 'ahooks';
import { useRequest } from 'umi';
import TabItem from './TabItem';

export type MasterSlaveGroupProp = {
  deviceData?: DeviceDataType;
  emsGroupData: any; //分组数据
  loadingEmsTabs: boolean;
  getUnitEchartsParameters?: any;
};

const MasterSlaveGroup: React.FC<MasterSlaveGroupProp> = (props) => {
  const { loadingEmsTabs, emsGroupData, getUnitEchartsParameters } = props;
  const [showDiv, setShowDiv] = useState(false);
  const [showId, setShowId] = useState(false);
  const [mergedGroupData, setMergedGroupData] = useState<any>([]);
  const [initialValues, setInitialValues] = useState<GroupDataType>();
  const [openForm, { set, setTrue: setOpenFormTrue, setFalse }] = useBoolean(false);
  const isShowDeviceDetail = useCallback((bool, id) => {
    setShowDiv(bool);
    setShowId(id);
  }, []);
  const changeShowDiv = useCallback(() => {
    setShowDiv(false);
  }, []);

  const onEditClick = useCallback(
    (index: number) => {
      const currentGroup = mergedGroupData?.[index];
      setInitialValues({
        index,
        groupName: currentGroup?.groupName,
        groupId: currentGroup?.groupId,
        deviceId: currentGroup?.devices?.[0]?.deviceId,
      });
      setOpenFormTrue();
    },
    [mergedGroupData],
  );

  const beforeSubmit = useCallback(
    (formData: GroupDataType) => {
      formData.groupId = initialValues?.groupId;
      formData.deviceId = initialValues?.deviceId;
    },
    [initialValues, mergedGroupData],
  );

  const onSuccess = useCallback(
    (formData: GroupDataType) => {
      setMergedGroupData((prevData: any) => {
        prevData[initialValues?.index ?? 0].groupName = formData?.groupName;
        return [...prevData];
      });
      setFalse();
    },
    [initialValues],
  );

  const tabItems = useMemo<TabsProps['items']>(() => {
    return mergedGroupData?.map?.((item: any, index: any) => {
      return {
        label: (
          <>
            <div className={styles.editWrap}>
              {item.groupName}
              <EditOutlined
                className={`pl8 cursor ${styles.edit}`}
                onClick={(e) => {
                  onEditClick(index);
                  e.stopPropagation();
                }}
              />
            </div>
          </>
        ),
        key: item.devices[0].deviceId,
        children: <TabItem devices={item?.devices} />,
      };
    });
  }, [mergedGroupData, showDiv, showId, onEditClick]);

  const onTabChange = useCallback((key) => {
    getUnitEchartsParameters(key);
  }, []);

  useEffect(() => {
    setMergedGroupData(emsGroupData);
  }, [emsGroupData]);

  return (
    <>
      {loadingEmsTabs ? (
        <>
          <Skeleton.Button size="small" active />
        </>
      ) : (
        <>
          <Tabs
            className="category-tabs"
            items={tabItems}
            tabBarGutter={24}
            size="large"
            onChange={onTabChange}
          />
        </>
      )}
      <SchemaForm
        width="552px"
        columns={groupColumns}
        open={openForm}
        onOpenChange={set}
        addData={editGroupName}
        beforeSubmit={beforeSubmit}
        initialValues={initialValues}
        onSuccess={onSuccess}
      />
    </>
  );
};

export default MasterSlaveGroup;
