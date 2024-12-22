
  import { computed, defineComponent, reactive, ref, unref, watch, watchEffect } from 'vue';
  import { EntIcon } from '../../../components/icon';
  import { useTimeoutFn } from '../../../hooks/core/use-timeout';
  import { useEventListener } from '../../../hooks/event/use-event-listener';
  import { getSlot } from '../../../utils/helper/tsx-helper';
  import { useI18n } from '../../../hooks/web/use-i18n';
  import { basicProps } from './props';
  import type { Ref } from 'vue';

  export default defineComponent({
    name: 'EntDragVerify',
    props: basicProps,
    emits: ['success', 'update:value', 'change', 'start', 'move', 'end'],
    setup(props, { emit, slots, expose }) {
      const state = reactive({
        isMoving: false,
        isPassing: false,
        moveDistance: 0,
        toLeft: false,
        startTime: 0,
        endTime: 0
      });
      const { t } = useI18n();
      const wrapElRef = ref<HTMLDivElement | null>(null);
      const barElRef = ref<HTMLDivElement | null>(null);
      const contentElRef = ref<HTMLDivElement | null>(null);
      const actionElRef = ref(null) as Ref<HTMLDivElement | null>;

      useEventListener({
        el: document,
        name: 'mouseup',
        listener: () => {
          if (state.isMoving) {
            resume();
          }
        }
      });

      const getActionStyleRef = computed(() => {
        const { height, actionStyle } = props;
        const h = `${Number.parseInt(height as string)}px`;
        return {
          left: 0,
          width: h,
          height: h,
          ...actionStyle
        };
      });

      const getWrapStyleRef = computed(() => {
        const { height, width, circle, wrapStyle } = props;
        const h = Number.parseInt(height as string);
        const w = `${Number.parseInt(width as string)}px`;
        return {
          width: w,
          height: `${h}px`,
          lineHeight: `${h}px`,
          borderRadius: circle ? `${h / 2}px` : 0,
          ...wrapStyle
        };
      });

      const getBarStyleRef = computed(() => {
        const { height, circle, barStyle } = props;
        const h = Number.parseInt(height as string);
        return {
          height: `${h}px`,
          borderRadius: circle ? `${h / 2}px 0 0 ${h / 2}px` : 0,
          ...barStyle
        };
      });

      const getContentStyleRef = computed(() => {
        const { height, width, contentStyle } = props;
        const h = `${Number.parseInt(height as string)}px`;
        const w = `${Number.parseInt(width as string)}px`;

        return {
          height: h,
          width: w,
          ...contentStyle
        };
      });

      watch(
        () => state.isPassing,
        (isPassing) => {
          if (isPassing) {
            const { startTime, endTime } = state;
            const time = (endTime - startTime) / 1000;
            emit('success', { isPassing, time: time.toFixed(1) });
            emit('update:value', isPassing);
            emit('change', isPassing);
          }
        }
      );

      watchEffect(() => {
        state.isPassing = !!props.value;
      });

      function getEventPageX(e: MouseEvent | TouchEvent) {
        return (e as MouseEvent).pageX || (e as TouchEvent).touches[0].pageX;
      }

      function handleDragStart(e: MouseEvent | TouchEvent) {
        if (state.isPassing) {
          return;
        }
        const actionEl = unref(actionElRef);
        if (!actionEl) return;
        emit('start', e);
        state.moveDistance =
          getEventPageX(e) - Number.parseInt(actionEl.style.left.replace('px', ''), 10);
        state.startTime = Date.now();
        state.isMoving = true;
      }

      function getOffset(el: HTMLDivElement) {
        const actionWidth = Number.parseInt(el.style.width);
        const { width } = props;
        const widthNum = Number.parseInt(width as string);
        const offset = widthNum - actionWidth - 6;
        return { offset, widthNum, actionWidth };
      }

      function handleDragMoving(e: MouseEvent | TouchEvent) {
        const { isMoving, moveDistance } = state;
        if (isMoving) {
          const actionEl = unref(actionElRef);
          const barEl = unref(barElRef);
          if (!actionEl || !barEl) return;
          const { offset, widthNum, actionWidth } = getOffset(actionEl);
          const moveX = getEventPageX(e) - moveDistance;

          emit('move', {
            event: e,
            moveDistance,
            moveX
          });
          if (moveX > 0 && moveX <= offset) {
            actionEl.style.left = `${moveX}px`;
            barEl.style.width = `${moveX + actionWidth / 2}px`;
          } else if (moveX > offset) {
            actionEl.style.left = `${widthNum - actionWidth}px`;
            barEl.style.width = `${widthNum - actionWidth / 2}px`;
            if (!props.isSlot) {
              checkPass();
            }
          }
        }
      }

      function handleDragOver(e: MouseEvent | TouchEvent) {
        const { isMoving, isPassing, moveDistance } = state;
        if (isMoving && !isPassing) {
          emit('end', e);
          const actionEl = unref(actionElRef);
          const barEl = unref(barElRef);
          if (!actionEl || !barEl) return;
          const moveX = getEventPageX(e) - moveDistance;
          const { offset, widthNum, actionWidth } = getOffset(actionEl);
          if (moveX < offset) {
            if (!props.isSlot) {
              resume();
            } else {
              setTimeout(() => {
                if (!props.value) {
                  resume();
                } else {
                  const contentEl = unref(contentElRef);
                  if (contentEl) {
                    contentEl.style.width = `${Number.parseInt(barEl.style.width)}px`;
                  }
                }
              }, 0);
            }
          } else {
            actionEl.style.left = `${widthNum - actionWidth}px`;
            barEl.style.width = `${widthNum - actionWidth / 2}px`;
            checkPass();
          }
          state.isMoving = false;
        }
      }

      function checkPass() {
        if (props.isSlot) {
          resume();
          return;
        }
        state.endTime = Date.now();
        state.isPassing = true;
        state.isMoving = false;
      }

      function resume() {
        state.isMoving = false;
        state.isPassing = false;
        state.moveDistance = 0;
        state.toLeft = false;
        state.startTime = 0;
        state.endTime = 0;
        const actionEl = unref(actionElRef);
        const barEl = unref(barElRef);
        const contentEl = unref(contentElRef);
        if (!actionEl || !barEl || !contentEl) return;
        state.toLeft = true;
        useTimeoutFn(() => {
          state.toLeft = false;
          actionEl.style.left = '0';
          barEl.style.width = '0';
          //  The time is consistent with the animation time
        }, 300);
        contentEl.style.width = unref(getContentStyleRef).width;
      }

      expose({
        resume
      });

      return () => {
        const renderBar = () => {
          const cls = [`darg-verify-bar`];
          if (state.toLeft) {
            cls.push('to-left');
          }
          return <div class={cls} ref={barElRef} style={unref(getBarStyleRef)} />;
        };

        const renderContent = () => {
          const cls = [`darg-verify-content`];
          const { isPassing } = state;
          const { text, successText } = props;

          isPassing && cls.push('success');

          return (
            <div class={cls} ref={contentElRef} style={unref(getContentStyleRef)}>
              {getSlot(slots, 'text', isPassing) ||
                (isPassing
                  ? successText || t('component.verify.successText')
                  : text || t('component.verify.dragText'))}
            </div>
          );
        };

        const renderAction = () => {
          const cls = [`darg-verify-action`];
          const { toLeft, isPassing } = state;
          if (toLeft) {
            cls.push('to-left');
          }
          return (
            <div
              class={cls}
              onMousedown={handleDragStart}
              onTouchstart={handleDragStart}
              style={unref(getActionStyleRef)}
              ref={actionElRef}
            >
              {getSlot(slots, 'actionIcon', isPassing) ||
                (isPassing ? (
                  <EntIcon icon="ant-design:check-outlined" class={`darg-verify-action__icon`} />
                ) : (
                  <EntIcon
                    icon="ant-design:double-right-outlined"
                    class={`darg-verify-action__icon`}
                  />
                ))}
            </div>
          );
        };

        return (
          <div
            class="darg-verify"
            ref={wrapElRef}
            style={unref(getWrapStyleRef)}
            onMousemove={handleDragMoving}
            onTouchmove={handleDragMoving}
            onMouseleave={handleDragOver}
            onMouseup={handleDragOver}
            onTouchend={handleDragOver}
          >
            {renderBar()}
            {renderContent()}
            {renderAction()}
          </div>
        );
      };
    }
  });
