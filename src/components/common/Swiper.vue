<script setup>
const props = defineProps({
  imgData: Object,
});
const arrowShow = computed({
  get() {
    return props.imgData.length === 2 ? true : false;
  },
});
</script>

<template>
  <n-carousel
    autoplay
    dot-type="line"
    :show-dots="!arrowShow"
    :show-arrow="arrowShow"
  >
    <img
      v-for="img in props.imgData"
      class="carousel-img"
      :src="img.url"
      :key="img.id"
    />
  </n-carousel>
</template>

<style lang="less" scoped>
.n-carousel {
  width: 100vw;
  max-height: 100vw;
  .carousel-img {
    width: 100%;
  }
}
</style>
