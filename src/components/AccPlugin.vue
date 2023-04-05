<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div class="a11y-plugin">
    <section class="a11y-plugin__content">
      <AccSwitch
        class="a11y-plugin__switch"
        :is-selected="props.isSelected"
        @switch="onSwitch"
      />
      <div class="a11y-plugin__info">
        <acc-text
          class="a11y-plugin__info-title"
          :weight="TextWeight.Bold"
          :type="TextTypes.Title"
        >
          {{ props.title }}
        </acc-text>
        <acc-text
          class="a11y-plugin__info-description"
          :type="TextTypes.Description"
          v-html="props.description"
        />
      </div>
    </section>
    <div class="a11y-plugin__separator" />
  </div>
</template>

<script lang="ts" setup>
import AccSwitch from './AccSwitch.vue';
import AccText from './AccText.vue';
import { TextTypes, TextWeight } from '@/assets/Enums/AccText'

export interface ComponentEmits {
  (e: 'switch'): void
}

export interface ComponentProps {
  title: string
  description: string
  isSelected: boolean
}

const emits = defineEmits<ComponentEmits>()

const props = defineProps<ComponentProps>()

const onSwitch = () => { emits('switch') }

</script>
<style lang="scss">
@import "../assets/variable.scss";

.a11y-plugin {
  display: flex;
  flex-direction: column;
  padding: 0.5rem 0;

  &__switch {
    margin-right: 1rem;
  }

  &__content {
    display: inline-flex;
  }

  &__info {
    display: flex;
    flex-direction: column;

  
    &-title {
      font-weight: bold;
    }

    &-description {
      font-size: $fontSizeSmall;
      font-style: italic;
      width: 12.5rem;
      margin-right: 0.188rem;
    }
  }

  &__separator {
    width: 100%;
    height: 0.5rem;
    padding: 0.5rem 0;
    border-bottom: 0.063rem solid $darkBorderColor;
  }
}
</style>