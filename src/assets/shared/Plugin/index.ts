import InfoPanel from "../../core/InfoPanel"
import type Report from "../Report"
import { v4 as uuidv4 } from 'uuid'

export default class Plugin {
  public panel: InfoPanel
  public reports: Report[]
  public id: string

  constructor() {
    this.reports = []
    this.panel = new InfoPanel(this)
    this.id = uuidv4()
  }

  getTitle(): string {
    return "New plugin";
  }

  getDescription(): string {
    return "";
  }

  cleanUp():void {}

  protected addReport(report: Report): this {
    this.reports.push(report)
    return this
  }

  protected clearReport(): this {
    this.reports.splice(0, this.reports.length)
    return this
  }

  execute(): void {}

  destroy(): void {
    this.cleanUp()
    this.clearReport()
  }
}