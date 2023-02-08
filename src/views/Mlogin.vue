<script setup>
import axios from 'axios';

const toggleBtn = ref(true);
const passwordShow = ref('password');
const eyeShow = ref('fa-solid fa-eye-slash');

const alertText = ref(false);
const alertMeg = ref('');

const toggleType = boolean => {
  alertText.value = false;
  alertMeg.value = '';
  toggleBtn.value = boolean;
};
const togglePw = () => {
  if (eyeShow.value === 'fa-solid fa-eye') {
    eyeShow.value = 'fa-solid fa-eye-slash';
    passwordShow.value = 'password';
  } else {
    eyeShow.value = 'fa-solid fa-eye';
    passwordShow.value = 'text';
  }
};

const loginForm = ref(null);
const signupForm = ref(null);
const login = reactive({
  email: '',
  password: '',
});
const signup = reactive({
  email: '',
  password: '',
  rePassword: '',
  name: '',
  phone: '',
  address: '',
});

const submitLogin = async () => {
  let valid = true;
  let values = Object.values(login);
  let allOutline = Array.from(
    loginForm.value.getElementsByClassName('outline')
  );
  values.forEach((i, index) => {
    if (!i) {
      allOutline[index].classList.add('error');
      valid = false;
      alertMeg.value = '*尚有必填項目為空';
    } else {
      allOutline[index].classList.remove('error');
    }
  });
  if (valid) {
    alertText.value = false;
    alertMeg.value = '';
    const res = await apiLogin();
    console.log(res);
  } else {
    alertText.value = true;
  }
};
const submitSignup = () => {
  let valid = true;
  let values = Object.values(signup);
  let allOutline = Array.from(
    signupForm.value.getElementsByClassName('outline')
  );
  //確認密碼
  if (
    signup.password !== '' &&
    signup.rePassword !== '' &&
    signup.password !== signup.rePassword
  ) {
    allOutline[1].classList.add('error');
    allOutline[2].classList.add('error');
    valid = false;
    alertMeg.value = '*密碼與確認密碼不同';
  } else {
    allOutline[1].classList.remove('error');
    allOutline[2].classList.remove('error');
  }
  //確認必填
  values.forEach((i, index) => {
    if (!i) {
      allOutline[index].classList.add('error');
      valid = false;
      alertMeg.value = '*尚有必填項目為空';
    } else if (index !== 1 && index !== 2) {
      allOutline[index].classList.remove('error');
    }
  });
  //驗證回饋
  if (valid) {
    alertText.value = false;
    alertMeg.value = '';
    console.log(allOutline);
  } else {
    alertText.value = true;
  }
};

// api
const apiLogin = async () => {
  const res = await axios.post('/api/login', { data: { login } }).then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err);
    }
  );
  return res;
};

// Reg
const limitLentgh = (event, n) => {
  if (event.target.value.length > n) {
    event.target.value = event.target.value.slice(0, n);
  }
};
const inputRegSpace = event => {
  event.target.value = event.target.value.replace(/^\s*|\s*$/g, '');
};
const inputRegEmail = event => {
  inputRegSpace(event);
  event.target.value = event.target.value.replace(/[^A-z0-9_@.,]/g, '');
};
const inputRegPwd = event => {
  inputRegSpace(event);
  event.target.value = event.target.value.replace(/[^A-z0-9_.]/g, '');
  limitLentgh(event, 16);
};
const inputRegPhone = event => {
  inputRegSpace(event);
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  limitLentgh(event, 10);
};

onMounted(() => {});
</script>

