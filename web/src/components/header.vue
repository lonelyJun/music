<template>
    <header>
        <div
            v-for="(item, index) in list"
            :key="index"
            :class="{'active': isMe === index}"
            @click="tab(item, index)"
            >
            {{item.name}}
        </div>
    </header>
</template>
<script>
import { getUserInfo } from '@/service/service.js'
export default {
    data () {
        return {
            list: [
                {
                    name: '音乐专辑管理',
                    id: 'musicMag'
                },
                {
                    name: '我的收藏',
                    id: ''
                },
                {
                    name: '歌曲统计',
                    id: ''
                }
            ],
            isMe: 0
        }
    },
    components: {

    },
    mounted () {
    },
    methods: {
        tab (s, i) {
            this.isMe = i
            this.$emit('switchMusic', s)
        }
    }
}
</script>
<style lang="scss" scoped>
    header {
        width: 100%;
        height: 6rem;
        display: flex;
        justify-content: flex-start;
        align-items: center;
        background:linear-gradient(120deg,#576b73 0%, #f1f3ff);
        div {
            cursor: pointer;
            width: 15rem;
            height: 100%;
            border-bottom: 3px solid transparent;
            line-height: 3;
            text-align: center;
            font-size: 2rem;
            margin: 0 1rem;
            color: #fff;
        }
        .active {
            border-bottom-color: #d7ffde!important;
            color: #d7ffde;
        }
    }
</style>
