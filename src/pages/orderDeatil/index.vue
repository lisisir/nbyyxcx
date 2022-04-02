<template>
  <view>  
    <div class="all">
      <h1>
        <p v-if="appointmentInfo.status=='已预约'" class="yes">
          预约成功
        </p>
        <p v-if="appointmentInfo.status=='已入馆'" class="yes">
          已入馆
        </p>
        <p v-if="appointmentInfo.status=='已取消'" class="no">
          已取消
        </p>
        <p v-if="appointmentInfo.status=='已过期'" class="no">
          已过期
        </p>
      </h1>
      <h2>
        <p><label>预约时间</label>{{appointmentInfo.createTime}}</p>
        <p><label>订单编号</label>{{appointmentInfo.appointmentNum}}</p>
      </h2>
      <div class="QRcode-div">
        <h3>
          <p>
            <!-- <van-checkbox value="false" checked-color="#4fc64c" icon-size="40rpx"></van-checkbox> -->
            <span>{{appointmentInfo.museumName}}</span>
          </p>
          <div class="state">{{appointmentInfo.status}}</div>
        </h3>
        <div class="QRcode">
          <!-- <image :src = 'defaultImg' /> -->
          <image :src='imgUrl' mode='scaleToFill' @error="imgError"></image>
        </div>
        <div class="detail">
          <p>姓名：{{appointmentInfo.name}}</p>
          <p>证件号：{{appointmentInfo.idNum}}</p>
          <p>手机号：{{appointmentInfo.phoneNum}}</p>
          <p>入馆时间：{{appointmentInfo.date}}</p>
          <p v-if="appointmentInfo.child==1">是否携带儿童：是</p>
          <p v-if="appointmentInfo.car!=''">车牌号：{{appointmentInfo.car}}</p>
        </div>
      </div>
      <div class="btns" v-if="appointmentInfo.status=='已预约'">
        <!-- <button type="primary" @click="changeCarBtn">修改车牌</button> -->
        <button type="primary" @click="cancle(appointmentInfo.id)">取消预约</button>
      </div>
    </div>
    <van-dialog id="van-dialog" />
    <van-toast id="van-toast" />
    <van-notify id="van-notify" />
    <van-dialog
      use-slot
      title="修改车牌"
      :show="show"
      show-cancel-button
      @close="onClose"
      @confirm="changeCar"
    >
      <p class="tips">每次预约只能修改一次车牌号</p>
      <div class="carInput">
        <input type="text" v-model="carInput" placeholder="请输入车牌号" >
      </div>
    </van-dialog>
  </view>
</template>

<script>
import Dialog from '../../../static/vant/dialog/dialog';
import Toast from '../../../static/vant/toast/toast';
import Notify from '../../../static/vant/notify/notify';
import noImg from '../../../static/images/no.png';
export default {
  data () {
    return {
      appointmentInfo: {
      },
      imgUrl: '',
      show: false,
      carInput: '',
      defaultImg: noImg,
    }
  },
  created () {
    // let app = getApp()
  },
  onShow(){
    this.getDetail()
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'预约记录',
    })
  },
  methods: {
    imgError(e) {
      console.log('e', this.imgUrl)
      this.imgUrl = this.defaultImg
    },
    getDetail(){
      wx.request({
        url: this.globalData.url + '/appointmentInfo/getAppById',
        data: {
          id: this.globalData.detailID
        },
        success: (res) => {
          console.log(res)
          this.appointmentInfo = res.data.data
          console.log(this.appointmentInfo)
          this.appointmentInfo.date = this.appointmentInfo.appointmentDate.split(' ')[0] + ' ' +  this.appointmentInfo.openTime
          this.appointmentInfo.car = this.appointmentInfo.car.trim()
          this.imgUrl = this.globalData.imgUrl + this.appointmentInfo.appointmentNum + ".jpg"
          /* this.imgUrl = 'http://192.168.0.99:8910/static/img/abc.jpg' */
          console.log(res)
        }
      })
    },
    cancle(id){
      Dialog.confirm({
        title: '是否取消预约',
        message: ' ',
      })
      .then(() => {
        wx.request({
          url: this.globalData.url + '/appointmentInfo/cancelApp',
          data: {
            id: id
          },
          success: (res) => {
            console.log(res)
            if(res.data.code==200){
              this.appointmentInfo.status="已取消"
              Toast.success('成功取消');  
              console.log(this.appointmentInfo)
              this.$forceUpdate();
            }else{
              Notify(res.data.msg)
            }
          }
        })
      })
      .catch(() => {
        
      });
    },
    changeCarBtn(){
      console.log(this.appointmentInfo.updateStatus)
      console.log(this.appointmentInfo.openTime)
      if(this.appointmentInfo.openTime=="18:00-21:00"){
        Toast.fail('不可修改');
        return
      }
      if(this.appointmentInfo.updateStatus==0){
        this.show = true
      }else{
        Toast.fail('只能修改一次');
      }
    },
    onClose(){
      this.show = false
    },
    changeCar(){
      if(this.carInput.trim()!=''){
        wx.request({
          url: this.globalData.url + '/appointmentInfo/updateCarNum',
          data: {
            appId: this.appointmentInfo.id,
            carNum: this.carInput
          },
          success: (res) => {
            console.log(res)
            Toast.success('修改成功');
            this.getDetail()
          }
        })
      }else{
        Notify('车牌号不能为空')
      }
    }
  },
}
</script>

