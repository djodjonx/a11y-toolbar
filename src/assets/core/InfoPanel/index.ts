import type Plugin from '../../shared/Plugin'
import type Report from '../../shared/Report'

export default class InfoPanel {
  public reports: Report[]

  constructor(private plugin: Plugin) {
    this.reports = this.plugin.reports
  }
}