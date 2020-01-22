<template>
    <div class="input-s">
        
        <span></span>
    </div>
</template>
<script>
    export default {
        props:['showData', 'id', 'indexP'],
        
        data() {
            return {
                inpNum: [],
                inpSearch: false,
                text: '',
                value: [],
                options:[
                    {
                        name:'并且',
                        value: 'and',
                        id: ',',
                    },
                    {
                        name:'或者',
                        value: 'or',
                        id: '|',
                    },
                    {
                        name:'非',
                        value: 'not',
                        id: ',',
                    }
                ],
            }
        },
        methods: {
            addChildTrem (){
                this.inpSearch = false;
                if(this.text != ''){
                    let t = '';
                    if(this.showData.kind == 'not'){
                        if(this.text[0] == '-') t = this.formatStr(this.text)
                            else t = this.text
                        this.showData.value.push(t)
                    } else if(this.showData.kind == 'or'){
                        this.text = this.text.replace(/\|\|*$/g,'');
                        if(this.text.includes('|'))
                            this.text.split('|').forEach(s => this.showData.value.push(s.trim()));
                        else  
                            this.showData.value.push(this.text)
                    } else {
                        if(this.text[0] == '+') t = this.formatStr(this.text)
                            else t = this.text
                        this.showData.value.push(t)
                    }
                    this.$emit('changdeTrem', {data: this.showData, indexP: this.indexP})
                }
                this.text = '';
            },
            formatStr(v){
                return v.replace(/[\-\+\|]/i,'')
            },
            minusTremName (elm, index){
                this.showData.value.splice(index, 1)
                this.$emit('changdeTrem', {data: this.showData, indexP: this.indexP, isNum: this.showData.value.length})
            },
            clear_p(){
                this.showData.value = [];
            }
        },
       
    }
</script>
<style lang="scss" scoped>
    .input-s {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 100%;
        .dropDown {
            margin-right: 5px;
            .sel {
                width: 65px;
                border: 1px solid #a5c8df;
                height: 30px;

            }
        }
        
    }
</style>