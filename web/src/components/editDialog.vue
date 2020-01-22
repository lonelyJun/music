<template>
    <el-dialog
        :title="title + '专辑'"
        :visible.sync="isShow"
        :append-to-body="true"
        :show-close="false"
        ref="upDialog"
        size="large"
        :close-on-click-modal="false"
    >
        <div class="form">
            <div
                class="inline-form"
                v-for="(item, index) in listData"
                :key="index"
            >
                <span class="inline-form-name">
                    {{item.name}}
                </span>
                <template v-if="item.propChild">
                    <Add
                        :showData="assign(item.prop)"
                        propC="singer_name"
                    />
                </template>
                <template v-else>
                    <span class="inline-form-input">
                        <el-input sime="small" v-model="editData[item.prop]" placeholder="请输入内容"></el-input>
                    </span>
                </template>
                
            </div>
        </div>
        <span slot="footer" class="dialog-footer">
            <el-button size="small" type="primary" @click="confirmSure()">{{btnName}}</el-button>
            <el-button size="small" @click="handleCancel()">取 消</el-button>
        </span>
    </el-dialog>
</template>
<script>
import Add from './multAdd'
export default {
    props: ['isShow', 'btnName', 'value', 'listData', 'title'],
    data () {
        return {
            editData: {}
        }
    },
    components: {
        Add
    },
    mounted () {
        if (this.value) {
            this.editData = Object.assign({}, this.value)
        } else {
            this.listData.forEach(s => {
                this.$set(this.editData, s.prop, '')
            })
        }
    },
    methods: {
        confirmSure () {

            this.handleCancel()
        },
        handleCancel () {
            this.$emit('update:isShow', false)
        },
        assign (s) {
            let y = this.editData[s]
            if (y instanceof Array) {
                return y.map(p => p)
            } else if (y instanceof Object) {
                return JSON.parse(JSON.stringify(y))
            }
        }
    }
}
</script>
<style lang="scss" scoped>
    .el-dialog__wrapper {
        & /deep/ {
           .el-dialog__body {
               padding: 0;
           }
           .el-dialog__title {
                font-size: 1.4rem;
            }
            .form {
                width: 100%;
                padding: 2rem;
                .inline-form {
                    width: 100%;
                    height: 5rem;
                    display: flex;
                    align-items: center;
                    margin: .5rem 0;
                    .inline-form-name {
                        width: 10rem;
                        height: 100%;
                        line-height: 3;
                        font-size: 1.6rem;
                    }
                    .inline-form-input {
                        flex: 1;
                    }
                }
            }
        }
        .el-dialog__footer {
            padding: 10px 20px 10px;
            .dialog-footer {
                display: flex;
                justify-content: center;
            }
        }
    }
</style>
