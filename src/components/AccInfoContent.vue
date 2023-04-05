<!-- eslint-disable vue/valid-v-html -->
<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div class="a11y-info-content">
    <section 
      v-if="props.content.heading"
      :class="[
        'a11y-info-content__heading',
        (props.isHighlighted || isHighlighted) && 'a11y-info-content__heading--highlighted'
      ]"
      ref="headingRef"
    >
      <acc-accordion :is-open="displayBody" :content="formatContent(props.content.heading)" @click="onAccordionClick" />
      <button class="a11y-info-content__heading-action" @click="onSearchClick">
        &#128269;
      </button>
    </section>
    <Transition>
      <section
        v-show="displayBody"
        :class="[
          'a11y-info-content__body',
          highlightedBodyStyle,
          hasHeading && 'a11y-info-content__body--with-margin'
        ]"
        ref="bodyRef"
      >
        <acc-text
          class="a11y-info-content__body-content"
          :variant="TextVariant.Reverse"
          v-html="formatContent(props.content.body)"
        />
        <div 
          v-if="props.content.code"
          class="a11y-info-content__body-code"
        >
          <acc-text
            :variant="TextVariant.Reverse"
            :type="TextTypes.Description"
          >
            Revelant code:
          </acc-text>
          <acc-text
            :variant="TextVariant.Reverse"
          >
            <code> {{ formatContent(props.content.code) }}</code>
          </acc-text>
        </div>
      </section>
    </Transition>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, onMounted } from 'vue'
import type { Ref } from 'vue'
import AccAccordion from './AccAccordion.vue'
import AccText from './AccText.vue'
import type Content from '@/assets/shared/Content'
import { TextTypes, TextVariant } from '@/assets/Enums/AccText'
import useHoverElement from '@/assets/compositon/useHoverElement'

export interface ComponentProps {
  content: Content
  isHighlighted?: boolean
}

export interface ComponentEmits {
  (e: 'search'): void,
  (e: 'highlighted', value?: string): void
}

const props = withDefaults(defineProps<ComponentProps>(), {
  isHighlighted: false
})
const emits = defineEmits<ComponentEmits>()

const displayBody = ref(false)
const headingRef: Ref<HTMLElement | null> = ref(null)
const bodyRef: Ref<HTMLElement | null> = ref(null)
const isHighlighted = ref(false)

const hasHeading = computed(() => !!props.content.heading)
const highlightedBodyStyle = computed(() => !hasHeading.value && (props.isHighlighted || isHighlighted.value)
  ? 'a11y-info-content__body--highlighted'
  : ''
)

const formatContent = (content: HTMLElement | string) => {
  if (typeof content === 'string') {
    return content
  }
  return content.outerHTML
}

const onSearchClick = () => { emits('search') }

const onAccordionClick = () => {
  displayBody.value = !displayBody.value
}

const onMouseOver = () => {
  isHighlighted.value = true
  emits('highlighted', props.content.id)
}

const onMouseLeave = () => {
  isHighlighted.value = false
  emits('highlighted')
}

useHoverElement(hasHeading.value ? headingRef : bodyRef , onMouseOver, onMouseLeave)

onMounted(() => {
  if (!hasHeading.value) {
    displayBody.value = true
  }
})


</script>
<style lang="scss">
@import '../assets/variable.scss';

@mixin highlightContent() {
  background-color: $lighterGray;
  border-radius: 3px;
}

.a11y-info-content {
  display: flex;
  flex-direction: column;
  width: 100%;

  &__heading {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    &--highlighted {
      @include highlightContent();
    }

    &-action {
      border: none;
      outline: none;
      background-color: inherit;
      cursor: pointer;
      margin-left: 0.25rem;
    }
  }

  &__body {
    display: flex;
    flex-direction: column;
    width: 100%;

    &--highlighted {
      @include highlightContent();
    }

    &--with-margin {
      margin-top: 0.5rem;
    }

    &-content {
      cursor: default;
    }

    &-code {
      display: flex;
      flex-direction: column;
      margin-top: 0.5rem;
      width: 100%;

      code {
        display: flex;
        justify-content: center;
        width: 100%;
        margin-top: 0.25rem;
        background-color: $lighterGray;
        border-radius: 0.125rem;
        text-align: center;
        padding: 0.5rem 0;
      }
    }
  }
}
</style>