/**
 * A plugin to identify and validate heading tags (<h1>, <h2>, etc.)
 */

import Plugin from "../index";
import Report from "../../Report";
import SummaryContent from "../../Content/Summary";
import GoodAnnotation from "../../Annotation/Good";
import ErrorContent from "../../Content/Error";
import ErrorAnnotation from "../../Annotation/Error";
import WarningContent from "../../Content/Warning";
import WarningAnnotation from "../../Annotation/Warning";
import './style.scss'

const enum ErrorType {
  Error = 'error',
  Warning = 'warning'
}
interface OutlineError {
  title: string
  description: string
  type: ErrorType
}

interface OutlineItem {
  element: Element
  summaryContent: HTMLElement
  error?: OutlineError
}

export default class HeadingsPlugin extends Plugin {
  getTitle() {
    return "Headings"
  }

  getDescription() {
    return `
      Highlights headings (&lt;h1&gt;, &lt;h2&gt;, etc) and
      order violations
    `
  }

  generateConsecutiveHeadingError(prevLevel: number, currLevel: number): OutlineError {
    const _tag = (level: number) => `<code>&lt;h${level}&gt;</code>`;
    let description = `
            <div>
                This document contains an ${_tag(currLevel)} tag directly
                following an ${_tag(prevLevel)}. In order to maintain a consistent
                outline of the page for assistive technologies, reduce the gap in
                the heading level by upgrading this tag to an
                ${_tag(prevLevel + 1)}`;

    // Suggest upgrading the tag to the same level as `prevLevel` iff
    // `prevLevel` is not 1
    if (prevLevel !== 1) {
      description += ` or ${_tag(prevLevel)}`;
    }

    description += ".</div>";

    return {
      title: `
        Nonconsecutive heading level used (h${prevLevel} &rarr;
        h${currLevel})
      `,
      description: description,
      type: ErrorType.Warning
    };
  }

  generateFirstNoH1Error(level: number): OutlineError {
    return {
      title: "First heading is not an &lt;h1&gt;",
      description: `
        <div>
            To give your document a proper structure for assistive
            technologies, it is important to lay out your headings
            beginning with an <code>&lt;h1&gt;</code>. We found an
            <code>&lt;h${level}&gt;</code> instead.
        </div>
      `,
      type: ErrorType.Error
    };
  }

  createSummaryEntry(level: string, text: string | null, type?: ErrorType): HTMLElement {
    const container = document.createElement('div')
    container.className = `a11y-heading-plugin__outline-entry heading__level-${level}`
    
    const styleType = !type ? 'success' : type === ErrorType.Error ? 'error' : 'warning'
    const levelItem = document.createElement('span')
    const statusClass = `heading__status-${styleType}`
    levelItem.className = `a11y-heading-plugin__outline-entry heading__level-${level} ${statusClass}`
    levelItem.innerHTML = level
    const textItem = document.createElement('span')
    textItem.className = 'a11y-heading-plugin__outline-heading-text'
    textItem.innerHTML = `&nbsp;${text}`
    container.appendChild(levelItem)
    container.appendChild(textItem)
    return container
  }

  /**
   * Computes an outline of the page and reports any violations.
   */
  outline(headings: NodeListOf<Element>): OutlineItem[] {
    const items: OutlineItem[] = [];

    let prevLevel: number;
    Array.from(headings).forEach((el, i) => {
      const level = parseInt(el.tagName.slice(1), 10)
      let error;

      // Check for any violations
      // NOTE: These violations do not overlap, but as we add more, we
      // may want to separate the conditionals here to report multiple
      // errors on the same tag.
      if (i === 0 && level !== 1) {
        error = this.generateFirstNoH1Error(level)
      } else if (prevLevel && level - prevLevel > 1) {
        error = this.generateConsecutiveHeadingError(prevLevel, level)
      }

      prevLevel = level;

      const item: OutlineItem = {
        element: el,
        summaryContent: this.createSummaryEntry(String(level), el.textContent, error?.type),
        error,
      }
      items.push(item);
    })

    return items
  }

  generateReport(item: OutlineItem): Report {
    const report = new Report(item.element as HTMLElement)
    const summary = new SummaryContent(item.summaryContent)
    report.setSummary(summary)
    let annotation = new GoodAnnotation(item.element.tagName)
    if (item.error) {
      if (item.error.type === ErrorType.Error) {
        const error = new ErrorContent(item.error.description, item.element.outerHTML.toString(), item.error.title)
        report.setError(error)
        annotation = new ErrorAnnotation(item.element.tagName, item.error.title)
        report.setAnnotation(annotation)
      } else {
        const warning = new WarningContent(item.error.description, item.element.outerHTML.toString(), item.error.title)
        report.setWarning(warning)
        annotation = new WarningAnnotation(item.element.tagName, item.error.title)
        report.setAnnotation(annotation)
      }
    }
    report.setAnnotation(annotation)
    this.addReport(report)
    return report
  }

  execute() {
    const headings = document.querySelectorAll("h1, h2, h3, h4, h5, h6");
    const items = this.outline(headings);

    if (items.length) {
      items.forEach(item => {
        this.generateReport(item)
      })
    }
  }
}

