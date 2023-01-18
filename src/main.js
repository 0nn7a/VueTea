import { createApp } from 'vue';
import '@/assets/css/style.css';
import '@/assets/css/common.css';

//不知道是什麼東西的淘寶無限適配文件
import '@/assets/js/flexible.js';

//FontAwesome
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import {
  faHeart as fasHeart,
  faUser as fasUser,
  faSquareMinus as fasSquareMinus,
  faCreditCard as fasCreditCard,
  faMagnifyingGlass,
  faHeadphonesSimple,
  faCookieBite,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as farHeart,
  faUser as farUser,
  faSquareMinus as farSquareMinus,
  faCreditCard as farCreditCard,
} from '@fortawesome/free-regular-svg-icons';
library.add(
  fasHeart,
  farHeart,
  fasUser,
  farUser,
  fasSquareMinus,
  farSquareMinus,
  fasCreditCard,
  farCreditCard,
  faMagnifyingGlass,
  faHeadphonesSimple,
  faCookieBite
);

import App from '@/App.vue';
import router from '@/router/index.js';

const app = createApp(App);
app.use(router);
app.component('font-awesome-icon', FontAwesomeIcon);
app.mount('#app');
