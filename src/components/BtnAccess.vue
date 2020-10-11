<template>
  <v-btn
    block
    :disabled="disabled"
    color="primary">
    {{ title || 'Acceder' }}
  </v-btn>
</template>

<script>
export default {
  props: {
    title: String,
    disabled: Boolean,
  }
}
</script>