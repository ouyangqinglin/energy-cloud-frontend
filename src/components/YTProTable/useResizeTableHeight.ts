import { useSize } from 'ahooks';
import { debounce } from 'lodash';
import { useEffect, useState } from 'react';

export function getTableScroll(extraHeight = 78) {
  const tHeader = document.getElementsByClassName('ant-table-thead')[0];
  let offsetToTopForTHeader = 0;
  if (tHeader) {
    offsetToTopForTHeader = tHeader.getBoundingClientRect().bottom;
  }
  return `calc(100vh - ${offsetToTopForTHeader + extraHeight}px)`;
}

export const useResizeTableHeight = () => {
  const [scrollY, setScrollY] = useState('');
  const size = useSize(document.querySelector('.ant-pro-table'));

  //页面加载完成后才能获取到对应的元素及其位置
  useEffect(
    debounce(() => {
      setScrollY(getTableScroll());
    }, 60),
    [size],
  );

  return {
    scrollY,
  };
};
