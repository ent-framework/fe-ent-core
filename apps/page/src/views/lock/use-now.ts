import dayjs from 'dayjs';
import weekday from 'dayjs/plugin/weekday';
import { reactive, toRefs } from 'vue';
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';
import { IntervalHandle } from 'fe-ent-core/lib/types';

export function useNow(immediate = true) {
  dayjs.extend(weekday);
  let timer: IntervalHandle;

  const state = reactive({
    year: 0,
    month: 0,
    week: '',
    day: 0,
    hour: '',
    minute: '',
    second: 0,
    meridiem: '',
  });

  const update = () => {
    const now = dayjs();

    const h = now.format('HH');
    const m = now.format('mm');

    state.year = now.year();
    state.month = now.month() + 1;
    state.week = '';
    state.day = now.date();
    state.hour = h;
    state.minute = m;
    state.second = now.second();

    //state.meridiem = localData.meridiem(Number(h), Number(h), true);
  };

  function start() {
    update();
    clearInterval(timer);
    timer = setInterval(() => update(), 1000);
  }

  function stop() {
    clearInterval(timer);
  }

  tryOnMounted(() => {
    immediate && start();
  });

  tryOnUnmounted(() => {
    stop();
  });

  return {
    ...toRefs(state),
    start,
    stop,
  };
}
