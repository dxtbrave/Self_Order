// pages/profile/childCpns/header/header.js
const {envList} = require('../../../../envList.js')
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
  },

  /**
   * 组件的初始数据
   */
  data: {
    isHeader:false,
    userInfo:{},
    envList,
    openid:""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleLogin(e){
      this.triggerEvent('showLoading')
      // 调用云开发获取OpenId
      this.getOpenId()
      // 调用方法获取用户信息
      this.getUserInfo()
    },
    handleSignout(){
      this.triggerEvent('showDialog')
    },
    // 退出登录方法
    Signout(){
      this.triggerEvent('showLoading')
      setTimeout(()=>{
        this.setData({
          userInfo:{},
          isHeader:false
        })
        this.triggerEvent('closeLoading')
      },500)

    },
    // 获取openId
    getOpenId(){
      wx.cloud.callFunction({
        name:'quickstartFunctions',
        config:{
          env:this.data.envList[0].envId
        },
        data:{
          type:'getOpenId'
        },
        complete:res=>{
          this.data.openid = res.result.openid
        }
      })
    },
    // 获取用户信息
    getUserInfo(){
      wx.getUserProfile({
        desc:'获取您的昵称、头像、地区及性别',
        success:res=>{
          res.userInfo.openid = this.data.openid
          app.addUserInfo(res.userInfo)
          this.setData({
            userInfo:res.userInfo,
            isHeader:true
          })
          this.triggerEvent('closeLoading')
        },
        fail:err=>{
          console.log(err);
          this.triggerEvent('closeLoading')
        }
      })
    }
  }
})
