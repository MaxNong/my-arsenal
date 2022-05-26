---
title: build-center
nav:
  path: /front-end
  title: Web前端
  order: 1
group:
  path: /build
  title: npm包和github
  order: 1
---

## 基本介绍
构建中心，支持webpack5以及模块联邦独立配置，后续添加vite、rollup等构建方式

## 使用方式
项目根目录添加.builder.js，内容如下  
webpack模式：
```js
const deps = require('./package.json').dependencies;

function loadAssociatedApps() {
    const associatedApps = [
        {
            remoteName: "lantu-workbench",
            appPath: '../lantu-workbench',
            developmentLoadUrl: '//local.dev.com',
            productionLoadUrl: '//lantu.ytoulan.com'
        }
    ]
    try {
        const localConf = require("./.build.local.js");
        const newAssociatedApps = associatedApps.map(item => {
            const mappingItem = localConf.find(localItem => localItem.remoteName === item.remoteName);
            return {
                remoteName: item.remoteName,
                appPath: mappingItem.appPath || item.appPath,
                developmentLoadUrl: mappingItem.developmentLoadUrl || item.appPath,
                productionLoadUrl: item.productionLoadUrl
            }
        })

        return newAssociatedApps;
    } catch (error) {
        if (process.env.PRE_CHECK === "true") {
            console.log("检测到moduleFederation插件，你可以在根目录下添加.build.local.js灵活配置远程资源加载地址。")
            console.log()
        }
        return associatedApps;
    }
}

module.exports = {
    appName: "lantu-center",
    entry: "./src/index",
    associatedApps: loadAssociatedApps(),
    devServer: {
        port: 3001
    },
    plugins: {
        moduleFederation: {
            name: "lantu-center",
            remotes: {
                "lantu-workbench": "lantu_workbench@${HOST}/lantu-workbench/lantu-workbench.js",
            },
            shared: {
                react: {
                    singleton: true, requiredVersion: deps["react"]
                },
                "react-dom": { singleton: true, requiredVersion: deps["react-dom"] }
            },
        }
    },
    // 扩展webpack配置
    extendWebpackConfig: {}
}
```
当配置了associateApps关联app字段，表示本工程使用模块联邦，可以配置.build.local.js用于指定关联app的加载方式，可以是远程可以是本地，当指定本地的时候，会同时启动关联app。
配置内容像下面这样：  
```js
module.exports = [
    {
        remoteName: "lantu-workbench",
        developmentLoadUrl: '//local.dev.com',
    }
]
```



## 链接
- @build-center/cli   [npm下载](https://www.npmjs.com/package/@build-center/cli)
- @build-center/service   [npm下载](https://www.npmjs.com/package/@build-center/cli-service)
