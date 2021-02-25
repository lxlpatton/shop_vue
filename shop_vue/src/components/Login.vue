<template>
    <div class="login_container">
        <div class="login_box">
            <!-- LOGO头像 -->
            <div class="avatar_box">
                <img src="../assets/logo.png" alt="">
            </div>
            <!-- 登录表单 -->
            <el-form ref="loginFormRef" :model="loginForm" :rules="loginForomRules" label-width="0px" class="login_form">
                <el-form-item prop="username">
                    <el-input  v-model="loginForm.username" prefix-icon="iconfont icon-user"></el-input>
                </el-form-item>
                 <el-form-item prop="password">
                    <el-input  v-model="loginForm.password" prefix-icon="iconfont icon-3702mima" type="password"></el-input>
                </el-form-item>
                 <el-form-item class="btns">
                    <el-button type="primary" @click="login">登录</el-button>
                    <el-button type="info" @click="resetlLoginForm">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
export default {
    data(){
        return {
            loginForm:{
                username:'admin',
                password:'123456'
            },
            // 表单验证规则
            loginForomRules:{
                username:[
                    { required: true, message: '请输入用户名', trigger: 'blur' },
                    { min: 3, max: 9, message: '长度在 5 到 9 个字符', trigger: 'blur' }
                ],
                password:[
                    { required: true, message: '请输入密码', trigger: 'blur' },
                    { min: 6, max: 15, message: '长度在 6 到 15 个字符', trigger: 'blur' }
                ]
            }
        };
    },
    methods:{
        resetlLoginForm(){
            console.log(this);
            this.$refs.loginFormRef.resetFields();
        },
        login() {
            this.$refs.loginFormRef.validate(async valid =>{
                if(!valid) return;
                const {data:res} = await this.$http.post('login',this.loginForm);
                if(res.meta.status !== 200){
                    return this.$message.error('登录失败')
                }else{
                    this.$message.success('登录成功')
                    // 存token 
                    window.sessionStorage.setItem('token',res.data.token);
                    // 跳转
                    this.$router.push("/home");
                }
            });
        }
    }
};
</script>

<style lang="less" scoped>
.login_container{
    background-color: #2b4b6b;
    height: 100%;
}
.login_box{
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    width: 450px;
    height: 300px;
    background-color: #fff;
    border-radius: 3px;
    .avatar_box {
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        height: 130px;
        width: 130px;
        padding: 10px;
        border: 1px solid #eee;
        background-color: #fff;
        border-radius: 50%;
        box-shadow: 0 0 10px #ddd;

        img{
            width: 100%;
            height: 100%;
            background-color: #eee;
            border-radius: 50%;
        }
    }
    .login_form{
        position: absolute;
        width: 100%;
        bottom: 0;
        padding: 0 20px;
        box-sizing: border-box;
    }
    .btns {
        display: flex;
        justify-content: flex-end;
    }
}
</style>