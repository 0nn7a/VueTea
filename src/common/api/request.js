// 暫時棄用封裝 因為直接用更快

import axios from 'axios';
export default {
  commonOptions: {
    method: 'get',
    data: {},
    params: {},
  },
  $axios(options = this.commonOptions) {
    this.commonOptions.method = options.method || this.commonOptions.method;
    this.commonOptions.data = options.data || this.commonOptions.data;
    this.commonOptions.params = options.params || this.commonOptions.params;
    console.log(this.commonOptions);
  },
};
