<script setup>
function imgUrl(n) {
  return new URL(`/src/assets/images/${n}.png`, import.meta.url).href;
}
const imgData = reactive({
  about: [
    { id: 1, url: imgUrl('about1') },
    { id: 2, url: imgUrl('about2') },
  ],
});
</script>

<template>
  <div class="normal">
    <cardSlot>
      <template #default>關於我們</template>
      <template #main>
        <img :src="imgUrl('painting2')" />
        <p>魔呼株式会社品牌介紹 ブランド紹介</p>
        <h2>MOFUMOFU</h2>
        <h4>モフモフ</h4>
        <span>
          ようこそ～喵呼！<br />
          在下是魔呼貓君a.k.a.摸了就魔性呼嚕的貓君是也 ଲ(ⓛ ω ⓛ)ଲ<br />
          歡迎您來到這個充滿鬆軟魔力<br />
          能讓您隨時呼喚療癒之力的神奇之境～
        </span>
        <span>
          在下將完美地引導閣下們<br />
          體驗「魔呼株式会社」帶來的各式美好是也～喵呼！<br />
          無論是充滿幸福蓬鬆的糕餅、隨著喀滋喀滋釋放香氣的曲奇<br />
          還是點滴透露著大人苦澀的咖啡！
        </span>
        <span>
          在下都能以這飽滿的肉球發誓：<br />
          只要您淺嚐一口<br />
          便能彷彿穿越時空般地感受到這復古懷舊的小美好！
        </span>
        <span>
          喵呼～一起與在下享受透過烘焙所燃起的蓬鬆魔力<br />
          幸福地喊出：モフモフ吧ฅ•ω•ฅ
        </span>
        <Swiper :img-data="imgData.about"></Swiper>
        <span>
          魔呼小教室 <br />
          音：モフモフ，唸作MOFUMOFU／魔呼魔呼 <br />
          譯：透過烘焙而使其蓬鬆的糕餅，如同蓬鬆的貓毛一樣<br />
          都能帶給人們至高無上的幸福美好感！<br />
          願吸貓與魔呼能夠讓您快樂。<br />
        </span>
      </template>
    </cardSlot>
  </div>
</template>

<style lang="less" scoped>
.normal {
  text-align: center;
  margin-top: 0.36rem;
  padding: 0 0.36rem;
  p {
    color: #5e3e1f;
    font-size: 0.43rem;
    font-weight: 700;
  }
  h2,
  h4 {
    color: #8e3122;
  }
  h2 {
    font-size: 1.2rem;
    font-weight: 800;
    line-height: 1.2rem;
  }
  h4 {
    font-size: 0.65rem;
    font-weight: 900;
    line-height: 1.2rem;
    margin-bottom: 0.2rem;
  }
  span {
    margin-top: 0.5rem;
    font-size: 0.325rem;
    line-height: 0.6rem;
    color: #7a5e49;
  }
  img {
    width: 6rem;
    margin-bottom: 0.8rem;
  }
}
</style>
