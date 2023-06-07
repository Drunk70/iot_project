<template>
  <div>
    <el-form
      ref="form"
      :model="form"
      :rules="rules"
      label-width="80px"
    >
      <el-form-item
        prop="roleCode"
        label="角色编码"
      >
        <el-input
          v-model="form.roleCode"
          placeholder="请输入角色编码"
          maxlength="200"
          :disabled="flag !== 'Add'"
        />
      </el-form-item>
      <el-form-item label="角色名称" prop="roleName">
        <el-input
          v-model="form.roleName"
          placeholder="请输入角色名称"
          :disabled="flag === 'Check'"
        />
      </el-form-item>
      <el-form-item label="备注信息">
        <el-input
          v-model="form.memo"
          placeholder="请输入备注信息"
          :disabled="flag === 'Check'"
        />
      </el-form-item>
      <el-form-item label="菜单权限配置" prop="menuIds">
        <el-tree
          style="margin-top: 10px"
          :data="menuList"
          :default-checked-keys="form.menuIds"
          :disabled="flag==='check'"
          show-checkbox
          node-key="id"
          :props="defaultProps"
          @check="currentChecked"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  props: {
    menuList: {
      type: Array,
      default: () => []
    },
    data: {
      type: Object,
      required: true
    },
    flag: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      form: {
        roleCode: '',
        roleName: '',
        memo: '',
        menuIds: []
      },
      rules: {
        roleCode: [{ required: true, message: '请输入角色编码', trigger: 'blur' }],
        roleName: [{ required: true, message: '请输入角色名称', trigger: 'blur' }]
      },
      defaultProps: {
        children: 'lowMenuList',
        label: 'menuName'
      }
    };
  },
  watch: {
    '$props.flag': {
      handler(newVal, oldVal) {
        if (newVal === oldVal) {
          return;
        }
        this.initData();
      },
      immediate: true,
      deep: true
    }
  },
  methods: {
    currentChecked(nodeObj, SelectedObj) {
      this.$set(this.form, 'menuIds', SelectedObj.checkedKeys); // 这是选中的节点的key数组
    },
    initData() {
      // 根据data填充表单以及转换菜单权限配置
      const {
        roleId = '',
        roleCode = '',
        roleName = '',
        memo = '',
        menuIds = []
      } = this.$props.data;
      // 获取总览的id以默认选中
      const defaultIds = this.menuList.filter((item) => item.disabled)[0]['id'];
      menuIds.length <= 0 && menuIds.push(defaultIds);
      this.form = Object.assign({}, this.form, {
        roleCode,
        roleName,
        memo,
        menuIds,
        roleId
      });
    }
  }
};
</script>

<style>

</style>
