<template>
  <div>
    <Navbar />
    <div class="container pb-6">
      <router-view />
    </div>
  </div>
</template>

<script>
import Navbar from '@/views/layout/Navbar.vue'
export default {
  components: {
    Navbar
  },
}
</script>