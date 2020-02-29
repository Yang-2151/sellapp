<template>
  <div id="merchant">
    <div class="header">
      <div class="grade-left">
        <h2>大孕唇</h2>
        <p>
          <Rate allow-half v-model="data.score" />
          <span>月销609单</span>
        </p>
      </div>
      <div class="grade-right">
        <Icon type="md-heart-outline" />
        <p>收藏</p>
      </div>
    </div>
  </div>
</template>

<script>
import { getRatings, getSeller } from "../api/apis";
export default {
  data() {
    return {
      data: {
        // score:''
      }
    };
  },
  created() {
    getRatings();
    getSeller();
  }
};
</script>

<style lang="less" scoped>
#merchant {
  .header {
    display: flex;
    justify-content: space-between;
    margin: 0 20px;
    padding: 20px 0;
    border-bottom: 1px solid #000;
    .grade-right {
        text-align: center;
      .ivu-icon {
        font-size: 36px;
        // color: red;
      }
    }
  }
}
</style>