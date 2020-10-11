<template>
  <div class="sub-title primary--text">{{ text }}</div>
</template>

<script>
export default {
  props: {
    text: String
  }
}
</script>

<style scoped>
.sub-title{
  font-size: 14px;
  font-weight: bold;
}
</style>