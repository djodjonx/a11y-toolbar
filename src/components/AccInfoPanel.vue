<!-- eslint-disable vue/no-v-text-v-html-on-component -->
<template>
  <div
    ref="panelRef"
    class="a11y-info-panel"
    tabindex="-1"
    :style="panelPosition"
  >
    <header class="a11y-info-panel__header">
      <acc-Text
        class="a11y-info-panel__header-text"
        :type="TextTypes.Description"
      >
       {{ props.title }}
      </acc-Text>
      <span class="a11y-info-panel__controls">
        <label class="a11y-info-panel__controls-annotation-toggle">
          Annotate:
          <acc-checkbox :checked="isAnnotate" @click="onAnnotateClick" />
        </label>
        <section class="a11y-info-panel__controls-panel">
          <a
            aria-label="Move info panel"
            role="button"
            class="a11y-info-panel__controls-move"
          >
            &#8598;
          </a>
          <a
            aria-label="Close info panel"
            role="button"
            class="a11y-info-panel-dismiss-trigger"
            @click="onClose"
          >
            &times;
          </a>
        </section>
      </span>
    </header>
    <div class="a11y-info-panel__body">
      <div class="a11y-info-panel__sections">
        <template
          v-for="report in currentTab"
          :key="report.content.id"
        >
          <acc-info-content
            :is-highlighted="props.highlightedReportId === report.id"
            :content="report.content"
            @search="onSearch(report.id)"
            @highlighted="(id) => onHighlighted(report.id, id)"
          />
        </template>
      </div>
      <ul role="tablist" class="a11y-info-panel__tabs">
        <li
          v-for="tab in filteredTabs"
          :key="tab"
          class="a11y-info-panel__tabs-tab"
        >
          <acc-tab
            :name="tab"
            :is-active="isActiveTab(tab)"
            :count="getResultsCount(tab)"
            :type="getTabType(tab)"
            @click="onClickTab"
          />
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, reactive } from 'vue'
import type { Ref } from 'vue'
import AccCheckbox from './AccCheckbox.vue';
import AccText from './AccText.vue'
import AccInfoContent from './AccInfoContent.vue'
import AccTab from './AccTab.vue'
import { TextTypes } from '@/assets/Enums/AccText'
import useDraggable from '@/assets/compositon/useDraggableElement'
import type InfoPanel from '@/assets/core/InfoPanel'
import type Content from '@/assets/shared/Content'
import { TabTypes } from '@/assets/Enums/Tab'

export interface InfoPanelTab {
  content: Content
  id: string
}

export interface InfoPanelTabs {
  summary: InfoPanelTab[]
  error: InfoPanelTab[]
  warning: InfoPanelTab[]
}

export interface ComponentProps {
  title: string,
  panel: InfoPanel,
  isAnnotate: boolean
  highlightedReportId?: string
}

export interface ComponentEmits {
  (e: 'annotate'): void,
  (e: 'close'): void
  (e: 'search', id: string): void
  (e: 'highlighted', id?: string): void
}

const panelRef: Ref<HTMLElement|null> = ref(null)

const props = withDefaults(defineProps<ComponentProps>(), {
  highlightedReportId: ''
})

const emits = defineEmits<ComponentEmits>()

const activeTab = ref('summary')

const reports = reactive(props.panel.reports)

const tabs = computed(() => reports.reduce((acc, report) => {
  if (report.summary) {
    acc.summary.push({
      content: report.summary,
      id: report.id
    })
  }
  if (report.error) {
    acc.error.push({
      content: report.error,
      id: report.id
    })
  }
  if (report.warning) {
    acc.warning.push({
      content: report.warning,
      id: report.id
    })
  }
  return acc
}, {
  summary: [],
  error: [],
  warning: []
} as InfoPanelTabs ))

if (tabs.value.error.length) {
  activeTab.value = 'error'
}

const currentTab = computed(() => tabs.value[activeTab.value as keyof InfoPanelTabs])

const filteredTabs = computed(() => Object.keys(tabs.value).filter((key) => tabs.value[key as keyof InfoPanelTabs].length))

const isActiveTab = (tabName: string) => tabName === activeTab.value

const isSummary = (tabName: string) => tabName === 'summary'
const isError = (tabName: string) => tabName === 'error'
const isWarning = (tabName: string) => tabName === 'warning'

const getResultsCount = (tabName: string): number => {
  if (isSummary(tabName)) return 0
  return tabs.value[tabName as keyof InfoPanelTabs].length
}

const getTabType = (tabName: string): TabTypes => {
  if (isError(tabName)) return TabTypes.Error
  if (isWarning(tabName)) return TabTypes.Warning
  return TabTypes.Summary
}

const onAnnotateClick = () => {
  emits('annotate')
}

const onClickTab = (tabName: string) => activeTab.value = tabName

const onClose = () => { emits('close') }

const onSearch = (id: string) => {
  emits('search', id)
}

const onHighlighted = (reportId: string, contentId?: string) => {
  emits('highlighted', contentId && reportId)
}

const { positions } = useDraggable(panelRef, 10, '.a11y-info-panel__controls-move')

const panelPosition = computed(() => {
  return {
    top: `${positions.value.top}px`,
    left: `${positions.value.left}px`,
  }
})

</script>

<style lang="scss">
@import '../assets/main.scss';

.a11y-info-panel {
  @include dark-color-scheme();

  border-radius: $borderRadius;
  position: fixed;
  z-index: $z-index--UI;
  padding: 0.625rem;

  
  &__header {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding-bottom: 0.5rem;
    border-bottom: 0.063rem solid $darkBorderColor;

    &-text {
      width: 100%;
    }
  }

  &__controls {
    display: inline-flex;
    align-items: center;
    justify-content: space-between;

    &-annotation-toggle {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
    }

    &-panel {
      display: inline-flex;
      align-items: center;
      justify-content: space-between;
      cursor: pointer;
      border-left: 0.063rem solid $darkBorderColor;
      padding-left: 0.5rem;
    }

    &-move {
      margin-right: 0.5rem;

      &:hover {
        cursor: move;
      }
    }
  }

  &__tabs {
    display: inline-flex;
    justify-content: space-around;
    align-items: center;
    width: 100%;
    margin: 0;
    padding: 0;
    list-style: none;

    &-tab {
      width: 100%;
    }
  }

  &__sections {
    position: relative;
    height: 16.875rem;
    width: 28rem;
    background-color: $white;
    padding: 0.5rem;
    overflow-y: overlay;
  }
}
</style>
