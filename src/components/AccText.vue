<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <component 
    :is="props.tag"
    :class="[
      'a11y-text',
      testTypeClass,
      testWeightClass,
      testVariantClass,
    ]"
  >
    <slot />
  </component>
</template>
<script lang="ts" setup>
import { computed } from 'vue'
import type { PropType } from 'vue'
import { TextTypes, TextWeight, TextVariant } from '@/assets/Enums/AccText'

const props = defineProps({
  tag: { type: String, default: 'span' },
  type: { type: String as PropType<TextTypes>, default: TextTypes.Text },
  weight: { type: String as PropType<TextWeight>, default: TextWeight.Regular },
  variant: { type: String as PropType<TextVariant>, default: TextVariant.Default }
})

const testTypeClass = computed(() => `a11y-text--type-${props.type}`)
const testWeightClass = computed(() => `a11y-text--weight-${props.weight}`)
const testVariantClass = computed(() => `a11y-text--variant-${props.variant}`)

</script>
<style lang="scss">
@import '../assets/variable.scss';

.a11y-text {
  font-family: Arial;
  font-size: $fontSize;
  font-style: normal;
  font-weight: 400;
  line-height: 1.35;

  &--type {
    &-title {
      font-size: $fontSizeTitle;
    }
  
    &-description {
      font-style: italic;
    }
  }

  &--weight {
    &-bold {
      font-weight: 600;
    }
  }

  &--variant {
    &-default {
      color: $white;
    }

    &-reverse {
      color: $black;
    }
  }
}
</style>