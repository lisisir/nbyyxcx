<template>
  <view class="all"> 
    <div class="form-group">
      <p class="title">姓名</p>
      <input type="text" v-model="user.name" placeholder="请输入需要修改的姓名" >
    </div>
    <div class="form-group">
      <p class="title">性别</p>
      <div style = 'padding-bottom: 30rpx'>
        <van-radio-group v-model="user.gender" @change = 'changeSex' direction="horizontal" style = 'font-size: 24rpx; color: #999'>
          <van-radio name="1">男</van-radio>
          <van-radio name="2">女</van-radio>
        </van-radio-group>
      </div>
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
        IDcardNum: '',
        // 性别， 0 未知 1 男 2 女
        gender: ''
      },
      btn_flag: true,
    }
  },
  created () {
    // let app = getApp()
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'修改基本信息',
    })
  },
  onShow(){
    this.user.name = this.globalData.user.realname
    this.user.gender = this.globalData.user.gender
    this.user.IDcardType = this.globalData.user.idType
    this.user.IDcardNum = this.globalData.user.idNum
  },
  methods: {
    changeSex (event) {
      console.log(event)
      this.user.gender = event.target[0]
    },
    submit(url){
      // 判断身份证号是否相同
      // if(this.user.IDcardNum == this.globalData.user.idNum && this.user.IDcardType == this.globalData.user.idType){
      //   Notify('证件号码不能相同')
      //   return
      // }
      if(this.validate('过检测',this.user.IDcardType,this.user.IDcardNum)){
        if(this.btn_flag){
          this.btn_flag == false
          wx.request({
            url: this.globalData.url + '/updateIdNum',
            data: {
              userId: this.globalData.user.id,
              idType: this.user.IDcardType,
              idNum: this.user.IDcardNum,
              realname: this.user.name,
              gender: this.user.gender
            },
            success: (res) => {
              console.log(res)
              if (res.data.code == '200') {
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
                        wx.redirectTo({url: '../my/main'})
                      }
                    })
                  }
                })
              } else {
                Notify(res.data.msg)
              }
              
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
      let result = this.methods.validate(name,parseInt(IDcardType),IDcardNum)
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
