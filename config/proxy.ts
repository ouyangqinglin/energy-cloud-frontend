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
      target: 'https://192.168.3.18',
      // target: 'http://ytoss.yotaienergy.com',
      changeOrigin: true,
      secure: false,
      pathRewrite: { '^/api': '/prod-api' },
      // pathRewrite: { '^/api': '' },
    },
    '/file/': {
      target: 'https://192.168.3.18',
      secure: false,
      changeOrigin: true,
    },
    '/profile/avatar/': {
      target: 'https://192.168.3.18',
      secure: false,
      changeOrigin: true,
    },
  },
  test: {
    '/api/': {
      target: 'https://192.168.3.18',
      secure: false,
      changeOrigin: true,
      pathRewrite: { '^/api': '/prod-api' },
    },
  },
  pre: {
    '/api/': {
      target: 'your pre url',
      changeOrigin: true,
      pathRewrite: { '^': '' },
    },
  },
};
