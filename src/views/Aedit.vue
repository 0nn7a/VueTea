<script setup>
import axios from 'axios';
import { useCommonStore } from '@/stores/commonStore';
const store = useCommonStore();

const route = useRoute();
const router = useRouter();
const type = route.params.type;

import { useMessage } from 'naive-ui';
const message = useMessage();
import { useDialog } from 'naive-ui';
const dialog = useDialog();
const spinShow = ref(false);

const input = reactive({
  data: {
    id: null,
    name: '',
    phone: '',
    site: '',
    isDefault: false,
  },
});
if (type !== 'add') {
  //用複製的 不可直接賦值 會造成共享地址修改到store
  input.data = { ...store.userInfo.address[type] };
}
const test = () => {
  input.data.isDefault = !input.data.isDefault;
};

const form = ref(null);
const alertText = ref(false);
const alertMeg = ref('');
const saveData = async () => {
  let valid = true;
  let values = Object.values(input.data);
  let allOutline = Array.from(form.value.getElementsByClassName('outline'));
  //確認聯絡電話格式
  if (input.data.phone !== '' && input.data.phone.length < 10) {
    allOutline[1].classList.add('error');
    valid = false;
    alertMeg.value = '*聯絡電話格式錯誤';
  } else {
    allOutline[1].classList.remove('error');
  }
  //確認必填
  for (let i = 1; i < values.length; i++) {
    if (values[i] === '') {
      allOutline[i - 1].classList.add('error');
      valid = false;
      alertMeg.value = '*尚有必填項目為空';
    } else if (i !== 2 && i !== 4) {
      allOutline[i - 1].classList.remove('error');
    }
  }
  //驗證回饋
  if (valid) {
    alertText.value = false;
    alertMeg.value = '';
    spinShow.value = true;
    const res = await apiSave();
    setTimeout(() => {
      spinShow.value = false;
      if (res.code !== 200) {
        message.error(res.meg);
      } else {
        message.success(res.meg);
        localStorage.setItem('setUser', JSON.stringify(res.userData));
        store.userInfo = res.userData;
        router.push({ name: 'Aindex' });
      }
    }, 1000);
  } else {
    alertText.value = true;
  }
};
const apiSave = async () => {
  return await axios
    .post(
      '/api/saveSite',
      { data: { newSite: input.data } },
      { headers: { token: store.token } }
    )
    .then(
      res => {
        return res.data;
      },
      err => {
        return Promise.reject(err);
      }
    );
};

