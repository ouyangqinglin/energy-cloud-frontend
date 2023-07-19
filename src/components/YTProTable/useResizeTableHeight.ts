import { useSize } from 'ahooks';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export function getTableScroll(currentIndex: number, extraHeight = 78) {
  const tHeader = document.getElementsByClassName('ant-table-thead')[currentIndex];
  let offsetToTopForTHeader = 0;
  if (tHeader) {
    offsetToTopForTHeader = tHeader.getBoundingClientRect().bottom;
  }
  return `calc(100vh - ${offsetToTopForTHeader + extraHeight}px)`;
}

export const useResizeTableHeight = () => {
  const [scrollY, setScrollY] = useState('');
  // fix: 存在多个表格的情况
  const allTables = document.querySelectorAll('.ant-pro-table');
  const currentIndex = Array.from(allTables).findIndex((dom) => !!dom.clientHeight);
  const size = useSize(allTables?.[currentIndex]);

  //页面加载完成后才能获取到对应的元素及其位置
  useEffect(
    debounce(() => {
      setScrollY(getTableScroll(currentIndex));
    }, 60),
    [size],
  );
  return {
    scrollY,
  };
};
