<script setup>
const props = defineProps({
  recs: Array,
});
const cardStyle = ref({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '0.15rem 0.35rem',
});
function imgUrl(n) {
  return new URL(`/src/assets/images/product/${n}.png`, import.meta.url).href;
}
</script>

<template>
  <CardSlot>
    <template #default>熱銷推薦</template>

    <template #main>
      <n-card
        v-for="p in props.recs"
        :key="p.id"
        :bordered="false"
        :content-style="cardStyle"
      >
        <div class="noti">
          <span class="badge">{{ p.price }}</span>
          <img :src="imgUrl(p.url)" />
        </div>
        <div class="para">
          <h3>{{ p.name }}</h3>
          <p>{{ p.desc }}</p>
          <span>{{ p.tags }}</span>
        </div>
      </n-card>
    </template>
  </CardSlot>
</template>

<style lang="less" scoped>
.n-card {
  color: #5e3e1f;
  background-color: transparent;
  .noti {
    position: relative;
    .badge {
      position: absolute;
      padding: 0 0.15rem;
      background-color: #8e3122;
      color: #fff;
      min-width: 0.2rem;
      border-radius: 100px;
      left: -0.2rem;
      top: 0.1rem;
      font-size: 0.3rem;
    }
    img {
      width: 2.3rem;
    }
  }
  .para {
    margin-left: 0.35rem;
    width: 50%;
    font-size: 0.35rem;
    span {
      color: #958264;
      font-size: 0.2rem;
    }
  }
}
</style>
