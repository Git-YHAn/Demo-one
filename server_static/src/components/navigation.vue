<template>
  <el-menu v-if="ifLogin" active-text-color="#FFFFFF" :default-active="navActiveIndex" mode="horizontal" @select="handleSelect" menu-trigger="click">
    <el-menu-item  index="1"><span><img class="ico" src="/static/image/favicon.ico"/></span></el-menu-item>
    <el-submenu index="2" class="userMenu">
      <template slot="title">{{ username }}</template>
      <el-menu-item index="2-1" class="exitMenu">注销</el-menu-item>
    </el-submenu>
  </el-menu>
</template>

<script>
  export default {
    data() {
      return {
        navActiveIndex: '1',
        ifLogin: false,
        username: '尚未登录'
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
        if (localStorage.getItem('token') !== null || sessionStorage.getItem('token') !== null) {
          this.$axios.get('/user/get', {}, res => {
            let response = res.data
            if (response !== '' && response !== null) {
              this.username = response.data.username;
              this.ifLogin = true;
            } else {
              this.$axios.removeToken();
              this.$router.push('login');
            }

          });
        } else {
          this.ifLogin = false;
        }
      },
      handleSelect(key) {
        if (key === '2-1') {
          this.$axios.removeToken();
          this.$axios.post('login/logout', {}, res => {
            let response = res.data
            if(~~response.code == 1 ) {
              this.$message.success('注销成功');
              this.$router.push('login');
            }
          })
        }
      }
    }
  };
</script>

<style scoped>
  .icon {
    width: 16px;
    height: 16px;
  }

  .userMenu {
    float: right !important;
  }

  .exitMenu {
    min-width: 0 !important;
  }
</style>
