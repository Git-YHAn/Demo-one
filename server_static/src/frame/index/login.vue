<template>
<el-form :model="loginForm" :rules="rule" ref="loginForm">
  <el-form-item prop="username">
    <el-input type="text" class="loginUsername" v-model="loginForm.username" auto-complete="on" placeholder="请输入用户名" clearable></el-input>
  </el-form-item>
  <el-form-item prop="password">
    <el-input type="password" v-model="loginForm.password" auto-complete="off" placeholder="请输入密码" clearable></el-input>
  </el-form-item>
  <el-form-item prop="remember">
    <el-checkbox v-model="loginForm.remember">保持登录状态</el-checkbox>
  </el-form-item>
  <el-form-item>
    <el-button type="primary" class="loginBtn" @click="submitForm('loginForm')">登录</el-button>
  </el-form-item>
</el-form>
</template>

<script>
export default {
  data() {
    return {
      loginForm: {
        username: '',
        password: '',
        remember: false
      },
      rule: {
        username: [{
          required: true,
          message: '不能为空'
        }],
        password: [{
          required: true,
          message: '不能为空'
        }]
      }
    }
  },
  methods: {
    submitForm() {
      this.$axios.post('/login/dologin', {
        "username": this.loginForm.username,
        "password": this.loginForm.password,
        "remember": this.loginForm.remember
      }, res => {
        let data = res.data;
        if (~~data.code === 1) {
          this.$message.success('登录成功');
          this.$axios.setToken(data.data);
          let redirect = this.$route.query.redirect;
          if (this.loginForm.remember) {
            localStorage.setItem('token', data.data);
          } else {
            sessionStorage.setItem('token', data.data);
          }
          if (redirect !== undefined) {
            this.$router.push(redirect);
          } else {
            this.$router.push('content');
          }
        } else {
          this.$message.error('登录失败！用户名或密码错误');
        }
      })
      // this.$refs[formName].validate((valid) => {
      //   if (valid) {
      //     this.$api.post('/login/dologin', {
      //       "username": this.loginForm.username,
      //       "password": this.loginForm.password
      //     }, res => {
      //       console.log(data)
      //       const data = res.data;
      //       if (data === 'usernameOrPasswordError') {
      //         this.$message.error('用户名或密码错误');
      //       } else {
      //         this.$message.success('登录成功');
      //         this.$api.removeToken();
      //         if (this.loginForm.remember) {
      //           localStorage.setItem('token', data);
      //         } else {
      //           sessionStorage.setItem('token', data);
      //         }
      //         this.$api.setToken(data);
      //         const redirect = this.$route.query.redirect;
      //         if (redirect !== undefined) {
      //           this.$router.push(redirect);
      //         } else {
      //           this.$router.push('content');
      //         }
      //       }
      //     });
      //   } else {
      //     return false;
      //   }
      // });
    }
  }
};
</script>
