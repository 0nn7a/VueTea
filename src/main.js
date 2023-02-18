import { createApp } from 'vue';
import { createPinia } from 'pinia';
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
  faCircleXmark as fasCircleXmark,
  faMagnifyingGlass,
  faHeadphonesSimple,
  faCookieBite,
  faReply,
  faXmark,
  faClockRotateLeft,
  faFire,
  faCaretUp,
  faCaretDown,
  faHouse,
  faUserGroup,
  faStar,
  faLocationDot,
  faTicketSimple,
  faChevronRight,
  faEnvelopesBulk,
  faFaceSmile,
  faEye,
  faEyeSlash,
  faPenToSquare,
  faTrash,
} from '@fortawesome/free-solid-svg-icons';
import {
  faHeart as farHeart,
  faUser as farUser,
  faSquareMinus as farSquareMinus,
  faCreditCard as farCreditCard,
  faCircleXmark as farCircleXmark,
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
  fasCircleXmark,
  farCircleXmark,
  faMagnifyingGlass,
  faHeadphonesSimple,
  faCookieBite,
  faReply,
  faXmark,
  faClockRotateLeft,
  faFire,
  faCaretUp,
  faCaretDown,
  faHouse,
  faUserGroup,
  faStar,
  faLocationDot,
  faTicketSimple,
  faChevronRight,
  faEnvelopesBulk,
  faFaceSmile,
  faEye,
  faEyeSlash,
  faPenToSquare,
  faTrash
);

import App from '@/App.vue';
import router from '@/router/index.js';

const pinia = createPinia();
const app = createApp(App);
app.component('font-awesome-icon', FontAwesomeIcon);
app.use(router);
app.use(pinia);
router.isReady().then(() => app.mount('#app'));
