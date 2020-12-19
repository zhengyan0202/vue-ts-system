<template>
  <div class="table-container">
    <div class="top-container">
      <el-input class="search-input" v-model="searchContent" placeholder="请输入关键字搜索" size="small"></el-input>
      <el-button class="search-btn" type="primary" icon="el-icon-search" size="small">搜索</el-button>
    </div>
    <el-table
      :data="tableData"
      size="small"
      height="440"
      v-loadmore="getTableData"
      style="width: 100%">
      <el-table-column prop="name" label="姓名" width="180"></el-table-column>
      <el-table-column prop="date" label="日期" width="180" sortable></el-table-column>
      <el-table-column prop="address" label="地址"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="dialogVisible = true" type="text" size="small">查看</el-button>
          <el-button type="text" size="small">编辑</el-button>
        </template>
      </el-table-column>
      <div slot="append" class="bottom-tip">
        <i class="el-icon-loading"></i>
        <span>数据加载中。。。</span>
      </div>
    </el-table>

    <el-dialog
      v-dialogDrag
      title="提示"
      :visible.sync="dialogVisible"
      width="30%">
      <span>这个弹窗可以移动</span>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import axios from '@/utils/request';

@Component({
  components: {
  },
})
export default class BaseTable extends Vue {
  searchContent = "";
  tableData = [];
  dialogVisible = false;

  mounted() {
    this.getTableData();
  }
  getTableData() {
    axios.get('/table/index').then((res: any) => {
      console.log(res)
      let resData = res.data.tableData;
      this.tableData = this.tableData.concat(resData);
    })
  }
}
</script>

<style lang="scss" scoped>
.table-container {
  background-color: #fff;
  padding: 10px 20px;
  .top-container {
    height: 40px;
    margin: 5px 0;
    .search-input {
      width: 200px;
    }
    .search-btn {
      margin-left: 5px;
    }
  }

  .bottom-tip {
    text-align:center;
    color: #999;
    height: 32px;
    line-height: 32px;
    span {
      margin-left: 5px;
    }
  }
}
</style>
