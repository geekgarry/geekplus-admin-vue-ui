<template>
  <div class="drawer-container">
    <div>
      <h3 class="drawer-title">{{ $t("settings.title") }}</h3>

      <div class="drawer-item">
        <span>{{ $t("settings.theme") }}</span>
        <theme-picker style="float: right;height: 26px;margin: -3px 8px 0 0;" @change="themeChange" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.tagsView") }}</span>
        <el-switch active-value="1" inactive-value="0" v-model="tagsView" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.fixedHeader") }}</span>
        <el-switch active-value="1" inactive-value="0" v-model="fixedHeader" class="drawer-switch" />
      </div>

      <div class="drawer-item">
        <span>{{ $t("settings.sidebarLogo") }}</span>
        <el-switch active-value="1" inactive-value="0" v-model="sidebarLogo" class="drawer-switch" />
      </div>

      <!--增加切换按钮-->
      <div class="drawer-item hidden-sm-and-down">
        <span>{{ $t("settings.leftMenuBar") }}</span>
        <el-switch active-value="1" inactive-value="0" v-model="leftMenuBar" class="drawer-switch" />
      </div>
    </div>
  </div>
</template>

<script>
import ThemePicker from '@/components/ThemePicker'

export default {
  components: { ThemePicker },
  data() {
    return {
      settings: {
        title: '系统布局配置',
        theme: '主题颜色',
        tagsView: '开启 Tags-View',
        fixedHeader: '固定 Header',
        sidebarLogo: '侧边栏 Logo'
      }
    }
  },
  computed: {
    fixedHeader: {
      get() {
        return this.$store.state.settings.fixedHeader
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'fixedHeader',
          value: val
        })
      }
    },
    tagsView: {
      get() {
        return this.$store.state.settings.tagsView
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'tagsView',
          value: val
        })
      }
    },
    sidebarLogo: {
      get() {
        return this.$store.state.settings.sidebarLogo
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'sidebarLogo',
          value: val
        })
      }
    },
    // 增加绑定的leftMenuBar值
    leftMenuBar: {
      get() {
        return this.$store.state.settings.leftMenuBar
      },
      set(val) {
        this.$store.dispatch('settings/changeSetting', {
          key: 'leftMenuBar',
          value: val
        })
      }
    },
  },
  methods: {
    themeChange(val) {
      this.$store.dispatch('settings/changeSetting', {
        key: 'themeColor',
        value: val
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.drawer-container {
  padding: 24px;
  font-size: 14px;
  line-height: 1.5;
  word-wrap: break-word;

  .drawer-title {
    margin-bottom: 12px;
    color: rgba(0, 0, 0, .85);
    font-size: 14px;
    line-height: 22px;
  }

  .drawer-item {
    color: rgba(0, 0, 0, .65);
    font-size: 14px;
    padding: 12px 0;
  }

  .drawer-switch {
    float: right
  }
}
</style>
