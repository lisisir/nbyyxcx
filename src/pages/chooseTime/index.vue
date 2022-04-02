<template>
  <view class="all"> 
    <h1>
      <p>选择入馆日期</p>
      <label>{{month}}月</label>
    </h1>
    <div class="date">
      <div class="week">
        <div>一</div>
        <div>二</div>
        <div>三</div>
        <div>四</div>
        <div>五</div>
        <div>六</div>
        <div>日</div>
      </div>
      <ul class="num">
        <li :class="[{'you':item!=''},{'choosed':index==choosedWeek},{'close':item.ticket==-1}]" v-for="(item , index) in week" :key="index" @click='chooseWeek(index)'>
          <label>{{item.dateShow}}</label>
          <p class="none" v-if="item.ticket==0">已满</p>
          <p class="none" v-if="item.ticket==-1">闭馆</p>
          <!-- <p v-if="item.ticket==1">有票</p> -->
          <p v-if="item.ticket==1&&item.allCount<=50">余{{item.allCount}}</p>
          <p v-if="item.ticket==1&&item.allCount>50">可预约</p>
        </li>
        <!-- <li>
          <label></label>
          <p></p>
        </li>
        <li>
          <label></label>
          <p></p>
        </li>
        <li class="you none">
          <label>1</label>
          <p>停售</p>
        </li>
        <li class="you">
          <label>2</label>
          <p>有票</p>
        </li>
        <li class="you choosed">
          <label>3</label>
          <p>有票</p>
        </li>
        <li class="you">
          <label>4</label>
          <p>有票</p>
        </li>
        <li class="you">
          <label>5</label>
          <p>有票</p>
        </li>
        <li class="you close">
          <label>6</label>
          <p>闭馆</p>
        </li>
        <li class="you">
          <label>7</label>
          <p>有票</p>
        </li>
        <li>
          <label></label>
          <p></p>
        </li>
        <li>
          <label></label>
          <p></p>
        </li>
        <li>
          <label></label>
          <p></p>
        </li>
        <li>
          <label></label>
          <p></p>
        </li>
        <li>
          <label></label>
          <p></p>
        </li> -->
      </ul>
    </div>
    <div class="line"></div>
    <h1 style="border:none">
      <p>选择参观时段</p>
    </h1>
    <ul class="time">
      <!-- <li :class="[{'you':item!=''},{'choosed':item.week==choosedWeek}]" v-for="(item , index) in date" :key="index" @click='chooseWeek(index)'> -->
      <li :class="[{'choosed':choosedDate==index},{'none':item.can<=0}]" v-for="(item , index) in date" :key="index" @click='chooseDate(index)'>
        <label>{{item.openTime}}</label>
        <p class="none" v-if="item.can<=0">预约已满</p>
        <p v-if="item.can>0&&item.can<=50">可预约{{item.can}}人</p>
        <p v-if="item.can>0&&item.can>50">可预约</p>
      </li>
      <!-- <li class="none">
        <label>13:00-14:00</label>
        <p>预约已满</p>
      </li>
      <li>
        <label>13:00-14:00</label>
        <p>可预约206人</p>
      </li>
      <li>
        <label>13:00-14:00</label>
        <p>可预约206人</p>
      </li>
      <li class="choosed">
        <label>13:00-14:00</label>
        <p>可预约206人</p>
      </li>
      <li>
        <label>13:00-14:00</label>
        <p>可预约206人</p>
      </li>
      <li>
        <label>13:00-14:00</label>
        <p>可预约206人</p>
      </li>
      <li>
        <label>13:00-14:00</label>
        <p>可预约206人</p>
      </li> -->
    </ul>
    <div class="button-div">
      <button type="primary" @click="submit">预约参观门票</button>
    </div>
    <van-notify id="van-notify" />
  </view>
</template>

