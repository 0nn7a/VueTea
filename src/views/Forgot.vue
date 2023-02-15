<script setup>
import axios from 'axios';
import { useMessage } from 'naive-ui';
const message = useMessage();
const spinShow = ref(false);

const router = useRouter();

const passwordShow = ref('password');
const eyeShow = ref('fa-solid fa-eye-slash');

const alertText = ref(false);
const alertMeg = ref('');

const forgotForm = ref(null);
const submitInput = ref(false);
const submitBtn = ref('下一步');

const togglePw = () => {
  if (eyeShow.value === 'fa-solid fa-eye') {
    eyeShow.value = 'fa-solid fa-eye-slash';
    passwordShow.value = 'password';
  } else {
    eyeShow.value = 'fa-solid fa-eye';
    passwordShow.value = 'text';
  }
};

const forgot = reactive({
  email: '',
  password: '',
});

const submitForgot = async () => {
  let valid = true;
  let allOutline = Array.from(
    forgotForm.value.getElementsByClassName('outline')
  );
  let input = Array.from(allOutline[0].getElementsByTagName('input'))[0];

  if (!submitInput.value) {
    if (!forgot.email) {
      allOutline[0].classList.add('error');
      valid = false;
      alertMeg.value = '*尚有必填項目為空';
    } else {
      allOutline[0].classList.remove('error');
    }
  } else {
    if (!forgot.password) {
      allOutline[1].classList.add('error');
      valid = false;
      alertMeg.value = '*尚有必填項目為空';
    } else {
      allOutline[1].classList.remove('error');
    }
  }

  if (!valid) {
    alertText.value = true;
  } else {
    alertText.value = false;
    alertMeg.value = '';

    const res = await apiForgot();
    if (res.code === 200) {
      if (!submitInput.value) {
        submitInput.value = true;
        submitBtn.value = '重設密碼';
        allOutline[0].classList.add('dis');
        input.disabled = true;
      } else {
        message.success(res.meg);
        spinShow.value = true;
        setTimeout(() => {
          router.push({ name: 'Login' });
          spinShow.value = false;
        }, 1500);
      }
    } else {
      message.error(res.meg);
    }
  }
};

const apiForgot = async () => {
  return await axios.post('/api/forgot', { data: { forgot } }).then(
    res => {
      return res.data;
    },
    err => {
      return Promise.reject(err);
    }
  );
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
</script>

<template>
  <NavReturn :navShow="true" :background="true" title="忘記密碼"></NavReturn>
  <main>
    <n-spin :show="spinShow">
      <section>
        <p v-if="alertText" class="alert-text">{{ alertMeg }}</p>
        <form @submit.prevent ref="forgotForm">
          <div class="outline">
            <input
              type="email"
              placeholder="請輸入使用者信箱"
              v-model="forgot.email"
              @input="inputRegEmail"
            />
          </div>
          <div v-if="submitInput" class="outline">
            <span><font-awesome-icon :icon="eyeShow" @click="togglePw" /></span>
            <input
              :type="passwordShow"
              placeholder="請輸入新密碼"
              v-model="forgot.password"
              @input="inputRegPwd"
            />
          </div>

          <button class="redBtn" type="submit" @click="submitForgot">
            {{ submitBtn }}
          </button>
        </form>
      </section>
    </n-spin>
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
    form {
      width: 100%;
      margin-top: 0.3rem;
      display: flex;
      flex-direction: column;
      align-items: center;
      .outline {
        display: flex;
        align-items: center;
        position: relative;
        width: 100%;
        background-color: #b7a68b;
        border: 0.03rem solid #7a5e49;
        margin-top: 0.3rem;
        border-radius: 0.1rem;
        transition: all 0.3s ease-in;
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
      .dis {
        border: none;
        background-color: transparent;
        color: #b7a68b;
      }

      .redBtn {
        font-weight: 600;
        background-color: #8e3122;
        color: #c9bc99;
        border: none;
        border-radius: 0.1rem;
        width: calc(100vw * 0.7 - 1rem);
        padding: 0.2rem;
        margin-top: 0.5rem;
        font-size: 0.4rem;
        &:hover,
        &:active {
          background-color: #672116;
        }
      }
    }
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
