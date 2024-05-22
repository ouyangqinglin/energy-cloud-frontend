import {
  ClusterOutlined,
  MailOutlined,
  TeamOutlined,
  UserOutlined,
  MobileOutlined,
  ManOutlined,
} from '@ant-design/icons';
import { Card, Col, Divider, List, Row } from 'antd';
import React, { useEffect, useState } from 'react';
import { useRequest, useModel } from 'umi';
import type { tabKeyType } from './data.d';
import { queryCurrentUserInfo } from './service';
import styles from './Center.less';
import BaseInfo from './components/BaseInfo';
import ResetPassword from './components/ResetPassword';
import AvatarCropper from './components/AvatarCropper';
import WrapContent from '@/components/WrapContent';
import PageLoading from '@/pages/dashboard/analysis/components/PageLoading';
import HeadIcon from '@/assets/image/img_avatar.png';
import eventBus from '@/utils/eventBus';
import { formatMessage } from '@/utils';
import { useAuthority } from '@/hooks';

const operationTabList = [
  {
    key: 'base',
    tab: <span>{formatMessage({ id: 'system.User.baseInfo', defaultMessage: '基本资料' })}</span>,
  },
  {
    key: 'password',
    tab: (
      <span>{formatMessage({ id: 'system.User.resetPassword', defaultMessage: '重置密码' })}</span>
    ),
  },
];

const Center: React.FC = () => {
  const [tabKey, setTabKey] = useState<tabKeyType>('base');
  const [cropperModalVisible, setCropperModalVisible] = useState<boolean>(false);
  const { authorityMap } = useAuthority(['accountCenter:edit', 'accountCenter:resetSecret']);

  //  获取用户信息
  const {
    data: userInfo,
    loading,
    run,
  } = useRequest(() => {
    return queryCurrentUserInfo();
  });

  const currentUser = userInfo?.user;

  const onFinish = (isSuccess: boolean) => {
    if (isSuccess) {
      run().then((data) => {
        eventBus.emit(
          'changeAvatar',
          data?.user?.avatar && `${data?.user?.avatar}?t=${new Date().getTime()}`,
        );
      });
    }
    setCropperModalVisible(false);
  };

  //  渲染用户信息
  const renderUserInfo = ({ userName, phone, email, sex, orgName }: Partial<API.CurrentUser>) => {
    return (
      <List>
        <List.Item>
          <div>
            <UserOutlined
              style={{
                marginRight: 8,
              }}
            />
            {formatMessage({ id: 'common.userName', defaultMessage: '用户名' })}
          </div>
          <div>{userName}</div>
        </List.Item>
        <List.Item>
          <div>
            <ManOutlined
              style={{
                marginRight: 8,
              }}
            />
            {formatMessage({ id: 'system.User.sex', defaultMessage: '性别' })}
          </div>
          <div>
            {sex === '1'
              ? formatMessage({ id: 'system.User.woman', defaultMessage: '女' })
              : formatMessage({ id: 'system.User.man', defaultMessage: '男' })}
          </div>
        </List.Item>
        <List.Item>
          <div>
            <MobileOutlined
              style={{
                marginRight: 8,
              }}
            />
            {formatMessage({ id: 'system.User.phonenumber', defaultMessage: '电话' })}
          </div>
          <div>{phone}</div>
        </List.Item>
        <List.Item>
          <div>
            <MailOutlined
              style={{
                marginRight: 8,
              }}
            />
            {formatMessage({ id: 'system.User.email', defaultMessage: '邮箱' })}
          </div>
          <div>{email}</div>
        </List.Item>
        <List.Item>
          <div>
            <ClusterOutlined
              style={{
                marginRight: 8,
              }}
            />
            {formatMessage({ id: 'system.User.dept_id', defaultMessage: '部门' })}
          </div>
          <div>{orgName}</div>
        </List.Item>
      </List>
    );
  };

  // 渲染tab切换
  const renderChildrenByTabKey = (tabValue: tabKeyType) => {
    if (tabValue === 'base') {
      return <BaseInfo values={currentUser} run={run} />;
    }
    if (tabValue === 'password') {
      return <ResetPassword />;
    }
    return null;
  };

  if (!currentUser) {
    return <PageLoading />;
  }

  return (
    <WrapContent>
      <div className="px24">
        <Row gutter={[16, 24]}>
          <Col lg={6} md={24}>
            <Card
              title={formatMessage({ id: 'system.User.userInfo', defaultMessage: '个人信息' })}
              bordered={false}
              loading={loading}
            >
              {!loading && (
                <div style={{ textAlign: 'center' }}>
                  <div
                    className={styles.avatarHolder}
                    onClick={() => {
                      authorityMap.get('accountCenter:edit') && setCropperModalVisible(true);
                    }}
                  >
                    <img
                      alt=""
                      src={
                        currentUser.avatar
                          ? `${currentUser.avatar}?t=${new Date().getTime()}`
                          : HeadIcon
                      }
                    />
                  </div>
                  {renderUserInfo(currentUser)}
                  <Divider dashed />
                  <div className={styles.team}>
                    <div className={styles.teamTitle}>
                      {formatMessage({ id: 'menu.admin', defaultMessage: '权限' })}
                    </div>
                    <Row gutter={36}>
                      {currentUser.roles &&
                        currentUser.roles.map((item: any) => (
                          <Col key={item.roleId} lg={24} xl={12}>
                            <TeamOutlined
                              style={{
                                marginRight: 8,
                              }}
                            />
                            {item.roleName}
                          </Col>
                        ))}
                    </Row>
                  </div>
                </div>
              )}
            </Card>
          </Col>
          <Col lg={18} md={24}>
            <Card
              bordered={false}
              tabList={[
                ...(authorityMap.get('accountCenter:edit') ? [operationTabList[0]] : []),
                ...(authorityMap.get('accountCenter:resetSecret') ? [operationTabList[1]] : []),
              ]}
              activeTabKey={tabKey}
              onTabChange={(_tabKey: string) => {
                setTabKey(_tabKey as tabKeyType);
              }}
            >
              {renderChildrenByTabKey(tabKey)}
            </Card>
          </Col>
        </Row>
      </div>
      <AvatarCropper
        onFinished={onFinish}
        visible={cropperModalVisible}
        data={currentUser.avatar}
      />
    </WrapContent>
  );
};

export default Center;
