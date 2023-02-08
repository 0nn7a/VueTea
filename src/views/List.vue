<script setup>
import axios from 'axios';
function imgUrl(n) {
  return new URL(`/src/assets/images/${n}.png`, import.meta.url).href;
}
function imgPdUrl(n) {
  return new URL(`/src/assets/images/product/${n}.png`, import.meta.url).href;
}

const listData = reactive({
  cover: 'carousel2',
  rec: [],
  menu: [],
});
const navName = computed({
  get() {
    return Object.keys(listData.menu);
  },
});
const getListData = async () => {
  const res = await axios.get('/api/list').then(
    res => {
      return res.data.listData;
    },
    err => {
      return Promise.reject(err);
    }
  );
  listData.rec = res.rec;
  listData.menu = res.menu;

  nextTick(() => {
    let height = obj.value.firstChild.clientHeight;
    heightArr.all.push(height);
    let items = obj.value.getElementsByClassName('each');
    Array.from(items).forEach(i => {
      height += i.clientHeight;
      heightArr.all.push(height);
    });
    obj.value.onscroll = function (v) {
      scrollValue.value = v.target.scrollTop;
    };
  });
};
const obj = ref(null);
const scrollValue = ref();
const heightArr = reactive({
  all: [],
});
const changeFocus = (val, index) => {
  obj.value.scrollTop = heightArr.all[index];
};

const currentIndex = computed({
  get() {
    return heightArr.all.findIndex((item, index) => {
      if (scrollValue.value < heightArr.all[0]) return '0';
      else {
        return (
          scrollValue.value >= item &&
          scrollValue.value < heightArr.all[index + 1]
        );
      }
    });
  },
  set(val) {
    scrollValue.value = val;
  },
});

onMounted(() => {
  getListData();
  currentIndex.value = '0';
});
</script>

<template>
  <Header></Header>
  <main>
    <nav>
      <ul>
        <li v-for="(n, index) in navName" @click="changeFocus(n, index)">
          <a :class="{ active: index === currentIndex }"> {{ n }}</a>
        </li>
      </ul>
    </nav>
    <section ref="obj">
      <img :src="imgUrl(listData.cover)" />
      <div class="each" v-for="n in navName" :key="n">
        <h3>{{ n }}</h3>
        <div class="outside">
          <n-grid v-if="listData.menu[n].length" cols="3">
            <n-gi v-for="p in listData.menu[n]" :key="p">
              <div class="box">
                <img :src="imgPdUrl(p.name)" />
              </div>
              <p>{{ p.des }}</p>
            </n-gi>
          </n-grid>
          <p v-else>暫無供應</p>
        </div>
      </div>
    </section>
  </main>
</template>

<style lang="less" scoped>
main {
  margin: 1.7rem 0.3rem 1.7rem 0.25rem;
  text-align: center;
  font-size: 0.35rem;
  color: #958264;
  display: flex;
  height: calc(100vh - 3.4rem);
  overflow-y: hidden;
  nav {
    flex: 0 0 2.1rem;
    text-align: start;
    font-size: 0.38rem;
    border-right: 0.03rem solid #958264;
    height: 100%;
    overflow-y: scroll;
    ul {
      li {
        padding: 0 0.1rem 0 0.1rem;
        margin-bottom: 0.4rem;
        transition: all 0.2s ease-in-out;
        a {
          text-decoration: none;
          color: #958264;
        }
        .active {
          color: #8e3122;
          padding-left: 0.1rem;
          font-weight: 700;
          border-left: 0.07rem solid #8e3122;
        }
      }
    }
  }
  section {
    flex: 1 1 auto;
    padding-left: 0.2rem;
    height: 100%;
    overflow-y: scroll;
    img {
      width: 100%;
    }
    .each {
      padding-top: 0.5rem;
      h3 {
        color: #8e3122;
        font-size: 0.45rem;
      }
      .outside {
        padding: 0.35rem;
        .n-grid {
          color: #5e3e1f;
          text-align: center;
          gap: 0.4rem 0.5rem !important;
          .box {
            height: 0;
            padding-bottom: 100%;
            transform: translateY(50%);
            background-color: transparent;
            display: flex;
            align-items: center;
            img {
              width: 100%;
              border-radius: 10px;
            }
          }
          p {
            margin-top: 0.2rem;
            font-size: 0.33rem;
            word-wrap: normal;
            text-align: center;
          }
        }
      }
    }
  }
}
</style>
