module.exports = {
  devServer: {
    proxy: {
      "/api": {
        target: "http://erpapi.vueadmin.com",
        // ws: true,
        // changeOrigin: true
      },
      // '/foo': {
      //   target: '<other_url>'
      // }
    },
  },
};
