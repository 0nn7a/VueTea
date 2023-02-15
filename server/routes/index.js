let express = require('express');
let router = express.Router();

// Home Data
const tabsData = [
  { name: 'rec', title: '推薦' },
  { name: 'news', title: '最新公告' },
  { name: 'about', title: 'MOFUMOFU' },
  { name: 'vip', title: '會員權益' },
  { name: 'ship', title: '出貨與退換貨' },
];
const recsData = [
  {
    id: 1,
    price: '$ 360',
    name: '日式焦糖烤布丁',
    desc: '大人味的迷人苦甜焦糖香',
    tags: '蛋香十足 口感扎實綿密',
    url: 'pudding4',
  },
  {
    id: 2,
    price: '$ 750',
    name: '小山園抹茶酥頂磅蛋糕',
    desc: '日本丸久小山園抹茶粉',
    tags: '甘苦不澀 抹茶控',
    url: 'pancakeMoca',
  },
  {
    id: 3,
    price: '$ 290',
    name: '法芙娜可可羅馬盾牌',
    desc: '餅內圈為杏仁奶油焦糖',
    tags: '香甜脆口 帶著可可香',
    url: 'romaCocoa',
  },
];
const likesData = [
  {
    id: 1,
    name: '日式焦糖烤布丁',
    price: 360,
    url: 'puddingTitle',
  },
  { id: 2, name: '魔呼禮品提袋', price: 49, url: 'bagTitle' },
  {
    id: 3,
    name: '魔呼精選咖啡',
    price: 750,
    url: 'coffeeTitle',
  },
  { id: 4, name: '巴斯克蛋糕', price: 690, url: 'basqueTitle' },
];

// Search Data
const searchData = [
  { url: 'basqueOriginal', name: '經典焦香巴斯克', price: 690 },
  { url: 'creamHappy', name: '開心果奶油夾心餅', price: 650 },
  { url: 'creamSweetPotato', name: '烤地瓜奶油夾心餅', price: 710 },
  { url: 'pancakeApple', name: '蘋果肉桂奶酥磅蛋糕', price: 700 },
  { url: 'creamBerry', name: '莓果奶油夾心餅', price: 730 },
  { url: 'basqueCocoa', name: '法芙娜可可巴斯克', price: 750 },
  { url: 'basqueMoca', name: '小山園抹茶巴斯克', price: 820 },
  { url: 'pancakeBacon', name: '香蔥培根芝士磅蛋糕', price: 730 },
  { url: 'pancakeCream', name: '焦糖烤杏仁磅蛋糕', price: 690 },
  { url: 'basqueLame', name: '蘭姆葡萄巴斯克', price: 720 },
  { url: 'pancakeCocoa', name: '法芙娜可可乳酪磅蛋糕', price: 750 },
  { url: 'pancakeTea', name: '伯爵茶麻糬磅蛋糕', price: 850 },
  { url: 'creamCocoa', name: '榛果法芙娜可可奶油夾心餅', price: 690 },
  { url: 'creamBake', name: '焙茶奶油夾心餅', price: 680 },
  { url: 'creamBlack', name: '蜂蜜奶油竹炭夾心餅', price: 650 },
  { url: 'pancakeLemon', name: '青檸糖霜磅蛋糕', price: 760 },
  { url: 'pancakeMoca', name: '小山園抹茶酥頂磅蛋糕', price: 820 },
  { url: 'creamLame', name: '蘭姆葡萄奶油夾心餅', price: 690 },
  { url: 'creamSalt', name: '鹽之花焦糖奶油夾心餅', price: 720 },
];

