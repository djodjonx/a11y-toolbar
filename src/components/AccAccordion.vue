<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <button
    class="a11y-accordion"
    @click="onClick"
  >
    <acc-text
      :class="[
        'a11y-accordion__icon',
        props.isOpen && 'a11y-accordion__icon--reversed'
      ]"
      :variant="TextVariant.Reverse"
      :weight="TextWeight.Bold"
      :type="TextTypes.Title"
    >
      <span>&#8250;</span>
    </acc-text>
    <acc-text
      class="a11y-accordion__action"
      :variant="TextVariant.Reverse"
      :weight="TextWeight.Bold"
      v-html="props.content"
    />
  </button>
</template>
<script setup lang="ts">
import AccText from './AccText.vue'
import { TextTypes, TextVariant, TextWeight } from '../assets/Enums/AccText'

export interface ComponentProps {
  content: HTMLElement|string
  isOpen?: boolean
}

export interface ComponentEmits {
  (e: 'click'): void
}

const props = withDefaults(defineProps<ComponentProps>(), {
  isOpen: false
})
const emits = defineEmits<ComponentEmits>()

const onClick = () => emits('click')

</script>
<style lang="scss">
.a11y-accordion {
  display: inline-flex;
  align-items: center;
  width: 100%;
  border: inherit;
  outline: none;
  width: 100%;
  text-align: left;
  background-color: inherit;
  cursor: pointer;

  &__icon {
    display: inline-block;
    transform: rotateZ(0deg);
    transition: transform ease-in-out 50ms;
    margin-right: 0.25rem;

    &--reversed {
      transform: rotateZ(90deg);
    }
  }
}
</style>