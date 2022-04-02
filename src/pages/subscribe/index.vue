<!--
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2022-03-31 09:13:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-02 17:35:09
-->
<template>

  <view>
    <block v-for="(items,index) in item " :key="index" >
        <image class="bgimg"  :src='items.hdimg' mode='widthFix'></image>

      <div class="bottom">

        <div class="xfdiv">
          <p>{{items.hdname}}    <image class="zt1"  src='/static/images/zt1.png' mode='widthFix'></image>
 </p>
        <span>活动报名：{{items.hdtime}}</span>
          <span>阅读打卡：{{items.dktime}}</span>

        </div>
          <ul class="uls">
<li>
  <image class="bgimgs"  src='/static/images/bz1.png' mode='widthFix'></image>
<label>参与对象</label>
<p>{{items.hddx}}</p>
</li>
<li>
  <image class="bgimgs"  src='/static/images/bz2.png' mode='widthFix'></image>
<label>活动方式</label>
<p>{{items.hdfs}}</p>
</li>
<li>
  <image class="bgimgs"  src='/static/images/bz3.png' mode='widthFix'></image>
<label>活动流程及要求</label>
<p>{{items.lcayoq}}</p>
</li>
<li style="border:none;">
  <image class="bgimgs"  src='/static/images/bz4.png' mode='widthFix'></image>
<label>活动奖励</label>
<p>{{items.hdjl}}</p>
</li>
  </ul>

  <button class="btn" @click="submit">立即预约</button>

      </div>




      
        </block>
  </view>
</template>

<script>
export default {
  data () {
    return {
      html: '',
      item:[{hdimg:'/static/images/hdyybg9.png',hdname:'活动名称',hdtime:'报名时间',dktime:'打卡时间',hddx:'小孩',hdfs:'免费',lcayoq:'活动流程要求',hdjl:'活动奖励'}]
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
            console.log('');
             wx.navigateTo({url: '../RegisterNow/main'})
    }
  }
  }
</script>

<style lang="scss">
view{
  .bgimg{
    width: 100%;
    height: 334rpx;
  }
  .bottom{
    width: 100%;
    min-height: 800rpx;
    background: #fff;
    position: relative;
  .xfdiv{
    width: calc( 100% - 100rpx );
    height:276rpx;
    position: absolute;
    top: -160rpx;
    left: 0;
    margin: 0 50rpx;
    background: linear-gradient(180deg, #EEEDED 0%, #FFFFFF 100%);
box-shadow: 0px 4rpx 18rpx 0px rgba(0, 0, 0, 0.05);
border-radius: 14rpx;
border: 2rpx solid #E7E7E7;
  box-sizing: border-box;
  padding: 44rpx 46rpx;
  p{
    font-size: 36rpx;
    color: #000;
    font-weight: bold;
    margin-bottom: 30rpx;
    position: relative;
  }
  span{
    font-size: 28rpx;
    color: rgba(0, 0,0,0.65);
    display: block;
  }
  }
.uls{
  width: calc(100% - 152rpx);
  min-height: 400rpx;
  margin: 0 62rpx  0  92rpx;
  padding-top: 170rpx;
  li{
    width: 100%;
    position: relative;
    border-left:2rpx solid rgba(139, 162, 176, 0.41);
    padding-bottom: 35rpx;
  
  label{
    margin-left: 35rpx;
    font-weight: bold;
    font-size: 28rpx;
  }
  p{
      margin-top: 30rpx;
      color: rgba(0, 0,0,0.65);
      padding-left: 35rpx;
      font-size: 24rpx;

  }
  }

}



  }
  .btn{
    width: calc( 100% - 200rpx);
    height: 80rpx;
    border-radius: 40rpx;
    background: #5B788C;
    color: #fff;
    font-size: 28rpx;
    margin: 50rpx 100rpx;
    box-sizing: border-box;

    
  }
.bgimgs{
  position: absolute;
  left: -28rpx;
  top: -2rpx;
  width: 50rpx;
  height: 50rpx;
}
.zt1{
  position: absolute;
  right: 0;
  top: -52rpx;
     width: 54rpx;
        height: 45rpx;
}
}
</style>
