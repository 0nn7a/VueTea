<script setup>
const router = useRouter();
const route = useRoute();
const data = reactive({
  routerList: [
    {
      title: '首頁',
      path: '/home',
      active: 'fa-regular fa-heart',
      selected: 'fa-solid fa-heart',
    },
    {
      title: '分類',
      path: '/list',
      active: 'fa-regular fa-square-minus',
      selected: 'fa-solid fa-square-minus',
    },
    {
      title: '購物車',
      path: '/cart',
      active: 'fa-regular fa-credit-card',
      selected: 'fa-solid fa-credit-card',
    },
    {
      title: '個人',
      path: '/mine',
      active: 'fa-regular fa-user',
      selected: 'fa-solid fa-user',
    },
  ],
});
const switchTab = path => {
  if (route.path === path) return;
  router.replace({ path });
};
</script>

<template>
  <section class="tabbar">
    <ul>
      <li
        :class="route.path.includes(item.path) ? 'actived' : ''"
        v-for="(item, index) in data.routerList"
        @click="switchTab(item.path)"
      >
        <font-awesome-icon
          :icon="route.path.includes(item.path) ? item.selected : item.active"
        ></font-awesome-icon>
        <span>{{ item.title }}</span>
      </li>
    </ul>
  </section>
</template>

<style lang="less" scoped>
.tabbar {
  background-color: #c9bc99;
  color: #958264;
  font-weight: 700;
  position: fixed;
  left: 0;
  bottom: 0;
  width: 100%;
  height: 1.7rem;
  z-index: 999;
  ul {
    display: flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    height: 100%;
    li {
      display: flex;
      flex-direction: column;
      text-align: center;
      font-size: 0.4rem;
    }
  }
}
.actived {
  color: #8e3122;
}
</style>
