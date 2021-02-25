<template>
    <el-container class="home_container">
        <!-- 头部 -->
        <el-header>
            <div>
                <img src="../assets/heima.png" alt="">
                <span>后台管理系统</span>
            </div> 
            <el-button type="info" @click="logout">退出</el-button>
        </el-header>
        <!-- 主页面区-->
        <el-container>
            <!-- 侧边栏 -->
            <el-aside :width="isCollapse ? '64px' : '200px'">
                <!-- 折叠菜单 -->
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <!-- 侧边栏菜单区域 -->
                <el-menu background-color="#333744" text-color="#fff" active-text-color="#409EFF" unique-opened
                :collapse="isCollapse" :collapse-transition="false" router
                :default-active="activePath">
                    <!-- 一级菜单 -->
                    <el-submenu :index="item.id +''" v-for="item in menulist" :key="item.id">  
                        <!-- 一级菜单模板区 -->
                        <template slot="title">
                        <i :class="iconsObj[item.id]"></i>
                        <span>{{item.authName}}</span>
                        </template>
                        <!-- 二级菜单-->
                        <el-menu-item :index="'/' + subitem.path" v-for="subitem in item.children" 
                        :key="subitem.id" @click="saveState('/' + subitem.path)">
                            <i class="el-icon-menu"></i>
                            <span>{{subitem.authName}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!-- 右侧内容区 -->
            <el-main>
                <!-- 路由占位符 -->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
export default {
    data() {
        return{
            // 左侧菜单数据
            menulist:[],
            iconsObj:{
                '125':'iconfont icon-user',
                '103':'iconfont icon-tijikongjian',
                '101':'iconfont icon-shangpin',
                '102':'iconfont icon-danju',
                '145':'iconfont icon-baobiao'
            },
            // 是否折叠
            isCollapse:false,
            // 被激活的链接地址
            activePath:''
        }
    },
     created() {
            this.getMenuList()
            this.activePath =window.sessionStorage.getItem('activePath')
    },
    methods:{
        logout(){
            window.sessionStorage.clear()
            this.$router.push('/login')
        },
        // 获取所有菜单信息
        async getMenuList(){
           const { data: res } = await this.$http.get('menus')
           if(res.meta.status !== 200) return this.$message.error(res.meta.msg)
           this.menulist = res.data
           console.log(res);
        },
        toggleCollapse(){
            this.isCollapse = !this.isCollapse
        },
        // 保存链接的激活状态
        saveState(activePath){
            window.sessionStorage.setItem('activePath',activePath)
            this.activePath = activePath
        }
    }
}
</script>

<style lang="less" scoped>
.home_container{
    height: 100%;
}
.el-header {
    background-color:#373d41 ;
    padding-left: 0;
    color: #fff;
    font-size: 20px;
    align-items: center;
    display: flex;
    justify-content: space-between;
    >div {
        display: flex;
        align-items: center;
        span {
            margin-left: 15px;
        }
    }
}
.el-aside{
    background-color:#333744;
    .el-menu {
        border-right: 0;
    }
}
.el-main{
    background-color:#EAEDF1;
}
.iconfont {
    margin-right: 10px;
}
.toggle-button {
    background-color: #4A5064;
    font-size: 10px;
    color: #fff;
    text-align: center;
    line-height: 20px;
    letter-spacing: 0.2em;
    cursor: pointer;
}
</style>