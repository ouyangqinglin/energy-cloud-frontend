import type { Settings as LayoutSettings } from '@ant-design/pro-layout';
import { PageLoading, SettingDrawer } from '@ant-design/pro-layout';
import type { RunTimeLayoutConfig } from 'umi';
import type { MenuDataItem } from '@umijs/route-utils';
import { history } from 'umi';
import { BookOutlined, LinkOutlined } from '@ant-design/icons';
import defaultSettings from '../config/defaultSettings';
import { getUserInfo, getRoutersInfo } from './services/session';
import MyHeader from '@/components/header/MyHeader';
import { getMenus, getPathTitleMap, getPathArrary } from '@/utils';
import type { MenuProps } from 'antd';
import Logo from '@/components/header/Logo';
import styles from './app.less';
import configSetting from '../config/defaultSettings';
import { SiteDataType } from './services/station';
import { defaultSystemInfo } from '@/utils/config';

const isDev = process.env.NODE_ENV === 'development';
const loginPath = '/user/login';

/** 获取用户信息比较慢的时候会展示一个 loading */
export const initialStateConfig = {
  loading: <PageLoading />,
};

const editFavicon = (data?: initialStateType) => {
  const head = document.getElementsByTagName('head')[0];
  const link = document.querySelector("link[rel*='icon']") || document.createElement('link');
  if (data?.currentUser?.systemInfo?.icon) {
    link.type = 'image/x-icon';
    link.rel = 'shortcut icon';
    link.href = data?.currentUser?.systemInfo?.icon;
    head.appendChild(link);
  } else {
    link.remove();
  }
  setTimeout(() => {
    document.title = data?.currentUser?.systemInfo?.title || '';
  }, 700);
};

export type initialStateType = {
  settings?: Partial<LayoutSettings>;
  currentUser?: API.CurrentUser;
  loading?: boolean;
  fetchUserInfo?: () => Promise<API.CurrentUser | undefined>;
  menus?: MenuDataItem[];
  menuPathTitleMap?: Map<string, string>;
  antMenus?: MenuProps['items'];
  collapsed?: boolean;
  openKeys?: string[];
  site?: SiteDataType;
};

/**
 * @see  https://umijs.org/zh-CN/plugins/plugin-initial-state
 * */
export async function getInitialState(): Promise<initialStateType> {
  const fetchUserInfo = async () => {
    try {
      const resp = await getUserInfo({ showMessage: false });
      if (resp === undefined || resp.code !== 200) {
        history.push(loginPath);
      } else {
        return {
          ...resp.user,
          permissions: resp.permissions,
          systemInfo: {
            ...defaultSystemInfo,
            ...resp?.systemInfo,
          },
        } as API.CurrentUser;
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
      currentUser: {
        systemInfo: defaultSystemInfo,
      },
    };
  }
}

// ProLayout 支持的api https://procomponents.ant.design/components/layout
export const layout: RunTimeLayoutConfig = ({ initialState, setInitialState }) => {
  editFavicon(initialState);

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
    openKeys: initialState?.openKeys,
    onOpenChange(openKeys) {
      if (Array.isArray(openKeys)) {
        if (initialState?.openKeys && initialState?.openKeys?.length) {
          if (
            openKeys[openKeys.length - 1] == initialState.openKeys[initialState.openKeys.length - 1]
          ) {
            for (let i = 0; i < initialState.openKeys.length; i++) {
              if (initialState.openKeys[i] != openKeys[i]) {
                setInitialState?.((prevData) => {
                  return {
                    ...prevData,
                    openKeys: getPathArrary(prevData?.openKeys?.[i - 1] || ''),
                  };
                });
                return;
              }
            }
          }
        }
        setInitialState?.((prevData) => {
          return { ...prevData, openKeys: getPathArrary(openKeys[openKeys.length - 1]) };
        });
      }
    },
    menu: {
      locale: false,
      // 每当 initialState?.currentUser?.userid 发生修改时重新执行 request
      params: {
        userId: initialState?.currentUser?.userId,
        menus: initialState?.menus,
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
