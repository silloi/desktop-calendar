<template>
  <div class="container">
    <slot></slot>
  </div>
</template>

<style scoped>
.container {
  border: solid 1px;
  width: min(100vw, calc(430px + 4rem));
  aspect-ratio: calc(5 / 8);
  margin: 0 auto;
  display: flex;
  align-items: center;
}
</style>
