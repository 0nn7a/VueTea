<script setup>
import { useCommonStore } from '@/stores/commonStore';
const store = useCommonStore();

const sortData = reactive({
  currentIndex: 0,
  type: [
    { name: '預設' },
    { name: '價格', status: 0 },
    { name: '銷量', status: 0 },
  ],
});
const changeTab = index => {
  sortData.currentIndex = index;
  // clear status
  sortData.type.forEach((n, i) => {
    if (i !== index && i !== 0) {
      n.status = 0;
    } else if (i === index && i !== 0) {
      n.status = n.status === 1 ? 2 : 1;
    }
  });
  changeSort();
};

const changeSort = () => {
  if (sortData.currentIndex === 0) {
    store.getProductData();
  } else if (sortData.currentIndex === 1) {
    store.product = store.product.sort((a, b) => {
      return sortData.type[sortData.currentIndex].status === 1
        ? a.price - b.price
        : b.price - a.price;
    });
  }
};
</script>

<template>
  <nav>
    <ul>
      <li
        v-for="(t, index) of sortData.type"
        :key="index"
        @click="changeTab(index)"
      >
        <span :class="sortData.currentIndex === index ? 'active' : ''">{{
          t.name
        }}</span>
        <div v-if="index !== 0">
          <font-awesome-icon
            icon="fa-solid fa-caret-up"
            :class="t.status === 1 ? 'active' : ''"
          />
          <font-awesome-icon
            icon="fa-solid fa-caret-down"
            :class="t.status === 2 ? 'active' : ''"
          />
        </div>
      </li>
    </ul>
  </nav>
  <main>
    <n-card
      :bordered="false"
      content-style="width: 100vw"
      style="margin-bottom: 2rem; background-color: transparent"
    >
      <SearchResult></SearchResult>
    </n-card>
  </main>
</template>

<style lang="less" scoped>
main {
  margin-top: 2.3rem;
  font-size: 0.5rem;
  :deep(.n-card) {
    color: #958264;
  }
}
nav {
  position: fixed;
  z-index: 888;
  top: 1.5rem;
  display: flex;
  width: 100vw;
  justify-content: center;
  background-color: #c9bc99;
  color: #958264;
  ul {
    width: calc(100vw - 1.2rem);
    display: flex;
    justify-content: space-between;
    font-size: 0.4rem;
    font-weight: 600;
    li {
      display: flex;
      align-items: center;
      padding: 0.2rem 0.5rem;
      div {
        margin-left: 0.12rem;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        font-size: 0.2rem;
      }
    }
  }
}
.active {
  color: #8e3122;
}
</style>
