/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-10-10 15:23:23
 * @LastEditTime: 2023-10-10 17:58:49
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\pages\workbench\index.tsx
 */
import React from 'react';
import { Button, Tooltip } from 'antd';
import SchemaForm from '@/components/SchemaForm';
import { SearchType } from './typing';
import { column } from './helper';
import {
  YTCellFourOutlined,
  YTCellNineOutlined,
  YTCellOneOutlined,
  YTCellSixOutlined,
} from '@/components/YTIcons';

const Workbench: React.FC = () => {
  return (
    <>
      <div className="p24">
        <div className="flex page-label mr12 mt2 mb0 float">设备监控</div>
        <SchemaForm<SearchType>
          className="p0 mb24"
          columns={column}
          layout="inline"
          layoutType="QueryFilter"
          submitter={{
            render: () => [
              <Tooltip title="一宫格" key="one">
                <Button shape="circle" icon={<YTCellOneOutlined />} />
              </Tooltip>,
              <Tooltip title="四宫格" key="four">
                <Button shape="circle" icon={<YTCellFourOutlined />} />
              </Tooltip>,
              <Tooltip title="六宫格" key="six">
                <Button shape="circle" icon={<YTCellSixOutlined />} />
              </Tooltip>,
              <Tooltip title="九宫格" key="nine">
                <Button
                  style={{ marginRight: '-12px' }}
                  shape="circle"
                  icon={<YTCellNineOutlined />}
                />
              </Tooltip>,
            ],
          }}
        />
      </div>
    </>
  );
};

export default Workbench;
