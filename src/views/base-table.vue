<template>
  <div>
    <h1>BaseTable</h1>

    <el-button type="text" @click="dialogVisible = true">点击打开 Dialog</el-button>

    <el-dialog
      v-dialogDrag
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这是一段信息</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class BaseTable extends Vue {
  dialogVisible = false;
  open() {
    (this as any).$message('这是一条消息提示');
  }
}
</script>

<style lang="scss">

</style>
