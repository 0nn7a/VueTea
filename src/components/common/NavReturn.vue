<script setup>
const router = useRouter();
const props = defineProps(['styleOpt', 'navShow', 'background', 'title']);
const back = () => {
  if (props.title === '編輯地址' || props.title === '新增地址') {
    router.push({ name: 'Aindex' });
  } else if (props.title === '我的地址') {
    router.push({ name: 'Mine' });
  } else {
    router.back();
  }
};
</script>

<template>
  <header>
    <nav v-if="props.navShow" :class="background ? 'nav-return' : ''">
      <font-awesome-icon
        icon="fa-solid fa-reply"
        class="icon"
        @click="back()"
      />
      <p>{{ title }}</p>
      <font-awesome-icon
        icon="fa-solid fa-house"
        class="icon"
        @click="router.push({ name: 'Home' })"
      />
    </nav>
    <div
      v-else-if="!props.navShow"
      class="nav-return"
      :style="props.styleOpt.ease"
    >
      <font-awesome-icon
        icon="fa-solid fa-reply"
        class="icon"
        @click="router.back()"
      />
      <p>商品詳情</p>
      <p>商品評價</p>
      <font-awesome-icon
        icon="fa-solid fa-house"
        class="icon"
        @click="router.push({ name: 'Home' })"
      />
    </div>
  </header>
</template>

<style lang="less" scoped>
header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 888;
  width: 100vw;
  height: 1.5rem;
  background-color: transparent;
  .icon {
    font-size: 0.4rem;
    background-color: #8e3122;
    color: #c9bc99;
    border-radius: 500px;
    margin: 0.3rem;
    padding: 0.2rem;
  }
  p {
    font-size: 0.4rem;
    color: #c9bc99;
    font-weight: 700;
    margin-top: 0.05rem;
  }

  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: transparent;
  }
  .nav-return {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #8e3122;
    .icon {
      background-color: transparent;
    }
  }
}
</style>
