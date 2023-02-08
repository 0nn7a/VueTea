<script setup>
import axios from 'axios';
import Footer from '@/components/common/Footer.vue';

const spinShow = ref(false);
const homeData = reactive({
  tabs: [],
  recs: [],
  likes: [],
});
const getData = async () => {
  spinShow.value = true;
  const res = await axios.get('/api/home').then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err);
    }
  );
  homeData.tabs = Object.freeze(res.tabsData);
  homeData.recs = Object.freeze(res.recsData);
  homeData.likes = Object.freeze(res.likesData);
  setTimeout(() => {
    spinShow.value = false;
  }, 350);
};
onMounted(() => {
  getData();
});

function imgUrl(n) {
  return new URL(`/src/assets/images/${n}.png`, import.meta.url).href;
}
const imgData = reactive({
  carousel: [
    { id: 1, url: imgUrl('carousel1') },
    { id: 2, url: imgUrl('carousel2') },
    { id: 3, url: imgUrl('carousel3') },
  ],
});
</script>

<template>
  <Header></Header>
  <main>
    <n-spin v-if="spinShow" size="small">
      <template #description> Loading... </template>
    </n-spin>
    <n-card
      v-else
      :bordered="false"
      content-style="padding: 0; width: 100vw; text-align: start;"
      style="margin-bottom: 16px; background-color: transparent"
    >
      <n-tabs type="line" animated default-value="rec">
        <n-tab-pane
          v-for="e in homeData.tabs"
          :name="e.name"
          :tab="e.title"
          :key="e.name"
        >
          <!--     rec page     -->
          <Swiper v-if="e.name === 'rec'" :img-data="imgData.carousel"></Swiper>
          <div v-if="e.name === 'rec'" class="normal">
            <Recommend :recs="homeData.recs"></Recommend>
            <GuessLike :likes="homeData.likes"></GuessLike>
          </div>
          <!--     news page     -->
          <News v-if="e.name === 'news'"></News>
          <!--     about page     -->
          <About v-if="e.name === 'about'"></About>
          <!--     vip page     -->
          <Vip v-if="e.name === 'vip'"></Vip>
          <!--     ship page     -->
          <Ship v-if="e.name === 'ship'"></Ship>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </main>
  <Footer></Footer>
</template>

<style lang="less" scoped>
main {
  margin-top: 1.8rem;
  text-align: center;
  .n-spin-body {
    margin-top: 1.6rem;
    margin-bottom: 0.6rem;
    :deep(.n-spin-description) {
      color: #8e3122;
      font-size: 0.35rem;
      font-weight: 700;
    }
  }
}
:deep(.n-tabs .n-tabs-nav) {
  padding: 0 0.36rem;
  .n-tabs-tab__label {
    font-size: 0.35rem;
  }
}
:deep(.n-tabs-pane-wrapper .n-tab-pane) {
  padding: 0;
  .normal {
    margin-top: 0.36rem;
    padding: 0 0.36rem;
  }
}
</style>
