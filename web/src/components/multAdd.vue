<template>
    <div class="inp">
        <div class="inp-search" @click.stop="inpSearch = true">
            <span @click.stop class="trem-name" v-for="(item, index) in showData" :key="index">
                <span class="name">{{item[propC]}}</span>
                <i @click.stop="minusTremName(item, index)">&times;</i>
            </span>
            <input v-if="inpSearch" v-focus v-model="text" type="text" @blur="addChildTrem" @keyup.enter.stop="addChildTrem">
        </div>
    </div>
</template>
<script>
export default {
    props:['showData', 'propC'],
    directives: {
        focus: {
            inserted: function (el) {
                el.focus()
            }
        }
    },
    components:{
    },
    data(){
        return {
            inpSearch: false,
            text: '',
            value: [],
        }
    },
    watch:{
        
    },
    mounted() {

       console.log(this.showData, this.propC)
    },
    methods: {
        addChildTrem (){
            this.inpSearch = false;
            if(this.text != ''){
                this.showData.push({
                    [this.propC]: this.text
                })
                // this.$emit('changdeTrem', {data: this.showData, indexP: this.indexP})
            }
            this.text = '';
        },
        formatStr(v){
            return v.replace(/[\-\+\|]/i,'')
        },
    },
}
</script>
<style lang="scss" scoped>
    .inp {
        flex: 1;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        .add, .minus{
            font-size: 18px;
            cursor: pointer;
        }
        .add {
            color: #4092ef;
            margin-right: 3px;
            &:hover {
                color: #1884fd;
            }
        }
        .minus {
            color: #ef7171;
            &:hover {
                color: #ff0000;
            }
        }
        .inp-search {
            width: 100%;
            border: 1px solid #DCDFE6;
            border-radius: 3px;
            padding:0 30px 0 5px;
            display: flex;
            align-items: center;
            flex-wrap: wrap;
            min-height: 4rem;
            .trem-name {
                height: 70%;
                border-radius: 2px;
                background: #d9f0ff;
                padding: 2px 8px;
                cursor: default;
                display: flex;
                align-items: center;
                margin: 3px;
                color: #1884fd;
                font-size: 14px;
                .name {
                    margin-right: 4px;
                    max-width: 100px;
                    text-overflow: ellipsis;
                    overflow: hidden;
                    white-space: nowrap;
                }
                i {
                    font-style: normal;
                    font-size: 18px;
                    cursor: pointer;
                }
            }
            input {
                height: 26px;
                width: 70px;
                text-indent: 5px;
                border: none;
            }
        }
    }
</style>
