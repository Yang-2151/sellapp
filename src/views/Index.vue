<template>
  <div id="index">
    <div class="merchantTop" :style="{backgroundImage:'url('+data.avatar+')'}">
      <div class="bgColor">
        <div class="group">
          <!-- 头像 -->
          <div class="photo">
            <img :src="data.avatar" alt />
          </div>
          <!-- 头像右边内容 -->
          <div class="content">
            <h3>{{data.name}}</h3>
            <p>
              <span>{{data.description}}</span> /
              <span>{{data.deliveryTime}}</span>分钟送达
            </p>
            <p>{{data.supports? data.supports[0].description:''}}</p>
          </div>
          <!--  5个-->
          <div class="number">5个 ></div>
        </div>
        <!-- 公告 -->
        <Row type="flex" class="code-row-bg notice">
          <i-Col span="16" class="notice-content">{{data.bulletin}}</i-Col>
        </Row>
      </div>
    </div>
    <div class="nav">
      <router-link to="/goods">商品</router-link>
      <router-link to="/evaluate">评价</router-link>
      <router-link to="/merchant">商家</router-link>
    </div>
    <router-view></router-view>
<!-- 底部购物车 -->
    <div class="shopCar">
      <Row>
        <i-Col :xs="16" class="car">
          <div>
            <div></div>
          </div>
            <span>￥0</span> <span></span>  <span>另需配送费￥4元</span>  
        </i-Col>
        <i-Col :xs="8" class="font"><span>￥20起送</span></i-Col>
      </Row>
    </div>
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
      data: {}
    };
  },
  created() {
    getSeller().then(res => {
      this.data = res.data.data;
    });
  }
};
</script>

<style lang="less" scoped>
#index {
  height: 100%;
  // 商家头部
  .merchantTop {
    .bgColor {
      width: 100%;
      height: 150px;
      padding: 16px 0 0 0;
      background: rgba(0, 0, 0, 0.4);
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      color: #fff;
      .group {
        display: flex;
        position: relative;
        .photo {
          width: 90px;
          height: 90px;
          margin-left: 12px;
          margin-right: 12px;
          img {
            width: 100%;
          }
        }
        .content {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          h3 {
            padding-left: 35px;
            background: url("../assets/imgs/brand@2x.png") no-repeat 0 2px;
          }
          p:nth-of-type(2) {
            padding-left: 24px;
            background: url("../assets/imgs/decrease_1@2x.png") no-repeat -2px -2px;
          }
        }
        .number {
          width: 50px;
          height: 30px;
          border-radius: 15px;
          line-height: 30px;
          padding-left: 10px;
          background: rgba(0, 0, 0, 0.3);
          position: absolute;
          bottom: 0px;
          right: 12px;
        }
      }

      .notice {
        // width: 100%;
        background: #3C3C3E !important;
        height: 30px;
        .notice-content {
          padding-left: 45px;
          width: 100%;
          line-height: 30px;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          align-items: flex-end;
          background: url("../assets/imgs/bulletin@2x.png") no-repeat 6px 5px;
        }
      }
    }
  }
  // 导航
  .nav {
    height: 40px;
    line-height: 40px;
    display: flex;
    justify-content: space-around;
    background: #fff;
    border-bottom: 1px solid #ccc;
    a {
      color: #666666;
      font-size: 16px;
    }
  }
  // 购物车
  .shopCar {
    position: fixed;
    width: 100%;
    height: 60px;
    line-height: 60px;
    bottom: 0;
    color: #ccc;
    text-align: center;
    .font {
      background: #4d4c4c!important;
    }
    // 购物车图标
    .car {
      position: relative;
      display: flex;
      justify-content: flex-end;
      padding-right: 10px;
      div {
        width: 70px;
        height: 70px;
        background: #2c2c2e;
        position: absolute;
        left: 0px;
        top: -16px;
        border-radius: 50%;
        div {
          width: 60px;
          height: 60px;
          background: url("../assets/imgs/shopCar.png") no-repeat;
          position: absolute;
          left: 5px;
          top: 8px;
        }
       
      }
      span:nth-of-type(2){
       display: block;
       background: #fff;
       height: 30px;
       width: 1px;
      margin: auto 10px
      }
    }
    .ivu-col {
      height: 60px;
      background: #2c2c2e;
      font-size: 16px;
    }
  }
}
</style>

