<template>
  <v-btn
    color="cancel white--text"
    outlined
    small
    block>
    {{ title || 'Cancelar' }}
  </v-btn>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>