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

function usd(aNumber) {
  return new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(aNumber / 100);
}
