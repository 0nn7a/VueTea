<script setup></script>

<template>
  <!-- 用來防止NaiveUI的組件成為根節點而報錯 -->
  <div>
    <n-dialog-provider>
      <SearchBar></SearchBar>
      <router-view></router-view>
    </n-dialog-provider>
  </div>
</template>

<style lang="less" scoped></style>
