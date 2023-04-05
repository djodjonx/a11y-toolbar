import type { DisplayableContent } from "@/assets/types";
import Content from "../index";

export default class ErrorContent extends Content {
  constructor(
    body: DisplayableContent,
    code: DisplayableContent,
    heading: DisplayableContent
  ) {
    super(body, code, heading)
  }
}