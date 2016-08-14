import Vue from 'vue'
import App from './App.vue'
import store from './store';

// import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/scss/bootstrap-flex.scss';
import 'bootstrap/dist/js/bootstrap';

new Vue({
  el: '#app',
  store,
  render: h => h(App)
});
