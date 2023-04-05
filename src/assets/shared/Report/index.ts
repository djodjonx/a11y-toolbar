import type Annotation from "../Annotation"
import type SummaryContent from '../Content/Summary'
import type ErrorContent from '../Content/Error'
import type WarningContent from '../Content/Warning'
import { v4 as uuidv4 } from 'uuid'

export default class Report {
  public summary: SummaryContent | undefined
  public error: ErrorContent | undefined
  public warning: WarningContent | undefined
  public annotation: Annotation | undefined
  public id: string = uuidv4()

  constructor(public element: HTMLElement) {}

  setSummary(content: SummaryContent): this {
    this.summary = content
    return this
  }

  setError(content: ErrorContent): this {
    this.error = content
    return this
  }

  setWarning(content: WarningContent): this {
    this.warning = content
    return this
  }

  setAnnotation(annotation: Annotation): this {
    this.annotation = annotation
    return this
  }
}