/*
 * @Description:
 * @Author: YangJianFei
 * @Date: 2023-06-27 16:31:19
 * @LastEditTime: 2023-07-04 10:04:53
 * @LastEditors: YangJianFei
 * @FilePath: \energy-cloud-frontend\src\components\alarm\index.tsx
 */
import React, {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Button, Switch, Tag} from 'antd';
import {MessageEventType, RequestCommandEnum} from '@/utils/connection';
import styles from './index.less';
import {formatMessage} from '@/utils';
import {useSubscribe} from '@/hooks';
import moment from 'moment';
import useWebsocket from '@/pages/screen/useWebsocket';
import classnames from "classnames";


const Index: React.FC = (props) => {
  const { deviceId } = props
  const [list, setList] = useState([])
  const [isScrolle, setIsScrolle] = useState(true);
  const [isSubscribe, setIsSubscribe] = useState(true)
  const [isOpen, setIsOpen] = useState(true)
  const { connection } = useWebsocket(true);

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

    const data = useSubscribe(deviceId, isOpen, MessageEventType.DEVICEMSG)
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
          type: data.type, // 0是下行， 1是上行
          time,
        }]
        setList([...list, ...arr])
      }
    }, [data])

    const hoverHandler = (flag: boolean) => setIsScrolle(flag);

    const clearList = () => setList([])

    const stopGet = (flag: boolean) => {
      if (flag) {
        // 打开
        setIsSubscribe(true)
        connection.reconnect()
        setIsOpen(true)
      } else {
        // 关闭
        connection.sendMessage({
          data: {
            command: RequestCommandEnum.UNSUBSCRIBE
          },
          type: MessageEventType.DEVICEMSG
        })
        setIsOpen(false)
        setIsSubscribe(false)
      }
    }

    return (
      <>
      <div className={styles.adjust}>
        <div className={styles.title}>
          <div>{formatMessage({ id: 'device.systemMessage', defaultMessage: '监听'})}</div>
          <Switch checked={isSubscribe} onChange={stopGet} />
          <Button onClick={() => clearList()}>{formatMessage({ id: 'common.clear', defaultMessage: '清空' })}</Button>
        </div>
        <div className={styles.parent} ref={warper}>
          <div className={styles.child} ref={childDom1}>
            {list.map((item, index) => (
              <div key={index} className={classnames(styles.item, item.type ? styles.blue : '')}
                   onMouseOver={() => hoverHandler(false)} onMouseOut={() => hoverHandler(true)}>
                <div>
                  <Tag color={['#87d068', '#108ee9'][item.type]}>{item.type ? '上行' : '下行'}</Tag>
                  <span>{item.time}</span>
                </div>
                <span className={styles.topic}>Topic: {item.topic}</span>
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
