/*
 * @Description: 
 * @Version: 
 * @Autor: 
 * @Date: 2022-04-02 17:33:04
 * @LastEditors: 
 * @LastEditTime: 2022-04-02 17:44:27
 */
import Vue from 'vue'
import App from './index'

// add this to handle exception
Vue.config.errorHandler = function (err) {
  if (console && console.error) {
    console.error(err)
  }
}

const app = new Vue(App)
app.$mount()
