<template>
  <view class="all"> 
    <div class="form-group">
      <p class="title time">入馆时间</p>
      <input type="text" disabled :value="date" >
    </div>
    <!-- <div class="form-group-car">
      <p>车牌号</p>
      <div v-if="openTime=='18:00-21:00'" >夜间开放期间，停车场不对外开放，请使用公共交通工具出行。</div>
      <div v-else-if="museumId==2" >参观停车请前往古城周边停车场，建议使用交通工具出行。</div>
      <input v-else type="text" v-model="carNum" placeholder="如有开车，请填写车牌" placeholder-class="gray" >
    </div> -->
    <div class="form-group-child">
      <p>是否携带儿童(三周岁以下)</p>
      <van-switch :checked="isChecked" @change="switchChange" size="44rpx" active-color="#07c160" />
    </div>
    <div class="form-group" style="border:none">
      <p class="title people">添加参观者信息<span>（最多5人）</span></p>
      <ul>
        <li v-for="(item,index) in users" :key="index">
          <h1 :class="[{'mine':index==0}]">
            <label>
              {{item.name}}
            </label>
            <div class="delete" v-show="index!=0" @click="deleteUser(index)"></div>
          </h1>
          <p>证件号码：{{item.cardNumHide}}</p>
        </li>
      </ul>
    </div>
    <div class="add" @click="add"></div>
    <!-- 新增新冠疫苗选项，暂不更新 -->
    <!-- <div v-if = 'isNeedShow'>
      <div class="form-group-child" style = 'font-size: 26rpx'>
        <van-checkbox :value="isXg" @change="switchChangeXg">以上参观者是否已接种新冠疫苗</van-checkbox>
      </div>
      <div class="form-group-child" style ='margin: 0 25rpx 0 25rpx'>
        <p style = 'line-height: 40rpx; color: #999'>
          注：未接种新冠疫苗的60岁以上老人和18岁以下未成年人请出示有效身份证件、健康码绿码、行程码，经测温合格后入馆参观。
        </p>
      </div>
      <van-dialog id="van-dialog" />
    </div> -->
    <div class="button-div">
      <button type="primary" @click="submit">确认</button>
    </div>
    <van-popup position="bottom" closeable :show="show" @close="addClose" close-on-click-overlay="false">
      <div class="popup">
        <h2>参观者信息</h2>
        <div class="group">
          <label>人员姓名</label>
          <input type="text" placeholder="请输入姓名" v-model="userItem.name" placeholder-class="gray">
        </div>
        <div class="group">
          <label>证件类型</label>
          <input type="text" placeholder="请选择证件类型" disabled v-model="columns[userItem.idType]" placeholder-class="gray" @click="typeShow=true">
        </div>
        <div class="group">
          <label>身份证号码</label>
          <input type="text" placeholder="请输入身份证号码" v-model="userItem.idNum" placeholder-class="gray">
        </div>
        <div class="group">
          <label>手机号</label>
          <input type="text" placeholder="请输入手机号码" v-model="userItem.phoneNum" placeholder-class="gray">
        </div>
        <!-- <div class="group" style="border:none;padding-bottom:10rpx">
          <label>是否携带儿童</label>
          <van-switch :checked="isChecked" @change="switchChange" size="44rpx" />
        </div> -->
        <div class="button-div" style="padding: 40rpx 0;">
          <button type="primary" @click="addUser(index)">确认</button>
        </div>
      </div>
    </van-popup>
    <van-popup position="bottom" :show="typeShow">
      <van-picker show-toolbar title="选择证件类型" :columns="columns" @cancel="typeHide" @confirm="typeChange" />
    </van-popup>
    <van-notify id="van-notify" />
    <van-overlay :show="overlayShow">
      <div class="jzk">
        <van-loading color="#ffffff" size="30rpx"></van-loading>
      </div>
    </van-overlay>
  </view>
</template>

