<template>
  <v-btn
    color="secondary"
    small
    :disabled="disabled"
    block>
    {{ title || 'Guardar' }}
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