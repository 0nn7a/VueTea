// 從pinia引入用來定義store的函式
import { defineStore } from 'pinia';
import axios from 'axios';

export const useCommonStore = defineStore('common', {
  state: () => {
    return {
      keyword: '',
      product: [],
    };
  },
  getters: {
    doubleCount: state => state.count * 2,
  },
  actions: {
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
