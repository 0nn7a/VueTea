<script setup>
import { useCommonStore } from '@/stores/commonStore';
const store = useCommonStore();
const router = useRouter();
function imgPdUrl(n) {
  return new URL(`/src/assets/images/product/${n}.png`, import.meta.url).href;
}

const cartData = reactive({
  each: [
    {
      name: '魔呼精選咖啡（十種口味 四種焙度風味）',
      price: 750,
      number: 1,
      url: 'coffeeTitle',
    },
  ],
});

//check box
const checkedbox = ref();
const toggle = event => {
  console.log(event.target.checked);
};

//add & reduce num

onMounted(() => {});
</script>

<template>
  <header>
    <nav>
      <font-awesome-icon
        icon="fa-solid fa-reply"
        class="icon"
        @click="router.back()"
      />
      <p>購物車</p>
      <font-awesome-icon icon="fa-solid fa-pen-to-square" class="icon" />
    </nav>
  </header>
  <main>
    <section v-for="(c, index) in store.cartData" :key="c.url">
      <div class="check">
        <div class="checkbox-wrapper-18">
          <div class="round">
            <input type="checkbox" :id="index" />
            <label :for="index"></label>
          </div>
        </div>
      </div>
      <img :src="imgPdUrl(c.url)" />
      <div class="plus">
        <div class="inner">
          <h3>{{ c.name }}</h3>
          <font-awesome-icon icon="fa-solid fa-trash" class="trash" />
        </div>
        <div class="foot">
          <div class="input-number">
            <span
              class="add"
              @click="c.number <= 0 ? (c.number = 0) : c.number--"
              >-</span
            >
            <input
              type="number"
              v-model="c.number"
              @input="c.number = Number(String(c.number).replace(/-/g, ''))"
            />
            <span class="add" @click="c.number++">+</span>
          </div>
          <p>$ {{ c.price }}</p>
        </div>
      </div>
    </section>
  </main>
  <footer>
    <div class="check">
      <div class="checkbox-wrapper-18">
        <div class="round">
          <input
            type="checkbox"
            id="allcheck"
            v-model="checkedbox"
            @click="toggle"
          />
          <label for="allcheck"></label>
        </div>
      </div>
    </div>
    <div class="total">
      <p>
        <span>{{ store.cartNumbers }}</span> 件商品
      </p>
      <p>
        總計：<span>$ {{ store.cartDollar }}</span>
      </p>
    </div>
    <button type="button">去結算</button>
  </footer>
</template>

<style lang="less" scoped>
header {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 888;
  width: 100vw;
  height: 1.5rem;
  background-color: transparent;
  nav {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #8e3122;
    p {
      font-size: 0.4rem;
      color: #c9bc99;
      font-weight: 700;
      margin-top: 0.05rem;
    }
    .icon {
      font-size: 0.4rem;
      background-color: #8e3122;
      color: #c9bc99;
      border-radius: 500px;
      margin: 0.3rem;
      padding: 0.2rem;
    }
  }
}

main {
  height: calc(100vh - 1.5rem - 1.3rem);
  width: 100vw;
  margin: 1.5rem 0 0.38rem 0;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  section {
    margin-top: 0.5rem;
    display: flex;
    width: 100%;
    img {
      width: 2rem;
    }
    .plus {
      display: flex;
      flex: 1 1 auto;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 0.5rem 0 0.3rem;
      .inner {
        display: flex;
        align-items: start;
        justify-content: space-between;
        h3 {
          font-size: 0.4rem;
          font-weight: 500;
          line-height: 1.3;
          color: #7a5e49;
          padding-right: 0.4rem;
        }
        .trash {
          margin-top: 0.08rem;
          font-size: 0.45rem;
          color: #958264;
          transition: all 0.1s ease-in;
          &:hover,
          &:active {
            color: #672116;
            cursor: pointer;
          }
        }
      }
      .foot {
        display: flex;
        justify-content: space-between;
        align-items: start;
        .input-number {
          display: flex;
          height: 0.5rem;
          border: 0.03rem solid #958264;
          width: 1.8rem;
          .add {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 0.5rem;
            height: 0.5rem;
            background-color: #958264;
            color: #c9bc99;
            font-weight: 600;
            font-size: 0.45rem;
            transition: all 0.1s ease-in;
            &:hover,
            &:active {
              background-color: #672116;
              cursor: pointer;
            }
          }
          input {
            top: 0;
            left: 0.5rem;
            width: 0.8rem;
            text-align: center;
            font-weight: 500;
            font-size: 0.35rem;
            background-color: transparent;
            color: #5e3e1f;
            border: none;
            outline: none;
          }
        }
        p {
          font-size: 0.5rem;
          color: #5e3e1f;
        }
      }
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
  background-color: #b7a68b;
  .total {
    display: flex;
    flex-direction: column;
    justify-content: center;
    p {
      font-size: 0.35rem;
      color: #5e3e1f;
      line-height: 1.1;
      span {
        font-size: 0.43rem;
        color: #672116;
        font-weight: 500;
      }
    }
  }
  button {
    width: 30%;
    border: none;
    color: #c9bc99;
    font-size: 0.4rem;
    font-weight: 700;
    letter-spacing: 0.05rem;
    cursor: pointer;
    background-color: #8e3122;
    transition: all 0.1s ease-in;
    margin-left: auto;
    &:hover {
      background-color: #672116;
    }
  }
}

//CSS Scan checkbox
.check {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 0.4rem;
  .checkbox-wrapper-18 .round {
    position: relative;
    label {
      background-color: #c9bc99;
      border: 0.05rem solid #672116;
      border-radius: 50%;
      cursor: pointer;
      height: 0.5rem;
      width: 0.5rem;
      display: block;
      &:after {
        border: 0.08rem solid #c9bc99;
        border-top: none;
        border-right: none;
        position: absolute;
        content: '';
        top: 0.17rem;
        left: 0.14rem;
        width: 0.2rem;
        height: 0.1rem;
        opacity: 0;
        transform: rotate(-45deg);
      }
    }
    input[type='checkbox'] {
      visibility: hidden;
      display: none;
      opacity: 0;
      &:checked + label {
        background-color: #672116;
        border-color: #672116;
        &:after {
          opacity: 1;
        }
      }
    }
  }
}
</style>
