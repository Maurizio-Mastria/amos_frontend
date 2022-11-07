import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import ProductsSimple from './views/products/ProductsSimple.vue'
import ProductSimple from './views/products/ProductSimple.vue'
import Offers from './views/offers/Offers.vue'
import Categories from './views/products/Categories.vue'
import Company from './views/companies/Company.vue'
import Companies from './views/companies/Companies.vue'
import Profile from './views/Profile.vue'
import Profiles from './views/Profiles.vue'
import Permissions from './views/Permissions.vue'
import Orders from './views/orders/Orders.vue'
import Order from './views/orders/Order.vue'
import Shippings from './views/shippings/Shippings.vue'
import Shipping from './views/shippings/Shipping.vue'
import Imports from './views/imports/Imports.vue'
import ImportsNew from './views/imports/ImportsNew.vue'
import Login from './views/Login.vue'
import About from './views/About.vue'
import VueAxios from 'vue-axios'
import axios from 'axios'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import VueCookies from 'vue-cookies'
 

const options = {
    // You can set your default options here
};


if($(".selectpicker").length != 0){
    $(".selectpicker").selectpicker();
}
const router = createRouter({
    history: createWebHistory(),
    routes:[
        {path : '/products/simple/', name: 'Lista Prodotti Semplici', component:ProductsSimple},
        {path : '/product/simple/', name: 'Prodotto Semplice', component:ProductSimple, props:true},
        {path : '/products/categories/', name: 'Categorie', component:Categories},
        
        {path : '/dashboard', name: 'Dashboard', component:Dashboard},
        {path : '/offers/', name: 'Offerte', component:Offers},
        {path : '/companies/', name: 'Aziende', component:Companies},
        {path : '/company/', name: 'Azienda', component:Company},
        {path : '/profiles/', name: 'Utenti', component:Profiles},
        {path : '/profile/', name: 'Utente', component:Profile},
        {path : '/permissions/', name: 'Permessi', component:Permissions},

        {path : '/orders/', name: 'Ordini', component:Orders},
        {path : '/order/', name: 'Ordine', component:Order},
        
        {path : '/shippings/', name: 'Spedizioni', component:Shippings},
        {path : '/shipping/', name: 'Spedizione', component:Shipping},
        {path : '/about', name: 'About', component:About},
        {path : '/login', name: 'Login', component:Login},
        {path : '/imports', name: 'Imports', component:Imports},
        {path : '/imports/new/', name: 'ImportsNew', component:ImportsNew},



        { path: '/:pathMatch(.*)*',redirect: '/dashboard/'}
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

