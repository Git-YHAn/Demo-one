<template>
  <el-menu v-if="ifLogin" style=" display: flex; min-height: 100vh; flex-direction: column;" :default-active="$route.path" router background-color="#EDEEEF" >
   <el-menu-item index="/user">
     <i class="el-icon-menu" ></i>
     <span slot="title">用户管理</span>
   </el-menu-item>
   <el-menu-item index="/server">
     <i class="el-icon-setting"></i>
     <span slot="title">服务器管理</span>
   </el-menu-item>
 </el-menu>
 <!-- <el-menu v-if="ifLogin" background-color="#EDEEEF" class="el-menu-vertical-demo" :default-active="this.$router.path" router mode="horizontal">
    <el-menu-item v-for="(item,i) in navList" :key="i" :index="item.name">
      <span slot="title">{{ item.navItem }}</span>

    </el-menu-item>
</el-menu> -->
</template>

<script>
  export default {
    data() {
      return {
        ifLogin: false,
      };
    },
    mounted() {
      this.whetherLogin();
    },
    watch: {
      '$route': 'whetherLogin'
    },
    methods: {
      whetherLogin() {
        if(this.$route.matched.length > 0) {
          if (localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null) {
            this.ifLogin = true;
          } else {
            this.ifLogin = false;
          }
        } else {

        }
      },
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>
