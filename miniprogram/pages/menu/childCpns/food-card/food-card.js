// pages/menu/childCpns/food_card/food_card.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    foodList:{
      type:Array,
      value:[]
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    sendEvent(){
      this.triggerEvent('imageLoad',{},{})
    },
    selectSpec(event){
      const f_id = event.currentTarget.dataset.info.f_id
      const f_price = event.currentTarget.dataset.info.price
      const f_info = event.currentTarget.dataset.info
      this.triggerEvent('selectSpec',{
        f_info
      })
    }
  }
})
