import Plugin from "../index";
import Report from "../../Report";
import SummaryContent from "../../Content/Summary";
import GoodAnnotation from "../../Annotation/Good";
import ErrorContent from "../../Content/Error";
import ErrorAnnotation from "../../Annotation/Error";

export default class TestPlugin extends Plugin {
  getTitle(): string {
      return 'Test'
  }
  getDescription(): string {
      return 'Ceci est un test'
  }

  do() {
    const element = document.createElement('div')
    document.body.appendChild(element)
    const report = new Report(element)
    const summaryContent = new SummaryContent('ceci est un test')
    const annotation = new GoodAnnotation('rien')
    report.setSummary(summaryContent).setAnnotation(annotation)
    this.addReport(report)
    setTimeout(() => {
      const summaryContent = new SummaryContent('ceci est un autre test')
      report.setSummary(summaryContent)
    }, 3000)

    const errorElement = document.createElement('div')
    errorElement.innerText = 'je suis une erreur'
    document.body.appendChild(errorElement)

    const otherReport = new Report(errorElement)
    const otherSummaryContent = new SummaryContent('ceci est une erreur dans le summary')
    const otherErrorContent = new ErrorContent('voici un joli message d\'erreur', 'Ma super erreur', errorElement)
    const otherAnnotation = new ErrorAnnotation('uggly', 'Ceci est une erreur pour rien')
    otherReport.setAnnotation(otherAnnotation).setSummary(otherSummaryContent).setError(otherErrorContent)
    this.addReport(otherReport)
  }

  execute() {
    this.do()
  }
}