<template>
  <view class="all"> 
    <div class="form-group">
      <p class="title">姓名</p>
      <input type="text" v-model="user.name" placeholder="请输入姓名" >
    </div>
    <div class="form-group">
      <p class="title">证件类型</p>
      <div class="select" @click="choose">
        <input type="text" v-model="columns[user.IDcardType]" disabled >
        <image  src='/static/images/logo-down.png' mode='widthFix'></image>
      </div>
    </div>
    <div class="form-group">
      <p class="title">证件号码</p>
      <input type="text" v-model="user.IDcardNum" placeholder="请输入证件号码" >
    </div>
    <div class="tips">
      <image  src='/static/images/tip.png' mode='widthFix'></image>
      <p>请输入您的实名认证信息，实名认证信息一经填写无法修改，请谨慎填写。</p>
    </div>
    <div class="button-div">
      <button type="primary" @click="submit">保存</button>
    </div>
    <van-popup position="bottom" :show="show">
      <van-picker show-toolbar title="选择证件类型" :columns="columns" @cancel="hide" @confirm="onChange" />
    </van-popup>
    <van-notify id="van-notify" />
  </view>
</template>

<script>
import Notify from '../../../static/vant/notify/notify';
export default {
  data() {
    return {
      show: false,
      columns: ['居民身份证', '临时居民身份证', '军官证', '港澳居民来往内地通行证', '台湾居民来往大陆通行证', '护照'],
      user: {
        name: '',
        IDcardType: 0,
        IDcardNum: ''
      },
      btn_flag: true
    }
  },
  created () {
    // let app = getApp()
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'完善实名认证信息',
    })
  },
  methods: {
    submit(url){
      if(this.validate(this.user.name,this.user.IDcardType,this.user.IDcardNum)){
        if(this.btn_flag){
          this.btn_flag == false
          wx.request({
            url: this.globalData.url + '/appointmentInfo/certification',
            data: {
              id: this.globalData.user.id,
              name: this.user.name,
              idType: this.user.IDcardType,
              idNum: this.user.IDcardNum
            },
            success: (res) => {
              console.log(res)
              wx.login({
                success: (res) => {
                  let code = res.code
                  wx.request({
                    url: this.globalData.url + '/login',
                    data: {
                      code: code
                    },
                    success: (res) => {
                      let userInfo = JSON.parse(res.data)
                      console.log(userInfo)
                      this.globalData.user = userInfo
                      wx.navigateTo({url: '../chooseMuseum/main'})
                    }
                  })
                }
              })
              this.btn_flag == true
            },
            fail: () => {
              this.btn_flag == true
            }
          })
        }
      }
    },
    choose(){
      this.show = true
    },
    hide(){
      this.show = false
    },
    onChange(event) {
      this.user.IDcardType = event.target.index
      this.show = false
    },
    validate(name,IDcardType,IDcardNum){
      let result = this.methods.validate(name,IDcardType,IDcardNum)
      if(result != 0){
        Notify(result)
        return false
      }
      return true
    }
  }
}
</script>

<style lang="scss">
.all{
  .form-group{
    margin-left: 25rpx;
    border-bottom: 1rpx solid #ededed;
    padding: 22rpx 0 0 0;
    .title{
      font-size: 24rpx;
      line-height: 30rpx;
      width: 100%;
      margin-bottom: 24rpx;
    }
    >input{
      font-size: 24rpx;
      line-height: 30rpx;
      width: 100%;
      margin-bottom: 30rpx;
    }
    .select{
      width: 100%;
      display: flex;
      align-items: center;
      padding-right: 45rpx;
      box-sizing: border-box;
      margin-bottom: 30rpx;
      >input{
        flex: 1;
        font-size: 24rpx;
        line-height: 30rpx;
      }
      image{
        width: 34rpx;
      }
    }
  }
  .tips{
    display: flex;
    margin-left: 25rpx;
    padding-top: 24rpx;
    margin-bottom: 20rpx;
    image{
      height: 34rpx;
      width: 34rpx;
      margin-right: 10rpx;
      margin-top: 8rpx;
    }
    p{
      flex: 1;
      font-size: 26rpx;
      color: #758ca6;
      line-height: 2;
    }
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
    button[disabled] {
      opacity: .8;
    }
  }
}
</style>
