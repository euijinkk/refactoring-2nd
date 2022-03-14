import { statement } from "../statement";
import invoicesJson from "../invoices.json";
import playsJson from "../plays.json";

const expectMessage = `청구 내역 (고객명: BigCo)
hemlet : $650.00 (55석)
As You Like It : $580.00 (35석)
Othello : $500.00 (40석)
총액 $1,730.00
적립 포인트 47점`;

describe("테스트", () => {
  test("청구 내역을 정확히 반환하는지 테스트한다.", () => {
    const billingDetail = statement(invoicesJson[0], playsJson);
    expect(billingDetail).toBe(expectMessage);
  });
});
