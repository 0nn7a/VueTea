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
  },
  Divider: {
    color: 'rgba(149,130,100,0.5)',
  },
};
</script>

<template>
  <n-config-provider :theme-overrides="themeOverrides">
    <router-view></router-view>
    <Tabbar></Tabbar>
  </n-config-provider>
</template>

<style>
body {
  background-color: #c9bc99;
}
</style>
