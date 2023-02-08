<script setup>
import axios from 'axios';
const router = useRouter();
const route = useRoute();
const { pname } = route.query;

const queryDetail = async () => {
  let res = await axios.post('/api/detail', null, { params: { pname } }).then(
    res => {
      return res.data.detailData;
    },
    err => {
      return Promise.reject(err);
    }
  );
  imgData.product = res.product;
  imgData.flavor = res.flavor || [];
  imgData.detail = res.detail;
  imgData.random = imgUrl(res.random);
  imgData.para = res.para;
  imgData.price = res.price;
  imgData.product.forEach(item => {
    item.url = imgPdUrl(item.url);
  });
  imgData.detail.forEach(item => {
    item.url = imgPdUrl(item.url);
  });
};
function imgPdUrl(n) {
  return new URL(`/src/assets/images/product/${n}.png`, import.meta.url).href;
}
function imgUrl(n) {
  return new URL(`/src/assets/images/${n}.png`, import.meta.url).href;
}

const imgData = reactive({
  product: [],
  flavor: [],
  detail: [],
  random: '',
  para: '',
  price: '',
});

// nav
const scrollBox = ref(null);
const navShow = ref(true);
const styleOpt = reactive({
  ease: {},
});

onMounted(() => {
  queryDetail();
  scrollBox.value.onscroll = function (v) {
    let opacity = v.target.scrollTop / 450;
    opacity = opacity > 1 ? 1 : opacity;
    styleOpt.ease = { opacity: opacity };
    if (v.target.scrollTop >= 150) {
      navShow.value = false;
    } else {
      navShow.value = true;
    }
  };
});
</script>

<template>
  <NavReturn
    :styleOpt="styleOpt"
    :navShow="navShow"
    :background="false"
  ></NavReturn>
  <main ref="scrollBox">
    <Swiper :img-data="imgData.product"></Swiper>
    <div class="title">
      <h1>
        {{ pname }}
      </h1>
      <p v-for="(p, index) in imgData.para" :key="index">{{ p }}</p>
      <span class="aline"></span>
      <div class="price">
        <span>原價 $ {{ imgData.price + 100 }}</span>
        <h3>$ {{ imgData.price }}</h3>
      </div>
    </div>
    <div v-if="imgData.flavor.length > 0" class="title">
      <p>選項</p>
      <div class="flavor">
        <span v-for="f in imgData.flavor">{{ f }}</span>
      </div>
    </div>
    <div class="title">
      <p>優惠券</p>
      <div class="double">
        <div class="coupon">
          <h5>$ 10</h5>
          <span>滿60 折10元</span>
        </div>
        <div class="coupon">
          <h5>$ 20</h5>
          <span>滿100 折20元</span>
        </div>
      </div>
    </div>
    <article>
      <h4>商品詳情</h4>
      <img v-for="(d, index) in imgData.detail" :src="d.url" :key="index" />
      <img class="endImg" :src="imgData.random" />
    </article>
    <article>
      <h4>商品評價</h4>
    </article>
  </main>

  <footer>
    <button class="cart">加入購物車</button>
    <button class="buy">立即購買</button>
  </footer>
</template>

<style lang="less" scoped>
main {
  height: calc(100vh - 1.3rem);
  overflow-y: scroll;
  .title {
    background-color: #cec5ac;
    display: flex;
    flex-direction: column;
    padding: 0.3rem 0.5rem;
    margin-bottom: 0.3rem;
    color: #958264;
    font-weight: 500;
    h1 {
      font-size: 0.5rem;
      color: #8e3122;
      font-weight: 700;
    }
    p {
      font-size: 0.38rem;
    }
    .aline {
      width: 100%;
      height: 1px;
      border-top: solid #b7a68b 1px;
      margin: 10px 0;
    }
    .flavor {
      margin-top: 0.2rem;
      font-size: 0.38rem;
      display: flex;
      span {
        padding: 0 0.1rem;
        border: 1px solid #958264;
        background-color: #c9bc99;
        margin-right: 0.2rem;
      }
    }
    .price {
      display: flex;
      justify-content: end;
      align-items: baseline;
      h3 {
        color: #8e3122;
        margin-left: 0.3rem;
        font-size: 0.8rem;
        font-weight: 600;
        line-height: 1;
      }
      span {
        font-size: 0.38rem;
        text-decoration: line-through;
      }
    }
    .double {
      width: 100%;
      display: flex;
      margin-top: 0.2rem;
      .coupon {
        position: relative;
        display: flex;
        flex-direction: column;
        padding: 0.2rem 0.5rem;
        margin-right: 0.3rem;
        background-color: #7a5e49;
        &::before {
          content: '';
          position: absolute;
          top: 0.15rem;
          left: -0.1rem;
          height: calc(100% - 0.3rem);
          border-right: 0.2rem dotted #cec5ac;
        }
        &::after {
          content: '';
          position: absolute;
          top: 0.15rem;
          right: -0.1rem;
          height: calc(100% - 0.3rem);
          border-right: 0.2rem dotted #cec5ac;
        }
        h5 {
          font-size: 0.6rem;
          text-align: end;
          color: #c9bc99;
        }
        span {
          color: #c9bc99;
          font-size: 0.25rem;
        }
      }
    }
  }
  article {
    padding: 0.3rem 0.5rem;
    background-color: #cec5ac;
    color: #958264;
    font-weight: 500;
    font-size: 0.38rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    h4 {
      align-self: start;
      padding-left: 0.15rem;
      border-left: 0.1rem solid #8e3122;
      margin-bottom: 0.3rem;
    }
    img {
      width: 100%;
    }
    .endImg {
      width: 60%;
      margin: 1rem 0;
    }
  }
}
footer {
  position: fixed;
  bottom: 0;
  left: 0;
  z-index: 999;
  height: 1.3rem;
  display: flex;
  width: 100vw;
  button {
    width: 50%;
    border: none;
    color: #c9bc99;
    font-size: 0.4rem;
    font-weight: 700;
    letter-spacing: 0.05rem;
    cursor: pointer;
  }
  .cart {
    background-color: #8e3122;
    transition: all 0.1s ease-in;
    &:hover {
      background-color: #672116;
    }
  }
  .buy {
    background-color: #5e3e1f;
    transition: all 0.2s ease-in;
    &:hover {
      background-color: #865937;
    }
  }
}
</style>
