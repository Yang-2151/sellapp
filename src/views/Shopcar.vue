<template>
    <div>
        购物车
         <p>xiaogsadahsdkajh </p>
    </div>
</template>

<script>
    export default {
        computed:{
            carGoods(){
                return this.$store.commit('initCargoods',)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>