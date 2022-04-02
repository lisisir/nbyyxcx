<template>
  <view class="all"> 
    <h1>南山博物馆</h1>
    <h2>请选择一个您想要参观的场馆</h2>
    <ul>
      <li :class="{'active':choosed==item.id}" @click="choose(item.id)" v-for="(item, index) in museums" :key="index">
            <image class="duih"  src='/static/images/correct_bg.png' mode='widthFix'></image>
        <div :class="'tx_bg'+index"></div>
    <div class="right">    <div class="name">{{item.name}}</div>
        <div class="address">{{item.address}}</div></div>
        
        <!-- <div class="phone" v-if="item.phone!=''">联系方式：{{item.phone}}</div> -->
      </li>
    </ul>
    <div class="content-div">
      <div class="content" v-show="choosed==1" v-html='html[0]'></div>
      <div class="content" v-show="choosed==2" v-html='html[1]'></div>
      <div class="content" v-show="choosed==3" v-html='html[2]'></div>
    </div>
    <div class="button-div">
      <button type="primary" @click="submit">确认</button>
    </div>
  </view>
</template>

<script>
export default {
  data () {
    return {
      choosed: 1,
      museums: [],
      html: []
    }
  },
  created () {
    // let app = getApp()
  },
  onShow(){
    wx.request({
      url: this.globalData.url + '/appointmentInfo/getMuseums',
      success: (res) => {
        this.museums = res.data.data
        console.log(this.museums)
      }
    })
    wx.request({
      url: this.globalData.url + '/appointmentInfo/companyProfileInfo',
      data: {
        type: 9
      },
      success: (res) => {
        this.html.push(res.data.data)
        wx.request({
          url: this.globalData.url + '/appointmentInfo/companyProfileInfo',
          data: {
            type: 10
          },
          success: (res) => {
            this.html.push(res.data.data)
            wx.request({
              url: this.globalData.url + '/appointmentInfo/companyProfileInfo',
              data: {
                type: 11
              },
              success: (res) => {
                this.html.push(res.data.data)
              }
            })
          }
        })
      }
    })
  },
  onLoad(){
    wx.setNavigationBarTitle({
      title:'预约场馆',
    })
  },
  methods: {
    submit(url){
      this.globalData.item_museumId = this.choosed
      console.log(this.globalData)
      wx.navigateTo({url: '../chooseTime/main'})
    },
    choose(id){
      this.choosed = id
      console.log(this.choosed)
    }
  },
}
</script>

