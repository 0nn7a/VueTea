<script setup>
import { NConfigProvider } from 'naive-ui';
/**
 * @type import('naive-ui').GlobalThemeOverrides
 */
const themeOverrides = {
  common: {
    primaryColor: '#8e3122',
  },
  Tabs: {
    tabBorderColor: 'transparent',
    tabTextColorLine: '#958264',
    tabFontWeight: '700',
    tabFontWeightActive: '700',
    colorSegment: '#958264',
    tabColorSegment: '#8e3122',
    tabTextColorSegment: '#c9bc99',
    tabTextColorHoverSegment: '#c9bc99',
    tabTextColorActiveSegment: '#c9bc99',
  },
  Divider: {
    color: 'rgba(149,130,100,0.5)',
  },
  Tooltip: {
    color: '#8e3122',
    textColor: '#c9bc99',
  },
  Dialog: {
    iconColorError: '#8e3122',
    iconSize: '0.6rem',
  },
  Message: {
    margin: '0 0 2rem 0',
    colorSuccess: '#7a5e49',
    colorError: '#8e3122',
    textColorSuccess: '#c9bc99',
    textColorError: '#c9bc99',
    iconColorSuccess: '#c9bc99',
    iconColorError: '#c9bc99',
  },
};

const route = useRoute();
import { useCommonStore } from '@/stores/commonStore';
const store = useCommonStore();

const tabbarShow = ['Detail', 'Cart'];

onMounted(() => {
  store.initUser();
});
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <n-message-provider placement="bottom">
      <n-dialog-provider>
        <router-view></router-view>
        <Tabbar v-if="!tabbarShow.includes(route.name)"></Tabbar>
      </n-dialog-provider>
    </n-message-provider>
  </n-config-provider>
</template>

<style>
body {
  background-color: #c9bc99;
  font-family: 'Rubik', 'Noto Sans TC', sans-serif;
}
input:-webkit-autofill,
input:-webkit-autofill:hover,
input:-webkit-autofill:focus,
input:-webkit-autofill:active {
  -webkit-text-fill-color: #7a5e49;
  -webkit-box-shadow: 0 0 0 1000px rgba(255, 255, 255, 0) inset;
  transition: background-color 5000s ease-in-out 0s;
}
</style>
