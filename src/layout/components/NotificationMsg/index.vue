<template>
  <el-dropdown trigger="click" v-if="checkHasPermi(['system:notice:list'])||checkHasPermi(['system:operLog:list'])||checkHasPermi(['monitor:online:list'])" >
    <!-- class="hidden-xs-only" -->
    <div>
      <el-badge
        :value="100"
        :max="10"
        class="redPoint"
        ref="msgPoint"
        type="danger"
        is-dot
        v-if="systemNotice != undefined || operationLog !=undefined"
      ></el-badge>
      <span class="el-icon-chat-dot-square"></span>
    </div>
    <el-dropdown-menu slot="dropdown">
      <router-link to="/system/noticeManage" v-if="checkHasPermi(['system:notice:list'])">
        <el-dropdown-item @click.native="systemNotice = undefined">
          <el-badge
            :value="100"
            :max="10"
            class="redPoint"
            ref="msgPoint"
            type="danger"
            is-dot
            v-if="systemNotice != undefined"
          ></el-badge>
          系统通知</el-dropdown-item
        >
      </router-link>
      <router-link to="/system/log/operLog" v-if="checkHasPermi(['system:operLog:list'])">
        <el-dropdown-item @click.native="operationLog = undefined">
          <el-badge
            :value="100"
            :max="10"
            class="redPoint"
            ref="msgPoint"
            type="danger"
            is-dot
            v-if="operationLog !=undefined"
          ></el-badge>
          操作日志</el-dropdown-item
        >
      </router-link>
      <router-link to="/monitor/online" v-if="checkHasPermi(['monitor:online:list'])">
        <el-dropdown-item @click.native="checkNotifyMsg">
          <el-badge
            :value="100"
            :max="10"
            class="redPoint"
            ref="msgPoint"
            type="danger"
            is-dot
            v-if="notifyMsg != undefined"
          ></el-badge>
          在线用户</el-dropdown-item
        >
      </router-link>
    </el-dropdown-menu>
  </el-dropdown>
</template>

<script>
//权限检查js方法
import {checkPermi, checkRole} from "@/utils/permission"

export default {
  name: "NotificationMsg",
  props: {
    notifyMsg: { type: Object, default: undefined },
    systemNotice: { type: Object, default: undefined },
    operationLog: { type: Object, default: undefined },
    onlineUser: { type: Object, default: undefined },
  },
  data() {
    return {

    }
  },
  methods:{
    checkNotifyMsg(){
      this.notifyMsg=undefined;
      //console.log(this.notifyMsg)
    },
    checkHasPermi(value){
      return checkPermi(value);
    }
  }
}
</script>

<style lang="scss" scoped>
.redPoint {
  position: absolute;
  margin-top: -7px;
  margin-left: -6px;
}
</style>