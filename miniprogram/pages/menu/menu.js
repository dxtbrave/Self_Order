// pages/menu/menu.js
const {
  envList
} = require('../../envList.js')
const common = require('../../common/common.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    activeKey: 0,
    menuClass: [],
    soupNoodle: [],
    stirNoodle: [],
    sauteNoodle: [],
    stirTop: 0,
    sauteTop: 0,
    toView: '',
    isPop:false,
    currrentInfo:{}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.cloud.callFunction({
      name: 'quickstartFunctions',
      config: {
        env: envList[0].envId
      },
      data: {
        type: 'selectMenuClass'
      },
      complete: res => {
        this.setData({
          menuClass: res.result.data[0].menu_class,
          soupNoodle: res.result.data[1].soup_noodle,
          stirNoodle: res.result.data[1].stir_noodle,
          sauteNoodle: res.result.data[1].saute_noodle
        })
      }
    })

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    this.getTop()
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  // 监听右侧滚动区域滚动
  //   ScrollEvent:common.throttle(function(e){
  //     // 1.取出scrollTop
  //     const scrollTop = e[0].detail.scrollTop.toFixed(0)
  //     console.log(scrollTop);
  //     // 2.取出各个组件高度
  //     const stir = this.data.stirTop
  //     const saute = this.data.sauteTop
  //     // 3.修改左边滚动区域
  //     let index = 0
  //     if(scrollTop >= 0 && scrollTop < stir){
  //       index = 0
  //     }else if(scrollTop >= stir && scrollTop < saute){
  //       index = 1
  //     }else if(scrollTop >= saute){
  //       index = 2
  //     }
  //     if(index != this.data.activeKey){
  //       this.setData({
  //         activeKey:index
  //       })
  //     }
  //  }),
  ScrollEvent(options) {
    // 1.取出scrollTop
    const scrollTop = options.detail.scrollTop
    // 2.取出各个组件高度
    const stir = this.data.stirTop
    const saute = this.data.sauteTop
    // 3.修改左边滚动区域
    let index = 0
    if (scrollTop >= 0 && scrollTop < stir) {
      index = 0
    } else if (scrollTop >= stir && scrollTop < saute) {
      index = 1
    } else if (scrollTop >= saute) {
      index = 2
    }
    if (index != this.data.activeKey) {
      this.setData({
        activeKey: index
      })
    }
  },
  // 点击左侧滚动区域
  onChange(options) {
    const index = options.detail
      switch (index) {
        case 0:
          this.setData({
            toView: 'soup-card'
          })
          break;
        case 1:
          this.setData({
            toView: 'stir-card'
          })
          break;
        case 2:
          this.setData({
            toView: 'saute-card'
          })
          break;
    }
  },
  // 获取组件高度
  getTop() {
    const query = wx.createSelectorQuery()
    // query.select('.soup-card').boundingClientRect(res=>{
    //   console.log(res);
    // }).exec()
    query.select('.stir-card').boundingClientRect(res => {
      this.setData({
        stirTop: res.top.toFixed(0)
      })
    }).exec()
    query.select('.saute-card').boundingClientRect(res => {
      this.setData({
        sauteTop: res.top.toFixed(0)
      })
    }).exec()
  },
  // 图片加载完成
  imageLoad() {
    this.getTop()
  },
  // 选择菜品规格事件
  selectSpec(event){
    const currentInfo = event.detail.f_info
    console.log(currentInfo);
    this.setData({
      isPop:true,
      currentInfo
    })
  },
  // 收缩栏收缩事件
  closePop(){
    this.setData({
      isPop:false,
    })
    setTimeout(()=>{
      this.setData({
        currentInfo:{}
      })
    },200)
  }
})