<script setup lang="ts">
import { ref, computed, watch, onMounted } from "vue";

const lunarDateFormatter = new Intl.DateTimeFormat("zh-Hant-HK-u-ca-chinese", {
  dateStyle: "long",
});
const solarDateFormatter = new Intl.DateTimeFormat("zh-Hant-HK-u-nu-hanidec", {
  dateStyle: "long",
});

const inputDateRef = ref<HTMLInputElement | null>(null);

const dateLiteral = ref(new Date().toISOString().slice(0, 10));
const date = computed(() => new Date(dateLiteral.value));

const content = ref("");

watch(dateLiteral, () => {
  content.value = localStorage.getItem(dateLiteral.value) || "";
});

watch(content, () => {
  localStorage.setItem(dateLiteral.value, content.value);
});

const solarYearNumber = computed(() => date.value.getFullYear());
const solarFullString = computed(() => solarDateFormatter.format(date.value));
const solarDateNumber = computed(() => date.value.getDate());

const color = computed(() =>
  date.value.getDay() === 0 ? "#ff0000" : "#000080"
);

const lunarFullString = computed(() => lunarDateFormatter.format(date.value));

const lunarYearString = computed(() => lunarFullString.value.slice(0, 2));
const lunarMonthString = computed(() =>
  lunarFullString.value.slice(9, 11).replace("月", "")
);
const lunarDateString = computed(() => {
  const rawString = Number.parseInt(
    lunarFullString.value.slice(-2).replace("月", "")
  ).toLocaleString("zh-Hant-HK-u-nu-hanidec");
  return rawString
    .replace("一〇", "十")
    .replace(/一(一|二|三|四|五|六|七|八|九)/, "十$1")
    .replace("二〇", "二十")
    .replace(/二(一|二|三|四|五|六|七|八|九)/, "廿$1")
    .replace("三〇", "三十");
});
const lunarDateStringPadZero = computed(() =>
  lunarDateString.value.length === 1
    ? `初${lunarDateString.value}`
    : lunarDateString.value
);

const monthEnglishString = computed(() =>
  date.value.toLocaleString("en-US", { month: "long" })
);
const dayJapaneseString = computed(() =>
  date.value.toLocaleString("ja-JP", { weekday: "long" })
);
const dayEnglishString = computed(() =>
  date.value.toLocaleString("en-US", { weekday: "long" })
);

const showDatePicker = () => {
  inputDateRef.value?.showPicker();
};

onMounted(() => {
  content.value = localStorage.getItem(dateLiteral.value) || "";
});
</script>

<template>
  <main :style="{ color: color }">
    <div class="spacer"></div>
    <section class="top">
      <nav>
        <p>{{ lunarYearString }}年</p>
        <p>{{ lunarMonthString }}月</p>
        <p>{{ lunarDateStringPadZero }}日</p>
      </nav>
      <div class="title">
        <h1>{{ solarYearNumber }}</h1>
        <h2>{{ solarFullString }}</h2>
      </div>
      <nav>
        <!-- <p>七十二候</p> -->
        <!-- <p>六曜九星</p> -->
        <!-- <p>二十四節</p> -->
      </nav>
    </section>
    <section class="middle">
      <div class="calendar"></div>
      <div class="number">
        <a role="button" href="" tabindex="0" @click.prevent="showDatePicker">
          {{ solarDateNumber }}
        </a>
      </div>
      <div class="calendar"></div>
    </section>
    <section class="bottom">
      <div class="property">{{ monthEnglishString }}</div>
      <div class="day">
        <input type="date" v-model="dateLiteral" ref="inputDateRef" hidden />
        {{ dayJapaneseString }}
      </div>
      <div class="property right">{{ dayEnglishString }}</div>
    </section>
    <section class="blank">
      <textarea class="memo" v-model="content" />
    </section>
  </main>
</template>

<style scoped>
main {
  display: flex;
  flex-direction: column;
  width: min(100vw, 430px);
  height: auto;
  aspect-ratio: calc(5 / 8);
  margin: 0 auto;
  background-color: white;
}

.spacer {
  height: 1rem;
}

.top,
.middle,
.bottom {
  display: flex;
  border-bottom: solid 0.2rem;
}

p {
  margin: 0;
}

nav {
  width: 4rem;
  height: 4rem;
  line-height: calc(4 / 3) rem;
  text-align-last: justify;
}

.title,
.number {
  flex: 1;
}

h1,
h2 {
  display: block;
  text-align: center;
  margin: 0;
}

h1 {
  line-height: 3rem;
  font-size: 2rem;
  font-family: serif;
}

h2 {
  font-size: 1rem;
  line-height: calc(4 / 3) rem;
  font-weight: normal;
}

.middle {
  padding: 1rem 0;
}

.calendar {
  width: 6rem;
  height: 6rem;
  border: 0.05rem solid;
  box-sizing: content-box;
}

.number {
  font-size: 6rem;
  line-height: 6rem;
  text-align: center;
  font-family: serif;
  font-weight: bold;
  letter-spacing: -0.5rem;
}

.number a {
  color: inherit;
  text-decoration: none;
  cursor: pointer;
}

.bottom {
  align-items: end;
}

.property {
  flex: 1;
  height: 100%;
  text-transform: uppercase;
  font-weight: bold;
  font-size: 1.25rem;
  line-height: 2.5rem;
}

.right {
  text-align: right;
}

.day {
  flex: 1;
  text-align: center;
  font-size: 1.5rem;
  line-height: 2.5rem;
  font-weight: bold;
}

.blank {
  flex: 1;
  padding: 1rem 0;
}

.memo {
  width: 100%;
  height: 100%;
  background-color: inherit;
  color: black;
  font-size: 1rem;
  line-height: 1.5rem;
  padding: 0;
  box-sizing: border-box;
  border: none;
  resize: none;
}
</style>
