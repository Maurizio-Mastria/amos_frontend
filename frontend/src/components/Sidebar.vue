<template>
    <div class="sidebar" data-color="orange" data-image="/src/assets/img/sidebar/sidebar-5.jpg">
            <!--
        Tip 1: You can change the color of the sidebar using: data-color="purple | blue | green | orange | red"

        Tip 2: you can also add an image using data-image tag
    -->
            <div class="sidebar-wrapper">
                <div class="logo">
                    <router-link to="/" class="simple-text logo-mini writer"><b>A</b></router-link>
                    <router-link to="/" class="simple-text logo-normal writer"><b>AMOS</b></router-link>
                </div>
                <div class="user">
                    <div class="photo">
                        <img src="/src/assets/img/default-avatar.png" />
                    </div>
                    <div class="info">
                        <a data-toggle="collapse" href="#collapseExample" class="collapsed">
                            <span>#NOME UTENTE#
                                <b class="caret"></b>
                            </span>
                        </a>
                        <div class="collapse" id="collapseExample">
                            <ul class="nav">
                                <li>
                                    <a class="profile-dropdown" href="#">
                                        <span class="sidebar-mini"><i class="fa fa-eye"></i></span>
                                        <span class="sidebar-normal">Vedi</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="profile-dropdown" href="#">
                                        <span class="sidebar-mini"><i class="fa fa-pencil"></i></span>
                                        <span class="sidebar-normal">Modifica</span>
                                    </a>
                                </li>
                                <li>
                                    <a class="profile-dropdown" href="#">
                                        <span class="sidebar-mini"><i class="fa fa-gear"></i></span>
                                        <span class="sidebar-normal">Impostazioni</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <ul class="nav" v-if="company || my_permission.is_superuser || my_permission.is_staff">
                    <li class="nav-item ">
                        <a class="nav-link" href="/dashboard">
                            <i class="nc-icon nc-chart-pie-35"></i>
                            <p>Dashboard</p>
                        </a>
                    </li>
                    <li v-if="my_permission.permissions.products>0 || my_permission.is_superuser || my_permission.is_staff" class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#products">
                            <i class="nc-icon nc-app"></i>
                            <p>
                                Prodotti
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse " id="products">
                            <ul class="nav">
                                <li class="nav-item">
                                    <a class="nav-link" href="/product/new/">
                                        <span class="sidebar-normal">Nuovo</span>
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a class="nav-link" href="/products/simple/">
                                        
                                        <span class="sidebar-normal">Semplici</span>
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a class="nav-link" href="/products/configurable/">
                                        <span class="sidebar-normal">Configurabili</span>
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a class="nav-link" href="/products/multiple/">
                                        <span class="sidebar-normal">Multipli</span>
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a class="nav-link" href="/products/bulk/">
                                        <span class="sidebar-normal">Composti</span>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </li>
                    <li v-if="my_permission.permissions.offers>0 || my_permission.is_superuser || my_permission.is_staff" class="nav-item">
                        <a class="nav-link" href="/inventory">
                            <i class="nc-icon nc-chart-pie-35"></i>
                            <p>Inventario</p>
                        </a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#categories">
                            <i class="nc-icon nc-bullet-list-67"></i>
                            <p>
                                Categorie
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse " id="categories">
                            <ul class="nav">
                                <li class="nav-item ">
                                    <a class="nav-link" href="/products/categories/">
                                        <span class="sidebar-normal">Vedi</span>
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a class="nav-link" href="/products/custom_attributes/">
                                        <span class="sidebar-normal">Attributi</span>
                                    </a>
                                </li>
                                
                                
                            </ul>
                        </div>
                    </li>
                    <li v-if="my_permission.permissions.orders>0 || my_permission.is_superuser || my_permission.is_staff" class="nav-item">
                        <a class="nav-link" data-toggle="collapse" href="#orders">
                            <i class="nc-icon nc-bullet-list-67"></i>
                            <p>
                                Ordini
                                <b class="caret"></b>
                            </p>
                        </a>
                        <div class="collapse " id="orders">
                            <ul class="nav">
                                <li class="nav-item ">
                                    <a class="nav-link" href="/orders/?status=N">
                                        <span class="sidebar-mini"><i class="fa fa-exclamation"></i></span>
                                        <span class="sidebar-normal">Nuovi</span>
                                    </a>
                                </li>
                                <li class="nav-item ">
                                    <a class="nav-link" href="/orders/">
                                        <span class="sidebar-mini"><i class="fa fa-list"></i></span>
                                        <span class="sidebar-normal">Tutti gli ordini</span>
                                    </a>
                                </li>
                                
                            </ul>
                        </div>
                    </li>
                    
                </ul>
            </div>
        </div>
</template>

<script>
import { useToast } from "vue-toastification";
function initialState (){
return {
        my_permission:{},
    }
}

export default{
    props: {
        parent: String,
        child: String,
        company:Object,
    },

    data(){
        return initialState();
    },
    setup(){
        const toast = useToast();
        return { toast }
    },
	mounted(){
        this.getMyPermissions();
    },
    methods:{
        getMyPermissions(){
            var url="/api/me/authorizations/";
            if(this.company){
                url+="?company="+this.company.id;
            }
            this.axios.get(url).then((res)=>{
                this.my_permission=res.data;
                    
                        
                        
                
                
            }).catch((error)=>{
                if(error.response!=null){
                    this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                }
            })
        },
    }
    
}
</script>
