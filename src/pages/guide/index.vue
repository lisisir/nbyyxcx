<!--
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2022-03-31 09:13:54
 * @LastEditors: Please set LastEditors
 * @LastEditTime: 2022-04-02 14:39:33
-->
<template>
  <view>
    <div class="tabBAr" >
<div  v-for="(item,index) in bwgitem " :key="index"   @click="tabqhidnex(index)" :class="tableIndex==index?'active':'' ">{{item.bwgname}}</div>
    </div>
    <ul v-if="(tableIndex==0)">
      <li   v-for="(item,index) in items" :key="index">
           <image  v-if="(item.state=='开启')"  class="imgs_zt" src="/static/images/zt1.png"></image>
            <image  v-if="(item.state=='关闭')" class="imgs_zt" src="/static/images/zt2.png"></image>
         <image class="imgs"  :src='item.imgsrc' mode='widthFix'></image>
      <div class="bottom">
          <p class="bt_">{{item.Name}}</p>
          <p class="bt_t">限制：{{item.limit}}</p>
           <p  class="bt_t">时间：{{item.starttime}}至{{item.overtime}}</p>
            <p  class="bt_t" >地点：{{item.address}}</p>
          <button v-if="(item.state=='开启')" class="btn" @click="submit">立即预约</button> 
            <button v-if="(item.state=='关闭')" class="btns" >报名结束</button> 
</div>
      </li>
    </ul>
        <ul v-if="(tableIndex==1)" >南山头城博物馆</ul>
  <ul v-if="(tableIndex==2)" >天后博物馆</ul>
    
  </view>
</template>

<script>
export default {
  data () {
    return {
      html: '',
      bwgitem:[{bwgname:'南山博物馆'},{bwgname:'南山头城博物馆'},{bwgname:'天后博物馆'}],
      items:[   
                { Id: 1, Name: '金玉主题展览活动1',imgsrc:'/static/images/hdyybg9.png', starttime:'2021-0102 12:30',overtime:'2021-0102 13:30', address: '三楼',limit:'18岁以上',state:"关闭"},
                { Id: 2, Name: '金玉主题展览活动2',imgsrc:'/static/images/hdyybg9.png', starttime:'2021-0102 12:30',overtime:'2021-0102 13:30', address: '三楼',limit:'18岁以上',state:"开启"},
                { Id: 3, Name: '金玉主题展览活动3',imgsrc:'/static/images/hdyybg9.png', starttime:'2021-0102 12:30',overtime:'2021-0102 13:30', address: '三楼',limit:'18岁以上',state:"开启"},
                { Id: 4, Name: '金玉主题展览活动4',imgsrc:'/static/images/hdyybg9.png', starttime:'2021-0102 12:30',overtime:'2021-0102 13:30', address: '三楼',limit:'18岁以上',state:"开启"},
                { Id: 5, Name: '金玉主题展览活动5',imgsrc:'/static/images/hdyybg9.png', starttime:'2021-0102 12:30',overtime:'2021-0102 13:30', address: '三楼',limit:'18岁以上',state:"开启"},
                { Id: 6, Name: '金玉主题展览活动6',imgsrc:'/static/images/hdyybg9.png', starttime:'2021-0102 12:30',overtime:'2021-0102 13:30', address: '三楼',limit:'18岁以上',state:"关闭"},
                { Id: 7, Name: '金玉主题展览活动7',imgsrc:'/static/images/hdyybg9.png', starttime:'2021-0102 12:30',overtime:'2021-0102 13:30', address: '三楼',limit:'18岁以上',state:"开启"},
                { Id: 8, Name: '金玉主题展览活动8',imgsrc:'/static/images/hdyybg9.png', starttime:'2021-0102 12:30',overtime:'2021-0102 13:30', address: '三楼',limit:'18岁以上',state:"开启"},
                { Id: 9, Name: '金玉主题展览活动9',imgsrc:'/static/images/hdyybg9.png', starttime:'2021-0102 12:30',overtime:'2021-0102 13:30', address: '三楼',limit:'18岁以上',state:"关闭"},
        ],
        tableIndex:0,
    }

  },
  created () {
    // let app = getApp()
  },
  onShow () {
    wx.request({
      url: this.globalData.url + '/appointmentInfo/companyProfileInfo',
      data: {
        type: 3
      },
      success: (res) => {
        this.html ='',
           console.log(this.item);
      }
    })
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
    methods: {
        submit(){
            console.log('预约页面');
             wx.navigateTo({url: '../subscribe/main'})
    },
    tabqhidnex(index){
      this.tableIndex = index
      console.log(this.tableIndex)
    }
    }
}
</script>

<style lang="scss">
view{
  .tabBAr{
    widows: 100%;
    height: 112rpx;
    background: #fff;
    box-sizing: border-box;
    padding: 60rpx;
    display: flex;
    box-shadow: 0px 2px 4px 0px rgba(0, 0, 0, 0.07);
  justify-content: space-between;
  align-items:center;
  div{
    position: relative;
    height: auto;
    padding-bottom: 35rpx;
    margin-top: 40rpx;
    &.active{
     border-bottom: 4rpx solid #405D71 ;
    }
  }
  }
  
  .bg{
    height: 100vh;
    width: 100%;
    display: block;
  }
  ul{
    padding: 0 48rpx;
    li{
      height: 670rpx;
        margin-top: 50rpx;
      background: #F6F6F6;
      position: relative;
      .imgs_zt{
        width: 54rpx;
        height: 45rpx;
        position: absolute;
        top: -2rpx;
        right: 0;
      }
      .imgs{
  width: 100%;
  height: 312rpx;
}
      .bottom{
        height:358rpx;
        padding: 30rpx 48rpx;
        margin-bottom: 10rpx;
      }
    .bt_{
      font-size: 32rpx;
      color: #000000;
      margin-bottom: 30rpx;
    }
    .bt_t{
color: rgba(0, 0, 0, 0.65);
font-size: 24rpx;
margin: 15rpx 0;
    }

    button{
      width: 204rpx;
height: 60rpx;
border-radius: 32rpx;
line-height: 60rpx;
text-align: center;
float: left;
font-size: 28rpx;
margin-top: 20rpx;

color: #fff;
    }


    .btn{
background: linear-gradient(90deg, #7496AA 0%, #577487 100%);
    }
    .btns{
background: linear-gradient(90deg, #C1C1C1 0%, #C0C0C0 100%);
    }
    }

  }
}
</style>
