// 從pinia引入用來定義store的函式
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      //Search
      keyword: '',
      product: [],

      //login
      loginStatus: false,
      token: null,
      userInfo: {},

      //cart
      cartData: [
        {
          name: '魔呼精選咖啡（十種口味 四種焙度風味）',
          price: 750,
          number: 1,
          url: 'coffeeTitle',
        },
        {
          name: '魔呼禮品提袋 幾何藝術 貓貓款',
          price: 49,
          number: 1,
          url: 'bagTitle',
        },
      ],
    };
  },
  getters: {
    cartNumbers: state => {
      let sum = 0;
      state.cartData.forEach(c => {
        sum = sum + c.number;
      });
      return sum;
    },
    cartDollar: state => {
      let sum = 0;
      state.cartData.forEach(c => {
        sum = sum + c.price * c.number;
      });
      return sum;
    },
  },
  actions: {
    //user
    loginUser(user) {
      this.userInfo = user;
      this.token = user.token;
      this.loginStatus = true;
      localStorage.setItem('setUser', JSON.stringify(user));
    },
    logoutUser() {
      this.userInfo = {};
      this.token = null;
      this.loginStatus = false;
      localStorage.removeItem('setUser');
    },
    initUser() {
      let user = JSON.parse(localStorage.getItem('setUser'));
      if (user) {
        this.userInfo = user;
        this.token = user.token;
        this.loginStatus = true;
      }
    },

    //api
    async getProductData() {
      const res = await axios
        .post('/api/search', { data: { keyword: this.keyword } })
        .then(
          res => {
            return res.data;
          },
          err => {
            return Promise.reject(err);
          }
        );
      this.product = res.resultArr;
    },
  },
});
