// pages/menu/childCpns/food-pop/food-pop.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    info:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    totalPrice:0,
    checkList:[],
    selectList:[
      {
        name:'01',
        text:'加鸡蛋'
      },
      {
        name:'02',
        text:'加面'
      },
      {
        name:'03',
        text:'加牛肉'
      }
    ]
  },
  observers:{
    'info':function(info){
      if(info){
        this.setData({
          totalPrice:info.price
        })
      }
    },
    'checkList':function(checkList){
      const price = this.properties.info.price
      let total
      let bool_one = checkList.includes('01')
      let bool_two = checkList.includes('02')
      let bool_three = checkList.includes('03')
      total = price + bool_one * 2 + bool_two * 2 + bool_three * 10
      this.setData({
        totalPrice:total
      })
      
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    onChange(event){
      this.setData({
        checkList: event.detail,
      });
    }
  }
})
