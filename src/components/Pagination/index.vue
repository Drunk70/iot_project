<template>
  <div>
    <el-pagination
      :current-page="currentPage"
      :page-sizes="[5, 7, 50, 200]"
      :page-size="5"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalNum"
      background
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script>

export default {
  props: {
    totalNum: {
      type: Number,
      required: true
    }

  },
  data() {
    return {
      currentPage: 1
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(val, '每页多少');
      this.$emit('currentPage', val)
    },
    handleCurrentChange(val) {
      this.$emit('CurrentChange', val)
    }
  }
}
</script>

<style>

</style>
