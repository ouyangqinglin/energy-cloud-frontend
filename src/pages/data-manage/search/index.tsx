import React from 'react';
import YTProTable from '@/components/YTProTable';
import { columns } from './config';

const Search: React.FC = () => {
  return <YTProTable headerTitle="采样明细" toolBarRender={() => [<></>]} columns={columns} />;
};

export default Search;
