<template>
  <v-list-item :to="{ name: routeName }">
    <v-list-item-title>
      {{ title }}
    </v-list-item-title>
  </v-list-item>
</template>

<script>
export default {
  props: {
    routeName: String,
    title: String,
  }
}
</script>