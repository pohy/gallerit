import Vue from 'vue'
import App from './components/App.vue'
import store from './vuex/store';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/scss/bootstrap-flex.scss';
import 'bootstrap/dist/js/bootstrap';

Vue.config.debug = true;

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
