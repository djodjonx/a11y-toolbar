<template>
  <div
    :class="[
      'a11y-tab',
      props.isActive && 'a11y-tab--active'
    ]"
    @click="onClickTab"
  >
    <acc-text :variant="props.isActive ? TextVariant.Reverse : undefined">
      {{ name }}
    </acc-text>
    <span
      v-if="withCount"
      :class="[
        'a11y-tab__count',
        isError && 'a11y-tab__count--error',
        isWarning && 'a11y-tab__count--warning'
      ]"
    >
      {{ count }}
    </span>
  </div>
</template>
<script lang="ts" setup>
import AccText from './AccText.vue'
import { TabTypes } from '@/assets/Enums/Tab'
import { computed } from 'vue'
import { TextVariant } from '@/assets/Enums/AccText'

export interface ComponentProps {
  name: string
  isActive?: boolean
  count: number
  type: TabTypes
}

export interface ComponentEmits {
  (e: 'click', name: string): void
}

const props = withDefaults(defineProps<ComponentProps>(), {
  isActive: false,
})

const emits = defineEmits<ComponentEmits>()

const isError = computed(() => props.type === TabTypes.Error)
const isWarning = computed(() => props.type === TabTypes.Warning)
const withCount = computed(() => [TabTypes.Warning, TabTypes.Error].includes(props.type) && props.count > 0)

const onClickTab = () => { emits ('click', props.name) }

</script>
<style lang="scss">
@import '../assets/variable.scss';

.a11y-tab {
  display: flex;
  align-items: center;
  justify-content: center;
  $self-tab: &;
  height: 1.875rem;
  text-align: center;
  width: 100%;
  flex-grow: 1;
  cursor: pointer;
  border-bottom-left-radius: 0.125rem;
  border-bottom-right-radius: 0.125rem;

  ::first-letter {
    text-transform: uppercase;
  }

  &--active {
    background-color: $white;
    cursor: default;

    &#{$self-tab}:hover {
      background-color: $white;
    }
  }

  &:hover {
    background-color: $gray;
  }

  &__count {
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.75rem;
    width: 1rem;
    height: 1rem;
    border-radius: 50%;
    margin-left: 0.5rem;

    &--error {
      background-color: $annotationError;
    }

    &--warning {
      background-color: $annotationWarning;
    }
  }
}
</style>