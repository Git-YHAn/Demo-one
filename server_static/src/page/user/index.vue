<template>
  <el-container>
    <el-header>
      <el-form :inline="true" onsubmit="return false;">
        <el-form-item>
          <el-input v-model="keyWords" clearable placeholder="用户名、真实姓名" @keyup.enter.native="queryUserInfo" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="queryUserInfo">查询</el-button>
          <el-button type="primary" @click="add">新增</el-button>
        </el-form-item>
      </el-form>
    </el-header>
    <el-main>
      <template>
         <el-table :data="tableData" style="width: 100%" border highlight-current-row>
           <el-table-column type="index" label="序号" width="60px" align="center"></el-table-column>
           <el-table-column prop="userId" label="用户ID" width="80px" align="center"></el-table-column>
           <el-table-column prop="username" label="用户名" min-width="100px"></el-table-column>
           <el-table-column prop="realname" label="用户姓名" min-width="100px"></el-table-column>
           <el-table-column prop="phoneNum" label="电话号码" min-width="100px"></el-table-column>
           <el-table-column prop="email" label="邮箱" min-width="100px"></el-table-column>
           <el-table-column prop="isActive" label="是否启用" width="100px" align="center" >
             <template slot-scope="scope">
              <span style="color: green" v-if="scope.row.isActive === 1">是</span>
              <span v-else style="color: red" >否</span>
            </template>
           </el-table-column>
           <el-table-column label="操作" min-width="180px">
             <template slot-scope="scope">
              <el-button type="text"  @click="select(scope.row)" size="small">修改</el-button>
              <el-button type="text"  @click="select(scope.row)" style="color: red" size="small">删除</el-button>
              <el-button type="text"  @click="select(scope.row)" style="color: blue" size="small">禁用</el-button>
            </template>
           </el-table-column>
         </el-table>
       </template>
    </el-main>
    <el-footer align="center">
      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="currentPage3" :page-size="100" layout="prev, pager, next, jumper" :total="1000">
      </el-pagination>
    </el-footer>
    <add-form :handler="handler" @save="reloadPage" @reset="resetHandler"></add-form>
  </el-container>
</template>

<script>
import addForm from './add.vue'
export default {
  components: {addForm},
  data() {
    return {
      handler: '',
      keyWords: '',
      currentPage3: 5,
      tableData: [],
      page: {
        pageNum: 1,
        pageSize: 30
      }
    }
  },
  computed: {},
  methods: {
    reloadPage() {
      this.page.pageNum = 1
      this.resetHandler()
      this.queryUserInfo()
    },
    resetHandler() {
      this.handler = ''
    },
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
    },
    add() {
      this.handler = 'ADD'
    },
    queryUserInfo() {
      this.$axios.get("/user/search", this.keyWords, res => {
        let response = res.data
        if (~~response.code === 1) {
          this.tableData = response.data
        }
      })
    }
  },
  created() {
    this.queryUserInfo()
  }
}
</script>
