<template>
    <div class="home-page">
        <Header
            @switchMusic="switchMusic"
        />
        <Content
        />
    </div>
</template>
<script>
import { getUserInfo } from '@/service/service.js'
import Header from './header'
import Content from './content'
export default {
    data () {
        return {
            clickInfo: null,
            userInfo: null
        }
    },
    components: {
        Header,
        Content
    },
    mounted () {
        if (!sessionStorage['info']) {
            this.$message.error('请先登录')
            this.$router.replace({ path: '/' })
        }
    },
    methods: {
        switchMusic (s) {
            
        }
    }
}
</script>
<style lang="scss" scoped>
    .home-page {
        width: 100%;
        height: 100%;
        display: flex;
        background:rgba(250,250,251,1);
        overflow-x: hidden;
        flex-direction: column;
    }
</style>
