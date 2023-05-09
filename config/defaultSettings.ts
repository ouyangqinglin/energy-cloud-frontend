import { Settings as LayoutSettings } from '@ant-design/pro-layout';

const isDev = process.env.NODE_ENV === 'development';
const Settings: LayoutSettings & {
  pwa?: boolean;
  logo?: string;
  tabsLayout?: boolean;
  apiBasePath?: string;
} = {
  navTheme: 'light',
  headerTheme: 'light',
  primaryColor: '#165DFF',
  layout: 'mix',
  // splitMenus: true,
  contentWidth: 'Fluid',
  fixedHeader: true,
  fixSiderbar: true,
  colorWeak: false,
  title: '永泰数能',
  pwa: false,
  iconfontUrl: '',
  tabsLayout: true,
  apiBasePath: isDev ? '/api' : '/prod-api',
};

export default Settings;
