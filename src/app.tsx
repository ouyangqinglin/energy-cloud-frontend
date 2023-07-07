import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import type { MenuDataItem } from '@umijs/route-utils';
import { history, Link } from 'umi';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { getUserInfo, getRoutersInfo } from './services/session';
import MyHeader from '@/components/header/MyHeader';
import { getMenus, getPathTitleMap } from '@/utils';
import type { MenuProps } from 'antd';
import Logo from '@/components/header/Logo';
import styles from './app.less';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<{
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  menus?: MenuDataItem[];
  menuPathTitleMap?: Map<string, string>;
  antMenus?: MenuProps['items'];
  collapsed?: boolean;
}> {
  const fetchUserInfo = async () => {
    try {
      const resp = await getUserInfo({ showMessage: false });
      if (resp === undefined || resp.code !== 200) {
        history.push(loginPath);
      } else {
        return { ...resp.user, permissions: resp.permissions } as API.CurrentUser;
      }
    } catch (error) {
      history.push(loginPath);
    }
    return undefined;
  };

  const collapsed = window.innerWidth < 992;
  // 如果是登录页面，不执行
  if (history.location.pathname !== loginPath) {
    const currentUser = await fetchUserInfo();
    let menus;
    if (currentUser) {
      menus = await getRoutersInfo();
    }
    const antMenus = menus && getMenus(menus);
    return {
      fetchUserInfo,
      settings: defaultSettings,
      menus,
      antMenus,
      menuPathTitleMap: getPathTitleMap(antMenus),
      currentUser,
      collapsed,
    };
  } else {
    return {
      fetchUserInfo,
      settings: defaultSettings,
      collapsed,
    };
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  return {
    heightLayoutHeader: 56,
    headerRender: () => <MyHeader />,
    className: styles.layout,
    collapsedButtonRender: false,
    collapsed: initialState?.collapsed,
    onCollapse: (collapsed: boolean) => {
      setInitialState((preInitialState) => {
        return { ...preInitialState, collapsed };
      });
    },
    waterMarkProps: {
      content: initialState?.currentUser?.userName,
    },
    footerRender: false,
    onPageChange: () => {
      // const { location } = history;
      // // 如果没有登录，重定向到 login
      // if (!initialState?.currentUser && location.pathname !== loginPath) {
      //   history.push(loginPath);
      // }
    },
    // links: isDev
    //   ? [
    //     <Link key="openapi" to="/umi/plugin/openapi" target="_blank">
    //       <LinkOutlined />
    //       <span>OpenAPI 文档</span>
    //     </Link>,
    //     <Link key="docs" to="/~docs">
    //       <BookOutlined />
    //       <span>业务组件文档</span>
    //     </Link>,
    //   ]
    //   : [],
    menuHeaderRender: () => <Logo />,
    // openKeys:[],
    // onOpenChange(openKeys) {
    //   console.log(openKeys);
    // },
    menu: {
      locale: false,
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.userId,
      },
      request: async () => {
        if (!initialState?.currentUser?.userId) {
          return [];
        }
        return initialState?.menus || [];
      },
    },
    // 自定义 403 页面
    // unAccessible: <div>unAccessible</div>,
    // 增加一个 loading 的状态
    childrenRender: (children, props) => {
      return (
        <div>
          {children}
          {/* {!props.location?.pathname?.includes('/login') && (
            <SettingDrawer
              enableDarkTheme
              settings={initialState?.settings}
              onSettingChange={(settings) => {
                setInitialState((preInitialState) => ({
                  ...preInitialState,
                  settings,
                }));
              }}
            />
          )} */}
        </div>
      );
    },
    ...initialState?.settings,
  };
};
