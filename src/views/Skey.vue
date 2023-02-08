<script setup>
import { useDialog } from 'naive-ui';
import { useCommonStore } from '@/stores/commonStore';
const store = useCommonStore();
const dialog = useDialog();

const router = useRouter();
const record = reactive({
  history: [],
  hot: [
    '巴斯克',
    '蛋糕',
    '法芙娜可可',
    '茶',
    '布列塔尼酥餅',
    '糖霜餅',
    '布丁',
    '蘭姆葡萄',
    '奶油',
    '夾心餅',
    '抹茶',
  ],
});
const getRecord = () => {
  if (!localStorage.getItem('searchRecord')) {
    localStorage.setItem('searchRecord', JSON.stringify([]));
  }

  record.history = JSON.parse(localStorage.getItem('searchRecord'));
};
const addRecord = h => {
  // 原本想到的去重複方式
  // record.history = record.history.filter(val => val !== h);
  record.history.unshift(h);

  // 老師教到的透過 set 與 array 來回轉換的去重複方式
  let changeSet = new Set(record.history);
  record.history = [...changeSet];

  localStorage.setItem('searchRecord', JSON.stringify(record.history));

  store.keyword = h;
  store.getProductData();

  router.push({ name: 'Slist', params: { product: h } });
};

const clearRecord = () => {
  dialog.error({
    title: '清除',
    content: '是否清除歷史搜索紀錄？',
    positiveText: '是',
    negativeText: '否',
    onPositiveClick: () => {
      record.history = [];
      localStorage.removeItem('searchRecord');
    },
  });
};
onMounted(() => {
  getRecord();
  store.getProductData();
});
</script>

<template>
  <main>
    <n-card
      :bordered="false"
      content-style="width: 100vw; padding-bottom: 0;"
      style="margin-bottom: 16px; background-color: transparent"
    >
      <div v-if="record.history.length > 0" class="record">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h3>
            <font-awesome-icon icon="fa-solid fa-clock-rotate-left" /> 歷史搜索
          </h3>
          <p @click="clearRecord">
            <font-awesome-icon icon="fa-regular fa-circle-xmark" />
            清除搜索紀錄
          </p>
        </div>
        <ul>
          <li v-for="h in record.history" :key="h" @click="addRecord(h)">
            {{ h }}
          </li>
        </ul>
      </div>
      <!--    history end    -->

      <div class="record">
        <div
          style="
            display: flex;
            justify-content: space-between;
            align-items: center;
          "
        >
          <h3><font-awesome-icon icon="fa-solid fa-fire" /> 熱門搜索</h3>
        </div>
        <ul>
          <li v-for="h in record.hot" :key="h" @click="addRecord(h)">
            {{ h }}
          </li>
        </ul>
      </div>
      <!--    hot end    -->

      <h3 class="title">
        <font-awesome-icon icon="fa-solid fa-fire" /> 熱銷商品
      </h3>
    </n-card>
  </main>
  <n-card
    :bordered="false"
    content-style="width: 100vw; padding-top:0;"
    style="margin-bottom: 2rem; background-color: transparent"
  >
    <SearchResult></SearchResult>
  </n-card>
</template>

<style lang="less" scoped>
main {
  margin-top: 1.5rem;
  font-size: 0.5rem;
  :deep(.n-card) {
    color: #958264;
    .record {
      margin-bottom: 1rem;
      h3 {
        color: #8e3122;
        font-size: 0.5rem;
      }
      p {
        font-size: 0.3rem;
      }
      ul {
        display: flex;
        flex-wrap: wrap;
        li {
          border: #7a5e49 solid 1px;
          color: #7a5e49;
          padding: 0 0.1rem;
          font-size: 0.35rem;
          margin: 0.2rem 0.35rem 0 0;
          border-radius: 2px;
          &:hover {
            background-color: #7a5e49;
            color: #c9bc99;
          }
        }
      }
    }
  }
}
.title {
  color: #8e3122;
  font-size: 0.5rem;
}
</style>
