<script setup>
const tabData = reactive({
  each: [
    { name: 'rec', title: '推薦' },
    { name: 'news', title: '最新公告' },
    { name: 'mofu', title: 'MOFU MOFU' },
    { name: 'vip', title: '會員權益' },
    { name: 'ship', title: '出貨與退換貨' },
    { name: 'rule', title: '條款及政策' },
  ],
});
</script>

<template>
  <Header></Header>
  <main>
    <n-card
      :bordered="false"
      content-style="padding: 0; width: 100vw"
      style="margin-bottom: 16px; background-color: transparent"
    >
      <n-tabs type="line" animated>
        <n-tab-pane
          v-for="item in tabData.each"
          :name="item.name"
          :tab="item.title"
          :key="item.name"
        >
          <Swiper></Swiper>
          <div class="normal">
            <Recommend></Recommend>
            <GuessLike></GuessLike>
          </div>
        </n-tab-pane>
      </n-tabs>
    </n-card>
  </main>
  <footer>
    <n-divider>
      <p>僅供學習，不作商業用途</p>
    </n-divider>
  </footer>
</template>

<style lang="less" scoped>
main {
  margin-top: 1.8rem;
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
footer {
  margin: 1.3rem 0 3rem 0;
  padding: 0 0.36rem;
  p {
    color: rgba(149, 130, 100, 0.5);
    font-size: 0.35rem;
    text-align: center;
  }
}
</style>
