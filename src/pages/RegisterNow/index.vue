<!--
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2022-03-31 09:13:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-02 20:20:36
-->
<template>

  <view>




    
  

      <div class="top">
        <p>金玉王候主题展览活动</p>
    <div>
      <label for="">选择日期</label>
      <ul>
        <li>今天</li>
        <li>明天</li>
        <li>周五</li>
      <div>指定日期</div>

      </ul>
    </div>

      </div>


      <div class="bottom"></div>

      <div class="footer">
        <div class="zj">总价：<span class="num">0.00</span></div>
    <button>下一步</button>
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
  onShow () {

  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'活动预约',
    })
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#000',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    /* wx.setNavigationBarColor({
      frontColor:'#ffffff',//前景颜色值，包括按钮、标题、状态栏的颜色，仅支持 #ffffff 和 #000000 (微信小程序官方规定)
      backgroundColor:'1a2241'//背景颜色值，有效值为十六进制颜色
    }) */

  },
  methods:{
        submit(){
         
    }
  }
  }
</script>

<style lang="scss">
view{
  .top{
    width: calc(100% - 64rpx);
    height: 716rpx;
    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
box-shadow: 0px 4rpx 18rpx 0px rgba(0, 0, 0, 0.05);
border-radius: 14px;
margin: 44rpx auto;
padding: 20rpx;
box-sizing: border-box;
p{
  font-size: 40rpx;
  padding-left: 28rpx;
  padding: 32rpx 28rpx;
  border-bottom: 2rpx solid rgba(0, 0, 0, 0.1);
  font-weight: bold;
}
div{
label{
  font-size: 28rpx;
  color: #000;
  display: block;
  margin-top: 50rpx;
}
ul{
  width: 100%;
  display: flex;
  div{
    width: 90rpx;
    height: 112rpx;
    
  }
}

}
  }
  .bottom{
   width: calc(100% - 64rpx);
    min-height: 324rpx;
    background: linear-gradient(180deg, #FFFFFF 0%, #FFFFFF 100%);
box-shadow: 0px 4rpx 18rpx 0px rgba(0, 0, 0, 0.05);
border-radius: 14px;
margin: 44rpx auto;
margin-bottom: 260rpx;
  }
  .footer{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 174rpx;
    box-sizing: border-box;
    padding:0 36rpx;
    background: #FFFFFF;
box-shadow: 10rpx 2rpx 18rpx 0px rgba(0, 0, 0, 0.22);
display: flex;
align-items: center;
justify-content: space-between;
.zj{
  font-size: 24rpx;
  color: #000;
  .num{
    font-size: 36rpx;
    color: #628194;
  }
}
button{
  width: 222rpx;
height: 80rpx;
background: #000000;
border-radius: 8rpx;
opacity: 0.18;
color: #fff;
font-size: 28rpx;
margin: 0;
line-height: 80rpx;
}
  }
}
</style>
