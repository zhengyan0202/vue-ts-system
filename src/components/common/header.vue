<template>
  <div class="header">
    <div class="collapse-btn" @click="collapseChange">
      <i v-if="!collapse" class="el-icon-s-fold"></i>
      <i v-else class="el-icon-s-unfold"></i>
    </div>
    <div class="logo">技术管理系统</div>
    <div class="header-right">
      <div class="header-user-con">
        <!-- 全屏 -->
        <div class="btn-fullscreen" @click="handleFullScreen">
          <el-tooltip effect="dark" :content="fullscreen?`取消全屏`:`全屏`" placement="bottom">
            <i class="el-icon-rank"></i>
          </el-tooltip>
        </div>
        <!-- 消息中心 -->
        <div class="btn-bell">
          <el-tooltip
            effect="dark"
            :content="message?`有${message}条未读消息`:`消息中心`"
            placement="bottom"
          >
            <router-link to="/tabs">
              <i class="el-icon-bell"></i>
            </router-link>
          </el-tooltip>
          <span class="btn-bell-badge" v-if="message"></span>
        </div>
        <!-- 用户头像 -->
        <div class="user-avator">
          <img src="@/assets/images/user-head.png" alt="">
        </div>
        <!-- 下拉菜单 -->
        <el-dropdown class="user-name" trigger="click" @command="handleCommand">
          <span class="el-dropdown-link">
            {{username}}
            <i class="el-icon-caret-bottom"></i>
          </span>
          <el-dropdown-menu slot="dropdown">
            <el-dropdown-item>个人中心</el-dropdown-item>
            <el-dropdown-item divided command="loginout">退出登录</el-dropdown-item>
          </el-dropdown-menu>
        </el-dropdown>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import bus from '@/components/common/bus';

@Component({
  components: {
  },
})
export default class Header extends Vue {
  collapse = false;
  username = 'zy';
  message = 2;
  fullscreen = false;

  mounted() {
    if (document.body.clientWidth < 1500) {
      this.collapseChange();
    }
  }

  collapseChange() {
    this.collapse = !this.collapse;
    bus.$emit('collapse', this.collapse);
  }

  handleFullScreen() {
    let document:any = window.document;
    let element:any = document.documentElement;
    if (this.fullscreen) {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      } else if (document.webkitCancelFullScreen) {
        document.webkitCancelFullScreen();
      } else if (document.mozCancelFullScreen) {
        document.mozCancelFullScreen();
      } else if (document.msExitFullscreen) {
        document.msExitFullscreen();
      }
    } else {
      if (element.requestFullscreen) {
        element.requestFullscreen();
      } else if (element.webkitRequestFullScreen) {
        element.webkitRequestFullScreen();
      } else if (element.mozRequestFullScreen) {
        element.mozRequestFullScreen();
      } else if (element.msRequestFullscreen) {
        // IE11
        element.msRequestFullscreen();
      }
    }
    this.fullscreen = !this.fullscreen;
}

  handleCommand(command:any) {
    if (command == 'loginout') {
      localStorage.removeItem('ms_username');
      this.$router.push('/login');
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 50px;
  color: #fff;
  font-size: 20px;
  background-color : #242f42;

  .collapse-btn {
    float: left;
    padding: 0 21px;
    cursor: pointer;
    line-height: 50px;
  }
  .logo {
    float: left;
    width: 250px;
    line-height: 50px;
  }
  .header-right {
    float: right;
    padding-right: 30px;

    .header-user-con {
      display: flex;
      height: 50px;
      align-items: center;

      .btn-fullscreen {
        transform: rotate(45deg);
        margin-right: 5px;
        font-size: 22px;
      }
      .btn-bell,.btn-fullscreen {
        position: relative;
        width: 20px;
        height: 20px;
        text-align: center;
        border-radius: 10px;
        cursor: pointer;
      }
      .btn-bell-badge {
        position: absolute;
        right: 0;
        top: -2px;
        width: 8px;
        height: 8px;
        border-radius: 4px;
        background: #f56c6c;
        color: #fff;
      }
      .btn-bell .el-icon-bell {
          color: #fff;
      }
      .user-name {
        margin-left: 10px;
      }
      .user-avator {
        margin-left: 10px;
        img {
          display: block;
          width: 20px;
          height: 20px;
          border-radius: 50%;
        }
      }
    }
  }
}
.el-dropdown-link {
  color: #fff;
  cursor: pointer;
}
.el-dropdown-menu__item {
  text-align: center;
}
</style>
