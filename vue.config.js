module.exports = {
  transpileDependencies: ["vuetify"],
  publicPath: "./",
  chainWebpack: config => {
    config.plugin("html").tap(args => {
      args[0].title = "视频播放器";
      return args;
    });
  },
  pluginOptions: {
    electronBuilder: {
      // 打包配置
      builderOptions: {
        // 项目名
        productName: "视频播放器",
        // 包名
        appId: "cn.example.demo",
        copyright: "Copyright Mr.Cao",
        win: {
          // 桌面图标
          icon: "./public/app.ico",
          target: [
            {
              target: "nsis",
              arch: ["ia32"] // ia32,x64
            }
          ]
        },
        // 安装包名称
        // artifactName: '${productName}_Setup_${version}.${ext}',
        artifactName: "${productName}安装包.${ext}",
        nsis: {
          // 一键安装,如果设为true的话nsis设置就无意义请直接删除nsis配置
          oneClick: false,
          // true全用户安装,false安装到当前用户
          perMachine: true,
          // 允许修改安装目录
          allowToChangeInstallationDirectory: true,
          // 创建桌面图标
          createDesktopShortcut: true,
          // 创建开始菜单图标
          createStartMenuShortcut: true
        }
      }
    }
  }
};
