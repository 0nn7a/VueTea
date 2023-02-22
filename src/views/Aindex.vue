<script setup>
import { useCommonStore } from '@/stores/commonStore';
const store = useCommonStore();

const router = useRouter();
</script>

<template>
  <NavReturn :navShow="true" :background="true" title="我的地址"></NavReturn>
  <main>
    <section>
      <ul v-if="store.userInfo.address.length > 0">
        <li
          v-for="(a, index) in store.userInfo.address"
          :key="index"
          @click="router.push({ name: 'Aedit', params: { type: index } })"
        >
          <div class="left">
            <div class="top">
              <h5>{{ a.name }}</h5>
              <p>{{ a.phone }}</p>
            </div>
            <div class="bottom">
              <span v-if="a.isDefault">[默認]</span>
              <p>{{ a.site }}</p>
            </div>
          </div>
          <font-awesome-icon icon="fa-solid fa-chevron-right" />
        </li>
      </ul>
      <div class="notFound" v-else>暫無常用地址，點擊下方按鈕立即添加</div>
      <button
        class="redBtn"
        @click="router.push({ name: 'Aedit', params: { type: 'add' } })"
      >
        添加常用地址
      </button>
    </section>
  </main>
</template>

<style lang="less" scoped>
main {
  height: calc(100vh - 1.5rem - 1.7rem);
  margin-top: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  section {
    display: flex;
    flex-direction: column;
    .notFound {
      margin-top: 4rem;
      align-self: center;
      font-size: 0.38rem;
      color: #958264;
      text-align: center;
    }
    ul {
      li {
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 0.5rem;
        margin-bottom: 0.3rem;

        background-color: #cec5ac;
        font-weight: 600;
        font-size: 0.38rem;
        color: #958264;
        transition: color 0.15s ease-in;
        &:hover {
          cursor: pointer;
          color: #7a5e49;
        }
        .left {
          display: flex;
          flex-direction: column;
          .top,
          .bottom {
            display: flex;
            align-items: center;
            h5 {
              font-size: 0.38rem;
              margin-right: 0.2rem;
            }
            span {
              color: #8e3122;
              margin-right: 0.2rem;
            }
          }
        }
        .fa-chevron-right {
          margin-left: auto;
        }
      }
    }
  }
  .redBtn {
    align-self: center;
    font-weight: 600;
    background-color: #8e3122;
    color: #c9bc99;
    border: none;
    border-radius: 0.1rem;
    padding: 0.2rem 0.5rem;
    margin-top: 0.5rem;
    font-size: 0.4rem;
    &:hover,
    &:active {
      background-color: #672116;
    }
  }
}
</style>
