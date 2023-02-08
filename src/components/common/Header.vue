<script setup>
const router = useRouter();
</script>

<template>
  <header>
    <img
      src="@/assets/images/logo.png"
      alt="#"
      @click="router.push({ name: 'Home' })"
    />
    <div class="search" @click="router.push({ name: 'Skey' })">
      <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      <p>搜尋⋯⋯</p>
    </div>
    <div class="kefu">
      <font-awesome-icon icon="fa-solid fa-headphones-simple" />
    </div>
  </header>
</template>

<style lang="less" scoped>
header {
  position: fixed;
  z-index: 999;
  background-color: #c9bc99;
  color: #958264;
  font-size: 0.5rem;
  width: 100vw;
  height: 1.7rem;
  top: 0;
  left: 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  img {
    width: 3rem;
  }
  .search {
    display: flex;
    align-items: center;
    margin-right: 0.357rem;
    padding-left: 0.238rem;
    width: 4.8rem;
    height: 0.8rem;
    background-color: transparent;
    border: 1px solid #958264;
    border-radius: 100px;
    p {
      margin-left: 0.1rem;
      font-size: 0.3rem;
    }
  }
  .kefu {
    margin-right: 0.5rem;
  }
}
</style>
