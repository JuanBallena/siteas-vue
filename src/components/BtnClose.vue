<template>
  <v-btn
    color="cancel white--text"
    outlined
    small
    block>
    {{ title || 'Cerrar' }}
  </v-btn>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>