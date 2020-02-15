<template>
    <div class="content">
        <div class="add">
            <span class="search-t">
                <el-input sime="small" v-model="search" placeholder="请输入查询内容"></el-input>
                <el-button type="primary" @click="searchT()">搜索</el-button>
            </span>
            <el-button type="primary" @click="add()">添加专辑</el-button>
        </div>
        <div class="list">
            <div class="left-table">
                <div class="thead-list">
                    <span
                        v-for="(item, index) in tHeadTitle"
                        :key="index"
                        :class="'th-' + item.prop"
                    >
                        {{item.name}}
                    </span>
                </div>
                <div
                    @click="seeSignList(ik)"
                    v-for="(item_c, ik) in list"
                    :key="ik"
                    class="tbody-list"
                >
                    <span class="th-index">{{ik}}</span>
                    <span
                        v-for="(itemChild, index) in list_title"
                        :key="index"
                        :class="'th-' + itemChild.prop"
                    >
                        <template v-if="!itemChild.type">
                            {{formatTD(item_c[itemChild.prop], itemChild.propChild)}}
                        </template>
                        <el-image
                            v-else-if="itemChild.type === 'img'"
                            style="width: 100px; height: 100px"
                            :src="item_c[itemChild.prop]"
                            fit="contain"></el-image>
                    </span>
                    <span class="th-handler">
                        <el-button size="small" type="primary" icon="el-icon-edit" circle @click="edit(item_c)"></el-button>
                        <el-button size="small" type="danger" icon="el-icon-delete" circle @click="del(item_c)"></el-button>
                    </span>
                </div>
            </div>
            <div class="right-form">
                <span
                    v-for="(itemSee, index) in list_title"
                    :key="index"
                    class="see-l"
                >
                    <span class="see-l-name">{{itemSee.name}}</span>
                    <span class="see-l-value">
                        <template v-if="!itemSee.type">
                            {{formatTD(seeValue[itemSee.prop], itemSee.propChild)}}
                        </template>
                        <el-image
                            v-else-if="itemSee.type === 'img'"
                            style="width: 100px; height: 100px"
                            :src="seeValue[itemSee.prop]"
                            fit="contain"></el-image>
                    </span>
                </span>
            </div>
        </div>
        <EditDialog
            v-if="isShow"
            :isShow.sync="isShow"
            :value="isValue"
            title="修改"
            :listData="list_title"
            :btnName="btnName"
        />
    </div>
</template>
<script>
import { list_title } from './list_config.js'
import EditDialog from './editDialog'
import { getSign } from '@/service/service.js'