<script>
import Notify from '../../../static/vant/notify/notify';
import Dialog from '../../../static/vant/dialog/dialog'
export default {
  data () {
    return {
      date: '',
      max: 5,
      users: [],
      show: false,
      typeShow: false,
      columns: ['居民身份证', '临时居民身份证', '军官证', '港澳居民来往内地通行证', '台湾居民来往大陆通行证', '护照'],
      isChecked: false,
      // 是否接种新冠疫苗
      isXg: false,
      isNeedShow: true,
      userItem: {},
      carNum: '',
      overlayShow: false,
      openTime: '',
      museumId: ''
    }
  },
  created () {
    // let app = getApp()
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'预约信息',
    })
    console.log('load', this.globalData)
  },
  onShow(){
    this.carNum = ''
    this.isChecked = false
    this.isXg = false
    /* this.methods.IdHide('440301199401092117') */

    this.users=[]
    console.log('show', this.globalData)
    this.date = this.globalData.item_dateName
    this.openTime = this.globalData.item_openTime
    this.museumId = this.globalData.item_museumId,
    console.log(this.openTime)
    // 新增新冠疫苗选项，攒不更新
    // if (this.globalData.item_museumId === 3) {
    //   this.isNeedShow = false
    // } else {
    //   this.isNeedShow = true
    // }
    let user = {
      name: this.globalData.user.realname,
      cardNumHide: this.methods.IdHide(this.globalData.user.idNum),
      idNum: this.globalData.user.idNum,
      idType: this.globalData.user.idType,
      phoneNum: this.globalData.user.mobile
    }
    this.users.push(user)
  },
  methods: {
    submit(url){
      // 新增新冠疫苗选项，暂不更新
      // if (this.isNeedShow && !this.isXg) {
      //   Dialog.alert({
      //     message: '因疫情防控要求，本场馆不接受无接种新冠疫苗的人员预约，请您尽快接种疫苗或现场出示医院相关证明'
      //   }).then(() => {
      //     // 
      //   })
      //   return false
      // }
      let appointment = {
        museumId: this.globalData.item_museumId,
        memberId: this.globalData.user.id, 
        appointmentDate: this.globalData.item_date,
        openTime: this.globalData.item_openTime,
        car: this.carNum,
        child: this.isChecked?1:0,
        appointments: this.users
      }
      console.log(appointment)
      this.overlayShow = true
      wx.request({
        url: this.globalData.url + '/appointmentInfo/personSave',
        data: appointment,
        method: 'post',
        success: (res) => {
          console.log(res)
          if(res.data.code == 200){
            wx.redirectTo({url: '../success/main'})
            this.globalData.success = res.data.data
          }else{
            Notify(res.data.msg)
          }
          this.overlayShow = false
        }
      })
      /*  */
    },
    add(){
      if(this.users.length < this.max){
        this.show = true;
        this.userItem = {
          name: '',
          cardNumHide: '',
          idNum: '',
          idType: 0,
          phoneNum: ''
        }
      }else{
        Notify('最多只能添加五人')
      }
    },
    addClose(){
      this.show = false
      this.userItem = {}
    },
    typeHide(){
      this.typeShow = false
    },
    typeChange(event){
      this.userItem.idType = event.target.index
      this.typeShow = false
    },
    switchChange(){
      this.isChecked = !this.isChecked
    },
    switchChangeXg(){
      this.isXg = !this.isXg
    },
    
    addUser(){
      if(this.validate(this.userItem.name,this.userItem.idType,this.userItem.idNum,this.userItem.phoneNum)){
        this.userItem.cardNumHide = this.methods.IdHide(this.userItem.idNum),
        this.users.push(this.userItem)
        this.show = false
        console.log(this.users)
      }
    },
    validate(name,IDcardType,IDcardNum,phoneNum){
      let result = this.methods.validate(name,IDcardType,IDcardNum)
      if(result != 0){
        Notify(result)
        return false
      }
      let result1 = this.methods.validatePhone(phoneNum)
      if(result1 != 0){
        Notify(result1)
        return false
      }
      return true
    },
    deleteUser(index){
      this.users.splice(index,1)
    }
  }
}
</script>

