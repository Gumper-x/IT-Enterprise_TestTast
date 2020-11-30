module.exports = {
  css: {
    loaderOptions: {
      scss: {
        prependData: `@import "~@/assets/scss/vars.scss"; @import "~@/assets/scss/default.scss";`,
      },
    },
  },
};