<script>
import Notify from '../../../static/vant/notify/notify';
export default {
  data () {
    return {
      month: '',
      week: [],
      choosedWeek: '',
      date: [],
      choosedDate: -1,
    }
  },
  onShow(){
    this.week=[]
    this.date=[]
    wx.request({
      url: this.globalData.url + '/appointmentSetting',
      data: {
        /* museumId: this.globalData.item_museumId */
        museumId: this.globalData.item_museumId
      },
      success: (res) => {
        let all = res.data.data
				let t = +(all[0].date.split('-')[1])
				console.log(t)
        /* 获取月份 */
        this.month = t > 9 ? t : '0' + t
        /* 创建14位的空数组 */
        for (let index = 0; index < 14; index++) {
          this.week.push('')
        }
        console.log(this.week)

        let num = ''
        for (let index = 0; index < all.length; index++) {

          /* 初始替换 */
          all[index].week = this.changeNum(all[index].dateStr);
          all[index].dateShow = all[index].date.split('-')[2];
          
          /* 循环判断有无空位 */
          let allCount = 0
          let flag = 0
          for (let i = 0; i < all[index].openTime.length; i++) {
            /* 如果状态为0 不开馆 */
            if(all[index].openTime[i].status == 0){
              all[index].status = 0
            }else{
              all[index].status = 1
            }

            let count = all[index].openTime[i].count - all[index].openTime[i].counted
            all[index].openTime[i].can = count
            if(count>0){
              all[index].openTime[i].ticket = 1
            }else{
              all[index].openTime[i].ticket = 0
            }
            /* console.log(allCount) */
            allCount = allCount + count
          }
          console.log(allCount)
          if(allCount>0){
            all[index].ticket = 1
          }else{
            all[index].ticket = 0
          }
          if(all[index].status == 0){
            all[index].ticket = -1
          }
          all[index].allCount = allCount
          allCount = 0

          /* 初始化日期选中 */
          if(index==0){
            num = all[index].week - 1
            /* this.choosedWeek = num
            this.date = all[index].openTime */
          }
          this.week[num]=all[index]
          num++

        }

        for (let i = 0; i < this.week.length; i++) {
          if(this.week[i].ticket == 1){
            this.choosedWeek = i
            this.chooseWeek(this.choosedWeek)
            break
          }
        }


        console.log(all)
        console.log(this.week)
      }
    })
  },
  created () {
    // let app = getApp()
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'预约场馆',
    })
  },
  methods: {
    submit(url){
      if(this.choosedDate!=-1){
        this.globalData.item_date = this.week[this.choosedWeek].date
        this.globalData.item_openTime = this.date[this.choosedDate].openTime
        this.globalData.item_dateName = this.week[this.choosedWeek].date + ' ' +this.date[this.choosedDate].openTime
        console.log(this.globalData)
        wx.navigateTo({url: '../note/main'})
      }else{
        Notify('请选择时段')
      }
    },
    /* 大写转阿拉伯 */
    changeNum(num){
      if(num=='一'){
        return 1
      }
      if(num=='二'){
        return 2
      }
      if(num=='三'){
        return 3
      }
      if(num=='四'){
        return 4
      }
      if(num=='五'){
        return 5
      }
      if(num=='六'){
        return 6
      }
      if(num=='日'){
        return 7
      }
    },
    chooseWeek (index) {
      if(this.week[index]!='' && this.week[index].ticket!=-1){
        this.choosedWeek = index
        this.date = this.week[index].openTime
        this.choosedDate = -1
      }
    },
    chooseDate(index){
      if(this.date[index].can>0){
        this.choosedDate = index
      }
    }
  }
}
</script>

<style lang="scss">
.all{
  h1{
    margin: 0 25rpx;
    height: 88rpx;
    display: flex;
    align-items: center;
    justify-content: space-between;
    border-bottom: 1rpx solid #dbdbdb;
    p{
      font-size: 30rpx;
      font-weight: bold;
    }
    label{
      color: #758ca6;
      font-size: 26rpx;
    }
  }
  .time{
    display: flex;
    flex-wrap: wrap;
    margin: 0 25rpx;
    li{
      text-align: center;
      width: 220rpx;
      height: 108rpx;
      border: 1rpx solid #ebebeb;
      margin-bottom: 20rpx;
      padding-top: 10rpx;
      box-sizing: border-box;
      margin-right: 20rpx;
      &:nth-child(3n+3){
        margin-right: 0;
      }
      label{
        font-size: 26rpx;
        color: #333333;
      }
      p{
        margin-top: 15rpx;
        font-size: 20rpx;
        color: #31bd41;
        &.none{
          color: #ff4b4b;
        }
      }
      &.choosed{
        background: #758ca6;
        border-color: #758ca6;
        p,label{
          color: #ffffff;
        }
      }
    }
  }
  .date{
    margin: 10rpx 25rpx 22rpx 25rpx;
    .week{
      height: 60rpx;
      display: flex;
      align-items: center;
      justify-content: space-between;
      div{
        color: #666666;
        text-align: center;
        width: 93rpx;
        font-size: 26rpx;
      }
    }
    .num{
      display: flex;
      justify-content: space-between;
      flex-wrap: wrap;
      li{
        margin-bottom: 8rpx;
        border-width: 1rpx;
        border-style: solid;
        border-color: #fafafa;
        height: 108rpx;
        width: 93rpx;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        label{
          color: #333333;
          font-size: 26rpx;
          margin-bottom: 20rpx;
        }
        p{
          font-size: 20rpx;
          color: #31bd41;
          &.none{
            color: #ff4b4b;
          }
        }
        &.you{
          border-color: #ebebeb;
        }
        &.close{
          background-color: #fcfcfc;
          p{
            color: #e0e0e0;
          }
          label{
            color: #e0e0e0;
          }
        }
        &.choosed{
          background: #758ca6;
          border-color: #758ca6;
          p{
            color: #ffffff;
          }
          label{
            color: #ffffff;
          }
        }
      }
    }
  }
  .line{
    height: 20rpx;
    background-color: #f0f0f0;
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
}
</style>
