import { parseKansuji } from "~/libs/number";

const lunarLongDateFormatter = new Intl.DateTimeFormat(
  "zh-Hans-CN-u-ca-chinese",
  {
    dateStyle: "long",
  }
);

export function useKyureki(solarDate: ComputedRef<Date>) {
  const lunarLongDateString = computed(() =>
    lunarLongDateFormatter.format(solarDate.value)
  ); // 2024甲辰年八月初七
  const lunarYearString = computed(() =>
    lunarLongDateString.value.slice(4, 7).replace("年", "")
  ); // 甲辰
  const lunarMonthString = computed(() =>
    lunarLongDateString.value.slice(7, 9).replace("月", "")
  ); // 八
  const lunarDateString = computed(() => lunarLongDateString.value.slice(-2)); // 初七

  const lunarMonthNumber = computed(() => parseKansuji(lunarMonthString.value)); // 8
  const lunarDateNumber = computed(() => parseKansuji(lunarDateString.value)); // 7

  const lunarDateNumberDifferenceFrom30 = computed(
    () => 30 - lunarDateNumber.value
  ); // 23
  const solarDateLunar30th = computed(() => new Date(solarDate.value)); // 2024-09-09
  watchEffect(() =>
    solarDateLunar30th.value.setDate(
      solarDate.value.getDate() + lunarDateNumberDifferenceFrom30.value
    )
  ); // 2024-10-02
  const isLunarBigMonth = computed(
    () =>
      lunarLongDateFormatter.format(solarDateLunar30th.value).slice(-2) ===
      "三十"
  ); // true
  console.log(lunarDateNumber.value); // true
  const lunarMonthBigOrSmall = computed(() =>
    isLunarBigMonth.value ? "大" : "小"
  ); // 大

  return {
    lunarYearString,
    lunarMonthString,
    lunarDateString,

    lunarMonthNumber,
    lunarDateNumber,

    lunarMonthBigOrSmall,
  };
}
