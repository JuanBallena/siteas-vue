<template>
  <v-btn
    v-on="prendido"
    small 
    depressed 
    icon>
    <v-icon small 
      :color="color">
      {{ icon }}
    </v-icon>
  </v-btn>
</template>

<script>
export default {
  props: {
    icon: String,
    color: String,
    prendido: Object,
  }
}
</script>