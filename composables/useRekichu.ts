const ROKUYO = ["大安", "赤口", "先勝", "友引", "先負", "仏滅"];

export function useRokuyo(
  lunarMonth: ComputedRef<number>,
  lunarDate: ComputedRef<number>
) {
  const index = computed(() => (lunarMonth.value + lunarDate.value) % 6);
  return computed(() => ROKUYO[index.value]);
}
