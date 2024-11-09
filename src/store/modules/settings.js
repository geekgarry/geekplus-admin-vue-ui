import defaultSettings from '@/settings'
import variables from '@/assets/styles/element-variables.scss'
import sidebarVariables from '@/assets/styles/variables.scss'

const { showSettings, topMenuBar, tagsView, fixedHeader, sidebarLogo } = defaultSettings

const state = {
  themeColor: localStorage.getItem('themeColor') || variables.themeColor,
  showSettings: showSettings,
  topMenuBar: topMenuBar ? '1' : '0',
  tagsView: localStorage.getItem('tagsView') || (tagsView ? '1' : '0'),
  fixedHeader: localStorage.getItem('fixedHeader') || (fixedHeader ? '1' : '0'),
  sidebarLogo: localStorage.getItem('sidebarLogo') || (sidebarLogo ? '1' : '0')
}

const mutations = {
  CHANGE_SETTING: (state, { key, value }) => {
    // eslint-disable-next-line no-prototype-builtins
    if (state.hasOwnProperty(key)) {
      state[key] = value
      localStorage.setItem(key,value)
      //使用浏览器本地存储保存设置，你也可以使用后端redis等缓存保存设置
    }
  },
  SWITCH_MENU_BAR: (state, { key, value }) => {
    if (state.hasOwnProperty(key)){
      state[key] = value
    }
  }
}

const actions = {
  changeSetting({ commit }, data) {
    commit('CHANGE_SETTING', data)
  },
  switchMenuBar({ commit }, data) {
    commit('SWITCH_MENU_BAR', data)
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

