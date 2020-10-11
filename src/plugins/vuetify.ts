import Vue from 'vue';
import Vuetify from 'vuetify';
import 'vuetify/dist/vuetify.min.css';

Vue.use(Vuetify);

export default new Vuetify({
  theme: {
      options: {
        customProperties: true,
      },
    themes: {
      light: {
        primary: '#0D47A1',
        secondary: '#009688',
        accent: '#E8EAF6',
        error: '#FF5252',
        info: '#C8E6C9',
        success: '#4CAF50',
        warning: '#FFC107',
        cancel: '#EF5350',
      },
    },
  },
  icons: {
    iconfont: 'fa',
  },
});
