<template>
  <Button class="changelog-box-button" @click="drawerVisible = true">
    {{ t('changelogBox.changelog') }}
  </Button>
  <Drawer
    class="changelog-box"
    :visible="drawerVisible"
    :width="800"
    :closable="false"
    :title="t('changelogBox.changelog')"
    @ok="drawerVisible = false"
    @cancel="drawerVisible = false"
  >
    <div class="changelog-box-filter">
      <div class="changelog-box-filter-title">
        {{ t('changelogBox.filter') }}:
      </div>
      <Row>
        <Col :span="4">
          <Select :model-value="filterType" @change="onFilterChange" style="width: 100px">
            <Option value="version">
              {{ t('changelogBox.version') }}
            </Option>
            <Option value="date">
              {{ t('changelogBox.date') }}
            </Option>
          </Select>
        </Col>
        <Col :span="8">
          <Space v-if="filterType === 'version'" fill>
            <Select v-model:value="start" :options="reverseVersions" style="width: 100px"/>
            {{ t('changelogBox.to') }}
            <Select v-model="end" :options="versions" style="width: 100px"/>
          </Space>
          <RangePicker
            v-else
            :model-value="[start, end]"
            @change="onRangePickerChange"
          />
        </Col>
        <Col :span="12">
          <Select v-model:value="type" mode="multiple" style="width: 100%">
            <Option value="feature" :tag-props="{ color: 'orangered' }">
              {{ t('changelogBox.feature') }}
            </Option>
            <Option value="bugfix" :tag-props="{ color: 'magenta' }">
              {{ t('changelogBox.bugfix') }}
            </Option>
            <Option value="enhancement" :tag-props="{ color: 'green' }">
              {{ t('changelogBox.enhancement') }}
            </Option>
            <Option value="style" :tag-props="{ color: 'purple' }">
              {{ t('changelogBox.style') }}
            </Option>
            <Option value="typescript" :tag-props="{ color: 'arcoblue' }">
              {{ t('changelogBox.typescript') }}
            </Option>
            <Option value="attention" :tag-props="{ color: 'red' }">
              {{ t('changelogBox.attention') }}
            </Option>
          </Select>
        </Col>
      </Row>
    </div>
    <div class="changelog-box-content">
      <Timeline v-if="filterChangelog.length > 0" class="arco-changelog">
        <TimelineItem v-for="item of filterChangelog" :key="item.version">
          <div class="changelog-item">
            <div class="changelog-info">
              <h2 class="changelog-info-version">{{ item.version }}</h2>
              <div class="changelog-info-date">{{ item.date }}</div>
            </div>
            <div class="changelog-content">
              <ul v-if="item.extra && item.extra.length">
                <li
                  v-for="(text, index) of item.extra"
                  :key="index"
                  v-html="text"
                />
              </ul>
              <section v-for="content of item.list" :key="content.type">
                <h3 class="changelog-content-type">{{ content.typeText }}</h3>
                <ul class="changelog-content-list">
                  <li
                    v-for="(text, index) of content.list"
                    :key="index"
                    v-html="text"
                  />
                </ul>
              </section>
            </div>
          </div>
        </TimelineItem>
      </Timeline>
      <Empty v-else></Empty>
    </div>
    <footer>
      <Button class="changelog-box-button" @click="drawerVisible = false" type="primary" style="margin-right: 50px;" >
        {{ t('changelogBox.close') }}
      </Button>
    </footer>
  </Drawer>
</template>

<script lang="ts">
import {computed, defineComponent, PropType, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {
  Button,
  Drawer,
  Select,
  Timeline,
  TimelineItem,
  SelectOption,
  Space,
  RangePicker,
  Empty,
  Grid,
} from 'ant-design-vue';
import {Col, Row} from 'ant-design-vue/lib/grid';

const Option = SelectOption;

const compareVersion = (v1: string, v2: string) => {
  const mainArray1 = v1.split('-');
  const mainArray2 = v2.split('-');

  const array1 = mainArray1[0].split('.');
  const array2 = mainArray2[0].split('.');
  for (let i = 0; i < 3; i++) {
    if (array1[i] !== array2[i]) {
      return parseInt(array1[i] ?? '0', 10) > parseInt(array2[i] ?? '0', 10)
        ? 1
        : -1;
    }
  }
  return 0;
};

export default defineComponent({
  name: 'ChangelogBox',
  components: {
    Button,
    Drawer,
    Select,
    Timeline,
    Option,
    TimelineItem,
    Grid,
    Col,
    Row,
    Space,
    Empty,
    RangePicker,
  },
  props: {
    changelog: {
      type: Array as PropType<any[]>,
      required: true,
    },
  },
  setup(props) {
    const {t} = useI18n();
    const drawerVisible = ref(false);
    const filterType = ref('version');
    const start = ref('');
    const end = ref('');
    const type = ref([
      'feature',
      'bugfix',
      'enhancement',
      'style',
      'typescript',
      'attention',
    ]);

    const filterChangelog = computed(() => {
      return props.changelog.filter((item) => {
        if (filterType.value === 'version') {
          if (start.value && compareVersion(start.value, item.version) === 1) {
            return false;
          }
          if (end.value && compareVersion(item.version, end.value) === 1) {
            return false;
          }
        } else {
          if (start.value && item.date < start.value) {
            return false;
          }
          if (end.value && item.date > end.value) {
            return false;
          }
        }
        return true;
      });
    });

    const versions = computed(() =>
      props.changelog.map((item: any) =>  {return {'value': item.version}})
    );
    const reverseVersions = computed(() =>
      props.changelog.map((item: any) => item.version).reverse().map((item: any) =>  {return {'value': item}})
    );

    const onFilterChange = (value: string) => {
      filterType.value = value;
      start.value = '';
      end.value = '';
    };

    const onRangePickerChange = (data: [string, string]) => {
      [start.value, end.value] = data;
    };

    return {
      t,
      drawerVisible,
      filterType,
      start,
      versions,
      reverseVersions,
      end,
      onFilterChange,
      onRangePickerChange,
      type,
      filterChangelog,
    };
  },
});
</script>

<style scoped lang="less">
.changelog-box {
  &-button {
    position: absolute;
    bottom: 36px;
    right: 0;
  }

  &-filter {
    margin-bottom: 20px;

    &-title {
      margin-bottom: 10px;
      font-weight: 500;
    }

    :deep(.arco-space-item):first-of-type,
    :deep(.arco-space-item):last-of-type {
      flex: 1;
    }
  }

  &-content {
    padding: 0 20px;
  }
}
</style>
