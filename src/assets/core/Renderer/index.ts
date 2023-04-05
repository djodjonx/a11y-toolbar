import type Toolbar from "@/assets/core/Toolbar";
import { createApp } from 'vue'
import App from '@/App.vue'

export default class Renderer {
  execute(toolbar: Toolbar): void {
    const mountingPoint = document.createElement('div')
    mountingPoint.className = 'a11y'
    document.body.appendChild(mountingPoint)
    createApp(App, {
      toolbar,
    }).mount('.a11y')
  }
}