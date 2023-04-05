import Annotation from "../index";
import { AnnotationType } from '@/assets/Enums/Annotation'

export default class ErrorAnnotation extends Annotation {
  constructor(label: string, details: string) {
    super(label, details, AnnotationType.Error)
  }
}