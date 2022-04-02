<template>
  <view>
    <div class="top">
      <image class="bg" src='/static/images/my-bg.jpg' mode='widthFix'></image>
      <image class="avatar" :src='user.avatarUrl' mode='widthFix'></image>
      <!-- <open-data class="avatar" type="userAvatarUrl"></open-data> -->
      <p class="phone"><open-data type="userNickName"></open-data></p>
      <ul>
        <li>
          <navigator url='../changeID/main' >
            <p style="margin-top: 28rpx">修改信息</p>
          </navigator>
        </li>
        <div class="shu"></div>
        <li>
          <navigator url="../order/main">
            <p style="margin-top: 24rpx">预约记录</p>
          </navigator>
        </li>
        <!-- <li>
          <navigator>
            <image style="width: 32rpx;" src='/static/images/my-logo-3.png' mode='widthFix'></image>
            <p style="margin-top: 28rpx">联系人</p>
          </navigator>
        </li> -->
        
      </ul>
    </div>
  <div class="footer_text">
    <h2>基本信息</h2>
    <van-cell class="icon-hide" title="真实姓名"  :value="user.realname" />
    <van-cell class="icon-hide" title="性别"  value="男" v-if='user.gender==1' />
    <van-cell class="icon-hide" title="性别"  value="女" v-if='user.gender==2' />
    <van-cell class="icon-hide" title="性别"  value="未知" v-if='user.gender==0' />
    <van-cell class="icon-hide" title="证件号码" :value="user.idNum"  />
    <!-- <van-cell title="证件号码" is-link :value="user.idNum" @click='changeIDNum' /> -->
    <van-cell class="icon-hide" title="手机号码" :value="user.mobile" />
    </div>
  </view>
</template>

<script>
export default {
  data () {
    return {
      user: ''
    }
  },
  onShow(){
    this.user = this.globalData.user
  },
  mounted() {
    console.log(this.globalData.url)
    /* wx.login({
      success: (res) => {
        console.log(res)
        wx.request({
          url: 'https://test.com/onLogin' + this.globalData.url,
          data: {
            code: res.code
          }
        })
      }
    }) */
    /* wx.login({
      success (res) {
        console.log(res)
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'https://test.com/onLogin',
            data: {
              code: res.code
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    }) */
  },
  created () {
    // let app = getApp()
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'个人中心',
    })

  },
  methods: {
    changeIDNum(){
      if(this.user.idNum){
        wx.navigateTo({url: '../changeID/main'})
      }
    }
  },
}
</script>

<style lang="scss">
view{
  margin-bottom: 40rpx;
  .top{
    position: relative;
    margin-bottom: 30rpx;
    .avatar{
      height: 149rpx;
      width: 149rpx;
      position: absolute;
      left: 50%;
      top: 70rpx;
      transform: translateX(-50%);
      border-radius: 50%;
    }
    .phone{
      position: absolute;
      top: 250rpx;
      left: 50%;
      transform: translateX(-50%);
      font-size: 30rpx;
      color: #ffffff;
    }
    .bg{
      width: 100%;
      font-size: 0;
      display: block;
      margin-bottom: 120rpx;
    }
    ul{
      width: calc( 100% - 88rpx );
      margin: 0 44rpx;
      position: absolute;
      bottom: -60rpx;
      display: flex;
      justify-content: center;
      height: 230rpx;
      align-items: center;
      box-sizing: border-box;
      padding: 0 40rpx;
background: #FFFFFF;
box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
border-radius: 6px;
margin-top: 140rpx;
.shu{
  height: 80%;
  width: 2rpx;
  background:  #E7E7E7;
  margin-top: 30rpx;
}
      li{
        flex: 1;
        navigator{
          display: flex;
          flex-direction: column;
          align-items: center;
        };
        p{
          padding-top: 40rpx;
          font-size: 36rpx;

        }
        &.active{
          p{
            color: #758ca6;
          }
        }
      }
    }
  }
  .icon-hide{
    van-icon{
      opacity: 0;
    }
  }
  .van-cell__title{
    color: #666666;
  }
  .van-cell__value,.van-cell__right-icon-wrap{
    color: #333333;
  }
  .footer_text{
   margin-top: 240rpx;
    width: calc( 100% - 88rpx );
    background: #FFFFFF;
box-shadow: 0px 2px 8px 0px rgba(0, 0, 0, 0.09);
border-radius: 6px;
margin: 0 auto;
margin-top: 30rpx;
padding-top: 14rpx;
.icon-hide{
  height: 140rpx;
}
  }
  h2{
    font-size: 36rpx;
    font-weight: bold;
    color: #000;
    text-indent: 32rpx;
    margin-top: 44rpx;
    
  }
}
</style>
