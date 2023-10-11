import { Space } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';
import React from 'react';
import { useModel, SelectLang } from 'umi';
import Avatar from './AvatarDropdown';
import HeaderSearch from '../../HeaderSearch';
import styles from './index.less';
import NoticeIconView from '../../NoticeIcon';
import Workbench from '../Workbench';

export type SiderTheme = 'light' | 'dark';

const GlobalHeaderRight: React.FC = () => {
  const { initialState } = useModel('@@initialState');

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
      <SelectLang className={`${styles.action} p0`} />
    </Space>
  );
};

export default GlobalHeaderRight;
