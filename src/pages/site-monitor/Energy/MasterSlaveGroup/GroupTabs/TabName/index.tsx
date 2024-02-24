/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2024-02-21 17:38:10
 * @LastEditTime: 2024-02-22 09:58:32
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\site-monitor\Energy\MasterSlaveGroup\GroupTabs\TabName\index.tsx
 */

import React, { useCallback, useEffect, useState } from 'react';
import styles from '../../index.less';
import { EditOutlined } from '@ant-design/icons';
import { GroupDeviceType, GroupType } from '../../../type';
import { useBoolean } from 'ahooks';
import SchemaForm from '@/components/SchemaForm';
import { groupColumns } from '../../helper';
import { editGroupName } from '@/services/equipment';

type TabItemType = {
  groupData?: GroupType;
};

const TabName: React.FC<TabItemType> = (props) => {
  const { groupData } = props;

  const [mergedGroupData, setMergedGroupData] = useState<GroupType>({});
  const [initialValues, setInitialValues] = useState<GroupDeviceType>();
  const [openForm, { set, setTrue: setOpenFormTrue, setFalse }] = useBoolean(false);

  const onEditClick = useCallback(() => {
    setInitialValues({
      groupName: mergedGroupData?.groupName,
      groupId: mergedGroupData?.groupId,
      deviceId: mergedGroupData?.devices?.[0]?.deviceId,
    });
    setOpenFormTrue();
  }, [mergedGroupData]);

  const beforeSubmit = useCallback(
    (formData: GroupDeviceType) => {
      formData.groupId = initialValues?.groupId;
      formData.deviceId = initialValues?.deviceId;
    },
    [initialValues],
  );

  const onSuccess = useCallback(
    (formData: GroupDeviceType) => {
      setMergedGroupData((prevData: any) => {
        prevData.groupName = formData?.groupName;
        return { ...prevData };
      });
      setFalse();
    },
    [initialValues],
  );

  useEffect(() => {
    setMergedGroupData(groupData || {});
  }, [groupData]);

  return (
    <>
      <div className={styles.editWrap}>
        {groupData?.groupName}
        <EditOutlined
          className={`cursor ${styles.edit}`}
          onClick={(e) => {
            onEditClick();
            e.stopPropagation();
          }}
        />
      </div>
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

export default TabName;