<style lang="scss">
.none {
  display: none;
}
.all{
  .popup{
    padding: 0 25rpx 0 25rpx;
    h2{
      line-height: 100rpx;
      text-align: center;
      font-size: 30rpx;
    }
    .group{
      border-bottom: 1rpx solid #ededed;
      padding: 22rpx 0 18rpx 0;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      height: 140rpx;
      box-sizing: border-box;
      label{
        color: #666666;
        font-size: 26rpx;
        width: 100%;
      }
      input{
        width: 100%;
        font-size: 26rpx;
      }
      .gray{
        color: #b8b8b8;
      }
    }
  }
  .form-group-car{
    border-bottom: 1rpx solid #ededed;
    padding: 30rpx 0 0 0;
    margin-left: 25rpx;
    p{
      font-size: 26rpx;
      line-height: 30rpx;
      width: 100%;
      margin-bottom: 24rpx;
      color: #666666;
    }
    input{
      font-size: 26rpx;
      line-height: 30rpx;
      width: 100%;
      margin-bottom: 30rpx;
      color: #333333;
    }
    .gray{
      color: #b8b8b8;
    }
    >div{
      font-size: 24rpx;
      line-height: 30rpx;
      width: 100%;
      margin-bottom: 30rpx;
      color: #333333;
      color: rgb(192, 80, 77);
    }
  }
  .form-group-child{
    padding: 30rpx 0 0 0;
    margin-left: 25rpx;
    p{
      font-size: 26rpx;
      line-height: 30rpx;
      width: 100%;
      margin-bottom: 24rpx;
      color: #666666;
    }
  }
  .form-group{
    margin-left: 25rpx;
    border-bottom: 1rpx solid #ededed;
    padding: 40rpx 0 0 0;
    .title{
      font-size: 26rpx;
      line-height: 30rpx;
      width: 100%;
      margin-bottom: 24rpx;
      color: #666666;
      span{
        font-size: 24rpx;
        color: #b8b8b8;
      }
      &.time{
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAB4AAAAeCAYAAAA7MK6iAAACo0lEQVRIibWXv2sUQRTHP3cxwSIShXgWYhBBRZIqYGGp4MVK0CI5tJUrVBLFQq0EETRYGIMxha2QH0UEu2jhHyBaKQQOFFMmERO0iiSRJ9+Rl2H3dr3cfWG5vbdvvt95szM73ylUq1VyoB0YAM4CJ4EjwF41WwW+AO+Bt8A88DuLclfGcyO/AVwF9qfkHNB1ChgGVoAJYEydSkSxjmgFWADu1RFNQrfaLIgjt3Ab8ByYUiUBi8AjDfkhYDewBzgBnNOzr9FITImrLRaJ37ElzAIXI8E7im9kVGuFDKkTPS4+Bwz69nHFY5Hoa6BPPc8SNWwqt1e/Acb5NO5hgPX0uvtviReAnzkEY/wCLgNPXPyaNLYJ2+wdd0kzwE1VkIQtd6XBnt0SV8B4WIZB2JZMSff2Tq9QnzQvtsS1qPyStP4Kd2idBtzVUDULxnXbcZlWhwmX3Tr9Bkw3UTRgVtxIqxyEA6brvNedYDMqaMCE+13gXQtEk7j7TfiYC3xqobDnPmqbRJcLrDRAmDb7C9H/ZXffVW+TaClMeM0JdLdQzO9wayZcc4HenCSFHFeMPve/ZsIfXOBM4wVl4rRL+GjCb1xgKMMcNIqi3yBMMwh/V+Cw9s1mY1DcaHbPm/A68MwJjQKdTRTuFGeAOZL1MKxmAJZ0b87hRcI6bAQFcQU3siytf+9zVQ4xoKJNfCfv20QfR4ZvODhPTzwjWxowArySoftf2PC+lBEImPAbRVzRiIxZwHl9Yys5qy8q9zNwycXnxL0t0WNDM3DSxXpk3My6PtQ2elCni3bdl/WsplzvMCdjh0mCvfWoyPCV0hIysKQqE41FveGzBseB+26d54HlWhtrm+pmss5ONgPtOPJAJwgb0nBo26ecH+7QZh8ju+zbkA7gD/xBh/qAOIqiAAAAAElFTkSuQmCC);
        background-size: 30rpx;
        background-position: left center;
        background-repeat: no-repeat;
        padding-left: 40rpx;
      }
      &.people{
        background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABwAAAAcCAYAAAByDd+UAAACQ0lEQVRIibWWz0tVQRTHP/6gCHMhtA/FLG2rYVFiEf2QdNE/UIS8AlfuKltm5UZdRCTYqkUbN1mBUuTGhWiLIolWkvE2bjQhKIIwDnyHTtK9M92eXxg498455zP3vDMzr6pUKpGoNqAfOA80KmQFmAEmgQ8paaoTnHYB94H3wCBwCNit0ap3NvcQ2BNLVpsAewGcTlj4VeCAKvAjzzFPY9tgz4BTQL2G2c/dvD2PxlaWpcNaddAtoA+YA75qmN2ruaBriv1noDVIjWz7iuEc32F9PYrpLwI85+zcMkljGbHJwCZnv0kAep+mLKeUbZGqLedXqEtXnN2eAO1w9moR4IyzBxOA3udVEeAj4Kdsa/2hHN8h+aCYySLAZWDCPd8GngIngToNs6c1FzSh2L8qdrRZmVrcadOnkaXXsfLHutS67QIwH/EzLaismR0aA9rcFZXneAKwE3inmMy8WRONWrE1TnMCLKhZMQvuzowCu4HFbftqA3igku3XXViv+7BXcxvOv0M5umLAM8AssE/P34G7OqoGdIh/1u9kt8VHvRuQzx3gm2Itx0vgbBbwIDClS9f0SSu9CXyJ1VI+th+PKBblmlLuP4B2pTxWmUxl4ETefsrRsmLLctmr3DUeeMn9ZlbGiy6giMrKEcpruS8HYBVwwyUdB5b+Axa0pFxB141VrU4Krb8O3KsALGhEORGjy4A9zuEJsFlB4KZyBvUY8Jh7MVtBWJC/5o4a0P5LBr3dAaAdd0EtBmxwL9Z2APg7JzT8AlDPbyvXyjoiAAAAAElFTkSuQmCC);
        background-size: 28rpx;
        background-position: 1rpx center;
        background-repeat: no-repeat;
        padding-left: 40rpx;
      }
    }
    >input{
      font-size: 26rpx;
      line-height: 30rpx;
      width: 100%;
      margin-bottom: 30rpx;
      color: #333333;
    }
    ul{
      padding-right: 25rpx;
      li{
        padding: 37rpx 26rpx 40rpx 20rpx;
        background: #758ca6;
        margin-bottom: 30rpx;
        h1{
          padding-left: 50rpx;
          height: 36rpx;
          line-height: 36rpx;
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 23rpx;
          label{
            font-size: 30rpx;
            font-weight: bold;
            color: #ffffff;
          }
          .delete{
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAdElEQVRYhe2XSwoAIAhELbz/lW3VJjIzhQpmln3kNU1gRUTIkLnAUFlN12DxsDjrJBNtOXfdAQCwI+Wnr2G57wkHxnR3Ym/qLU3rfhlCUe5VG08HSBUAAAAAAAAAAAAAgOdn1KX1ikc95NMORH/FW7rrABE1ufMPQkfClb4AAAAASUVORK5CYII=);
            background-size: 32rpx;
            background-position: left center;
            background-repeat: no-repeat;
            height: 32rpx;
            width: 32rpx;
          }
          &.mine{
            background-size: 36rpx;
            background-position: left center;
            background-repeat: no-repeat;
            background-image: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACQAAAAkCAYAAADhAJiYAAAEMUlEQVRYhb2Yy29bVRDGf8ex48RyrRiTJippKiNEgmglpKiqmgBFIhCKQOxAglVFVRaUPwYoi3YBrEBihQBRVYhFKSWwiLogPFLRR9oQJTGlxQl2HSs+aM49148b34dDkk+K4ut7ZubzuTPfzLlqY+4jOkQemAKeBB4DDgB7rItVYB74DfgeuADc6MR9VEJdwKvAaeCo2EX0r4Fp4AzwGbARZhCL4HQSmAU+AcY7IINdO25tZ62vLRPqAc4C3wCjHZDww6j1ddb67ohQP/AdcGobiHhxyvruj0pIFl4CDu8AGReHbYxNpLyEUsCXwMgOknExYmOlggi9CxzZBTIujtiYbQlJBZzcRTIuTjZXX6zp/3sdu+pKojIjqHTeXKr+o+avjsSeYPsG3rdaR9x+9ZpV3UCongehOwfJByA1gEr2OcurJXR5EXqydXO1bxKVGkAvXEDf/yvM9agV3k9dQm8HEskeQvWPNb6oVSGWQC9NO0Sqq5ts9PIlGDqOGpqCaKROu4TyVk19odduQuVvqFUcx7kxYrlD6OJcq8nGOnR1288V9ML5Oik9/0Vb4k2QZ/2wEHohtB1UV9HBzpxdqdwllh01DaxOavFb6DsItfUwc+EwJYQmQiN1glhi848pTEd1MCHd/grwRCD1/S+ievf+L566vIK+/XXYsiuyQ/tDvf1zjVppuUFQKqx3L7U7P7csU4k0KpNHF2+gq2ut9zzXPjgQbxqufOFNXs2Ys2N3ZlpNUg9BJg/FP6D0p0NENKq2jrbXIUhHmYciQ1ec0ta9g46JCOfgOGQeiewjbsfO3FYIiD6JSKreAWrFa86O1arm0Wkjjs86BAs/RnW5JoRuhxFS8ijiaUehe7L1BBexlGQVMqq8ZEhoybVkFjV4zKzTixdN+UfELSH0a2iVDUxAImV+vQQUEiapr35cX1PXnvIyKj0EyT4n6dc6mvF/idvTwetBq/TyZXS12FDa3JivDOhYt1E4vbbQkvTSByO0j8sxe1TRQatMhYQptUngY6alONfdLbfV8EtOcw4II1yE0HXghzDqQZAciw2/4miQNNzCjNlBk3vulCARg3NJ5Py6W/YfbJmMJO/Qc07AW18ZzdLFq2YkUfueaYwsMiEE7/IZmg6KXfbc5HvcMcNXtjFq68o99PznzhCWeRTuzbZUkxAxo4ftbUa9ly76uf8dOCjtuPnkOmnPTe3hBrZtQP97M7ycrY0SpZZd81//vBvbe5T+EDgRHGXbITHfdJ16W4dMbT/tIhmJ9U7zF15CJeBlwDMK7gjmbKxSECFBAXga8LTybcWMjVHwOvXr9ivAU8C5HSBzzr5bWml3M2j8KANv2QrYjkc4Z32Jz/t+i6LMQ1KOj9t+J2oa2GbaQGzesD78ZcViq6/0jtttFyEdBjL2XlFGCCt00rTPd/RKD/gPartaal9V14gAAAAASUVORK5CYII=);
          }
        }
        p{
          font-size: 26rpx;
          color: #ffffff;
          padding-left: 50rpx;
        }
      }
    }
  }
  .add{
    background-image: url(data:image/png;base64,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);
    background-size: 700rpx auto;
    height: 88rpx;
    background-repeat: no-repeat;
    margin: 0 25rpx 0 25rpx;
    box-sizing: border-box;
    mask-border: 40rpx;
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
  .jzk{
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>
