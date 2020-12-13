<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="8">
        <el-card shadow="hover" class="user-section mgb20">
          <div class="user-info">
            <img src="@/assets/images/user-head.png" class="user-avator" alt />
            <div class="user-info-cont">
                <div class="user-info-name">{{name}}</div>
                <div>{{role}}</div>
            </div>
          </div>
          <div class="user-info-list">
              上次登录时间：
              <span>2020-12-13</span>
          </div>
          <div class="user-info-list">
              上次登录地点：
              <span>西安</span>
          </div>
        </el-card>
        <el-card shadow="hover" class="language-section">
          <div slot="header">
            <span>语言详情</span>
          </div>
          <span>Vue</span><el-progress :percentage="71.3" color="#42b983"></el-progress>
          <span>TypeScript</span><el-progress :percentage="24.1" color="#f1e05a"></el-progress>
          <span>CSS</span><el-progress :percentage="13.7"></el-progress>
          <span>HTML</span><el-progress :percentage="5.9" color="#f56c6c"></el-progress>
        </el-card>
      </el-col>
      <el-col :span="16">
        <el-row :gutter="20" class="mgb20">
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-1">
                <i class="el-icon-s-custom grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">666</div>
                  <div>用户访问量</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-2">
                <i class="el-icon-chat-dot-round grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">58</div>
                  <div>系统消息</div>
                </div>
              </div>
            </el-card>
          </el-col>
          <el-col :span="8">
            <el-card shadow="hover" :body-style="{padding: '0px'}">
              <div class="grid-content grid-con-3">
                <i class="el-icon-coin grid-con-icon"></i>
                <div class="grid-cont-right">
                  <div class="grid-num">2700</div>
                  <div>数量</div>
                </div>
              </div>
            </el-card>
          </el-col>
        </el-row>
        <el-card shadow="hover" class="todo-list-section" style="height:403px;">
            <div slot="header">
              <span>待办事项</span>
              <el-button style="float: right; padding: 3px 0" type="text">添加</el-button>
            </div>
            <el-table :show-header="false" :data="todoList" style="width:100%;">
              <el-table-column width="40">
                <template slot-scope="scope">
                  <el-checkbox v-model="scope.row.status"></el-checkbox>
                </template>
              </el-table-column>
              <el-table-column>
                <template slot-scope="scope">
                  <div class="todo-item" :class="{'todo-item-del': scope.row.status}">{{scope.row.title}}</div>
                </template>
              </el-table-column>
              <el-table-column width="70">
                <template>
                  <div class="handle-btn">
                    <i class="el-icon-edit"></i>
                    <i class="el-icon-delete"></i>
                  </div>
                </template>
              </el-table-column>
            </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col></el-col>
      <el-col></el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component({
  components: {
  },
})
export default class Index extends Vue {
  name: string = "zy";
  role: string = "管理员";
  todoList = [
      {
          title: '首页开发',
          status: true
      },
      {
          title: 'table开发',
          status: false
      },
      {
          title: '地图页面开发',
          status: false
      },
      {
          title: '图表页面开发',
          status: false
      },
      {
          title: '富文本编辑器',
          status: false
      },
      {
          title: '拖拽',
          status: false
      }
  ];

  open() {
    (this as any).$message('这是一条消息提示');
  }
}
</script>

<style lang="scss">
.user-section {
  height: 252px;
  .user-info {
    display: flex;
    align-items: center;
    padding-bottom: 20px;
    border-bottom: 2px solid #ccc;
    margin-bottom: 20px;
  }
  .user-avator {
    width: 120px;
    height: 120px;
    border-radius: 50%;
  }
  .user-info-cont {
    padding-left: 50px;
    flex: 1;
    font-size: 14px;
    color: #999;
  }
  .user-info-cont div:first-child {
    font-size: 30px;
    color: #222;
  }
  .user-info-list {
    font-size: 14px;
    color: #999;
    line-height: 25px;
    span {
      margin-left: 70px;
    }
  }
}
.language-section {
  height:252px;
}

.grid-content {
  display: flex;
  align-items: center;
  height: 100px;
  .grid-cont-right {
    flex: 1;
    text-align: center;
    font-size: 14px;
    color: #999;
    .grid-num {
      font-size: 30px;
      font-weight: bold;
    }
  }
}
.grid-con-icon {
    font-size: 50px;
    width: 100px;
    height: 100px;
    text-align: center;
    line-height: 100px;
    color: #fff;
}
.grid-con-1 {
  .grid-con-icon,.grid-num {
    color: rgb(45, 140, 240);
  }
}
.grid-con-2 {
  .grid-con-icon {
    background: rgb(100, 213, 114);
  }
  .grid-num {
    color: rgb(100, 213, 114);
  }
}
.grid-con-3 {
  .grid-con-icon {
    background: rgb(242, 94, 67);
  }
  .grid-num {
    color: rgb(242, 94, 67);
  }
}
.todo-list-section {
  .handle-btn {
    i {
      margin: 0 5px;
      &:hover {
        color: #409eff;
        cursor: pointer;
      }
    }
  }
}

.mgb20 {
  margin-bottom: 20px;
}
</style>
