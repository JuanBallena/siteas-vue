<template>
  <v-btn
    block
    outlined
    class="white--text"
    color="cancel">
    {{ title || 'Salir' }}
  </v-btn>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>