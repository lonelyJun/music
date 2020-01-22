<template>
    <div class="bg">
        <div class="user-login" :class="[{'regiest': !status}, 'user-login']">
            <strong class="name">{{status ? '用 户 登 陆' : '用 户 注 册'}}</strong>
            <div class="user-info">
                <span class="info-name">用 户 名</span>
                <span class="info-input">
                    <el-input v-model="form.user_name" placeholder="请输入内容"></el-input>
                </span>
            </div>
            <div class="user-info">
                <span class="info-name">密 码</span>
                <span class="info-input">
                    <el-input @keyup.enter.native="login()" placeholder="请输入密码" v-model="form.password" show-password></el-input>
                </span>
            </div>
            <div class="user-info" v-if="!status">
                <span class="info-name">确认密码</span>
                <span class="info-input">
                    <el-input placeholder="请输入密码" v-model="form.passwordAgain" show-password></el-input>
                </span>
            </div>
            <div class="handle-btn">
                <template v-if="status">
                    <el-button type="primary" @click="login()">登 陆</el-button>
                    <el-button type="danger" @click="status = false">注 册</el-button>
                </template>
                <template v-else>
                    <el-button type="danger" @click="reg()">注 册</el-button>
                    <span class="diff-btn" @click="status = true">返回登陆</span>
                </template>
            </div>
        </div>
    </div>
</template>
<script>
import { userRegiest, login } from '@/service/service.js'
export default {
    props: [],
    data() {
        return {
            form: {
                user_name: '',
                password: '',
                passwordAgain: ''
            },
            status: true
        }
    },
    methods: {
        async reg () {
            if (this.form.user_name === '') {
                this.$message.error('请输入用户名')
                return
            } else if (this.form.password === '') {
                this.$message.error('请输入密码')
                return
            } else if (this.form.password !== this.form.passwordAgain) {
                this.$message.error('密码不一致，请重新输入')
                return
            }
            let param = {
                user_name: this.form.user_name,
                password: this.form.password
            }
            const res = await userRegiest(param)
            if (res._id) {
                this.$message.success('注册成功')
                this.status = true
                Object.keys(this.form).forEach(p => {
                    this.$set(this.form, p, '')
                })
            }
        },
        async login () {
            if (!this.status) return
            let param = {
                user_name: this.form.user_name,
                password: this.form.password
            }
            const res = await login(param)
            if (res.code === 0) {
                sessionStorage['user'] = true
                this.$router.replace({path: '/'})
            } else {
                this.$message.error(res.msg)
                return
            }
        }
    },
}
</script>
<style lang="scss" scoped>
    .bg {
        width: 100%;
        height: 100%;
        background: url('/static/img/back.png') no-repeat center;
        position: relative;
        .user-login{
            width: 20%;
            position: absolute;
            border: 1px solid #ccc;
            top: 30%;
            right: 10%;
            border-radius: 5px;
            display: flex;
            flex-direction: column;
            background:linear-gradient(90deg,#f1f3ff 0%, #576b73);
            height: 33%;
        }
        .regiest {
            height: 40%;
        }
        .name {
            font-size: 2.4rem;
            width: 100%;
            height: 7rem;
            line-height: 7rem;
            text-align: center;
            letter-spacing: 5px;
        }
        .user-info {
            width: 100%;
            height: 7rem;;
            padding: 0 2rem;
            display: flex;
            justify-content: flex-start;
            .info-name {
                width: 10rem;
                font-size: 1.6rem;
                height: 100%;
                line-height: 2.5;
                letter-spacing: 3px;
            }
            .info-input {
                flex: 1;
            }
        }
        .handle-btn {
            flex: 1;
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            .diff-btn {
                cursor: pointer;
                margin: 0 2rem;
                font-size: 1.4rem;
                border-bottom: 1px solid #000;
                padding: 3px 5px;
            }
        }
    }
</style>