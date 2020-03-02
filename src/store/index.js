import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 创建一个vuex 数据仓库，用来存放所有需要交互的数据

var store = new Vuex.Store({
    //存放所有交互数据
    state: {
        //商品列表数据
        goodslist: [],
        // 商家信息
        merchant: {},
        // 评价信息
        evaluate: {},
    },
    //改变数据的唯一方式
    mutations: {
        // 更新评价数据
        initEvaluate(state, obj) {
            state.evaluate = obj
        },
        // 更新商家数据
        initMerchant(state, newObj) {
            state.merchant = newObj
        },
        // 更新商品信息
        initGoodsList(state, newArr) {
            state.goodslist = newArr
        },
        // 点击按钮改变商品数量
        numChange(state, change) {
            for (let i of state.goodslist) {
                // state.goodslist[i]
                for (let j of i.foods) {
                    if (j.name == change.names) {
                        j.num += change.num
                    }
                }
            }
        }
    },
    getters: {
        //getter和mutation一样，每一个getter函数，都会接受state形参
        getData(state) {
            var carFoods = [];
            for (let i = 0; i < state.goodslist.length; i++) {
                for (let j = 0; j < state.goodslist[i].foods.length; j++) {
                    carFoods.push(state.goodslist[i].foods[j]);
                }
            }
            return [...new Set(carFoods.filter(val => val.num > 0))]

        }
    }
});
export default store
