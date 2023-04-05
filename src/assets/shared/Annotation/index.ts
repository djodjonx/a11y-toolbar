import type { AnnotationType } from '@/assets/Enums/Annotation'
import { v4 as uuidv4 } from 'uuid'


export default class Annotation {
  public isHighlighted: boolean
  public id: string

  constructor(
    public label: string,
    public details: string|null,
    public type: AnnotationType,
  ) {
    this.isHighlighted = false
    this.id = uuidv4()
  }

  setIsHighlighted(value: boolean): this {
    this.isHighlighted = value
    return this
  }
}