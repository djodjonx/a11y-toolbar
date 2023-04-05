<template>
  <button 
    class="a11y-toggle"
    aria-controls="a11y-toolbar"
    aria-label="[a11y-toolbar] Toggle menu"
    @click="handleToggleClick"
  >
    <acc-Text aria-hidden="true" class="a11y-toggle__content">
      A11y ToolBar
    </acc-Text>
  </button>
</template>
<script lang="ts" setup>
import AccText from './AccText.vue';

const emit = defineEmits<{
  (e: 'toggle'): void
}>()

const handleToggleClick = () => { emit('toggle') }
</script>

<style lang="scss">
@import '../assets/variable.scss';

.a11y-toggle {
  @include dark-color-scheme();

  border: none;

  &__content {
    margin: 0 auto;
    text-align: center;
  }
}
</style>