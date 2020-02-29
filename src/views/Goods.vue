<template>
  <div id="Goods">
    <div class="goods">
      <!-- 左边 -->
      <div class="goods-left">
        <!-- 要想实现betterscroll容器效果，必须在获取到的节点后面套一样个ul class="content" -->
        <ul class="content">
          <div
            v-for="(v,i) in data"
            :key="i"
            @click="selected(i)"
            :class="{goodsList:true, bgColor:i==curlick}">
            <p>
              <img style="width:12px" v-show="v.type==-1" src alt />
              <img style="width:12px" v-show="v.type==1" src="../assets/imgs/discount_1@2x.png" alt />
              <img style="width:12px" v-show="v.type==2" src="../assets/imgs/decrease_3@2x.png" alt />
              <img style="width:12px" v-show="v.type==3" src="../assets/imgs/invoice_1@2x.png" alt />
              <img
                style="width:12px"
                v-show="v.type==4"
                src="../assets/imgs/guarantee_1@2x.png"
                alt
              />
              <img style="width:12px" v-show="v.type==5" src="../assets/imgs/special_1@2x.png" alt />
              {{v.name}}
            </p>
          </div>
        </ul>
      </div>
      <!-- 右边 -->
      <div class="goods-right">
        <ul class="content">
          <div :id="idx" v-for="(val,idx) in data" :key="idx">
            <!-- 右边标题 -->

            <h4>{{val.name}}</h4>
            <div v-for="value in val.foods" :key="value.id" class="goods-content">
              <div class="goods-group">
                <div class="img">
                  <img :src="value.image" alt />
                </div>
                <div class="information">
                  <h3>{{value.name}}</h3>
                  <p>{{value.description}}</p>
                  <p>
                    月销{{value.sellCount}}份
                    <span>好评率100%</span>
                  </p>
                  <p>
                    <span style="color:red;font-size:14px">￥</span>
                    <span class="price">{{value.price}}</span>
                    <span class="oldPrice">￥{{value.oldPrice}}</span>
                  </p>
                </div>
                <Icon type="md-add-circle" />
              </div>
            </div>
          </div>
        </ul>
      </div>
      <div class="bottom"></div>
    </div>
    <div class="bottom"></div>
  </div>
</template>

<script>
import { getGoods } from "../api/apis";
import BScroll from "better-scroll";
export default {
  data() {
    return {
      data: {},
      curlick: 0
    };
  },
  created() {
    getGoods().then(res => {
      this.data = res.data.data;
    });
  },
  mounted() {
    // mew Bscroll (dom节点，滚动配置)
    new BScroll(document.querySelector(".goods-left"), {
      click: true
    });
    this.goodsRight = new BScroll(document.querySelector(".goods-right"));
  },
  methods: {
    selected(index) {
      this.curlick = index;
      this.goodsRight.scrollToElement(document.getElementById(index), 800);
    }
  }
};
</script>

<style lang="less" scoped>
.bgColor {
  background: #fff;
}
#Goods {
  display: flex;
  height: 100%;
  .goods {
    flex: 1;
    display: flex;
    // 左边标题
    .goods-left {
      height: 100%;
      width: 100px;
      overflow: scroll;
      background: #f4f5f7;

      .goodsList {
              display: flex;
      align-items: center;
      justify-content: center;
        height: 60px;
        font-size: 14px;
        text-align: center;
        padding: 0 10px;
        border-bottom: 1px solid #ccc;
      }
    }
    // 右边菜单
    .goods-right {
      flex: 1;
      overflow: scroll;
      h4 {
        height: 30px;
        line-height: 30px;
        background: #f4f5f7;
        padding-left: 15px;
        border-left: 2px solid #dadde2;
      }
      .goods-content {
        padding: 16px;
        .goods-group {
          display: flex;
          position: relative;
          border-bottom: 1px solid #DEE2E4;
          .img {
            width: 100px;
            height: 100px;
            img {
              width: 100%;
            }
          }
          .information {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            margin-bottom: 10px;
            margin-left: 14px;
            .price {
              color: red;
              font-size: 16px;
              font-weight: bold;
            }
            .oldPrice {
              color: #ccc;
              text-decoration: line-through;
              margin-left: 10px;
            }
          }
          .ivu-icon {
            color: skyblue;
            font-size: 24px;
            position: absolute;
            bottom: 10px;
            right: 0px;
          }
        }
      }
    }
  }
  .bottom {
    height: 70px;
  }
}
</style>