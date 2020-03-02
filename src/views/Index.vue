<template>
  <div id="index">
    <div class="merchantTop" :style="{backgroundImage:'url('+merchant.avatar+')'}">
      <div class="bgColor">
        <div class="group">
          <!-- 头像 -->
          <div class="photo">
            <img :src="merchant.avatar" alt />
          </div>
          <!-- 头像右边内容 -->
          <div class="content">
            <h3>{{merchant.name}}</h3>
            <p>
              <span>{{merchant.description}}</span> /
              <span>{{merchant.deliveryTime}}</span>分钟送达
            </p>
            <p>{{merchant.supports? merchant.supports[0].description:''}}</p>
          </div>
          <!--  5个-->
          <div class="number">5个 ></div>
        </div>
        <!-- 公告 -->
        <Row type="flex" class="code-row-bg notice">
          <i-Col span="16" class="notice-content">{{merchant.bulletin}}</i-Col>
        </Row>
      </div>
    </div>
    <div class="nav">
      <router-link to="/goods">商品</router-link>
      <router-link to="/evaluate">评价</router-link>
      <router-link to="/merchant">商家</router-link>
    </div>
    <router-view></router-view>

    
   
  </div>
</template>

<script>
import { getSeller } from "../api/apis";
export default {
  data() {
    return {
    };
  },
  created() {
    getSeller().then(res => {
      this.$store.commit("initMerchant", res.data.data);
    });
  },
  computed: {
    merchant() {
      return this.$store.state.merchant;
    }
  }
};
</script>

<style lang="less" scoped>
.active {
  background: yellow;
}

.demo-badge {
  width: 42px;
  height: 42px;
  background: #eee;
  border-radius: 6px;
  display: inline-block;
}
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
        background: #3c3c3e !important;
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
 
 
}
</style>

