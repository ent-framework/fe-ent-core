<template>
  <div />
</template>
<script lang="ts" setup>
  import { unref } from 'vue';
  import { useRouter } from 'vue-router';

  const { currentRoute, replace } = useRouter();

  const { params, query } = unref(currentRoute);
  // eslint-disable-next-line camelcase
  const { path, _redirect_type = 'path' } = params;
  Reflect.deleteProperty(params, '_redirect_type');
  Reflect.deleteProperty(params, 'path');

  const _path = Array.isArray(path) ? path.join('/') : path;
  // eslint-disable-next-line camelcase
  if (_redirect_type === 'name') {
    replace({
      name: _path,
      query,
      params,
    });
  } else {
    replace({
      path: _path.startsWith('/') ? _path : `/${_path}`,
      query,
    });
  }
</script>
