<script setup>
function imgUrl(n) {
  return new URL(`/src/assets/images/${n}.png`, import.meta.url).href;
}
</script>

<template>
  <img :src="imgUrl('news')" />
  <section class="normal">
    <br />
    <h3>喵呼～猫を吸うことが楽しめますように</h3>
    <br />
    <p>
      歡迎您來到充滿鬆軟魔力
      <br />
      讓您隨時呼喚的療癒之境
      <br /><br />
      在下將伴您淺嚐這口甘甜
      <br />
      與您共闖復古的美好時光
      <br />
      願吸貓帶來快樂！喵呼～
    </p>
    <br /><br />
    <img :src="imgUrl('logo2')" />
  </section>
</template>

<style lang="less" scoped>
img {
  width: 100vw;
}
.normal {
  text-align: center;
  color: #7a5e49;
  margin-top: 0.36rem;
  padding: 0 0.36rem;
  h3 {
    color: #5e3e1f;
  }
  img {
    width: 5rem;
  }
}
</style>
