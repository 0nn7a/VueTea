<script setup>
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
  <n-carousel autoplay dot-type="line">
    <img
      v-for="img in imgData.carousel"
      class="carousel-img"
      :src="img.url"
      :key="img.id"
    />
  </n-carousel>
</template>

<style lang="less" scoped>
.n-carousel {
  width: 100vw;
  .carousel-img {
    width: 100%;
    height: 300px;
    object-fit: cover;
  }
}
</style>
