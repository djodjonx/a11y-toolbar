import Annotation from "../index";
import { AnnotationType } from '@/assets/Enums/Annotation'

export default class GoodAnnotation extends Annotation {
  constructor(label: string) {
    super(label, null, AnnotationType.Good)
  }
}