export default {
    props: [],
    components: {
        EditDialog
    },
    data() {
        return {
            list_title,
            tHeadTitle: null,
            btnName: '',
            isShow: false,
            isValue: null,
            isWhichIndex: 0,
            search: '',
            list: [
                {
                    album_name: '叶惠美',
                    public_time: '2019-11-12 22：22：22',
                    price: 233,
                    cover: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2016871248,1201033266&fm=26&gp=0.jpg',
                    singers: [
                        {
                          singer_name: '周杰伦'
                        }
                    ]
                },
                {
                    album_name: '我们不一样',
                    public_time: '2019-14-12 22：22：22',
                    price: 3454,
                    cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579664652488&di=7da429b237e6519da0d8d52f9c0303fa&imgtype=0&src=http%3A%2F%2Fimage.tubangzhu.com%2Fupdata%2F201811%2F26%2F302dfa3f4d51d59cc15f.png',
                    singers: [
                        {
                          singer_name: '大壮'
                        },
                        {
                          singer_name: '高进'
                        },
                    ]
                },
                {
                    album_name: '我曾',
                    public_time: '2019-15-12 22：22：22',
                    price: 123,
                    cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579664652488&di=ee2024b89c7fe7e80c3989aa581892d7&imgtype=0&src=http%3A%2F%2Fimage12.m1905.cn%2Fmapps%2Fuploadfile%2Fedu%2F2014%2F1127%2Fthumb_0_800_500_2014112703055086652.jpg',
                    singers: [
                        {
                          singer_name: '老樊'
                        }
                    ]
                },
                {
                    album_name: '那天',
                    public_time: '2019-16-12 22：22：22',
                    price: 6575,
                    cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579664652489&di=5733e99b513fd197ae6648e0cbc4fe74&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_origin_min_pic%2F18%2F06%2F09%2F73e17af2c5281ea68242ed205b3eb224.jpg',
                    singers: [
                        {
                          singer_name: '佚名'
                        }
                    ]
                },
                {
                    album_name: '许多年以后',
                    public_time: '2019-17-12 22：22：22',
                    price: 3423,
                    cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579664652489&di=5733e99b513fd197ae6648e0cbc4fe74&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_origin_min_pic%2F18%2F06%2F09%2F73e17af2c5281ea68242ed205b3eb224.jpg',
                    singers: [
                        {
                          singer_name: '赵鑫'
                        }
                    ]
                },
                {
                    album_name: '曾经',
                    public_time: '2019-18-12 22：22：22',
                    price: 3243,
                    cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579664652488&di=bfc816792e8c2bc75e476868cddbedcc&imgtype=0&src=http%3A%2F%2Fimg.yipic.cn%2Fthumb%2Fddcfb53d%2F5de64f60%2Faa54491b%2F7ab01e00%2Fbig_ddcfb53d5de64f60aa54491b7ab01e00.png',
                    singers: [
                        {
                          singer_name: '朱铭捷'
                        }
                    ]
                },
                {
                    album_name: '曾是',
                    public_time: '2019-19-12 22：22：22',
                    price: 24533,
                    cover: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1579664652489&di=5733e99b513fd197ae6648e0cbc4fe74&imgtype=0&src=http%3A%2F%2Fbpic.588ku.com%2Fback_origin_min_pic%2F18%2F06%2F09%2F73e17af2c5281ea68242ed205b3eb224.jpg',
                    singers: [
                        {
                          singer_name: '佚名'
                        }
                    ]
                },
            ]
        }
    },
    mounted () {
        this.tHeadTitle = JSON.parse(JSON.stringify(this.list_title))
        this.tHeadTitle.push({
            name: '操作',
            prop: 'handler'
        })
        this.tHeadTitle.unshift({
            name: '序号',
            prop: 'index'
        })
        this.getMusic()
    },
    computed: {
        seeValue () {
            return this.list[this.isWhichIndex]
        }
    },
    methods: {
        searchT () {
            
        },
        formatTD (s, prop) {
            if (s instanceof Array) {
                return s.map(d => d[prop]).join('， ')
            }
            return s
        },
        edit (s) {
            this.isShow = true
            this.btnName = '修 改'
            this.isValue = Object.assign({}, s)
        },
        add () {
            this.isShow = true
            this.btnName = '添 加'
            this.isValue = null
        },
        del (s) {
            this.$confirm('此操作将永久删除, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                let y = this.list.findIndex(p => p.album_name === s.album_name)
                this.list.splice(y, 1)
            }).catch(() => {})
        },
        seeSignList (i) {
            this.isWhichIndex = i
        },
        async getMusic () {
            const res = await getSign()
            console.log(res, 99)
        }
    },
}
</script>
<style lang="scss" scoped>
    .content {
        width: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        .add {
            margin-top: 2rem;
            height: 4rem;
            width: 70%;
            display: flex;
            justify-content: flex-end;
            .search-t {
                width: 20rem;
                height: 100%;
                margin-right: 2rem;
            }
        }
        .list {
            display: flex;
            .left-table {
                height: 100%;
                flex: 1;
                padding: 3rem;
                .thead-list, .tbody-list {
                    height: 8rem;
                    width: 100%;
                    display: flex;
                    justify-content: flex-start;
                    align-items: center;
                    font-size: 1.4rem;
                    text-align: center;
                    cursor: default;
                }
                .tbody-list {
                    margin: .5rem 0;
                    .th-cover {
                        height: 100%;
                    }
                    > span {
                        white-space: normal;
                    }
                }
                .thead-list {
                    background-color: #ccc;
                    font-size: 1.6rem;
                    height: 5rem;
                }
            }
            .right-form {
                width: 25%;
                height: 100%;
                border-left: 1px solid #ccc;
                display: flex;
                flex-direction: column;
                padding: 10rem 2rem;
                .see-l {
                    width: 100%;
                    min-height: 5rem;
                    font-size: 1.6rem;
                    display: flex;
                    .see-l-name {
                        font-weight: bold;
                        color: #1884fd;
                        width: 10rem;
                    }
                    .see-l-value {
                        flex: 1;
                    }
                    & /deep/ {
                        .el-image:hover {
                            transform: scale(6);
                            position: relative;
                            right: 20rem;
                        }
                    }
                }
            }
        }
    }
    .th-index {
        width: 5%;
    }
    .th-album_name {
        width: 15%;
    }
    .th-public_time {
        width: 15%;
    }
    .th-price {
        width: 15%;
    }
    .th-cover {
        width: 15%;
        overflow: hidden;
        img {
            max-height: 100%;
            max-width: 100%;
        }
    }
    .th-singers {
        width: 20%;
    }
    .th-handler {
        width: 15%;
    }
    
</style>