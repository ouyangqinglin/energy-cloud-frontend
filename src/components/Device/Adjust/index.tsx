/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:31:19
 * @LastEditTime: 2023-07-04 10:04:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\alarm\index.tsx
 */
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Button } from 'antd';
import { MessageEventType } from '@/utils/connection';
import styles from './index.less';
import { formatMessage } from '@/utils';
import { useSubscribe } from '@/hooks';
import { style } from 'd3-selection';
import moment from 'moment';

const Index: React.FC = (props) => {
  const { deviceId } = props
  const [list, setList] = useState([])
  const [copyList, setCopyList] = useState([])

  const [isScrolle, setIsScrolle] = useState(true);
  const [isSubscribe, setIsSubscribe] = useState(true)
  const [isClear, setIsClear] = useState(false)
  const speed = 60;
  const warper = useRef();
  const childDom1 = useRef();
  const childDom2 = useRef();
  useEffect(() => {
    childDom2.current.innerHTML = childDom1.current.innerHTML;
    let timer;
    if (isScrolle) {
      timer = setInterval(() =>
        warper.current.scrollTop >= childDom1.current.scrollHeight
        ? (warper.current.scrollTop = 0)
        : warper.current.scrollTop++,
        speed
      );
    }
    return () => { clearTimeout(timer); };
    }, [isScrolle]);

    const data = useSubscribe(deviceId, true, MessageEventType.DEVICEMSG)
    useEffect(() => {
      if (Object.keys(data).length > 1) {
        let time
        const msg = JSON.parse(data.msg)
        for(let v in msg) {
          if ( Array.isArray(msg[v]) && msg[v][0].ts) time = moment(msg[v][0].ts).format('YYYY-MM-DD HH:mm:ss')
        }
        const arr = [{
          msg: data.msg,
          topic: data.topic,
          time,
        }]
        setList([...list, ...arr])
        if (isSubscribe) setCopyList([...list, ...arr])
      }
    }, [data])
    const dataList = useMemo(() => {
      if (isClear) {
        setList([])
        setCopyList([])
        return []
      }
      return isSubscribe ? list : copyList
    }, [data, isClear])

    const roll = () => setIsScrolle(!isScrolle);

    const clearList = () => setIsClear(true)

    const stopGet = () => {
      if (!isSubscribe) setIsClear(false)
      setIsSubscribe(!isSubscribe)
    }

    return (
      <>
      <div className={styles.adjust}>
        <div className={styles.title}>
          <div>{formatMessage({ id: 'device.systemMessage', defaultMessage: '系统报文'})}</div>
          <Button onClick={stopGet}>{isSubscribe ? formatMessage({ id: 'device.cease', defaultMessage: '停止' }) : formatMessage({ id: 'device.activate', defaultMessage: '启动' })}</Button>
          <Button onClick={() => roll()}>{isScrolle ? formatMessage({ id: 'common.pause', defaultMessage: '暂停' }) : formatMessage({ id: 'common.roll', defaultMessage: '滚动' })}</Button>
          <Button onClick={() => clearList()}>{formatMessage({ id: 'common.clear', defaultMessage: '清空' })}</Button>
        </div>
        <div className={styles.parent} ref={warper}>
          <div className={styles.child} ref={childDom1}>
            {dataList.map((item, index) => (
              // onMouseOver={() => hoverHandler()} onMouseLeave={() => hoverHandler()}
              <div key={index} className={styles.item}>
                <div>
                  <span>Time: {item.time}</span>
                  <span className={styles.topic}>Topic: {item.topic}</span>
                </div>
                <div className={styles.msg}>{item.msg}</div>
              </div>
            ))}
          </div>
          <div className={styles.child} ref={childDom2} />
        </div>
      </div>
      </>
    );
};

export default Index;
