<template>
  <div id="evaluate">
    <!-- 评分 -->
    <div class="grade">
      <Row>
        <i-Col :xs="9" class="grade-left">
          <div class="grade-content">
            <h1>{{merchant.rankRate}}</h1>
            <p>综合评分</p>
            <p>高于周边商家69.2%</p>
          </div>
        </i-Col>
        <i-Col :xs="15" class="grade-right">
          <div>
            <span>口味</span>
            <Rate show-text allow-half v-model="merchant.score">
              <span style="color: #f5a623">{{merchant.score}}</span>
            </Rate>
          </div>
          <div>
            <span>服务</span>
            <Rate show-text allow-half v-model="merchant.serviceScore">
              <span style="color: #f5a623">{{merchant.serviceScore}}</span>
            </Rate>
          </div>
          <p>
            送达时间
            <span>{{merchant.deliveryTime}}</span> 分钟
          </p>
        </i-Col>
      </Row>
    </div>
    <!-- 分隔 -->
    <div class="bg-line"></div>
    <div class="btn-group">
      <Button type="primary">
        全部
        <span>57</span>
      </Button>
      <Button type="info">
        满意
        <span>17</span>
      </Button>
      <Button type="warning">
        不满意
        <span>7</span>
      </Button>
      <Divider />
    </div>
    <div class="click">
      <Button shape="circle" icon="md-checkmark-circle"></Button>只看有内容的界面
      <Divider />
    </div>
    <!-- 评价 -->
    <div class="comment">
      <Row v-for="(v,i) in evaluate" :key="i" class="comment-group">
        <!-- 头像 -->
        <i-Col :xs="3" class="comment-left">
          <Avatar :src="v.avatar" />
        </i-Col>
        <!-- 评价内容 -->
        <i-Col :xs="21" class="comment-right">
          <div class="comment-head">
            <p>{{v.username}}</p>
            <p>{{v.rateTime}}</p>
          </div>
          <p>
            <Rate v-model="v.score" />
            <span>{{v.deliveryTime}}</span>分钟送达
          </p>
          <p>{{v.text}}</p>
          <div class="recommend">
            <Icon v-show="v.rateType==1" type="md-thumbs-down" />
            <Icon v-show="v.rateType==0" type="md-thumbs-up" class="clickbtn" />
            <p v-for="(val,idx) in v.recommend" :key="idx">{{val}}</p>
          </div>
        </i-Col>
      </Row>
      <Divider />
    </div>
  </div>
</template>

<script>
import { getRatings, getSeller } from "../api/apis";

export default {
  data() {
    return {};
  },
  created() {
    getRatings().then(res => {
      this.$store.commit("initEvaluate", res.data.data);

      this.evaluate.forEach(function(v) {
        function newtime(deliveryTime) {
          var time = new Date(deliveryTime);
          var year = time.getFullYear();
          var month = time.getMonth() + 1;
          if (month < 10) {
            month = "0" + month;
          }
          var day = time.getDate();
          if (day < 10) {
            day = "0" + day;
          }
          var hours = time.getHours();
          if (hours < 10) {
            hours = "0" + hours;
          }
          var minutes = time.getMinutes();
          if (minutes < 10) {
            minutes = "0" + minutes;
          }
          var seconds = time.getSeconds();
          if (seconds < 10) {
            seconds = "0" + seconds;
          }
          return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
        }
        v.rateTime = newtime(v.rateTime);
      });
    });
    getSeller().then(d => {
      this.$store.commit("initMerchant", d.data.data);
      console.log(this.merchant);
    });
  },
  computed: {
    evaluate() {
      return this.$store.state.evaluate;
    },
    merchant() {
      return this.$store.state.merchant;
    }
  }
};
</script>

<style lang="less" scoped>
#evaluate {
  .grade {
    height: 120px;
    width: 100%;
    padding-top: 20px;
    .grade-left {
      .grade-content {
        height: 80px;
        line-height: 30px;
        text-align: center;
        border-right: 1px solid #ccc;
        p:nth-of-type(1) {
          font-size: 14px;
        }
      }
    }
    .grade-right {
      display: flex;
      flex-direction: column;
      padding-left: 16px;
      font-size: 14px;
      .ivu-rate {
        font-size: 16px;
      }
    }
    .ivu-col {
      height: 100px;
    }
  }
  .bg-line {
    width: 100%;
    height: 20px;
    background: rgba(204, 204, 204, 0.5);
  }
  .btn-group {
    margin: 0 20px;
    padding-top: 20px;
    .ivu-btn {
      height: 44px;
      margin-right: 10px;
    }
  }
  .click {
    padding: 0 20px;
    font-size: 18px;
    .ivu-btn-icon-only {
      font-size: 24px;
      margin-right: 10px;
    }
  }
  .comment {
    .comment-group {
      padding: 20px;
      display: flex;
      justify-content: space-around;
      border-bottom: 1px solid #ccc;
      .comment-right {
        .comment-head {
          display: flex;
          justify-content: space-between;
        }
        .recommend {
          display: flex;
          justify-content: flex-start;
          flex-wrap: wrap;
          color: #afb0b4;
          .ivu-icon {
            font-size: 14px;
            line-height: 2;
          }
          .clickbtn {
            color: skyblue;
          }
          p {
            border: 1px solid #afb0b4;
            margin: 2px;
            padding: 2px;
          }
        }
      }
    }
  }
}
</style>