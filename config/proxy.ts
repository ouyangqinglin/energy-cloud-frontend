/**
 * 在生产环境 代理是无法生效的，所以这里没有生产环境的配置
 * -------------------------------
 * The agent cannot take effect in the production environment
 * so there is no configuration of the production environment
 * For details, please see
 * https://pro.ant.design/docs/deploy
 */
export default {
  dev: {
    '/api/': {
      // target: 'https://192.168.3.18',//开发环境
      target: 'https://ytoss.yotaienergy.com',
      // target: 'https://120.78.129.213',
      // target: 'https://192.168.3.47',//测试环境
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '/prod-api' },
    },
    '/file/': {
      target: 'https://ytoss.yotaienergy.com',
      changeOrigin: true,
      secure: false,
    },
    '/profile/avatar/': {
      target: 'https://192.168.3.18',
      changeOrigin: true,
      secure: false,
    },
  },
  test: {
    '/api/': {
      target: 'https://192.168.3.18',
      changeOrigin: true,
      pathRewrite: { '^/api': '/prod-api' },
      secure: false,
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
      secure: false,
    },
  },
};
