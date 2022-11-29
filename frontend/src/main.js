import { createApp } from 'vue'
import {createRouter, createWebHistory} from 'vue-router'
import App from './App.vue'
import Dashboard from './views/Dashboard.vue'
import ProductNew from './views/products/ProductNew.vue'
import ProductsSimple from './views/products/simple/ProductsSimple.vue'
import ProductSimple from './views/products/simple/ProductSimple.vue'
import ProductsConfigurable from './views/products/configurable/ProductsConfigurable.vue'
import ProductConfigurable from './views/products/configurable/ProductConfigurable.vue'
import Offers from './views/offers/Offers.vue'
import Categories from './views/categories/Categories.vue'
import NewCategory from './views/categories/NewCategory.vue'
import Category from './views/categories/Category.vue'
import Attributes from './views/attributes/Attributes.vue'
import NewAttribute from './views/attributes/NewAttribute.vue'
import Attribute from './views/attributes/Attribute.vue'
import Company from './views/companies/Company.vue'
import NewCompany from './views/companies/NewCompany.vue'
import Companies from './views/companies/Companies.vue'
import Marketplace from './views/marketplaces/Marketplace.vue'
import NewMarketplace from './views/marketplaces/NewMarketplace.vue'
import Marketplaces from './views/marketplaces/Marketplaces.vue'
import User from './views/users/User.vue'
import NewUser from './views/users/NewUser.vue'
import Users from './views/users/Users.vue'
import Permissions from './views/companies/Permissions.vue'
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
        {path : '/product/new/', name: 'Nuovo Prodotto', component:ProductNew},
        {path : '/products/simple/', name: 'Lista Prodotti Semplici', component:ProductsSimple},
        {path : '/product/simple/', name: 'Prodotto Semplice', component:ProductSimple, props:true},
        {path : '/products/configurable/', name: 'Lista Prodotti Configurabili', component:ProductsConfigurable},
        {path : '/product/configurable/', name: 'Prodotto Configurabile', component:ProductConfigurable, props:true},
        {path : '/categories/', name: 'Categorie', component:Categories},
        {path : '/categories/new/', name: 'Nuova Categorie', component:NewCategory},
        {path : '/category/', name: 'Categoria', component:Category},
        {path : '/attributes/', name: 'Attributi', component:Attributes},
        {path : '/attributes/new/', name: 'Nuovo Attributo', component:NewAttribute},
        {path : '/attribute/', name: 'Attributo', component:Attribute},
        
        {path : '/dashboard', name: 'Dashboard', component:Dashboard},
        {path : '/offers/', name: 'Offerte', component:Offers},
        {path : '/companies/', name: 'Aziende', component:Companies},
        {path : '/company/', name: 'Azienda', component:Company},
        {path : '/companies/new/', name: 'Nuova Azienda', component:NewCompany},
        {path : '/marketplaces/', name: 'Marketplaces', component:Marketplaces,props:true},
        {path : '/marketplace/', name: 'Marketplace', component:Marketplace,props:true},
        {path : '/marketplaces/new/', name: 'New Marketplace', component:NewMarketplace,props:true},

        
        {path : '/permissions/', name: 'Permessi', component:Permissions},

        {path : '/orders/', name: 'Ordini', component:Orders},
        {path : '/order/', name: 'Ordine', component:Order},
        
        {path : '/shippings/', name: 'Spedizioni', component:Shippings},
        {path : '/shipping/', name: 'Spedizione', component:Shipping},
        {path : '/about', name: 'About', component:About},
        {path : '/login', name: 'Login', component:Login},
        {path : '/imports', name: 'Imports', component:Imports},
        {path : '/imports/new/', name: 'ImportsNew', component:ImportsNew},

        {path : '/user', name: 'Utente', component:User},
        {path : '/users/new/', name: 'Nuovo utente', component:NewUser},
        {path : '/users/', name: 'Utenti', component:Users},


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

