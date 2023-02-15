<script setup></script>

<template>
  <section class="all">
    <div class="title">
      <font-awesome-icon icon="fa-solid fa-cookie-bite" />
      <h2><slot name="default"></slot></h2>
      <font-awesome-icon icon="fa-solid fa-cookie-bite" />
    </div>
    <slot name="main"></slot>
  </section>
</template>

<style lang="less" scoped>
.all {
  display: flex;
  flex-direction: column;
  margin-bottom: 0.4rem;
  align-items: center;
  color: #8e3122;
  font-size: 0.35rem;
  .title {
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: center;
    margin: 0.35rem 0;
    text-align: center;
    h2 {
      margin: 0 0.35rem;
    }
  }
}
</style>
