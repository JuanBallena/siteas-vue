<template>
  <div class="d-flex">
    <v-icon
      class="icon"
      small
      :color="color">
      {{ icon }}
    </v-icon>
    <span class="text">
      {{ text }}
      <slot></slot>
    </span>
  </div>
</template>

<script>
export default {
  props: {
    icon: String,
    text: String,
    color: String,
  }
}
</script>

<style scoped>
.icon{
  width: 20px;
}
.text{
  font-size: 14px; 
  font-weight: bold;
  color: black;
  padding: 4px 0 0 8px;
}
</style>