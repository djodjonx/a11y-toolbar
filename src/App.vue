<template>
  <div id="a11y-toolbar" class="a11y a11y-toolbar" role="region" aria-expanded="false">
    <ul v-show="isVisible" className="a11y-toolbar__body">
      <li v-for="plugin in plugins" :key="plugin.id" class="a11y-toolbar__plugins" role="menuitem">
        <acc-plugin
          :is-selected="plugin.id === activePlugin?.id"
          :title="plugin.getTitle()"
          :description="plugin.getDescription()"
          @switch="onPluginSelected(plugin)"
        />
      </li>
    </ul>
    <acc-toggle class="a11y-toolbar__toggle" @toggle="onToggle" />
    <Teleport to="body" v-if="hasPanel">
      <acc-info-panel
        v-if="activePlugin?.panel"
        :key="activePlugin.id"
        :title="activePlugin.getTitle()"
        :panel="activePlugin.panel"
        :is-annotate="hasAnnotation"
        :highlighted-report-id="highlightedReport?.id"
        @annotate="onAnnotate"
        @close="onClosePanel"
        @search="onSearch"
        @highlighted="onContentHighlighted"
      />
    </Teleport>
    <template
      v-for="report in filteredAnnotateReports"
      :key="report.annotation.id"
    >
      <Teleport
        to="body"
        v-if="hasAnnotation"
      >
        <acc-annotation
          :annotation="(report.annotation as Annotation)"
          :target="report.element"
          @highlighted="(id) => onAnnotationHighlighted(report.id, id)"
        />
      </Teleport>
    </template>
  </div>
</template>

<script lang="ts" setup>
import type { Ref } from 'vue'
import { ref, computed } from 'vue'
import AccPlugin from './components/AccPlugin.vue'
import AccToggle from './components/AccToggle.vue'
import AccInfoPanel from './components/AccInfoPanel.vue'
import AccAnnotation from './components/AccAnnotation.vue'
import type Annotation from '@/assets/shared/Annotation'
import type Plugin from '@/assets/shared/Plugin'
import type Report from '@/assets/shared/Report'
import type Toolbar from '@/assets/core/Toolbar'

export interface ComponentProps {
  toolbar: Toolbar
}
const HighlightedClass = 'a11y-element--highlighted'

const props = defineProps<ComponentProps>()

const hasAnnotation = ref(true)
const hasPanel = ref(true)
const isVisible = ref(false)
const activePlugin: Ref<Plugin | null> = ref(null)
const highlightedReport: Ref<Report|null> = ref(null)

const plugins = computed(() => props.toolbar.plugins)

const reports = computed(() => activePlugin.value?.reports ?? [])
const filteredAnnotateReports = computed(() => reports.value.filter(report => !!report.annotation))

const onPluginSelected = (plugin: Plugin) => {
  hasAnnotation.value = true
  hasPanel.value = true

  if (activePlugin.value) {
    activePlugin.value.destroy()
    if (plugin.id === activePlugin.value.id) {
      activePlugin.value = null
      return
    }
  }
  activePlugin.value = plugin
  activePlugin.value.execute()
}

const onToggle = () => {
  isVisible.value = !isVisible.value
}

const onAnnotate = () => {
  hasAnnotation.value = !hasAnnotation.value
}

const onClosePanel = () => {
  hasPanel.value = false
}

const findAndSetReport = (id?: string): void => {
  const report = reports.value.find(report => report?.id === id)
  highlightedReport.value = report ?? null
}

const scrollToElement = (element?: HTMLElement): void => {
  if (!element) return
  const { offsetLeft, offsetTop } = element
  window.scrollTo({
    top: offsetTop,
    left: offsetLeft,
    behavior: 'smooth'
  })
}
const highlightElement = (element?: HTMLElement): void => {
  const allHighlighted = document.querySelectorAll(`.${HighlightedClass}`)
  Array.from(allHighlighted).forEach(element => { element?.classList.remove(HighlightedClass) })
  if (element) {
    element.classList.add(HighlightedClass)
  }
}

const onAnnotationHighlighted = (reportId: string, id?: string): void => {
  findAndSetReport(id && reportId)
}

const onContentHighlighted = (reportId?: string): void => {
  findAndSetReport(reportId)
  highlightElement(highlightedReport.value?.element)
}

const onSearch = (reportId?: string): void => {
  findAndSetReport(reportId)
  scrollToElement(highlightedReport.value?.element)
}
</script>

<style lang="scss">
@import './assets/main.scss';

.a11y-toolbar {

  @include dark-color-scheme();
  @include position(fixed, auto, auto, 0, 0);

  border-top-left-radius: $borderRadius;
  border-top-right-radius: $borderRadius;
  overflow: hidden;
  z-index: $z-index--UI;

  &__body {
    margin: 0;
    padding: 0;
  }

  &__plugins {
    list-style: none;
  }

  &__toggle {
    width: 100%;
    text-align: center;
    cursor: pointer;
    padding: 0.5rem 0.25rem;
  }

  &.a11y-expanded &-body {
    display: block;
  }
}
</style>
