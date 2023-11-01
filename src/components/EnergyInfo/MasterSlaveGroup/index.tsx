import React, { useState, useEffect, useMemo } from 'react';
import { useRequest, useHistory } from 'umi';
import { Skeleton } from 'antd';
import { useSubscribe } from '@/hooks';
import { getEnergy } from '../service';
import { energyType } from '../type';
import { OnlineStatusEnum } from '@/utils/dictionary';
import { Tabs, TabsProps } from 'antd';
import { DeviceDataType } from '@/services/equipment';
import GroupItem from './groupItem';

//获取实时数据订阅id
const getDataIds = (data: energyType[]): string[] => {
  const ids: string[] = [];
  data?.forEach?.((item) => {
    ids.push(item?.id || '');
    if (item?.children && item.children.length) {
      ids.push(...getDataIds(item.children));
    }
  });
  return ids;
};
export type MasterSlaveGroupProp = {
  deviceData?: DeviceDataType;
  emsGroupData: any; //分组数据
  loadingEmsTabs: boolean;
};
const MasterSlaveGroup: React.FC<MasterSlaveGroupProp> = (props) => {
  const { loadingEmsTabs, emsGroupData, deviceData } = props;
  const [deviceIds, setDeviceIds] = useState<string[]>([]);

  const history = useHistory();

  const {
    loading: loadingEnergy,
    data: energyData,
    run: runDeviceTree,
  } = useRequest(getEnergy, {
    manual: true,
  });
  //获取实时数据
  const allDeviceData = useMemo(() => {
    if (emsGroupData) {
      emsGroupData.map((item: any, index: any) => {
        if (item.devices) {
          item.devices.forEach((deviceItem: any, i: any) => {
            runDeviceTree({ deviceId: deviceItem.deviceId }).then((data: any) => {
              const allDeviceIds = getDataIds([data]);
              setDeviceIds(allDeviceIds);
              if (deviceItem.networkStatus == 1) {
                //deviceItem.realTimeData = useSubscribe(allDeviceIds, true);
              } else {
                deviceItem.realTimeData = {
                  TotalBatteryVoltage: 10,
                  TotalBatteryCurrent: 10,
                  P: 20,
                  DischargeableCapacity: 45,
                  RechargeableCapacity: 14,
                  SOH: 8,
                  SOC: 20,
                  MaximumIndividualTemperature: 9,
                  LVOMT: 8,
                  MVVOASU: 7,
                  MVVOSU: 6,
                };
              }
            });
          });
          return item;
        }
      });
      return emsGroupData;
    }
  }, [emsGroupData]);

  // const items = useMemo(() => {
  //   return [
  //     (deviceData?.productId as DeviceTypeEnum) == DeviceTypeEnum.BWattAir ? bwattAirItem : airItem,
  //     ...unitItems,
  //   ].map((item, index) => {
  //     return (
  //       <>
  //         <div
  //           key={item.label}
  //           className={styles.unit}
  //           style={{
  //             backgroundImage: `url(${item.icon})`,
  //             ...item.position,
  //           }}
  //         >
  //           <img className={styles.line} src={item.line} style={item.linePosition} />
  //           {index !== 1 && <label className={styles.unitTitle}>{item.label}</label>}
  //           {item.data.map((field: any, fieldIndex) => {
  //             return (
  //               <>
  //                 <div key={fieldIndex} className={index !== 1 ? styles.field : styles.unitTitle}>
  //                   {field.label}
  //                   <span className={styles.unitNum}>
  //                     {!isEmpty(realTimeData?.[field.field])
  //                       ? field.format
  //                         ? field.format(realTimeData?.[field.field], realTimeData)
  //                         : realTimeData?.[field.field]
  //                       : '--'}
  //                   </span>
  //                 </div>
  //               </>
  //             );
  //           })}
  //           {index !== 1 && (
  //             <span className={`cursor ${styles.field}`} onClick={() => onMoreClick(item)}>
  //               了解更多{'>'}
  //             </span>
  //           )}
  //         </div>
  //       </>
  //     );
  //   });
  // }, [realTimeData, deviceData]);

  const tabItems = useMemo<TabsProps['items']>(() => {
    if (allDeviceData) {
      //   let data =[
      //     {
      //         "deviceId": 20852,
      //         "productId": 66,
      //         "deviceName": "储能主设备",
      //         "masterSlaveMode": 0,
      //         "networkStatus": 0,
      //         "groupId": 2,
      //         "groupName": "五单元",
      //         "realTimeData": {
      //             "TotalBatteryVoltage": 10,
      //             "TotalBatteryCurrent": 10,
      //             "P": 20,
      //             "DischargeableCapacity": 45,
      //             "RechargeableCapacity": 14,
      //             "SOH": 8,
      //             "SOC": 20,
      //             "MaximumIndividualTemperature": 9,
      //             "LVOMT": 8,
      //             "MVVOASU": 7,
      //             "MVVOSU": 6
      //         }
      //     },
      //     {
      //       "deviceId": 20852,
      //       "productId": 66,
      //       "deviceName": "储能主设备",
      //       "masterSlaveMode": 0,
      //       "networkStatus": 0,
      //       "groupId": 2,
      //       "groupName": "五单元",
      //       "realTimeData": {
      //           "TotalBatteryVoltage": 10,
      //           "TotalBatteryCurrent": 10,
      //           "P": 20,
      //           "DischargeableCapacity": 45,
      //           "RechargeableCapacity": 14,
      //           "SOH": 8,
      //           "SOC": 20,
      //           "MaximumIndividualTemperature": 9,
      //           "LVOMT": 8,
      //           "MVVOASU": 7,
      //           "MVVOSU": 6
      //       }
      //   },
      //     {
      //         "deviceId": 20854,
      //         "productId": 66,
      //         "deviceName": "储能从设备",
      //         "masterSlaveMode": 1,
      //         "networkStatus": 0,
      //         "groupId": 2,
      //         "groupName": "五单元",
      //         "realTimeData": {
      //             "TotalBatteryVoltage": 10,
      //             "TotalBatteryCurrent": 10,
      //             "P": 20,
      //             "DischargeableCapacity": 45,
      //             "RechargeableCapacity": 14,
      //             "SOH": 8,
      //             "SOC": 20,
      //             "MaximumIndividualTemperature": 9,
      //             "LVOMT": 8,
      //             "MVVOASU": 7,
      //             "MVVOSU": 6
      //         }
      //     },
      //     {
      //       "deviceId": 20852,
      //       "productId": 66,
      //       "deviceName": "储能主设备",
      //       "masterSlaveMode": 0,
      //       "networkStatus": 0,
      //       "groupId": 2,
      //       "groupName": "五单元",
      //       "realTimeData": {
      //           "TotalBatteryVoltage": 10,
      //           "TotalBatteryCurrent": 10,
      //           "P": 20,
      //           "DischargeableCapacity": 45,
      //           "RechargeableCapacity": 14,
      //           "SOH": 8,
      //           "SOC": 20,
      //           "MaximumIndividualTemperature": 9,
      //           "LVOMT": 8,
      //           "MVVOASU": 7,
      //           "MVVOSU": 6
      //       }
      //   },
      //   {
      //     "deviceId": 20852,
      //     "productId": 66,
      //     "deviceName": "储能主设备",
      //     "masterSlaveMode": 0,
      //     "networkStatus": 0,
      //     "groupId": 2,
      //     "groupName": "五单元",
      //     "realTimeData": {
      //         "TotalBatteryVoltage": 10,
      //         "TotalBatteryCurrent": 10,
      //         "P": 20,
      //         "DischargeableCapacity": 45,
      //         "RechargeableCapacity": 14,
      //         "SOH": 8,
      //         "SOC": 20,
      //         "MaximumIndividualTemperature": 9,
      //         "LVOMT": 8,
      //         "MVVOASU": 7,
      //         "MVVOSU": 6
      //     }
      // },
      // ];
      return allDeviceData.map((item: any, index: any) => {
        return {
          label: item.groupName,
          key: String(item.groupId),
          children: <GroupItem data={item.devices} allData={item} />,
          //children: <GroupItem data={data} allData={item}/>,
        };
      });
    }
  }, [allDeviceData]);

  return (
    <>
      {loadingEmsTabs ? (
        <>
          <Skeleton.Button size="small" active />
        </>
      ) : (
        <>
          <Tabs className="category-tabs" items={tabItems} tabBarGutter={24} size="large" />
        </>
      )}
    </>
  );
};

export default MasterSlaveGroup;