<style lang="scss">
.all{
  padding: 0 25rpx 148rpx 25rpx;
  .tips{
    text-align: center;
    font-size: 24rpx;
    color: #758ca6;
    margin: 10rpx 0 20rpx 0;
  }
  .carInput{
    padding: 0 50rpx;
    input{
      border: 1rpx solid #dbdbdb;
      width: 100%;
      padding-left: 20rpx;
      font-size: 26rpx;
      box-sizing: border-box;
      height: 60rpx;
      line-height: 60rpx;
      margin-bottom: 30rpx;
      border-radius: 4rpx;
    }
  }
  h1{
    width: 100%;
    box-sizing: border-box;
    padding: 0 15rpx 20rpx 15rpx;
    height: 105rpx;
    display: flex;
    align-items: flex-end;
    border-bottom: 1rpx solid #dbdbdb;
    p{
      font-size: 30rpx;
      font-weight: bold;
      &.yes{
        color: #45c029;
      }
      &.no{
        color: #ff4b4b;
      }
    }
  }
  h2{
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx 15rpx 20rpx 15rpx;
    p{
      font-size: 26rpx;
      margin-bottom: 20rpx;
      color: #758ca6;
      label{
        margin-right: 42rpx;
        color: #666666;
      }
    }
  }
  .QRcode-div{
    width: 100%;
    box-sizing: border-box;
    padding: 30rpx;
    background: #758ca6;
    display: flex;
    flex-direction: column;
    align-items: center;
    h3{
      margin-bottom: 50rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      p{
        display: flex;
        align-items: center;
        span{
          font-size: 30rpx;
          /* font-weight: bold; */
          color: #ffffff;
          margin-left: 16rpx;
        }
      }
      .state{
        font-size: 26rpx;
        color: #ffffff;
        padding-right: 10rpx;
      }
    }
    .QRcode{
      background: #ffffff;
      height: 347rpx;
      width: 347rpx;
      margin-bottom: 36rpx;
      image{
        height: 100%;
        width: 100%;
      }
    }
    .detail{
      margin-bottom: 20rpx;
      width: 100%;
      padding-left: 144rpx;
      box-sizing: border-box;
      p{
        color: #ffffff;
        font-size: 26rpx;
        margin-bottom: 20rpx;
      }
    }
  }
  .btns{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    display: flex;
    justify-content: space-between;
    padding: 30rpx 25rpx;
    box-sizing: border-box;
    button{
      width: 100%;
      line-height: 88rpx;
      text-align: center;
      background: #f2f2f2;
      color: #758ca6;
      font-size: 30rpx;
      border-radius: 0;
      margin: 0;
      &.button-hover{
        background-color: #e9e9e9;
      }
    }
    button::after{
      border: none;
    }
  }
}
</style>
