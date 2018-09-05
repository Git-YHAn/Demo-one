<template>
  <div id="app">
    <el-container>
    <el-header style="padding: 0px;">
      <navigation></navigation>
    </el-header>
      <el-container>
        <el-aside width="200px">
          <navmenu></navmenu>
        </el-aside>
        <el-main>
          <p v-if="invalidRoute">404</p>
          <router-view else></router-view>
        </el-main>
      </el-container>
      <el-footer style="padding: 0px;">
          <copyright></copyright>
      </el-footer>
    </el-container>
  </div>
</template>
<script>
  import navigation from './components/navigation'
  import copyright from './components/copyright'
  import navmenu from './components/navmenu'
  export default {
    name: 'App',
    components: {
      navmenu,
      navigation,
      copyright
    },
    data() {
      return {
        invalidRoute: false
      }
    },
    created() {
      this.invalidRoute =  !this.$route.matched || this.$route.matched.length === 0
      const localToken = localStorage.getItem('token');
      const sessionToken = sessionStorage.getItem('token');
      if (localToken !== null || sessionToken !== null) {
        const token = localToken === null ? sessionToken : localToken;
        this.$axios.setToken(token);
      }
    }
  }
</script>

<style lang="scss">
  @import "./style/style.scss";
  @import "./style/base/_color.scss";
  @import "./style/base/_utils.scss";
</style>
