<template>
  <div>
    <el-row>
      <span class="title">角色列表</span>
    </el-row>
    <!-- 上方按钮部分 -->
    <el-row type="flex" justify="end">
      <el-col :span="4" class="spanDis">
        <el-button type="primary" icon="el-icon-plus" @click="dialogVisible=true">新增角色</el-button>
      </el-col>
    </el-row>
    <!-- table部分 -->
    <el-table
      :data="tableData"
      border
      style="width: 100%"
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
        align="center"
        label="操作"
      >
        <template slot-scope="{ row }">
          <el-button
            type="text"
            size="small"
            @click="openDialog({ title: '查看角色', data: row, flag: 'Check' })"
          >查看</el-button>
          <el-button
            type="text"
            size="small"
            @click="openDialog({ title: '编辑角色', data: row, flag: 'Edit' })"
          >编辑</el-button>
          <el-button
            type="text"
            size="small"
            @click="deleteRules(row.roleId)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- table部分 -->
    <div class="tep">
      <pagination
        :total-num="totalNum"
        @currentPage="currentPage"
        @CurrentChange="CurrentChange"
      />
    </div>
    <!-- 弹框 -->
    <el-dialog
      :title="dialog.title"
      :visible.sync="dialogVisible"
      modal-append-to-body="false"
      width="530px"
      :before-close="handleClose"
      @close="initForm"
    >
      <add
        :ref="dialog.flag"
        :visible.sync="dialogVisible"
        :menu-list="menuList"
        :data="dialog.data"
        :flag="dialog.flag"
      />

      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>

  </div>
</template>

<script>
import add from './components/add.vue'
import { systemRoleListInfoGet, systemRoleDelete, systemRoleMenuListGet } from '@/api/system'
export default {
  components: {
    add
  },
  data() {
    return {
      dialog: {
        title: '新增用户',
        flag: 'Add',
        data: {}
      },
      menuList: [],
      dialogVisible: false,
      // 表单数据
      tableData: [],
      // 总数据条数
      totalNum: Number,
      // 载荷
      params: {
        pageMaxNum: Number,
        currentPage: Number
      },
      // 表头
      tableTitle: [
        {
          label: '角色编码',
          prop: 'roleCode'
        },
        {
          label: '角色名称',
          prop: 'roleName'
        },
        {
          label: '备注',
          prop: 'memo'
        },
        {
          label: '创建时间',
          prop: 'createTime'
        }

      ]
    }
  },
  created() {
    this.systemRoleInfoGet()
    this.MenuListGet()
  },
  methods: {
    async sysDel(roleId) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        systemRoleDelete()
      })
        .then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      console.log(roleId);
    },
    openDialog(obj) {
      this.dialog = Object.assign({}, this.dialog, obj);
      this.dialogVisible = true;
    },
    // 表格数据接口
    async systemRoleInfoGet() {
      const res = await systemRoleListInfoGet(this.params)
      this.tableData = res.dataList
      this.totalNum = res.totalNum
      console.log(res, '看看接口');
    },
    // 传递当前页重新获取列表
    currentPage(val) {
      this.params.pageMaxNum = val
      this.systemRoleInfoGet()
    },
    // 传递每页显示数量获取列表
    CurrentChange(val) {
      this.params.currentPage = val
      this.systemRoleInfoGet()
    },
    async  MenuListGet() {
      const res = await systemRoleMenuListGet()
      this.menuList = res.menuList
      console.log(this.menuList, '看看菜单')
    },
    initForm() {
      this.dialogVisible = false;
      this.$refs[this.dialog.flag].resetFields();
    }
  }
}
</script>

<style scoped>
.title{
  font-size: 24px;
  font-weight: bolder;
}
.spanDis,.tep{
  display: flex;
  justify-content:flex-end
}
</style>