// List Data
const listData = {
  cover: 'carousel2',
  menu: {
    推薦: [
      { name: 'coffeeTitle', des: '咖啡', detail: '魔呼精選咖啡' },
      { name: 'caseY', des: '包裝盒', detail: '魔呼包裝盒' },
      { name: 'bagTitle', des: '提袋', detail: '魔呼禮品提袋' },
      { name: 'cookiesTitle', des: '奶油曲奇' },
      { name: 'basqueTitle', des: '巴斯克', detail: '巴斯克蛋糕' },
    ],
    烤布丁: [
      { name: 'pudding4', des: '四入/盒', detail: '日式焦糖烤布丁' },
      { name: 'pudding9', des: '九入/盒', detail: '日式焦糖烤布丁' },
    ],
    乳霜蛋糕: [],
    羅馬盾牌: [
      { name: 'romaOriginal', des: '經典' },
      { name: 'romaCocoa', des: '法芙娜可可' },
    ],
    磅蛋糕: [
      { name: 'pancakeApple', des: '蘋果肉桂', detail: '彩虹風味磅蛋糕(綜合)' },
      { name: 'pancakeBacon', des: '培根芝士', detail: '彩虹風味磅蛋糕(綜合)' },
      { name: 'pancakeCocoa', des: '可可乳酪', detail: '彩虹風味磅蛋糕(綜合)' },
      { name: 'pancakeCream', des: '焦糖杏仁', detail: '彩虹風味磅蛋糕(綜合)' },
      { name: 'pancakeLemon', des: '青檸糖霜', detail: '彩虹風味磅蛋糕(綜合)' },
      { name: 'pancakeMoca', des: '抹茶酥', detail: '彩虹風味磅蛋糕(綜合)' },
      { name: 'pancakeTea', des: '茶麻糬', detail: '彩虹風味磅蛋糕(綜合)' },
    ],
    巴斯克: [
      { name: 'basqueOriginal', des: '經典', detail: '巴斯克蛋糕' },
      { name: 'basqueCocoa', des: '法芙娜可可', detail: '巴斯克蛋糕' },
      { name: 'basqueLame', des: '蘭姆葡萄', detail: '巴斯克蛋糕' },
      { name: 'basqueMoca', des: '小山園抹茶', detail: '巴斯克蛋糕' },
    ],
    布列塔尼: [],
    夾心餅: [
      { name: 'creamSalt', des: '鹽之花焦糖' },
      { name: 'creamBake', des: '焙茶' },
      { name: 'creamBerry', des: '莓果' },
      { name: 'creamBlack', des: '蜂蜜竹炭' },
      { name: 'creamCocoa', des: '榛果可可' },
      { name: 'creamHappy', des: '開心果' },
      { name: 'creamLame', des: '蘭姆葡萄' },
      { name: 'creamSweetPotato', des: '烤地瓜' },
    ],
  },
};

// Detail Data
const detailData = {
  日式焦糖烤布丁: {
    product: [{ id: 1, url: 'puddingTitle' }],
    detail: [
      { url: 'puddingHover' },
      { url: 'puddingHover2' },
      { url: 'puddingHover3' },
    ],
    para: ['大人味的迷人苦甜焦糖香 蛋香十足 口感扎實綿密'],
    price: 360,
  },
  魔呼禮品提袋: {
    product: [
      { id: 1, url: 'bagTitle' },
      { id: 2, url: 'bagTitle2' },
    ],
    flavor: ['幾何藝術貓貓', "80's City pop"],
    detail: [{ url: 'bagHover' }, { url: 'bagHover2' }],
    para: [
      '幾何藝術 貓貓款：29 x 29 x 12 cm',
      "80's City pop 城市款：32 x 18 x 8 cm",
    ],
    price: 49,
  },
  魔呼精選咖啡: {
    product: [{ id: 1, url: 'coffeeTitle' }],
    detail: [{ url: 'coffeeHover' }, { url: 'coffeeHover2' }],
    para: ['溫度與加水量', '溫度95度 / 水量120~180 ml'],
    price: 750,
  },
  巴斯克蛋糕: {
    product: [
      { id: 1, url: 'basqueTitle' },
      { id: 2, url: 'basqueTitle2' },
      { id: 3, url: 'basqueTitle3' },
      { id: 4, url: 'basqueTitle4' },
      { id: 5, url: 'caseR' },
    ],
    flavor: ['經典焦香', '法芙娜可可', '小山園抹茶', '蘭姆葡萄'],
    detail: [{ url: 'basqueHover' }, { url: 'basqueHover2' }],
    para: [
      '經典不敗超人氣巴斯克 獨家半熟軟芯',
      '焦香頂層是最大特色 外層綿密細緻內芯絲滑濃郁',
    ],
    price: 690,
  },
  魔呼包裝盒: {
    product: [
      { id: 1, url: 'caseB' },
      { id: 2, url: 'caseR' },
      { id: 3, url: 'caseY' },
    ],
    flavor: ['藍色(長)', '紅色(方)', '黃(長)'],
    detail: [{ url: 'caseHover' }, { url: 'caseHover2' }],
    para: ['長形款：15.6 x 8.5 x 6.8 cm', '方形款：19.5 x 17.6 x 7.2 cm'],
    price: 119,
  },
  '彩虹風味磅蛋糕(綜合)': {
    product: [
      { id: 1, url: 'pancakeTitle' },
      { id: 2, url: 'pancakeApple' },
      { id: 3, url: 'pancakeBacon' },
      { id: 4, url: 'pancakeCocoa' },
      { id: 5, url: 'pancakeCream' },
      { id: 6, url: 'pancakeLemon' },
      { id: 7, url: 'pancakeMoca' },
      { id: 8, url: 'pancakeTea' },
      { id: 9, url: 'caseB' },
    ],
    flavor: [
      '蘋果肉桂奶酥',
      '青檸糖霜',
      '小山園抹茶酥頂',
      '法芙娜可可乳酪',
      '焦糖烤杏仁',
      '伯爵茶麻糬',
      '香蔥培根芝士',
    ],
    detail: [
      { url: 'pancakeHover' },
      { url: 'pancakeHover2' },
      { url: 'pancakeHover3' },
      { url: 'pancakeHover4' },
    ],
    para: [
      '經典不敗超人氣巴斯克 獨家半熟軟芯',
      '焦香頂層是最大特色 外層綿密細緻內芯絲滑濃郁',
    ],
    price: 690,
  },
  random: [{ url: 'painting1' }, { url: 'painting2' }, { url: 'painting3' }],
};
function randomImg(obj) {
  let index = Math.floor(Math.random() * obj.length);
  return obj[index].url;
}

