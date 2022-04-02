/*
 * @Author: your name
 * @Date: 2020-10-09 10:30:59
 * @LastEditTime: 2021-06-30 18:51:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \mapcoded:\project\项目\小程序项目\南山博物馆小程序\源码\nsbwgyy\src\main.js
 */
/* eslint-disable no-unused-vars */
import Vue from 'vue'
import App from './App'

Vue.config.productionTip = false
App.mpType = 'app'

const app = new Vue(App)
app.$mount()
Vue.prototype.globalData = {

  // url: 'http://192.168.0.251:8910/ssapi',
  /* imgUrl: 'http://192.168.0.99:8910/static/img/' */
  
  /* url: 'http://192.168.0.108:8910/ssapi',
  imgUrl: 'http://192.168.0.108:8910/static/img/' */

  url: 'https://nbyy.szanxin.cn/ssapi',
  imgUrl: 'https://nbyy.szanxin.cn/appointments/'

}

/* 公共方法 */
Vue.prototype.methods = {
  /* 证件号、姓名验证 */
  validate: (_name, _IDType, _IDNum) => {
    let idCard0 = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
    let idCard1 = /^\d{6}(18|19|20)?\d{2}(0[1-9]|1[012])(0[1-9]|[12]\d|3[01])\d{3}(\d|[xX])$/
    let idCard2 = /^[\u4E00-\u9FA5](字第)([0-9a-zA-Z]{4,8})(号?)$/
    let idCard3 = /^([A-Z]\d{6,10}(\(\w{1}\))?)$/
    let idCard4 = /^\d{8}|^[a-zA-Z0-9]{10}|^\d{18}$/
    let idCard5 = /^([a-zA-Z]|[0-9]){5,17}$/
    if (_name.trim().length === 0) {
      return '姓名不能为空'
    }
    if (_IDNum.trim().length === 0) {
      return '证件号码不能为空'
    }
    if (_IDType === 0 && !idCard0.test(_IDNum)) {
      return '居民身份证号码不合法'
    }
    if (_IDType === 1 && !idCard1.test(_IDNum)) {
      return '临时居民身份证号码不合法'
    }
    if (_IDType === 2 && !idCard2.test(_IDNum)) {
      return '军官证号码不合法'
    }
    if (_IDType === 3 && !idCard3.test(_IDNum)) {
      return '港澳居民来往内地通行证号码不合法'
    }
    if (_IDType === 4 && !idCard4.test(_IDNum)) {
      return '台湾居民来往大陆通行证号码不合法'
    }
    if (_IDType === 5 && !idCard5.test(_IDNum)) {
      return '护照号码不合法'
    }
    return 0
  },
  validatePhone (_phone) {
    if (_phone.trim().length === 0) {
      return '手机号码不能为空'
    }
    if (_phone.trim().length !== 11) {
      return '手机号码不正确'
    }
    /* if (_phone.trim().substr(0, 1) !== 1) {
      return '手机号码不正确'
    } */
    return 0
  },
  /* 证件号隐藏中间 */
  IdHide (_idNum) {
    let length = _idNum.length
    let a = _idNum.substr(0, 4)
    for (let i = 0; i < length - 7; i++) {
      a += '*'
    }
    a += _idNum.substr(length - 3, length - 1)
    return a
  }
}
