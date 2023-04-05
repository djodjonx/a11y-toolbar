<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
<div
  ref="annotationRef"
  :class="[
    'a11y-annotation',
    annotationTypeClass,
  ]"
  :style="annotationStyle"
>
  <section class="a11y-annotation__body">
    <div
      v-if="!isGood"
      class="a11y-annotation__body-icon"
    >
      &#9888;
    </div>
    <acc-Text
      class="a11y-annotation__body-text"
      :variant="TextVariant.Reverse"
      v-html="currentAnnotation.label"
    />
  </section>
  <acc-Text
    v-if="isHighlighted && currentAnnotation.details"
    class="a11y-annotation__details"
    :type="TextTypes.Description"
    :variant="TextVariant.Reverse"
    v-html="currentAnnotation.details"
  />
</div>

</template>
<script lang="ts" setup>
import { ref, computed, reactive } from 'vue'
import type { Ref } from 'vue'
import AccText from './AccText.vue'
import { TextTypes, TextVariant } from '@/assets/Enums/AccText'
import type Annotation from '@/assets/shared/Annotation'
import { AnnotationType } from '@/assets/Enums/Annotation'
import useHoverElement from '@/assets/compositon/useHoverElement'

export interface ComponentProps {
  annotation: Annotation
  target: HTMLElement
}

export interface ComponentEmits {
  (e: 'highlighted', value?: string): void
}

const emits = defineEmits<ComponentEmits>()
const props = defineProps<ComponentProps>()


const isHighlighted = ref(false)
const annotationRef: Ref<HTMLElement | null> = ref(null)


const currentAnnotation = reactive(props.annotation)


const onMouseOver = () => {
  isHighlighted.value = true
  emits('highlighted', props.annotation.id)
}

const onMouseLeave = () => {
  isHighlighted.value = false
  emits('highlighted')
}

useHoverElement(annotationRef, onMouseOver, onMouseLeave)

const annotationTypeClass = computed(() => currentAnnotation.type && `a11y-annotation--type-${currentAnnotation.type}`)
const annotationStyle = computed(() => {
  const { offsetLeft, offsetTop, offsetHeight } = props.target
  return {
    top: `${offsetTop - offsetHeight}px`,
    left: `${offsetLeft}px`
  }
})
const isGood = computed(() => currentAnnotation.type === AnnotationType.Good)
</script>
<style lang="scss">
@import '../assets/main.scss';

.a11y-annotation {
  position: fixed;
  display: flex;
  flex-direction: column;
  max-width: 25%;
  border-radius: $borderRadius;
  padding: 0.25rem;
  opacity: 0.7;

  &:hover {
    opacity: 0.9;
    cursor: help;
    z-index: 999;
  }

  &--type {
    &-good {
      background-color: $annotationSuccess;
    }

    &-warning {
      background-color: $annotationWarning;
    }

    &-error {
      background-color: $annotationError;
    }
  }

  &__body {
    display: inline-flex;
    justify-content: flex-start;
    align-items: center;

    &-icon {
      margin-right: 0.5rem;
    }
  }
}
</style>