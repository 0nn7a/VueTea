<script setup>
import { useCommonStore } from '@/stores/commonStore';
const store = useCommonStore();

function imgUrl(n) {
  return new URL(`/src/assets/images/product/${n}.png`, import.meta.url).href;
}
</script>

<template>
  <n-grid x-gap="12" y-gap="20" cols="2">
    <n-gi v-for="p in store.product" :key="p.name">
      <div class="box">
        <img :src="imgUrl(p.url)" />
      </div>
      <div class="priceTag">
        <h3>{{ p.name }}</h3>
        <div class="other">
          <p>{{ '$' + p.price }}</p>
          <button type="button">立刻購買</button>
        </div>
      </div>
    </n-gi>
  </n-grid>
  <p v-if="store.product.length === 0" class="no-item">暫無資料...</p>
</template>

<style lang="less" scoped>
.n-grid {
  color: #5e3e1f;
  text-align: start;
  .box {
    height: 0;
    padding-bottom: 100%;
    background-color: rgba(149, 130, 100, 0.5);
    position: relative;
    img {
      width: 70%;
      height: 70%;
      position: absolute;
      top: 15%;
      left: 15%;
    }
  }
  .priceTag {
    display: flex;
    flex-direction: column;
    h3 {
      margin-top: 0.1rem;
      font-size: 0.4rem;
    }
    .other {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: 0.12rem;
      font-size: 0.35rem;
      line-height: 0.35rem;
      p {
        display: inline-block;
        color: #8e3122;
        font-weight: 700;
      }
      button {
        font-weight: 500;
        background-color: #8e3122;
        color: #c9bc99;
        border: none;
        border-radius: 0.05rem;
        padding: 0.05rem 0.15rem;
        &:hover {
          background-color: #672116;
        }
      }
    }
  }
}
.no-item {
  text-align: center;
  margin-top: 30vh;
  font-size: 0.4rem;
}
</style>
