// 参数名称  ｜  注释                ｜  默认值
// rollNum  ｜ 超过多少条开始自动滚动  ｜   10
// rollTop  ｜ 滚动速度              ｜  1.5
// rollTime ｜ 滚动时间              ｜  100ms
// scroll   ｜ 表格大小              ｜ y:500px  x:100%
// flag     |  是否滚动              ｜ true 滚动

// 必传
// dataSource
// columns

import React, { useEffect, useState, useRef } from 'react';
import { Table } from 'antd';
import styles from '../index.less';

const ScrollTable = (props: any) => {
  const { dataSource, rollTime = 100, rollNum = 10, rollTop = 5, flag = true } = props;
  const [timer, setTimer] = useState<number>(); // 定时器
  const TableContainer = useRef<any>();
  //const container: any = React.createRef();

  // 开启定时器
  const InitialScroll = (data: any) => {
    let container = TableContainer.current;
    container = container.getElementsByClassName('ant-table-body')[0];
    if (data.length > Number(rollNum) && flag) {
      // 只有当大于10条数据的时候 才会看起滚动
      const time = setInterval(() => {
        container.scrollTop += Number(rollTop);
        if (
          Math.ceil(container.scrollTop) >= Number(container.scrollHeight - container.clientHeight)
        ) {
          container.scrollTop = 0;
          // setTimeout(() => { container.scrollTop = 0 }, 1000)
        }
      }, Number(rollTime));
      setTimer(time); // 定时器保存变量 利于停止
    }
  };
  useEffect(() => {
    InitialScroll(dataSource);
    return () => {
      clearInterval(timer);
    };
  }, [dataSource]); // 检测数组内变量 如果为空 则监控全局

  //设置奇偶行颜色不同
  const getRowClassName = (record: any, index: number) => {
    let className = '';
    className = index % 2 === 0 ? 'oddRow' : 'evenRow';
    return className;
  };
  return (
    <div
      onMouseOver={() => {
        clearInterval(timer);
      }}
      onMouseOut={() => {
        InitialScroll(dataSource);
      }}
    >
      <Table
        ref={TableContainer}
        pagination={false}
        showHeader={false}
        scroll={{
          y: '300',
          x: '50%',
          scrollToFirstRowOnChange: true,
        }}
        rowClassName={getRowClassName}
        {...props}
      />
    </div>
  );
};
export default ScrollTable;
