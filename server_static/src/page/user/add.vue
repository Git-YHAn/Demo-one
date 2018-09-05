<template>
  <el-dialog title="新增用户" :visible.sync="visible" @close="reset">
    <el-form :model="form" ref='form' label-width="80px" :rules='rule'>
      <el-form-item label="用户名" prop='username'>
        <el-input v-model="form.username" :autofocus='true' placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop='password'>
        <el-input  v-model="form.password" placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item label="用户姓名" prop='realname'>
        <el-input  autosize v-model="form.realname" placeholder="请输入用户姓名"></el-input>
      </el-form-item>
      <el-form-item label="电话号码" prop='phoneNum'>
        <el-input  autosize v-model="form.phoneNum" placeholder="请输入电话号码"></el-input>
      </el-form-item>
      <el-form-item label="邮箱" prop='email'>
        <el-input  autosize v-model="form.email" placeholder="请输入邮箱"></el-input>
      </el-form-item>
      <el-form-item label="是否启用">
        <el-switch v-model="delivery"></el-switch>
      </el-form-item>
    </el-form>
    <div slot="footer">
      <el-button type="primary" @click="verify(form)">保存</el-button>
      <el-button @click="reset">取消</el-button>
    </div>
  </el-dialog>
</template>
<script>
export default {
  props: {
    handler: String
  },
  data() {
    return {
      visible: false,
      delivery: true,
      form: {},
      rule: {
        username: [{ max: 10, message: '最大长度50个字符' }],
        password: [{ max: 50, message: '最大长度50个字符' }],
        realname: [{ max: 50, message: '最大长度50个字符' }],
        phoneNum: [{ max: 50, message: '最大长度50个字符' }],
        email: [{ max: 50, message: '最大长度50个字符' }],
      }
    }
  },
  watch: {
    handler: async function (val) {
      this.visible = val === 'ADD'
    }
  },
  methods: {
    verify(form) {
      this.$refs.form.validate((valid) => {
        if (valid) {
          if (this.delivery) {
            form.isActive = 1
          }
          this.save(form)
        } else {
          return false
        }
      })
    },
    async save(form) {
      this.$axios.post("/user/add", form, res => {
        let response =  res.data
        console.log(response)
        if(~~response.code === 1) {
          this.$message.success('添加成功');
        } else {
          this.$message.error(response.msg)
        }
        this.$emit('save', response.code)
        this.form = {}
      })
    },
    reset() {
      this.$emit('reset')
    }
  }
}
</script>
