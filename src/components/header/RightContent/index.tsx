import { Space, message } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React, { useCallback } from 'react';
import { useModel, SelectLang, setLocale } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../../HeaderSearch';
import styles from './index.less';
import NoticeIconView from '../../NoticeIcon';
import Workbench from '../Workbench';
import { updateUserLang } from '@/services/session';
import { formatMessage } from '@/utils';
import { localeInfo } from 'umi';
export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

  const onLangClick = useCallback(({ key }) => {
    const messageKey = 'localLoading';
    message.loading({
      content:
        localeInfo[key]?.messages?.['user.localeLoading'] ||
        formatMessage({ id: 'user.localeLoading', defaultMessage: '切换语言中...' }),
      key: messageKey,
    });
    updateUserLang(key)
      .then(({ data }) => {
        if (data) {
          message.success({
            content:
              localeInfo[key]?.messages?.['user.localeDone'] ||
              formatMessage({ id: 'user.localeLoading', defaultMessage: '切换完成...' }),
            key: messageKey,
          });
          setLocale(key, true);
        } else {
          message.destroy(messageKey);
        }
      })
      .catch(() => {
        message.destroy(messageKey);
      });
  }, []);

  if (!initialState || !initialState.settings) {
    return null;
  }

  const { navTheme, layout } = initialState.settings;
  let className = styles.right;

  if ((navTheme === 'dark' && layout === 'top') || layout === 'mix') {
    className = `${styles.right}  ${styles.dark}`;
  }

  return (
    <Space className={className} size={16}>
      <Workbench />
      <Avatar menu />
      {/* <SelectLang className={`${styles.action} p0`} onItemClick={onLangClick} /> */}
    </Space>
  );
};

export default GlobalHeaderRight;
