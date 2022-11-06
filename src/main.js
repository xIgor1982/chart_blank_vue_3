import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { loadFonts } from './plugins/webfontloader';
import 'chartjs-adapter-date-fns';
// import 'chartjs-adapter-luxon';

loadFonts();

createApp(App).use(vuetify).mount('#app');
