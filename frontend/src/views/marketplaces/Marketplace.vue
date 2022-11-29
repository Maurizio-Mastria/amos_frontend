<template>
    <div>
        <Sidebar parent="dashboard" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav />
            <!-- End Navbar -->
            <div class="top"><div class="row col-12"><div class="col-12"><a class="btn btn-warning" @click="this.$router.push('/marketplaces?company='+this.company.id)">Torna ai Marketplaces</a></div></div></div>
            <div class="center">
                <div class="container-fluid" v-if="this.marketplace">
                    

                    <div class="row ">
                        <div class="col-md-6 m-auto">
                            <div class="card ">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-7">
                                            <h4 class="card-title">{{this.marketplace.account}}</h4>
                                            <p class="card-category"><b>{{this.marketplace.code}} {{this.marketplace.country}}</b></p>
                                        </div>
                                        <div class="col-5 text-right">
                                            <template v-if="user.is_staff">
                                                <button class="btn btn-danger" v-on:click="this.setMarketplaceStatus()" v-if="marketplace.status==true">Disattiva</button>
                                                <button class="btn btn-success" v-on:click="this.setMarketplaceStatus()" v-if="marketplace.status==false">Attiva</button>
                                            </template>
                                        </div>        
                                    </div>
                                </div>
                                
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody>
                                                        <tr><th>Account</th><th>{{marketplace.account}}</th></tr>
                                                        <tr><th>Tipo</th><td>{{marketplace.code}}</td></tr>
                                                        <tr><th>Nazione</th><td>{{marketplace.country}}<img class="ml-2" :src="'/src/assets/img/flags/'+marketplace.country+'.png'"/></td></tr>
                                                        <template v-if="!this.modify.marketplace">
                                                            <tr><th>Sito Web</th><td>{{marketplace.website}}</td></tr>
                                                            <tr><th>API Endpoint</th><td>{{marketplace.endpoint}}</td></tr>
                                                            <tr><th>API User</th><td>{{marketplace.endpoint_user}}</td></tr>
                                                            <tr><th>API Password</th><td>{{marketplace.endpoint_password}}</td></tr>
                                                        </template>
                                                        <template v-else>
                                                            <tr><th>Sito Web</th><td><input type="url" v-model="marketplace.website"/></td></tr>
                                                            <tr><th>API Endpoint</th><td><input type="url" v-model="marketplace.endpoint"/></td></tr>
                                                            <tr><th>API User</th><td><input type="text" v-model="marketplace.endpoint_user"/></td></tr>
                                                            <tr><th>API Password</th><td><input type="text" v-model="marketplace.endpoint_password"/></td></tr>
                                                        </template>
                                                        <tr><th>Stato</th><th><template v-if="marketplace.status"><i class="fa fa-circle text-success mr-4"></i>ATTIVO</template><template v-else><i class="fa fa-circle text-danger mr-4"></i>NON ATTIVO</template></th></tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 text-left">
                                            <button v-if="!modify.marketplace" class="btn btn-info" v-on:click="this.modify.marketplace=!this.modify.marketplace">Modifica</button>
                                            <button v-if="modify.marketplace" class="btn btn-info" v-on:click="this.$router.go()" >Annulla</button>
                                        </div>
                                        <div class="col-6 text-right">
                                            <button v-if="modify.marketplace" class="btn btn-success" v-on:click="this.saveMarketplace()">Invia modifiche</button>
                                        </div>
                                    </div>
                                    
                                </div>
                                <button v-if="user.is_superuser && !marketplace.status" class="btn btn-danger" v-on:click="this.deleteMarketplace()"> !!! Elimina definitivamente !!! </button>
                            </div>
                        </div>
                        
                    </div>
                                            <div class="row">
                                                
                                                

                                            </div>
                                            
                                        </div>
                                    </div>
                                </div>
                            </div>
    
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";
import Footer from "../../components/Footer.vue";
// import CheckboxButton from "../components/CheckboxButton.vue";
// import RadioButton from "../components/RadioButton.vue";
import Nav from "../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {
            company:null,
            companies:null,
            marketplace:null,
            modify:{
                marketplace:false,
            },
            me:{},
        }
}
export default{
    data(){
        return initialState();
    },
    setup(){
        const toast = useToast();
        return { toast }
    },
	mounted(){
        this.init();
    },
    computed:{
        
        
        },
	methods:{
        async init(){
            if(this.$route.query.id!=null){
                this.getMe().then(this.getCompanies).then(this.getCompany).then(this.getMarketplace)
            }
        },
        async getCompanies(){
            try{
                    const res = await this.axios.get("/api/companies/").then((res)=>{
                        this.companies=res.data.results;
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
                }
                catch(error) {
                    this.toast.error("Errore indefinito (Azienda)");
                };

        },
        async getCompany(){
            try{
                    const res = await this.axios.get("/api/companies/"+this.$route.query.company+"/").then((res)=>{
                        this.company=res.data;
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
                }
                catch(error) {
                    this.toast.error("Errore indefinito (Azienda)");
                };

        },

        async getMarketplace(){
            try{
                    const res = await this.axios.get("/api/marketplaces/"+this.$route.query.id+"/?company="+this.company.id).then((res)=>{
                        this.marketplace=res.data;

                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
                }
                catch(error) {
                    this.toast.error("Errore indefinito (Marketplace)");
                };

        },
        
        saveMarketplace(){
            this.axios.put("/api/marketplaces/"+this.marketplace.id+"/?company="+this.company.id,this.marketplace).then((res)=>{
                        this.toast.success("Modifiche salvate");
                        this.$router.go();
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
        },
        
        setMarketplaceStatus(){
            var data={};
            data["status"]=!this.marketplace.status;
            this.axios.put("/api/marketplaces/"+this.marketplace.id+"/?company="+this.company.id,data).then((res)=>{
                        if(res.data.status){
                            this.toast.success("Marketplace attivato");
                            this.init();
                        }
                        else{
                            this.toast.error("Marketplace disattivato");
                            this.init();
                        }
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
        },
        
        
        
        async getMe(){
            try{
                    const res = await this.axios.get("/api/me/").then((res)=>{
                        this.user=res.data.results[0];
                        if(this.user.is_staff){
                            this.getAllUsers();
                        }
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                        this.toast.error(error.response.data.detail);
                        }
                    })
                }
                catch(error) {
                    this.toast.error("Errore indefinito (Recupero Utente)");
                };

        },
        
        
        
        
        deleteMarketplace(){
            this.axios.delete("/api/marketplaces/"+this.marketplace.id+"/?company="+this.company.id).then((res)=>{
                        this.toast.success("Marketplace eliminato definitivamente");
                        this.$router.go("/marketplaces");
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText));
                        }
                    })
        },
        
        changeCompany(key){
            
            window.location.href='/marketplaces/new/?company='+this.companies[key].id;
            
        }
        



    },
    components:{
        Sidebar,
        Nav,Footer
        // CheckboxButton,RadioButton
        
    }


    

}
</script>
<style scoped>

#left-col{
    position:fixed;
    width:400px;
    right:var(--right-width);
    
  padding: 10px ;
    color: rgb(26, 26, 26);
    min-height:100px;

  background:
    linear-gradient(white, white) padding-box,
    linear-gradient(to right, #FFA534, #FFA534) border-box;
    
  border-right : 5px solid transparent;
  border-left : 5px solid transparent;
  border-top : 1px solid transparent;
  border-bottom : 1px solid transparent;
  

        }

td{
    padding:5px 5px 5px 5px;
}
.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(500px);
  opacity: 0;
}
.z-9{
    z-index:999999;
}
</style>