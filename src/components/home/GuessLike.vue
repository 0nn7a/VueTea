<script setup>
const router = useRouter();
const props = defineProps({
  likes: Array,
});
function imgUrl(n) {
  return new URL(`/src/assets/images/product/${n}.png`, import.meta.url).href;
}
</script>

<template>
  <CardSlot>
    <template #default>猜你喜歡</template>
    <template #main>
      <n-grid x-gap="12" y-gap="12" :cols="2">
        <n-gi
          v-for="p in props.likes"
          :key="p.id"
          @click="router.push({ name: 'Detail', query: { pname: p.name } })"
        >
          <div class="box">
            <img :src="imgUrl(p.url)" />
          </div>
          <div class="priceTag">
            <div class="left">
              <h3>{{ p.name }}</h3>
              <span>{{ '$ ' + (p.price + 100) }}</span>
            </div>
            <p>{{ '$ ' + p.price }}</p>
          </div>
        </n-gi>
      </n-grid>
    </template>
  </CardSlot>
</template>

<style lang="less" scoped>
.n-grid {
  color: #5e3e1f;
  text-align: start;
  .box {
    height: 0;
    padding-bottom: 100%;
    background-color: #958264;
    position: relative;
    img {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
    }
  }
  .priceTag {
    display: flex;
    align-items: start;
    justify-content: space-between;
    .left {
      display: inline-block;
      h3 {
        margin-top: 0.1rem;
      }
      span {
        font-size: 0.3rem;
        text-decoration: line-through;
        color: #958264;
      }
    }
    p {
      display: inline-block;
      color: #8e3122;
      font-size: 0.55rem;
      font-weight: 600;
    }
  }
}
</style>
