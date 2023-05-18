import axios from 'axios';
import { message } from 'ant-design-vue';

export default function joinChat() {
  if (!window.user) {
    message.error({ content: '请先登陆' });
    return;
  }
  axios
    .get(`/api/oncall/joinChat?email=${window.user?.email}`)
    .then((res) => {
      if (res.data.status === 'success') {
        const aLink = document.createElement('a');
        aLink.href = ''; // lark link
        aLink.click();
      }
    })
    .catch((err) => {
      console.error(err); // eslint-disable-line
      message.error({ content: '未知错误，请重试！' });
    });
}
