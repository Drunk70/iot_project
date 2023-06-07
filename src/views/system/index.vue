<template>
  <div>
    <el-row>
      <span class="title">用户信息</span>
    </el-row>
    <el-row type="flex" justify="space-between">
      <el-col :span="4">
        <el-input
          v-model="params.userAccount"
          placeholder="请输入内容"
          class="input-with-select"
          @input="callAxios"
        >
          <el-button slot="append" icon="el-icon-search" />
        </el-input>
      </el-col>
      <el-col :span="4" class="spanDis">
        <el-button type="primary" icon="el-icon-plus" @click="open">新增用户</el-button>
      </el-col>
    </el-row>
    <el-table
      v-loading="bol"
      element-loading-text="拼命加载中"
      element-loading-spinner="el-icon-loading"
      border :data="dataList" style="width: 100%"
    >
      <el-table-column
        v-for="(item, index) in tableTitle"
        :key="index"
        :prop="item.prop"
        :label="item.label"
        header-align="center"
        align="center"
      />
      <el-table-column
        label="操作"
        align="center"
      >
        <template slot-scope="scope">
          <el-button type="text" size="small" @click="handleClick(scope.row)">冻结</el-button>
          <el-button type="text" size="small">分配角色</el-button>
          <el-button type="text" size="small">编辑</el-button>
          <el-button type="text" size="small">删除</el-button>
        </template>

      </el-table-column>
    </el-table>
    <div class="tep">
      <pagination
        :total-num="totalNum"
        @currentPage="currentPage"
        @CurrentChange="CurrentChange"
      />
    </div>
  </div>
</template>

<script>
import { systemUserListGet } from '@/api/system'
export default {
  data() {
    return {
      bol: false,
      dataList: [],
      params: {
        pageMaxNum: 5,
        currentPage: Number
      },
      totalNum: 1,
      tit: '用户信息',
      tableTitle: [
        {
          label: '用户账号',
          prop: 'userAccout'
        },
        {
          label: '用户名称',
          prop: 'userName'
        },
        {
          label: '手机号',
          prop: 'mobile'
        },
        {
          label: '邮件',
          prop: 'email'
        },
        {
          label: '状态',
          prop: 'status'
        }, {
          label: '角色',
          prop: 'roleName'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        }
      ]
    }
  },
  created() {
    this.callAxios()
  },
  methods: {
    async callAxios() {
      const res = await systemUserListGet(this.params)
      this.totalNum = res.totalNum
      this.dataList = res.dataList
      this.bol = false
    },
    handleClick(row) {
      console.log(row);
    },
    currentPage(val) {
      this.bol = true
      this.params.pageMaxNum = val
      this.callAxios()
    },
    CurrentChange(val) {
      this.bol = true
      this.params.currentPage = val
      this.callAxios()
    },
    open() {

    }
  }
}
</script>

<style scoped>
*{
  margin-top: 15px;
}
.title{
  font-size: 24px;
  font-weight: bolder;
}
.spanDis,.tep{
  display: flex;
  justify-content:flex-end
}

</style>
