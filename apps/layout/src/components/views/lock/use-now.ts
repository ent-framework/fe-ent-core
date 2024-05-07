import { reactive, toRefs } from 'vue';
import { format } from 'date-fns';
import { tryOnMounted, tryOnUnmounted } from '@vueuse/core';
import type { IntervalHandle } from 'fe-ent-core/es/types';

export function useNow(immediate = true) {
  let timer: IntervalHandle;

  const state = reactive({
    year: 0,
    month: 0,
    week: '',
    day: 0,
    hour: '',
    minute: '',
    second: '',
    meridiem: ''
  });

  const update = () => {
    const now = new Date();

    const d = format(now, 'dd');
    const h = format(now, 'HH');
    const m = format(now, 'mm');
    const s = format(now, 'ss');

    state.year = now.getFullYear();
    state.month = now.getMonth() + 1;
    state.week = '';
    state.day = Number.parseInt(d);
    state.hour = h;
    state.minute = m;
    state.second = s;

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
    stop
  };
}
