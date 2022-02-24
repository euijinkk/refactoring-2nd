export function statement(invoice, plays) {
  let totalAmount = 0;
  let volumeCredits = 0;
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  const format = new Intl.NumberFormat("es-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format;

  function amountFor(aPerformance, play) {
    let thisAmount = 0;

    switch (play.type) {
      case "tragedy":
        thisAmount = 40000;
        if (aPerformance.audience > 30) {
          thisAmount += 1000 * (aPerformance.audience - 30);
        }
        break;

      case "comedy":
        thisAmount = 30000;
        if (aPerformance.audience > 20) {
          thisAmount += 10000 + 500 * (aPerformance.audience - 20);
        }
        thisAmount += 300 * aPerformance.audience;
        break;

      default:
        throw new Error(`알 수 없는 장르: ${type}`);
    }
    return thisAmount;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  for (let aPerformance of invoice.performances) {
    const play = playFor(aPerformance);
    let thisAmount = amountFor(aPerformance, play);

    volumeCredits += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === play.type) {
      volumeCredits += Math.floor(aPerformance.audience / 5);
    }

    result += `${play.name} : ${format(thisAmount / 100)} (${
      aPerformance.audience
    }석)\n`;
    totalAmount += thisAmount;
  }

  result += `총액 ${format(totalAmount / 100)}\n`;
  result += `적립 포인트 ${volumeCredits}점`;
  return result;
}
