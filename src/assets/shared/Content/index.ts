import type { DisplayableContent, DisplayableNullableContent } from '@/assets/types';
import './style.scss'
import { v4 as uuidv4 } from 'uuid'

export default class Content {
  public id: string = uuidv4()
  
  constructor(
    public body: DisplayableContent,
    public code?: DisplayableNullableContent,
    public heading?: DisplayableContent
  ) {}
}