<style lang="scss">
.all{
  h1{
    font-size: 40rpx;
    padding-left: 55rpx;
    margin-top: 40rpx;
    margin-bottom: 14rpx;
  }
  h2{
    color: rgba(0, 0, 0, 0.65);
    font-size: 28rpx;
    padding-left: 55rpx;
    margin-bottom: 48rpx;
  }
  ul{
    margin: 0 130rpx 20rpx 55rpx;
    li{
      height: 170rpx;
      background-position: center center;
      background-size: 100% auto;
      margin-bottom: 48rpx;
      padding-left: 20rpx;
      box-shadow: 0px 2px 9px 0px rgba(0, 0, 0, 0.05);
border-radius: 5px;
border: 1px solid #fff;
position: relative;
    display: flex ;
  align-items: center;
    &.active{
border: 1px solid #628194;
    }
  &.active .duih{
    display: block;
  }
  .duih{
    position: absolute;
    display: none;
    right: -80rpx;
    width: 52rpx;
    height: 52rpx;
  }
  .right{
    margin-left: 35rpx;
  }
      .name{
        color: #000;
        font-size: 30rpx;
        padding-top: 18rpx;
        font-weight: bold;
      }
      .address{
        color: rgba(0, 0, 0, 0.45);
        font-size: 26rpx;
        padding-top: 15rpx;
      }
      .phone{
      color: rgba(0, 0, 0, 0.45);
        font-size: 26rpx;
        padding-top: 15rpx;
      }
    }
        .tx_bg0{
             width: 90rpx;
        height: 90rpx;
          background:url(data:image/png;base64,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) center no-repeat;
        }
        .tx_bg1{
                  width: 90rpx;
        height: 90rpx;
           background: url(data:image/png;base64,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) center no-repeat;
         }
         .tx_bg2{
                  width: 90rpx;
        height: 90rpx;
           background: url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAC0AAAAtCAYAAAA6GuKaAAANcElEQVRoQ62Za2xU1RqG13RPp2NnWtqZakuZaiktbQVaK1PAarwQMCQkRuAERAkRNV4TVI45/jAS4uWHBmrCL4MxMfEk4qUQTmJCQsIfwkULNFCw1FpbFGZ6sxfn2pnZe06eZb+eXURunp1MZs/M2mu93/u932Wtcai/dzlqa2sXj42NLTdNc2kmk5lrGEaNaZruTCZj5ObmmoZhJE3T7HG5XH05OTnfzZo163B3d/cppVT2Vpd23MqDlZWVdfF4/PlkMvlEJpOZzRzpdFrl5ubOmM7hcKhsNqtfpmkqy7L0Kz8/P9zc3Lx39erVe954440LN4vhpkDPmzdv4fj4+I5kMrkmm83m2BcDtNPp1AAFHO9cRUVFqqKiQgUCATVnzhw1a9Ys5fV61cTEhNXb27u/pqZmx86dO8/dKPgbAt3Q0OAZGBh4Jx6Pb7UsyymT21mESa6cnBzl8/nUnXfeqcrLy1Vpaalyu93q9OnTKh6Pq4ceekgNDQ2pxsZGNTAwoH799VdVW1ubcTqdu2Ox2PadO3fGrgf+uqADgcCiSCTyVSqVqmMyO4uARhKwVlhYiNtVXl6eZvKOO+5QsVhMNTQ0aJa//vprdeTIEVVSUqJaWlrUo48+qoaHh1V/f7+aP3++GhsbU5FI5EJxcfH6d999t/NawK8Jury8/LGRkZEvTNPMBywadblc6rbbbpsGKJJAHplMRo/xeDyqurpa63zJkiWqrq5OhUIhzfbx48dVIpFQmzdvVmVlZerSpUt67OXLl7W0XC5XPJFIbPzwww//81fA/xK03+/fFIlEPsvJyTEACjgAASyVSunA4rNhGJptxvCCaV719fV6DDJBHhgdDofVwoUL1cGDBzVIWEfjzMPveIR1lFJmMBh8+sknn/z31YBfFXR1dfVjo6Oj+7LZrIH1Igv0qmc0TQ2e3zCAi4X5HeAEXnNzs7rrrrs0+Ntvv10b8tNPP6nZs2ern3/+WXuqra1NFRcXq3Xr1qnR0VEtk4mJCWRCLJjxeHztxo0b/8T4n0BXVVUtGhoaOmFZVj5AeMkFqwAT1mFQ0pmwn0wmtSy4/H6/uvvuu9WDDz6ogsGgDjwMQcc1NTVqZGREnTx5Uo2Pj6sFCxZo0MwDaAwdHh6OezyeZY8//vgMjc8ATZbo6+s7SdAJw8Ki3U1iCLKQl2hZDFq2bJkGAMPomYwhHsCY+++/X4OLRqN6zPnz58kiOh4Yz3e//PKL6urqumBZVvDzzz+fziozQJeVle2KRqPbrtSRpDZhXnKx3TCewQDRNKkOtpBHVVWVmjdvnjp37pyWQVdXl9Yy0sDI3377TWscwLCPsYsWLdIaZ44jR460fvrpp/8UXNOg6+vrF4bD4Q7TNJ0CTioakhB2kQhgAQdIPktA8s53BBU5ms+wykV6A5A8j7QARKDed999OiORRQBO+uP533//XUtt165dmRMnTjR1dXXpAjQNuqys7JtEIrFOwAkQAHIvbuez3GMML0Dybtc3uZoKSBEhZ6NZ3M5c5G9YROcYw/3g4KDO9Rh98eJFrX0CHll1dHSot99+u21oaOgf06DpJcLh8HnLsnR6sAefPRjFAAHLpDADaPkNZmARQIsXL1ZNTU2qr69PzZ07V7OMlnm+t7dXVVZW6kwCaOZAItwDGg/gmTNnzmi233vvPaugoGBBZ2fnBc10SUlJayQSeV3kcCVwAcSipDrJInzPPcwLcKpjQUGBBr5mzRpdxpcvX66DkLFiQE9PjzYEjXPxHNkFaVDaAUrxIZfjga1bt/LsRxcvXtwGaIfX672cTqd1t8Ylrr7SCPkscgEEbEtRIffCPMZwv3TpUnXPPffokg1rsEgQktqQCoaQl48eParHk03I72idSonBGAHojz/+WO3duzc8ODg4x1FRUREMhULtaAmwUjQk+CTQ+CwMA5R7LmGbhXiWBdAw35POtm3bpr+T5gmNwja6Rg5USIIQOQCapop4wChAT05OKnI/cnrllVeYp9nh9/v/FY1GP7CDEzBSCa8sMshBZMKCGIGrWQy30luIHMgMpDxyMOwxHgIIUNE1wcj3zIshgAU0hmI8XkJGr776KvO/Cei2aDS6lsVwsz0jiJan8+NUqcZAcim6RYuAxVMAZWHmwt3oHOOee+45bQjBSRn/8ccfdXagErIecxB8gCRnY0B3d7fWOPewTdDu2bNHtbe373MUFhaeTqVSTSwg+rSnPenu7LmbcQAGGAsBFjaQBSAAg2HoG7AbNmzQAUW3h1QwDCZJibwzT3t7ux4rXkL3GA/rGAIxtLeffPJJh6O4uDiSSCS8IgXepzqt6UbI3jThDRbmJYEJUzwDWIl22MEYaaSeffZZ7Wp+5/vvv/9egwIQ4AEF+4wnZwOWdzYUSIM1kNeLL74Yhel0Op3W/SCT4k4pHmKIlGYJRCaSACR4GI8buXA/UoFlDCSI0Oz69eu1F/gNV2M0ZRzgGGgPPnSNB8kcrMUaGEBgv//++xlHfj79vaXztfQUuB8QSEAqHgygYxaS3hlX8jtjMQyDKdsABwyAGStledOmTdr9MMuLwsJYQNKLkFkAyWc8QBlnDmSHYYzZvXt31uHxeDTTaFeaeUl9su/DIIABnEkoHoCBHS4mx7UAxoW4HwO40CufYeqZZ56ZDja2XNLNAR5pke5Ym3khR8o7UiFmWPfbb7/NaE2bpukVRmHILhPJxwDGpbAtoPmN7wBFpGM4jMMKCzKWqibZBsls2bJFFxgYxiCeI0czP0BhG2YBif7RM2QgDYjq6+uLOoqKik4nk8kmqYKS3niHLQZKwHHPREyMLgUkVQ0PAARgMIZnAA4JzI0ueb3wwguabTzy8MMP61QneVkyhayB55EJXpBkUFJS0uHw+XxtsVhsrUS5gJdegnfASgeHDKTvRT6MhwkWQCaMRa8wg5sxBuZ5jrmonE899ZQ6e/asbqiEEJ6FDOZkPF4gpghyvMU7cxmGsU9XxEgk8oEUFdkHCmjZwEpTA4N0biR/2SviViQAkwIYMABkHilCeA7mXnrpJW0oRwqwjUSQBM/wjgHSi2A4TDOeZ51O55uOqqqq4KVLl9qlUbIXEaloLApYLOU73EgjdPjwYW0AOxLpn2ELsBhPf4GMpLECDPmW7x555BENlsMbdIskJMURtICWTQMpU4rcxMRE84wuz94vc8/CPCxNC+ClbQU00Y9+GQMwwMoGV8qzpEHGkbK4APvWW2/p+ckcbK1gUY4n5BAIApEiF0ZNTEyElyxZMkfnZ5/P1xqLxV4X3TKZDJYjApEL2YFxMEsWIdB4t+dzAhMDYJW8jHykbZV+A6ZXrlypjh07pttRvIgEeBZyiAl0bO88JycnP2ppadH9NO6qC4VCeuciXRjsis6vrJZ8D1iCCw2zu3jggQdUZ2enTnmA5JJTVICTSSQ+MIDfXn75Za1jjhToS4Q0glnAkx7xUjgctgKBwIItW7b8sXPh8vv935imuQ6wkl4ko0gDBdtyOgorgOFM44cfftDPwKz0HDDHxWdciyFomhaW39D+a6+9po/NMJbnyfkEM0xLEYNxvg+Hw22rV6/+3x6RyTnGDYVCHXIqKpsA0TDARSKSyqQBgkW2T1wcwpCDKRiwJelQ3I2uAY9H6bNJfxKogJ1iVac5SOBzXl5eJhaLNTU2Ns7cjU9pe1csFps+9xCm7YWGxWBDzvCmnps+r5M0B8PSnzOGQOMMBNbxFqmNvSD9CG2o9DQ8xyENa0AO60xOTrYGg8E/n3swsf2ESWQjDNu1zndEOvoVva9YsUJvo1gUvUrkk87QPS7GIBhnM4COT506Nd088RvgaQkwSs6zS0tLLxQUFAQ3b9589RMmAHCWNzAwoM/y5CwaN8kmQeRizzSwBqvkbPSJS8k+yICSjSH8hk75DclwGImuMRB5SUpkM7xq1Sr15ZdfYqA+y9u+fftfn+UJu5xLc2rKnz2kMxaVAxnZ4KJHNEghII3BLL3Hvffeq8+guZeKKUUFz+BuniOIOfpFuxQr5ie9wjQnTYZhmJFIZO3VzqmveT6dzWY/i8fjf2y7py4pGlQ1JAJgKpfsdgg0WEXDaFN6aaojeoZt9IpcpBLiFYyWzYbP5zO9Xu/Tra2tN34+bWd8fHz8C6QisqDJAaj0FGQN0TfvgCatwSISkjNnNrMAhWXJHhhElkF+fIfhqVQq7vV6Nx46dOjm/wkQ4Gh8eHhY/+fCySeaI0hYEKakwUJCSAnG8AJaJeWRMejoJG+zM+EZjOKCfRiGhKKiIoJu/YEDB279PxcBTlYZGhp6x+v1buVUFbaIfimz0lgBiIBEy1Q9mAc8cuAiQ2AomQijAY9+x8bGMqlUarfb7d5+9uzZv//vll3PHAe7XK4dPT09azg9Ex3LbgawSACJkP7sJ6yS1xnL/ZQcKM37A4HAjv379/9//0e0A+d+/vz5dZFI5PlUKvVEIpGYDXhpimQXIwYhF4whzSER7tPpdNjtdu8tLCzcwynolfNf7/N1/0e8zgT044sty1qem5u71O/3z+3v769JJpNul8tlOJ1O07KspGEYPR6Pp88wjO/cbvfhjo6Ov/Xf+H8BxX/OqtxApH8AAAAASUVORK5CYII=) center no-repeat;
         }
      
  }


  .content-div{
    padding: 0 55rpx;
  

.content{
color: #EC5E00;
}
  }
  .button-div{
    padding: 80rpx 55rpx 40rpx 55rpx;
    box-sizing: border-box;
    button{
      font-size: 30rpx;
background: #628194;
border-radius: 4px;
    }
    button[disabled] {
      opacity: .8;
    }
  }
}
</style>
