import type Plugin from '@/assets/shared/Plugin'
import type Renderer from '@/assets/core/Renderer'

export default class Toolbar {
  public plugins: Plugin[] = []

  constructor(private renderer: Renderer) {}

  registerPlugin(plugin: Plugin): this {
    this.plugins.push(plugin)
    return this
  }

  launch(): void | never {
    if (!this.plugins.length) {
      throw new Error('No plugin used, please registerPlugin before launch toolbar')
    }
    this.renderer.execute(this)
  }
}