<template>
  <view class="all">
    <div class="top">
      <image class="logo" src='/static/images/success.jpg' mode='widthFix'></image>
      <p>预约参观成功！</p>
    </div>
    <ul class="detail">
      <li>
        <label>入馆时间</label>
        <p>{{date}}</p>
      </li>
      <li>
        <label>
            参观人数
        </label>
        <p>{{num}}人</p>
      </li>
    </ul>
    <div class="button-div">
      <button type="primary" @click="detail">查看详情</button>
    </div>
    <div class="back-div">
      <div class="back" @click="back">返回首页>></div>
    </div>
    <div class="fwb">
      <div v-html='html'></div>
    </div>
  </view>
</template>

<script>
export default {
  data () {
    return {
      html: '',
      date: '',
      num: ''
    }
  },
  created () {
    // let app = getApp()
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'预约成功',
    })
  },
  onShow(){
    this.date = this.globalData.item_dateName
    this.num = this.globalData.success.length
  },
  onHide(){
    //清空数据
    this.globalData.item_museumId = null
    this.globalData.item_date = null
    this.globalData.item_openTime = null
    this.globalData.item_dateName = null
  },
  mounted () {
    let type = 0
    if(this.globalData.item_museumId==1){
      type = 2
    }
    if(this.globalData.item_museumId==2){
      type = 5
    }
    if(this.globalData.item_museumId==3){
      type = 7
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
    detail(url){
      this.globalData.detailID = this.globalData.success[0].id
      wx.redirectTo({url: '../order/main'})
      
    },
    back(){
      wx.redirectTo({url: '../index/main'})
    }
  }
}
</script>

<style lang="scss">
page{
  background: #f5f5f5;
}
.all{
  .top{
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 30rpx 0 50rpx 0;
    background: #ffffff;
    .logo{
      height: 88rpx;
      width: 88rpx;
      margin-bottom: 10rpx;
    }
    p{
      font-size: 30rpx;
      color: #333333;
      padding-left: 20rpx;
    }
  }
  .detail{
    background: #ffffff;
    padding: 0 25rpx 10rpx 25rpx;
    li{
      padding: 30rpx 0 30rpx 40rpx;
      display: flex;
      align-items: center;
      label{
        margin-right: 40rpx;
        font-size: 26rpx;
        color: #666666;
      }
      p{
        color: #758ca6;
        font-size: 26rpx;
      }
      &:nth-child(1){
        border-bottom: 1rpx solid #ededed;
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACo0lEQVRIibWXv2sUQRTHP3cxwSIShXgWYhBBRZIqYGGp4MVK0CI5tJUrVBLFQq0EETRYGIMxha2QH0UEu2jhHyBaKQQOFFMmERO0iiSRJ9+Rl2H3dr3cfWG5vbdvvt95szM73ylUq1VyoB0YAM4CJ4EjwF41WwW+AO+Bt8A88DuLclfGcyO/AVwF9qfkHNB1ChgGVoAJYEydSkSxjmgFWADu1RFNQrfaLIgjt3Ab8ByYUiUBi8AjDfkhYDewBzgBnNOzr9FITImrLRaJ37ElzAIXI8E7im9kVGuFDKkTPS4+Bwz69nHFY5Hoa6BPPc8SNWwqt1e/Acb5NO5hgPX0uvtviReAnzkEY/wCLgNPXPyaNLYJ2+wdd0kzwE1VkIQtd6XBnt0SV8B4WIZB2JZMSff2Tq9QnzQvtsS1qPyStP4Kd2idBtzVUDULxnXbcZlWhwmX3Tr9Bkw3UTRgVtxIqxyEA6brvNedYDMqaMCE+13gXQtEk7j7TfiYC3xqobDnPmqbRJcLrDRAmDb7C9H/ZXffVW+TaClMeM0JdLdQzO9wayZcc4HenCSFHFeMPve/ZsIfXOBM4wVl4rRL+GjCb1xgKMMcNIqi3yBMMwh/V+Cw9s1mY1DcaHbPm/A68MwJjQKdTRTuFGeAOZL1MKxmAJZ0b87hRcI6bAQFcQU3siytf+9zVQ4xoKJNfCfv20QfR4ZvODhPTzwjWxowArySoftf2PC+lBEImPAbRVzRiIxZwHl9Yys5qy8q9zNwycXnxL0t0WNDM3DSxXpk3My6PtQ2elCni3bdl/WsplzvMCdjh0mCvfWoyPCV0hIysKQqE41FveGzBseB+26d54HlWhtrm+pmss5ONgPtOPJAJwgb0nBo26ecH+7QZh8ju+zbkA7gD/xBh/qAOIqiAAAAAElFTkSuQmCC);
        background-size: 30rpx;
        background-position: left center;
        background-repeat: no-repeat;
      }
      &:nth-child(2){
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACQ0lEQVRIibWWz0tVQRTHP/6gCHMhtA/FLG2rYVFiEf2QdNE/UIS8AlfuKltm5UZdRCTYqkUbN1mBUuTGhWiLIolWkvE2bjQhKIIwDnyHTtK9M92eXxg498455zP3vDMzr6pUKpGoNqAfOA80KmQFmAEmgQ8paaoTnHYB94H3wCBwCNit0ap3NvcQ2BNLVpsAewGcTlj4VeCAKvAjzzFPY9tgz4BTQL2G2c/dvD2PxlaWpcNaddAtoA+YA75qmN2ruaBriv1noDVIjWz7iuEc32F9PYrpLwI85+zcMkljGbHJwCZnv0kAep+mLKeUbZGqLedXqEtXnN2eAO1w9moR4IyzBxOA3udVEeAj4Kdsa/2hHN8h+aCYySLAZWDCPd8GngIngToNs6c1FzSh2L8qdrRZmVrcadOnkaXXsfLHutS67QIwH/EzLaismR0aA9rcFZXneAKwE3inmMy8WRONWrE1TnMCLKhZMQvuzowCu4HFbftqA3igku3XXViv+7BXcxvOv0M5umLAM8AssE/P34G7OqoGdIh/1u9kt8VHvRuQzx3gm2Itx0vgbBbwIDClS9f0SSu9CXyJ1VI+th+PKBblmlLuP4B2pTxWmUxl4ETefsrRsmLLctmr3DUeeMn9ZlbGiy6giMrKEcpruS8HYBVwwyUdB5b+Axa0pFxB141VrU4Krb8O3KsALGhEORGjy4A9zuEJsFlB4KZyBvUY8Jh7MVtBWJC/5o4a0P5LBr3dAaAdd0EtBmxwL9Z2APg7JzT8AlDPbyvXyjoiAAAAAElFTkSuQmCC);
        background-size: 28rpx;
        background-position: 1rpx center;
        background-repeat: no-repeat;
        padding-left: 40rpx;
      }
    }
  }
  .fwb{
    padding: 25rpx 25rpx 30rpx 25rpx;
  }
  .button-div{
    padding: 40rpx 25rpx;
    box-sizing: border-box;
    button[type="primary"]{
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
  .back-div{
    display: flex;
    justify-content: center;
    .back{
      font-size: 30rpx;
      padding-left: 18rpx;
      color: #758ca6;
    }
  }
}
</style>
