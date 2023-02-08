<script setup>
const router = useRouter();
const content = reactive({
  title: ['個人中心', '優惠福利', '專屬服務'],
  個人中心: [
    { icon: 'fa-solid fa-user-group', name: '我的拼團' },
    { icon: 'fa-solid fa-star', name: '我的收藏' },
    { icon: 'fa-solid fa-location-dot', name: '地址管理' },
  ],
  優惠福利: [{ icon: 'fa-solid fa-ticket-simple', name: '優惠券' }],
  專屬服務: [
    { icon: 'fa-solid fa-headphones-simple', name: '線上客服' },
    { icon: 'fa-solid fa-envelopes-bulk', name: '意見箱' },
    { icon: 'fa-solid fa-face-smile', name: '加入我們' },
  ],
});
</script>

<template>
  <NavReturn :navShow="true" :background="false"></NavReturn>
  <article>
    <h3>モフモフ</h3>
    <h1>MOFUMOFU</h1>
    <button @click="router.push({ name: 'Login' })">登入 / 註冊</button>
  </article>
  <main>
    <section v-for="t in content.title">
      <h5>{{ t }}</h5>
      <n-divider />
      <ul>
        <li v-for="i in content[t]">
          <font-awesome-icon :icon="i.icon" />
          {{ i.name }}<font-awesome-icon icon="fa-solid fa-chevron-right" />
        </li>
      </ul>
    </section>
  </main>
</template>

<style lang="less" scoped>
article {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #8e3122;
  width: 100%;
  height: 6.3rem;
  h3 {
    margin-top: 1rem;
    font-size: 0.4rem;
    color: #c9bc99;
  }
  h1 {
    font-size: 1rem;
    line-height: 1rem;
    color: #c9bc99;
  }
  button {
    margin-top: 0.5rem;
    padding: 0.1rem 0.3rem;
    border: none;
    border-radius: 0.1rem;
    font-size: 0.4rem;
    font-weight: 600;
    background-color: #c9bc99;
    color: #8e3122;
    box-shadow: 0 0 0.5rem #672116;
    &:hover {
      cursor: pointer;
      background-color: #672116;
      color: #c9bc99;
    }
  }
}
main {
  display: flex;
  flex-direction: column;
  section {
    padding: 0.5rem;
    margin-bottom: 0.3rem;
    letter-spacing: 0.05rem;
    background-color: #cec5ac;
    h5 {
      font-size: 0.38rem;
      font-weight: 500;
      color: #958264;
    }
    ul {
      font-size: 0.38rem;
      font-weight: 700;
      color: #7a5e49;
      li {
        display: flex;
        align-items: center;
        justify-content: start;
        padding: 0.2rem 0;
        &:hover {
          cursor: pointer;
          color: #8e3122;
        }
        svg {
          width: 1rem;
        }
        .fa-chevron-right {
          margin-left: auto;
        }
      }
    }
    .n-divider {
      margin: 0.2rem 0;
    }
  }
}
</style>
