<template>
  <div class="goods">
    <!-- 左边 -->
    <div class="goods-left">
      <!-- 要想实现betterscroll容器效果，必须在获取到的节点后面套一样个ul class="content" -->
      <ul class="content">
        <div
          v-for="(v,i) in goodslist"
          :key="i"
          @click="selected(i)"
          :class="{goodsList:true, bgColor:i==curlick}"
        >
          <p>
            <img style="width:12px" v-show="v.type==-1" src alt />
            <img style="width:12px" v-show="v.type==1" src="../assets/imgs/discount_1@2x.png" alt />
            <img style="width:12px" v-show="v.type==2" src="../assets/imgs/decrease_3@2x.png" alt />
            <img style="width:12px" v-show="v.type==3" src="../assets/imgs/invoice_1@2x.png" alt />
            <img style="width:12px" v-show="v.type==4" src="../assets/imgs/guarantee_1@2x.png" alt />
            <img style="width:12px" v-show="v.type==5" src="../assets/imgs/special_1@2x.png" alt />
            {{v.name}}
          </p>
        </div>
      </ul>
    </div>
    <!-- 右边 -->
    <div class="goods-right">
      <ul class="content">
        <div :id="idx" v-for="(val,idx) in goodslist" :key="idx">
          <!-- 右边标题 -->

          <h4>{{val.name}}</h4>
          <div v-for="(value,i) in val.foods" :key="i" class="goods-content">
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
                <!-- 价格 -->
                <div class="Price">
                  <p>
                    <span style="color:red;font-size:14px">￥</span>
                    <span class="price">{{value.price}}</span>
                    <span class="oldPrice" v-show="value.oldPrice!=''">￥{{value.oldPrice}}</span>
                  </p>
                  <!-- 按钮 -->
                  <div class="numBtn">
                    <button type="button" @click="changeNum(value.name,-1)" v-show="value.num>0">-</button>
                    <span style="margin:0 6px;font-size:14px" v-show="value.num>0">{{value.num}}</span>
                    <button type="button" @click="changeNum(value.name,1)">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>
    <!-- <div class="bottom"></div> -->
    <!-- 购物车板子 -->

    <transition name="slide-fade">
      <div class="shopCar-board" v-show="shopCarshow">
        <ul class="content">
          <!-- 购物车信息 -->
          <div class="carFoods">
            <!-- 顶部 -->
            <div class="Carhead">在线支付满28减5</div>
            <h2 v-show="carFoods==''" style="text-align:center;color:#ccc;margin:50px auto;">空空如也</h2>
            <div class="Foods-group" v-for="(value,i) in carFoods" :key="i">
              <div class="img">
                <img :src="value.image" alt />
              </div>
              <div class="information">
                <h2>{{value.name}}</h2>
                <!-- 价格 -->
                <div class="priceGroup">
                  <p class="price">{{value.num*value.price}}￥</p>
                  <!-- 按钮 -->
                  <div class="numBtn">
                    <button type="button" @click="changeNum(value.name,-1)" v-show="value.num>0">-</button>
                    <span style="margin:0 6px;font-size:14px" v-show="value.num>0">{{value.num}}</span>
                    <button type="button" @click="changeNum(value.name,1)">+</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ul>
      </div>
    </transition>
    <!-- 底部购物车 -->
    <div class="shopCar">
      <Row>
        <i-Col :xs="5" class="car">
          <div @click="shopCarshow=!shopCarshow">
            <sup class="ivu-badge-count">{{carNum}}</sup>
          </div>
        </i-Col>
        <i-Col :xs="12" class="price">
          <span style="font-size:18px;color:#fff;">￥{{getAllmoney}}</span>
          <span class="line"></span>
          <span>另需配送费￥4元</span>
        </i-Col>
        <i-Col :xs="7" class="font" v-show="getAllmoney<20">
          <span>￥20起送</span>
        </i-Col>
        <i-Col :xs="7" class="delivery">
          去结算
        </i-Col>
      </Row>
    </div>
  </div>
</template>

