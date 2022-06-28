import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import Products from './views/products/Products.vue'
import ProductEdit from './views/products/ProductEdit.vue'
import ProductsSimple from './views/products/ProductsSimple.vue'
import ProductsConfigurable from './views/products/ProductsConfigurable.vue'
import ProductsMultiple from './views/products/ProductsMultiple.vue'
import ProductsBulk from './views/products/ProductsBulk.vue'
import Orders from './views/Orders.vue'
import Messages from './views/Messages.vue'
import Shippings from './views/Shippings.vue'
import Imports from './views/Imports.vue'
import ImportsNew from './views/ImportsNew.vue'
import Login from './views/Login.vue'
import About from './views/About.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import "bootstrap/dist/css/bootstrap.min.css";
import VueCookies from 'vue-cookies'
 

const options = {
    // You can set your default options here
};



const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path : '/', name: 'Dashboard', component:Dashboard},
        {path : '/products', name: 'Prodotti', component:Products},
        {path : '/products/edit', name: 'Prodotto', component:ProductEdit, props:true},
        {path : '/products/simple', name: 'Prodotti Semplici', component:ProductsSimple},
        {path : '/products/configurable', name: 'Prodotti Configurabili', component:ProductsConfigurable},
        {path : '/products/multiple', name: 'Prodotti Multipli', component:ProductsMultiple},
        {path : '/products/bulk', name: 'Prodotti Misti', component:ProductsBulk},
        {path : '/orders', name: 'Ordini', component:Orders},
        {path : '/messages', name: 'Messaggi', component:Messages},
        {path : '/shippings', name: 'Spedizioni', component:Shippings},
        {path : '/about', name: 'About', component:About},
        {path : '/login', name: 'Login', component:Login},
        {path : '/imports', name: 'Imports', component:Imports},
        {path : '/imports/new/', name: 'ImportsNew', component:ImportsNew},
        { path: '/:pathMatch(.*)*',redirect: '/'}
    ]
})

router.beforeEach((to, from) => {
    if($cookies.get('Authorization')){
        if(to.name!=="Login")return true;
        return {name:"Dashboard"}
    }
    if(to.name=='Login')return true
    return {name:'Login'}
})

axios.interceptors.request.use(function (config) {
    if(config.url!=="/api/login/"){
        config.headers.Authorization = 'Token '+$cookies.get('Authorization');
    }
    
    return config;
  }, function (error) {
    router.go("/login");
});
axios.interceptors.response.use(function (response) {
    return response;
  }, function (error) {
    // Do something with response error
    if(error.response.status === 401){
        $cookies.remove('Authorization');
        router.go("/login");
    }
    return Promise.reject(error);
  });

const app=createApp(App)
app.use(router)

app.use(VueAxios,axios)
app.use(Toast)
app.use(VueCookies, {expire:'7d'})
app.mount('#app')

import "bootstrap/dist/js/bootstrap.js"

