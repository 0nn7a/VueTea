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
  rec: [
    { name: 'coffeeTitle', des: '咖啡' },
    { name: 'caseY', des: '包裝盒' },
    { name: 'bagTitle', des: '紙袋' },
    { name: 'cookiesTitle', des: '奶油曲奇' },
    { name: 'basqueTitle', des: '巴斯克' },
  ],
  menu: {
    推薦: [
      { name: 'coffeeTitle', des: '咖啡' },
      { name: 'caseY', des: '包裝盒' },
      { name: 'bagTitle', des: '紙袋' },
      { name: 'cookiesTitle', des: '奶油曲奇' },
      { name: 'basqueTitle', des: '巴斯克' },
    ],
    烤布丁: [
      { name: 'pudding4', des: '四入/盒' },
      { name: 'pudding9', des: '九入/盒' },
    ],
    乳霜蛋糕: [],
    羅馬盾牌: [
      { name: 'romaOriginal', des: '經典' },
      { name: 'romaCocoa', des: '法芙娜可可' },
    ],
    磅蛋糕: [
      { name: 'pancakeApple', des: '蘋果肉桂' },
      { name: 'pancakeBacon', des: '培根芝士' },
      { name: 'pancakeCocoa', des: '可可乳酪' },
      { name: 'pancakeCream', des: '焦糖杏仁' },
      { name: 'pancakeLemon', des: '青檸糖霜' },
      { name: 'pancakeMoca', des: '抹茶酥' },
      { name: 'pancakeTea', des: '茶麻糬' },
    ],
    巴斯克: [
      { name: 'basqueOriginal', des: '經典' },
      { name: 'basqueCocoa', des: '法芙娜可可' },
      { name: 'basqueLame', des: '蘭姆葡萄' },
      { name: 'basqueMoca', des: '小山園抹茶' },
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
  let { product, flavor, detail, para, price } = detailData[pname];
  let random = randomImg(detailData.random);
  res.send({
    code: 200,
    detailData: { product, flavor, detail, random, para, price },
  });
});

// login
const userData = [
  {
    id: 1,
    email: 'admin@mail.com',
    password: '000000',
    name: 'Admin',
    phone: '0900111111',
    address: 'newTaipei',
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
        meg: '驗證成功',
      });
    } else {
      res.send({
        code: 401,
        meg: '驗證失敗 密碼錯誤',
      });
    }
  } else {
    res.send({
      code: 402,
      meg: '使用者不存在',
    });
  }
});

module.exports = router;
