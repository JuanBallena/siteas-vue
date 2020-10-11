<template>
  <v-btn
    small
    color="primary"
    depressed>
    {{ title }}
  </v-btn>
</template>

<script>
export default {
  props: {
    title: String,
  }
}
</script>