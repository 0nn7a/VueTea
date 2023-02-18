<script setup>
import { useMessage } from 'naive-ui';
const message = useMessage();
import { useDialog } from 'naive-ui';
const dialog = useDialog();

import { useCommonStore } from '@/stores/commonStore';
const store = useCommonStore();
const router = useRouter();
function imgPdUrl(n) {
  return new URL(`/src/assets/images/product/${n}.png`, import.meta.url).href;
}

const toggleIcon = ref('fa-solid fa-pen-to-square');
const editStatus = ref(true);
const toEdit = () => {
  toggleIcon.value === 'fa-solid fa-pen-to-square'
    ? (toggleIcon.value = 'fa-solid fa-circle-xmark')
    : (toggleIcon.value = 'fa-solid fa-pen-to-square');
  editStatus.value = !editStatus.value;
};

store.getCartData();
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
      <font-awesome-icon :icon="toggleIcon" class="icon" @click="toEdit" />
    </nav>
  </header>
  <main>
    <section
      v-if="store.cartData.length > 0"
      v-for="(c, index) in store.cartData"
      :key="c.url"
    >
      <div class="check">
        <div class="checkbox-wrapper-18">
          <div class="round">
            <input
              type="checkbox"
              :id="index"
              :checked="c.checked"
              @click="store.checkItem(c.url, c)"
            />
            <label :for="index"></label>
          </div>
        </div>
      </div>
      <img :src="imgPdUrl(c.url)" />
      <div class="plus">
        <div class="inner">
          <h3>{{ c.name }}</h3>
          <font-awesome-icon
            icon="fa-solid fa-trash"
            class="trash"
            @click="store.delItem(message, dialog, c.url)"
          />
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
    <div v-else-if="!store.token" class="notFound">
      <p>您尚未登入，點擊跳轉</p>
      <button @click="router.push({ name: 'Login' })">登入</button>
    </div>
    <div v-else class="notFound">
      <p>您的購物車空蕩蕩的</p>
      <p>找不到您想要的商品嗎？</p>
      <p>試試 <button @click="router.push({ name: 'Skey' })">搜尋</button></p>
    </div>
  </main>

  <footer v-if="store.cartData.length > 0">
    <div class="check">
      <div class="checkbox-wrapper-18">
        <div class="round">
          <input
            type="checkbox"
            id="allCheck"
            :checked="store.isCheckAll"
            @click="store.checkAllFn"
          />
          <label for="allCheck"></label>
        </div>
      </div>
    </div>

    <div v-show="editStatus" class="total">
      <p>
        <span>{{ store.cartTotal.num }}</span> 件商品
      </p>
      <p>
        總計：<span>$ {{ store.cartTotal.price }}</span>
      </p>
    </div>

    <button
      v-if="editStatus"
      type="button"
      :class="store.selectList.length <= 0 ? 'dis' : ''"
    >
      去結算
    </button>
    <button
      v-else
      type="button"
      :class="store.selectList.length <= 0 ? 'dis' : ''"
      @click="store.delItem(message, dialog)"
    >
      刪除
    </button>
  </footer>
  <Tabbar v-else></Tabbar>
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
  .dis {
    background-color: #7a5e49;
    color: #c9bc99;
  }
}

.notFound {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 1.3rem);
  p {
    margin-top: 0.25rem;
    font-size: 0.4rem;
    color: #958264;
    letter-spacing: 0.05rem;
  }
  button {
    margin-top: 0.25rem;
    border: none;
    background-color: #8e3122;
    color: #c9bc99;
    font-size: 0.45rem;
    border-radius: 0.05rem;
    padding: 0.2rem 0.5rem;
    letter-spacing: 0.05rem;
    transition: all 0.2s ease-in;
    &:hover,
    &:active {
      background-color: #672116;
      font-size: 0.5rem;
      cursor: pointer;
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
