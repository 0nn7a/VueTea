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
        // {
        //   name: '魔呼精選咖啡（十種口味 四種焙度風味）',
        //   price: 750,
        //   number: 1,
        //   url: 'coffeeTitle',
        //   checked: true
        // },
      ],
      selectList: [],
    };
  },
  getters: {
    //cart
    cartTotal: state => {
      let total = {
        num: 0,
        price: 0,
      };
      state.cartData.forEach(c => {
        if (c.checked) {
          total.num += c.number;
          total.price += c.price * c.number;
        }
      });
      return total;
    },
    isCheckAll: state => {
      return state.cartData.length === state.selectList.length;
    },
  },
  actions: {
    //user
    loginUser(res) {
      this.userInfo = res.userData;
      this.token = res.token;
      this.loginStatus = true;
      localStorage.setItem('setUser', JSON.stringify(this.userInfo));
      localStorage.setItem('token', this.token);
    },
    logoutUser() {
      this.userInfo = {};
      this.token = null;
      this.loginStatus = false;
      localStorage.removeItem('setUser');
      localStorage.removeItem('token');
    },
    initUser() {
      let user = JSON.parse(localStorage.getItem('setUser'));
      let token = localStorage.getItem('token');
      if (user) {
        this.userInfo = user;
        this.token = token;
        this.loginStatus = true;
      }
    },

    //cart-add & reduce numbers
    async updateNum(product, act, message, dialog) {
      let p = this.cartData.find(c => c.url === product.url);
      act === 'add' ? p.number++ : p.number <= 0 ? (p.number = 0) : p.number--;
      if (p.number === 0) {
        await this.delItem(message, dialog, product.url);
        return { code: 200, meg: '刪除成功' };
      } else {
        return await axios
          .post(
            '/api/upCart',
            { data: { url: p.url, num: p.number } },
            { headers: { token: this.token } }
          )
          .then(
            res => {
              return res.data;
            },
            err => {
              return Promise.reject(err);
            }
          );
      }
    },

    //cart-check & delete
    checkAll() {
      this.selectList = this.cartData.map(c => {
        c.checked = true;
        return c.url;
      });
    },
    unCheckAll() {
      this.cartData.forEach(c => {
        c.checked = false;
      });
      this.selectList = [];
    },
    checkAllFn() {
      this.isCheckAll ? this.unCheckAll() : this.checkAll();
    },
    checkItem(url, c) {
      c.checked = !c.checked;
      if (this.selectList.indexOf(url) !== -1) {
        this.selectList = this.selectList.filter(s => s !== url);
      } else {
        this.selectList.push(url);
      }
    },
    delItem(message, dialog, url) {
      if (!url && this.selectList.length <= 0) {
        message.error('請至少選擇一樣商品');
        return;
      }
      dialog.error({
        showIcon: false,
        closable: false,
        content: '是否刪除所選商品？',
        positiveText: '是',
        negativeText: '否',
        autoFocus: false,
        onPositiveClick: async () => {
          let arr = [];
          if (url) {
            arr.push(url);
          } else {
            arr = this.selectList;
          }
          await this.delCartItem(arr).then(res => {
            if (res.code === 200) {
              message.success(res.meg);
            } else {
              message.error(res.meg);
            }
          });
          arr = [];
        },
        onNegativeClick: () => {
          if (url) {
            this.cartData.forEach(c => {
              if (c.url === url && c.number === 0) {
                c.number = 1;
                console.log(this.cartData);
              }
            });
          }
        },
      });
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
    async getCartData() {
      const res = await axios
        .post('/api/getCart', {}, { headers: { token: this.token } })
        .then(
          res => {
            res.data.data.forEach(d => {
              d['checked'] = true;
            });
            return res.data;
          },
          err => {
            return Promise.reject(err);
          }
        );
      this.cartData = res.data;
      this.checkAll();
    },
    async delCartItem(url) {
      const res = await axios
        .post(
          '/api/delCart',
          { data: { url } },
          { headers: { token: this.token } }
        )
        .then(
          res => {
            return res.data;
          },
          err => {
            return Promise.reject(err);
          }
        );
      this.cartData = res.data;
      this.checkAll();
      return res;
    },
  },
});
