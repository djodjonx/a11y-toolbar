<template>
  <div class="a11y-checkbox">
    <input
      class="a11y-checkbox__input"
      type="checkbox"
      :checked="props.checked"
      @click="onClick"
    />
    <div aria-hidden="true" class="a11y-checkbox__indicator">
      &#x2713;
    </div>
  </div>
</template>
<script lang="ts" setup>

export interface ComponentProps {
  checked?: boolean
}

export interface ComponentEmits {
  (e: 'click', event: Event): void
}

const props = withDefaults(defineProps<ComponentProps>(), {
  checked: false,
})

const emits = defineEmits<{
  (e: 'click', event: Event): void
}>()


const onClick = (event: Event) => {
  emits('click', event)
}
</script>
<style lang="scss">
@import "../assets/main.scss";

$indicatorSize: 1rem;
$indicatorFontSize: 0.75rem;


.a11y-checkbox {
  $self: &;
  cursor: pointer;

  input[type=checkbox],
  input[type=radio] {
    margin: 0.25rem 0 0;
    margin-top: 0.063rem \9;
    line-height: normal
  }

  &__input {
    @include sr-only();

    &:focus+#{$self}__indicator {
      $focusColor: darken($kaGreen, 10%);

      border-color: $kaGreen;
      background-color: $focusColor;
      color: $focusColor !important;
    }

    &:checked+#{$self}__indicator {
      background-color: $kaGreen;
      border-color: $kaGreen;
      color: white !important;
    }
  }

  &__indicator {
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 1rem;
    border-radius: $indicatorSize;
    border: 0.063rem solid $lightBorderColor;
    color: transparent !important;
    font-size: $indicatorFontSize;
    height: $indicatorSize;
    line-height: $indicatorSize;
    padding: 0 0 0 0.063rem;
    width: $indicatorSize;
  }
}
</style>