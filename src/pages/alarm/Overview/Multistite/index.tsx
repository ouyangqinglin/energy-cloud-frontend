import React from 'react';
import { columns } from './config';
import YTProTable from '@/components/YTProTable';
import { getData } from './service';
import './index.less';

const Multistite: React.FC = () => {
  return (
    <>
      <YTProTable
        scroll={{ y: 400 }}
        columns={columns}
        bordered
        request={getData}
        toolBarRender={false}
        form={{
          ignoreRules: false,
        }}
      />
    </>
  );
};

export default Multistite;
