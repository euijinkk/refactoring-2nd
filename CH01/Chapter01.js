export function statement(invoice, plays) {
  let result = `청구 내역 (고객명: ${invoice.customer})\n`;

  for (let aPerformance of invoice.performances) {
    result += `${playFor(aPerformance).name} : ${usd(
      amountFor(aPerformance)
    )} (${aPerformance.audience}석)\n`;
  }

  let totalAmount = totalAmount();

  result += `총액 ${usd(totalAmount)}\n`;
  result += `적립 포인트 ${totalVolumeCredits()}점`;
  return result;

  function totalAmount() {
    let totalAmount = 0;
    for (let aPerformance of invoice.performances) {
      totalAmount += amountFor(aPerformance);
    }
    return totalAmount;
  }

  function totalVolumeCredits() {
    let volumeCredits = 0;
    for (let aPerformance of invoice.performances) {
      volumeCredits += volumeCreditsFor(aPerformance);
    }
    return volumeCredits;
  }

  function usd(aNumber) {
    return new Intl.NumberFormat("es-US", {
      style: "currency",
      currency: "USD",
      minimumFractionDigits: 2,
    }).format(aNumber / 100);
  }

  function amountFor(aPerformance) {
    let thisAmount = 0;

    switch (playFor(aPerformance).type) {
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
        throw new Error(`알 수 없는 장르: ${playFor(aPerformance).type}`);
    }
    return thisAmount;
  }

  function playFor(aPerformance) {
    return plays[aPerformance.playID];
  }

  function volumeCreditsFor(aPerformance) {
    let volumeCredits = 0;
    volumeCredits += Math.max(aPerformance.audience - 30, 0);

    if ("comedy" === playFor(aPerformance).type) {
      volumeCredits += Math.floor(aPerformance.audience / 5);
    }

    return volumeCredits;
  }
}
