import createStatementData from "./createStatement";

export function statement(invoice, plays) {
  return renderPlainText(createStatementData(invoice, plays));
}

function renderPlainText(data) {
  let result = `청구 내역 (고객명: ${data.customer})\n`;

  for (let aPerformance of data.performances) {
    result += `${aPerformance.play.name} : ${usd(aPerformance.amount)} (${
      aPerformance.audience
    }석)\n`;
  }

  result += `총액 ${usd(data.totalAmount)}\n`;
  result += `적립 포인트 ${data.totalVolumeCredits}점`;
  return result;
}

function htmlStatement(invoice, plays) {
  return renderHtml(createStatementData(invoice, plays));
}

function renderHtml(data) {
  let result = `<h1>청구 내역 (고객명: ${data.customer})</h1>\n`;
  result += "<table>\n";
  result += "<tr><th>연극</th><th>좌석 수</th><th>금액</th></tr>";

  for (let aPerformance of data.performances) {
    result += `<tr><td>${aPerformance.play.name}</td><td>${aPerformance.audience}</td>`;
    result += `<td>${usd(aPerformance.amount)}</td></tr>\n`;
  }
  result += "</table>\n";

  result += `<p>총액 : <em>${usd(data.totalAmount)}</em></p>\n`;
  result += `<p>적립 포인트 : <em>${data.totalVolumeCredits}</em>점</p>`;
  return result;
}

function usd(aNumber) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
