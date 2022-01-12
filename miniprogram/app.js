// app.js
App({
  globalData:{
    userInfo:{}
  },
    /**
   * 当小程序初始化完成时，会触发 onLaunch（全局只触发一次）
   */
  onLaunch: function () {
    if (!wx.cloud) {
      console.error('请使用 2.2.3 或以上的基础库以使用云能力');
    } else {
      wx.cloud.init({
        // env 参数说明：
        //   env 参数决定接下来小程序发起的云开发调用（wx.cloud.xxx）会默认请求到哪个云环境的资源
        //   此处请填入环境 ID, 环境 ID 可打开云控制台查看
        //   如不填则使用默认环境（第一个创建的环境）
        env: 'cloud1-6ginadma447e4f94',
        traceUser: true,
      });
    }
  },
   // 添加用户信息方法
   addUserInfo(obj){
    // 1.判断Storage中userInfo是否为空
    const userInfo = wx.getStorageSync('userInfo')
    if(userInfo){
      this.globalData.userInfo = userInfo
    }else{
      wx.setStorageSync('userInfo', obj)
    }
  }
});
