<script setup>
import { useCommonStore } from '@/stores/commonStore';
const store = useCommonStore();

const router = useRouter();
const route = useRoute();

const record = reactive({
  arr: [],
});
const showPopover = ref(false);
const searchValue = () => {
  store.getProductData();
  if (store.keyword) {
    if (!localStorage.getItem('searchRecord')) {
      localStorage.setItem('searchRecord', JSON.stringify([]));
    }
    record.arr = JSON.parse(localStorage.getItem('searchRecord'));
    record.arr = record.arr.filter(val => val !== store.keyword);
    record.arr.unshift(store.keyword);
    localStorage.setItem('searchRecord', JSON.stringify(record.arr));
    router.push({ name: 'Slist', params: { product: store.keyword } });
  } else {
    showPopover.value = true;
    setTimeout(() => {
      showPopover.value = false;
    }, 1500);
  }
};

const goBack = () => {
  store.keyword = '';
  router.back();
};

const cleanWord = () => {
  store.keyword = '';
};

onMounted(() => {
  store.keyword = route.params.product;
});
</script>

<template>
  <header>
    <font-awesome-icon
      icon="fa-solid fa-reply"
      class="iconHover"
      @click="goBack"
    />
    <n-tooltip
      :show="showPopover"
      trigger="manual"
      placement="bottom"
      content-style="font-size: 0.35rem"
    >
      <template #trigger>
        <div class="search">
          <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
          <form @submit.prevent="searchValue">
            <input
              type="search"
              placeholder="搜您喜歡的..."
              v-model.trim="store.keyword"
              @keyup.enter="searchValue"
            />
          </form>
          <font-awesome-icon
            v-if="store.keyword"
            @click="cleanWord"
            @keyup.esc="cleanWord"
            icon="fa-solid fa-xmark"
            style="font-size: 0.35rem"
          />
        </div>
      </template>
      <span class="hint"> 請輸入關鍵字 </span>
    </n-tooltip>
    <button @click="searchValue">搜尋</button>
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
  justify-content: center;
  align-items: center;
  .iconHover:hover,
  .iconHover:focus {
    color: #8e3122;
  }
  button {
    margin-left: 0.1rem;
    font-size: 0.4rem;
    color: #c9bc99;
    border: none;
    border-radius: 100px;
    background-color: #7a5e49;
    padding: 0.14rem 0.3rem;
    transition: all 0.3s ease;
    &:hover {
      background-color: #8e3122;
    }
  }
  .search {
    display: flex;
    align-items: center;
    padding-left: 0.238rem;
    margin: 0 0.35rem 0 0.65rem;
    width: 5.5rem;
    height: 0.8rem;
    background-color: transparent;
    border: 1px solid #958264;
    border-radius: 100px;
    form {
      margin-left: 0.238rem;
      height: 100%;
      width: calc(100% - 1.3rem);
      input {
        background-color: transparent;
        border: none;
        outline: none;
        height: 100%;
        width: 100%;
        color: #958264;
        font-size: 0.4rem;
        &:focus {
          outline: none;
          color: #7a5e49;
        }
        &::placeholder {
          color: #958264;
        }
        &::-webkit-search-cancel-button {
          -webkit-appearance: none;
        }
      }
    }
  }
}
</style>
