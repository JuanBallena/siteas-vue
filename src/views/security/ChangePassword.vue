<template>
  <div>
    <div class="py-5 no-visible-xs"></div>
    <v-row class="m-0">
      <v-col cols="12" lg="4" md="5" sm="8" class="mx-auto p-0">
        <v-card
          tile
          class="px-3"
          width="100%">
          <v-card-text>
            <Logo />
            <hr>
            <h6 class="text-center">BIENVENIDO {{ usuario }}</h6>
            <div class="black--text title-login text-center">
              Por seguridad, te recomendamos cambiar tu contraseña
            </div>
            <br>
            <FormChangePassword />
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>
import * as ls from '@/localStorage/index'
export default {
  data: () => {
    return {
      usuario: '',
    }
  },

  created() {
    this.usuario = ls.getUsuario()
  },
}
</script>