// req & res
router.get('/home', function (req, res, next) {
  res.send({
    code: 200,
    tabsData,
    recsData,
    likesData,
  });
});

router.post('/search', function (req, res) {
  let { keyword = '' } = req.body.data;
  let resultArr = searchData.filter(item => {
    return item.name.indexOf(keyword) !== -1;
  });
  res.send({
    code: 200,
    resultArr,
  });
});

router.get('/list', function (req, res) {
  res.send({
    code: 200,
    listData,
  });
});

router.post('/detail', function (req, res) {
  let { pname } = req.query;
  let random = randomImg(detailData.random);
  if (detailData[pname]) {
    let { product, flavor, detail, para, price } = detailData[pname];
    res.send({
      code: 200,
      detailData: { product, flavor, detail, random, para, price },
    });
  } else {
    res.send({
      code: 404,
      meg: '暫無資料...',
    });
  }
});

// User
const userData = [
  {
    id: 0,
    email: 'admin@mail.com',
    password: '000000',
    name: 'Admin',
    phone: '0900111111',
    address: 'newTaipei',
    avatar: 'avatar0',
  },
];

router.post('/login', function (req, res) {
  let { email, password } = req.body.data.login;
  let exist = userData.find(i => {
    return i.email === email;
  });
  if (exist) {
    if (exist.password === password) {
      res.send({
        code: 200,
        meg: '登入成功',
        userData: exist,
      });
    } else {
      res.send({
        code: 401,
        meg: '帳號或密碼錯誤',
      });
    }
  } else {
    res.send({
      code: 402,
      meg: '使用者不存在',
    });
  }
});
router.post('/signup', function (req, res) {
  let { email, password, name, phone, address } = req.body.data.signup;

  let exist = userData.some(i => {
    return i.email === email;
  });
  if (!exist) {
    let index = userData.length;
    userData.push({
      id: index,
      email,
      password,
      name,
      phone,
      address,
      avatar: 'avatar1',
    });
    res.send({
      code: 200,
      meg: '註冊成功，跳轉登入',
    });
  } else {
    res.send({
      code: 402,
      meg: '此郵箱已註冊',
    });
  }
  console.log(userData);
});
router.post('/forgot', function (req, res) {
  let { email, password } = req.body.data.forgot;
  let exist = userData.find(i => {
    return i.email === email;
  });
  if (!password) {
    if (exist) {
      res.send({
        code: 200,
        meg: '已找到使用者，請輸入新密碼',
      });
    } else {
      res.send({
        code: 402,
        meg: '此郵箱未註冊',
      });
    }
  } else {
    exist['password'] = password;
    res.send({
      code: 200,
      meg: '新密碼已重設，跳轉登入',
    });
  }
  console.log(userData);
});

module.exports = router;
