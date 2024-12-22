
  import { defineComponent, onMounted, reactive, ref, toRef, toRefs } from 'vue';
  import { NSkeleton } from 'naive-ui';
  import { useTimeoutFn } from '../../../hooks/core/use-timeout';
  import { useIntersectionObserver } from '../../../hooks/event/use-intersection-observer';
  import type { PropType } from 'vue';

  interface State {
    isInit: boolean;
    loading: boolean;
    intersectionObserverInstance: IntersectionObserver | null;
  }

  const props = {
    /**
     * @zh 等待时间，如果指定了时间，不论可见与否，在指定时间之后自动加载
     * @en Waiting time, if the time is specified, whether visible or not, it will be automatically loaded after the specified time
     */
    timeout: { type: Number },
    /**
     * @zh 组件所在的视口，如果组件是在页面容器内滚动，视口就是该容器
     * @en The viewport where the component is located. If the component is scrolling in the page container, the viewport is the container
     */
    viewport: {
      type: (typeof window !== 'undefined' ? window.HTMLElement : Object) as PropType<HTMLElement>,
      default: () => null
    },
    /**
     * @zh 预加载阈值, css 单位
     * @en Preload threshold, css unit
     */
    threshold: { type: String, default: '0px' },
    /**
     * @zh 视口的滚动方向, vertical 代表垂直方向，horizontal 代表水平方向
     * @en The scroll direction of the viewport, vertical represents the vertical direction, horizontal represents the horizontal direction
     */
    direction: {
      type: String,
      default: 'vertical',
      validator: (v) => ['vertical', 'horizontal'].includes(v)
    },
    /**
     * @zh 包裹组件的外层容器的标签名
     * @en The label name of the outer container that wraps the component
     */
    tag: { type: String, default: 'div' },
    maxWaitingTime: { type: Number, default: 80 },
    /**
     * @zh transition 动画 name
     * @en transition name
     */
    transitionName: { type: String, default: 'lazy-container' }
  };

  export default defineComponent({
    name: 'EntLazyContainer',
    components: { NSkeleton },
    inheritAttrs: false,
    props,
    emits: ['init'],
    setup(props, { emit }) {
      const elRef = ref();
      const state = reactive<State>({
        isInit: false,
        loading: false,
        intersectionObserverInstance: null
      });

      onMounted(() => {
        immediateInit();
        initIntersectionObserver();
      });

      // If there is a set delay time, it will be executed immediately
      function immediateInit() {
        const { timeout } = props;
        timeout &&
          useTimeoutFn(() => {
            init();
          }, timeout);
      }

      function init() {
        state.loading = true;

        useTimeoutFn(() => {
          if (state.isInit) return;
          state.isInit = true;
          emit('init');
        }, props.maxWaitingTime || 80);
      }

      function initIntersectionObserver() {
        const { timeout, direction, threshold } = props;
        if (timeout) return;
        // According to the scrolling direction to construct the viewport margin, used to load in advance
        let rootMargin = '0px';
        switch (direction) {
          case 'vertical':
            rootMargin = `${threshold} 0px`;
            break;
          case 'horizontal':
            rootMargin = `0px ${threshold}`;
            break;
        }

        try {
          const { stop, observer } = useIntersectionObserver({
            rootMargin,
            target: toRef(elRef.value, '$el'),
            onIntersect: (entries: any[]) => {
              const isIntersecting = entries[0].isIntersecting || entries[0].intersectionRatio;
              if (isIntersecting) {
                init();
                if (observer) {
                  stop();
                }
              }
            },
            root: toRef(props, 'viewport')
          });
        } catch {
          init();
        }
      }
      return {
        elRef,
        ...toRefs(state)
      };
    }
  });