// Delete site
const deleteData = async () => {
  dialog.error({
    showIcon: false,
    closable: false,
    content: '是否刪除所選地址？',
    positiveText: '是',
    negativeText: '否',
    autoFocus: false,
    onPositiveClick: async () => {
      spinShow.value = true;
      const res = await apiDel();
      setTimeout(() => {
        spinShow.value = false;
        if (res.code !== 200) {
          message.error(res.meg);
        } else {
          message.success(res.meg);
          localStorage.setItem('setUser', JSON.stringify(res.userData));
          store.userInfo = res.userData;
          router.push({ name: 'Aindex' });
        }
      }, 1000);
    },
  });
};
const apiDel = async () => {
  return await axios
    .post(
      '/api/delSite',
      { data: { id: input.data.id } },
      { headers: { token: store.token } }
    )
    .then(
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
const inputRegPhone = event => {
  inputRegSpace(event);
  event.target.value = event.target.value.replace(/[^0-9]/g, '');
  limitLentgh(event, 10);
};
</script>

<template>
  <NavReturn
    :navShow="true"
    :background="true"
    :title="type === 'add' ? '新增地址' : '編輯地址'"
  ></NavReturn>
  <main>
    <n-spin :show="spinShow">
      <section>
        <form ref="form" @submit.prevent>
          <td>
            <h5>收貨人</h5>
            <input class="outline" type="text" v-model="input.data.name" />
          </td>
          <n-divider />
          <td>
            <h5>聯絡電話</h5>
            <input
              class="outline"
              type="text"
              v-model="input.data.phone"
              @input="inputRegPhone"
            />
          </td>
          <n-divider />
          <td>
            <h5>詳細地址</h5>
            <input class="outline" type="text" v-model="input.data.site" />
          </td>
          <n-divider />
          <td>
            <h5>預設</h5>
            <div class="checkbox-wrapper-2">
              <input
                type="checkbox"
                class="sc-gJwTLC ikxBAC"
                :checked="input.data.isDefault"
                @click="test"
              />
            </div>
          </td>
          <n-divider />
          <p v-if="alertText" class="alert-text">{{ alertMeg }}</p>
          <button
            class="redBtn"
            type="submit"
            @click="saveData"
            @keyup.enter="saveData"
          >
            保存
          </button>
          <button
            v-if="type !== 'add'"
            class="cancelBtn"
            type="button"
            @click="deleteData"
          >
            刪除
          </button>
        </form>
      </section>
    </n-spin>
  </main>
</template>

<style lang="less" scoped>
main {
  height: calc(100vh - 1.5rem - 1.7rem);
  margin-top: 1.4rem;
  display: flex;
  flex-direction: column;
  justify-content: start;
  section {
    display: flex;
    flex-direction: column;
    justify-content: center;
    form {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 0.5rem;
      td {
        width: 100%;
        display: flex;
        align-items: center;
        align-self: start;
        h5 {
          width: 2.3rem;
          font-size: 0.38rem;
          font-weight: 500;
          color: #958264;
        }
        input[type='text'] {
          flex: 1 1 auto;
          font-size: 0.38rem;
          font-weight: 600;
          background-color: transparent;
          border: none;
          border-radius: 0.1rem;
          color: #7a5e49;
          outline: none;
          padding: 0.1rem 0;
        }
      }
      .n-divider {
        margin: 0.3rem 0;
      }
    }
    button {
      align-self: center;
      font-weight: 600;
      border: none;
      border-radius: 0.1rem;
      padding: 0.2rem 2.5rem;
      margin-top: 0.5rem;
      font-size: 0.4rem;
      letter-spacing: 0.1rem;
    }
    .redBtn {
      background-color: #8e3122;
      color: #c9bc99;
      &:hover,
      &:active {
        background-color: #672116;
      }
    }
    .cancelBtn {
      background-color: #7a5e49;
      color: #c9bc99;
      &:hover,
      &:active {
        background-color: #5e3e1f;
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
  text-align: end;
}

//css scan checkbox
.checkbox-wrapper-2 .ikxBAC,
.checkbox-wrapper-2 .ikxBAC::after {
  transition: all 200ms ease-out;
}
.checkbox-wrapper-2 {
  height: 0.7rem;
  display: flex;
  align-items: center;
  &:focus:not(.focus-visible) {
    outline: 0;
  }
  input[type='checkbox'] {
    cursor: default;
  }
  .ikxBAC {
    appearance: none;
    background-color: #b7a68b;
    border-radius: 1.714rem;
    border-style: none;
    flex-shrink: 0;
    height: 0.476rem;
    margin: 0;
    position: relative;
    width: 0.714rem;
    &::after {
      background-color: #cec5ac;
      border-radius: 50%;
      content: '';
      height: 0.333rem;
      left: 0.071rem;
      position: absolute;
      top: 0.071rem;
      width: 0.333rem;
    }
    &::before {
      bottom: -0.143rem;
      content: '';
      left: -0.143rem;
      position: absolute;
      right: -0.143rem;
      top: -0.143rem;
    }
    &:hover {
      background-color: #b7a68b;
      transition-duration: 0s;
    }
    &:checked {
      background-color: #672116;
      &::after {
        background-color: #cec5ac;
        left: 0.31rem;
      }
      &:hover {
        background-color: #8e3122;
      }
    }
  }
}
</style>
