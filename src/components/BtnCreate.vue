<template>
  <v-btn
    small
    class="px-5"
    color="secondary">
    {{ title || 'Nuevo' }}
  </v-btn>
</template>

<script>
export default {
  props: {
    title: String
  }
}
</script>
