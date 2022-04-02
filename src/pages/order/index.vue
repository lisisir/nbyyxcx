<template>
  <view class="all">
    <ul>
      <li @click="go(item.id)" v-for="(item,index) in items" :key="index">
        <h1>
          <p>参观者：{{item.name}}</p>
          <div v-if="item.status=='已预约'" class="yes">
            预约成功
          </div>
          <div v-if="item.status=='已入馆'" class="yes">
            已入馆
          </div>
          <div v-if="item.status=='已取消'" class="no">
            已取消
          </div>
          <div v-if="item.status=='已过期'" class="no">
            已过期
          </div>
        </h1>
        <h2>
          <p>预约时间：{{item.createTime}}</p>
          <p>入馆时间：{{item.date}}</p>
        </h2>
      </li>
    </ul>
    <!-- <van-tabs swipeable color="#748ca6">
      <van-tab title="个人预约">
        <ul>
          <li @click="go(item.id)" v-for="(item,index) in items" :key="index">
            <h1>
              <p>参观者：{{item.name}}</p>
              <div v-if="item.status=='已预约'" class="yes">
                预约成功
              </div>
              <div v-if="item.status=='已入馆'" class="yes">
                已入馆
              </div>
              <div v-if="item.status=='已取消'" class="no">
                已取消
              </div>
              <div v-if="item.status=='已过期'" class="no">
                已过期
              </div>
            </h1>
            <h2>
              <p>预约时间：{{item.createTime}}</p>
              <p>入馆时间：{{item.date}}</p>
            </h2>
          </li>
        </ul>
      </van-tab>
      <van-tab title="活动预约">
        <ul>
        </ul>
      </van-tab>
      <van-tab title="导览预约">
        <ul>
        </ul>
      </van-tab>
      <van-tab title="展览预约">
        <ul>
        </ul>
      </van-tab>
    </van-tabs> -->
  </view>
</template>

<script>
export default {
  data () {
    return {
      items: {
      }
    }
  },
  onShow(){
    wx.request({
      url: this.globalData.url + '/appointmentInfo/getAppByMid',
      data: {
        memberId: this.globalData.user.id
      },
      success: (res) => {
        this.items = res.data.data
        for (let i = 0; i < this.items.length; i++) {
          this.items[i].date = this.items[i].appointmentDate.split(' ')[0] + ' ' +  this.items[i].openTime
        }
        console.log(this.items)
      }
    })
  },
  created () {
    // let app = getApp()
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'预约记录',
    })
  },
  methods: {
    go(id){
      this.globalData.detailID = id
      wx.navigateTo({url: '../orderDeatil/main'})
    }
  },
}
</script>

<style lang="scss">
page{
  height: 100vh;
  background: #f5f5f5;
}
.all{
  height: 100%;
  ul{
    /* height: calc(100vh - 88rpx); */
    height: 100vh;
    overflow: scroll;
    padding: 30rpx 25rpx 10rpx 25rpx;
    li{
      margin-bottom: 20rpx;
      border: 1rpx solid #dbdbdb;
      padding: 20rpx 20rpx 0 20rpx;
      background: #ffffff;
      h1{
        display: flex;
        justify-content: space-between;
        padding: 0 10rpx 020rpx 10rpx;
        align-items: center;
        border-bottom: 1rpx solid #ebebeb;
        p{
          font-size: 30rpx;
          font-weight: bold;
        }
        div{
          font-size: 26rpx;
          &.yes{
            color: #45c029;
          }
          &.no{
            color: #ff4b4b;
          }
        }
      }
      h2{
        padding: 20rpx 10rpx 0 10rpx;
        p{
          margin-bottom: 20rpx;
          font-size: 26rpx;
        }
      }
    }
  }
  .van-tab--active{
    .van-ellipsis{
      color: #748ca6;
    }
  }
  .van-hairline--top-bottom:after{
    border: none;
  }
}
</style>