<script>
// import Shopcar from "./Shopcar"
import { getGoods } from "../api/apis";
import BScroll from "better-scroll";
export default {
  // components: {
  //   Shopcar
  // },
  data() {
    return {
      shopCarshow: false,
      curlick: 0,
      carNum: 0
    };
  },
  created() {
    getGoods().then(res => {
      this.$store.commit("initGoodsList", res.data.data);
      // console.log(this.goodslist);
    });
  },
  mounted() {
    // mew Bscroll (dom节点，滚动配置)
    new BScroll(document.querySelector(".goods-left"), {
      click: true
    });
    new BScroll(document.querySelector(".shopCar-board"));
    this.goodsRight = new BScroll(document.querySelector(".goods-right"), {
      probeType: 3 //实时派发滚动事件
    });

    this.goodsRight.on("scroll", ({ y }) => {
      let _y = Math.abs(y);

      // 获取div的高度？计算所有div高度，而且还要高频获取（考虑性能，反复获取）
      for (let items of this.getDivHeight) {
        if (_y >= items.min && _y < items.max) {
          this.curlick = items.index;
          return; //结束剩下所有的循环
        }
      }
    });
  },
  methods: {
    selected(index) {
      this.curlick = index;
      this.goodsRight.scrollToElement(document.getElementById(index), 800);
    },
    changeNum(names, num) {
      this.$store.commit("numChange", { names, num });
      this.carNum += num;
    }
  },
  computed: {
    getDivHeight() {
      let arr = [];
      let total = 0; //所有div的高度累加
      // 获取div高度，根据数组索引，获取每一个div高度
      for (let i = 0; i < this.goodslist.length; i++) {
        let curDivHeight = document.getElementById(i).offsetHeight;

        // min:之前div 的高度累计 max：之前div累加的高度+自身高度
        arr.push({ min: total, max: total + curDivHeight, index: i });

        // 每次循环一次累加一次之前的高度
        total += curDivHeight;
      }
      return arr;
    },
    goodslist() {
      return this.$store.state.goodslist;
    },
    // 购物车商品数据
    carFoods() {
      let map = new Map();
      for (let value of this.$store.getters.getData) {
        if (!map.has(value.name)) {
          map.set(value.name, value);
        }
      }
      return [...map.values()];
    },
    //购物车商品总价
    getAllmoney() {
      var sum = 0;
      var list = [];
      for (let j = 0; j < this.carFoods.length; j++) {
        list.push(this.carFoods[j].num * this.carFoods[j].price);
      }
      for(let num=0;num<list.length;num++){
        sum+=list[num];
      }
      return sum;
    }
  }
};
</script>

<style lang="less" scoped>
.bgColor {
  
  background: #fff;
}
.goods {
  display: flex;
  height: 100%;
  // 左边标题
  .goods-left {
    height: 100%;
    width: 100px;
    overflow: scroll;
    background: #eeeeee;

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
        border-bottom: 1px solid #dee2e4;
        .img {
          width: 100px;
          height: 100px;
          img {
            width: 100px;
          }
        }
        .information {
          width: 100%;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          margin-bottom: 10px;
          margin-left: 14px;
          .Price {
            display: flex;
            justify-content: space-between;
            p {
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
            .numBtn {
              display: flex;
              justify-content: space-around;
              align-items: center;
              button {
                background: skyblue;
                width: 22px;
                height: 22px;
                line-height: 22px;
                font-size: 20px;
                color: #fff;
                border: none;
                text-align: center;
                border-radius: 50%;
                outline: none;
              }
              .ivu-icon {
                color: skyblue;
                font-size: 24px;
              }
            }
          }
        }
      }
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
      background: #4d4c4c !important;
    }
    .delivery{
      background: #01b401 !important;
      text-align: center;
    }
    // 购物车图标
    .car {
      position: relative;
      div {
        width: 60px;
        height: 60px;
        background: #2c2c2e;
        border-radius: 50%;
        background-image: url("../assets/imgs/shopCar.png");
        background-size: contain;
        position: absolute;
        left: 10px;
        bottom: 12px;
        .ivu-badge-count {
          position: absolute;
          top: 0;
          right: 0;
        }
      }
    }
    .price {
      display: flex;
      justify-content:center;
      padding-right: 10px;
      .line {
        display: block;
        background: #fff;
        height: 30px;
        width: 1px;
        margin: auto 4px;
      }
    }
    .ivu-col {
      height: 60px;
      background: #2c2c2e;
      font-size: 16px;
    }
  }
  // 购物车板子

  .shopCar-board {
    position: fixed;
    width: 100%;
    bottom: 0px;
    height: 300px;
    background: #fff;
    margin-bottom: 60px;
    .Carhead {
      height: 40px;
      width: 100%;
      background: #f1e3a1;
      border-radius: 25px 25px 0 0;
      line-height: 40px;
      font-size: 14px;
      text-align: center;
    }
    .Foods-group {
      padding: 16px 16px 0 16px;
      display: flex;
      background: rgb(255, 255, 255);
      border-bottom: 1px solid #706f6f;
      .img {
        width: 100px;
        height: 100px;
        margin-right: 14px;
        img {
          width: 100px;
        }
      }
      .information {
        width: 100%;
        .priceGroup {
          width: 100%;
          display: flex;
          justify-content: space-between;
          margin-top: 20px;
          .price {
            color: red;
            font-size: 16px;
          }
          .numBtn {
            display: flex;
            justify-content: space-around;
            align-items: center;
            button {
              background: skyblue;
              width: 22px;
              height: 22px;
              line-height: 22px;
              font-size: 20px;
              color: #fff;
              border: none;
              text-align: center;
              border-radius: 50%;
              outline: none;
            }
            .ivu-icon {
              color: skyblue;
              font-size: 24px;
            }
          }
        }
      }
    }
  }
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.slide-fade-enter-active {
  transition: all 0.9s ease;
}
.slide-fade-leave-active {
  transition: all 0.9s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateY(300px);
  opacity: 0;
}
</style>