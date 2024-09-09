const KANSUJI = ["〇", "一", "二", "三", "四", "五", "六", "七", "八", "九"];

// 31までの漢数字を数値に変換する
export function parseKansuji(kansuji: string): number {
  const kansujiArray = [...kansuji];

  let sum = 0;
  const onesPlace = kansujiArray.pop();
  if (!onesPlace) {
    return sum;
  }
  const onesPlaceNumber = KANSUJI.indexOf(onesPlace);
  sum += onesPlaceNumber;

  const tensPlace = kansujiArray.pop();
  if (!tensPlace) {
    return sum;
  }
  switch (tensPlace) {
    case "初":
      break;
    case "十":
      sum += 10;
      break;
    case "廿":
      sum += 20;
      break;
    case "卅":
      sum += 30;
      break;
    default:
      const tensPlaceNumber = KANSUJI.indexOf(tensPlace);
      sum += tensPlaceNumber * 10;
      break;
  }
  return sum;
}