<template>
  <NavReturn :navShow="true" :background="true" title="登入"></NavReturn>
  <main>
    <div class="title">
      <button
        class="login"
        :class="toggleBtn ? 'active' : ''"
        @click="toggleType(true)"
      >
        登入
      </button>
      <button
        class="signup"
        :class="toggleBtn ? '' : 'active'"
        @click="toggleType(false)"
      >
        註冊
      </button>
    </div>

    <section v-if="toggleBtn">
      <p v-if="alertText" class="alert-text">{{ alertMeg }}</p>
      <form @submit.prevent ref="loginForm">
        <div class="outline">
          <input
            type="email"
            placeholder="信箱"
            v-model="login.email"
            @input="inputRegEmail"
          />
        </div>
        <div class="outline">
          <span><font-awesome-icon :icon="eyeShow" @click="togglePw" /></span>
          <input
            :type="passwordShow"
            placeholder="密碼"
            v-model="login.password"
            @input="inputRegPwd"
          />
        </div>
        <div class="fft">
          <a href="#">忘記密碼</a>
          <a href="#" @click="toggleBtn = false">加入會員</a>
        </div>
        <button class="redBtn" type="submit" @click="submitLogin">登入</button>
        <n-divider> <p>或</p> </n-divider>
        <button class="blueBtn" type="button" disabled>Facebook 登入</button>
      </form>
    </section>

    <section v-else>
      <p v-if="alertText" class="alert-text">{{ alertMeg }}</p>
      <form @submit.prevent ref="signupForm">
        <div class="outline">
          <input
            type="email"
            placeholder="信箱(ex@mail.com)*"
            v-model="signup.email"
            @input.="inputRegEmail"
          />
        </div>
        <div class="outline">
          <span><font-awesome-icon :icon="eyeShow" @click="togglePw" /></span>
          <input
            :type="passwordShow"
            placeholder="密碼(6-16位英數字下劃線)*"
            v-model="signup.password"
            @input="inputRegPwd"
          />
        </div>
        <div class="outline">
          <span><font-awesome-icon :icon="eyeShow" @click="togglePw" /></span>
          <input
            :type="passwordShow"
            placeholder="確認密碼*"
            v-model="signup.rePassword"
            @input="inputRegPwd"
          />
        </div>
        <br />
        <div class="outline">
          <input
            type="text"
            placeholder="姓名*"
            v-model="signup.name"
            @input="inputRegSpace"
          />
        </div>
        <div class="outline">
          <input
            type="number"
            placeholder="手機(8-10位數字)*"
            v-model.number="signup.phone"
            @input="inputRegPhone"
          />
        </div>
        <div class="outline">
          <input
            type="text"
            placeholder="地址*"
            v-model="signup.address"
            @input="inputRegSpace"
          />
        </div>
        <div class="fft">
          <a href="#">會員條款</a>
          <a href="#" @click="toggleBtn = true">已有帳號？登入</a>
        </div>
        <button class="redBtn" type="submit" @click="submitSignup">註冊</button>
      </form>
    </section>
  </main>
</template>

<style lang="less" scoped>
main {
  height: calc(100vh - 1.5rem - 1.7rem);
  margin: 2.5rem 0.5rem 0 0.5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: start;
  .title {
    .login {
      font-weight: 600;
      font-size: 0.4rem;
      padding: 0.15rem 0.3rem 0.15rem 0.4rem;
      background-color: transparent;
      border: 0.03rem solid #8e3122;
      color: #8e3122;
      border-radius: 0.2rem 0 0 0.2rem;
    }
    .signup {
      font-weight: 600;
      font-size: 0.4rem;
      padding: 0.15rem 0.4rem 0.15rem 0.3rem;
      background-color: transparent;
      border: 0.03rem solid #8e3122;
      color: #8e3122;
      border-radius: 0 0.2rem 0.2rem 0;
    }
    .active {
      background-color: #8e3122;
      color: #c9bc99;
    }
  }

  section {
    margin-top: 0.5rem;
    width: 70%;
    form {
      width: 100%;
      margin-top: 0.3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .alert {
        border: 0.03rem solid #7a5e49;
      }
      .outline {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        background-color: #b7a68b;
        border: 0.03rem solid #7a5e49;
        margin-top: 0.3rem;
        border-radius: 0.1rem;
        input {
          padding: 0.2rem 0.3rem;
          font-size: 0.4rem;
          width: 100%;
          background-color: transparent;
          color: #7a5e49;
          border: none;
          outline: none;
          letter-spacing: 0.05rem;
          &::placeholder {
            color: #7a5e49;
            font-size: 0.3rem;
          }
        }
        span {
          position: absolute;
          display: flex;
          align-items: center;
          justify-content: center;
          top: 0;
          right: 0;
          height: 100%;
          width: 1rem;
          font-size: 0.35rem;
          background-color: #7a5e49;
          color: #c9bc99;
          &:active,
          &:hover {
            background-color: #5e3e1f;
          }
        }
      }

      .fft {
        display: flex;
        justify-content: space-between;
        width: 100%;
        margin: 0.2rem 0 1rem 0;
        a {
          color: #958264;
          text-decoration: none;
          font-size: 0.35rem;
          &:hover,
          &:active {
            color: #7a5e49;
          }
        }
      }
      .redBtn {
        font-weight: 600;
        background-color: #8e3122;
        color: #c9bc99;
        border: none;
        border-radius: 0.1rem;
        width: 100%;
        padding: 0.2rem;
        font-size: 0.4rem;
        &:hover,
        &:active {
          background-color: #672116;
        }
      }
      .blueBtn {
        font-weight: 600;
        background-color: #22548e;
        color: #c2d0d5;
        border: none;
        border-radius: 0.1rem;
        width: 100%;
        padding: 0.2rem;
        font-size: 0.4rem;
        &:hover,
        &:active {
          background-color: #174172;
        }
      }
    }
  }
}

.n-divider {
  margin: 0.2rem;
  p {
    color: rgba(149, 130, 100, 0.5);
    font-size: 0.35rem;
    text-align: center;
  }
}

.error {
  border: 0.04rem solid #8e3122 !important;
  background-color: rgba(142, 49, 34, 0.19) !important;
  box-shadow: 0 0 3px #8e3122;
  transition: all 0.1s;
}
.alert-text {
  color: #8e3122;
  font-size: 0.35rem;
  align-self: start;
}
</style>
