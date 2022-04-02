<template>
  <view class="all"> 
    <div class="content-div">
      <div class="content" v-html='html'></div>
    </div>
    <div class="button-div">
      <button type="primary" @click="submit">确定</button>
    </div>
  </view>
</template>

<script>
export default {
  data () {
    return {
      html: ''
    }
  },
  created () {
    // let app = getApp()
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'预约须知',
    })
  },
  onShow () {
    let type = 0
    if(this.globalData.item_museumId==1){
      type = 1
    }
    if(this.globalData.item_museumId==2){
      type = 4
    }
    if(this.globalData.item_museumId==3){
      type = 8
    }
    wx.request({
      url: this.globalData.url + '/appointmentInfo/companyProfileInfo',
      data: {
        type: type
      },
      success: (res) => {
        this.html = res.data.data
      }
    })
  },
  methods: {
    submit(){
      wx.navigateTo({url: '../information/main'})
    }
  }
}
</script>

<style lang="scss">
.all{
  .content-div{
    padding: 0 25rpx;
  }
  .button-div{
    padding: 40rpx 25rpx;
    box-sizing: border-box;
    button{
      border-radius: 0;
      background-color: #758ca6;
      line-height: 88rpx;
      height: 88rpx;
      font-size: 30rpx;
      &.button-hover{
        background-color: #607a96;
      }
    }
  }
}
</style>
