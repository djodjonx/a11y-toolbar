<template>
  <label class="a11y-switch">
    <acc-checkbox :checked="props.isSelected" @click="onCheckboxClick" />
  </label>
</template>
<script lang="ts" setup>
import AccCheckbox from './AccCheckbox.vue';

export interface ComponentEmits {
  (e: 'switch'): void
}

export interface ComponentProps {
  isSelected: boolean
}

const emits = defineEmits<ComponentEmits>()

const props = defineProps<ComponentProps>()

const onCheckboxClick = () => { emits('switch') }

</script>
<style lang="scss">

.a11y-switch {
  display: flex;
  align-items: center;
  cursor: pointer;
  padding: 0.75rem 0.75rem 0.75rem 0;
  margin: 0;
  width: 2rem;
  border: 0;
}
</style>