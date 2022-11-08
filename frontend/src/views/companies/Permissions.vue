<template>
    <div>
        <Sidebar parent="dashboard" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav />
            <!-- End Navbar -->
            <div class="top"><div class="row col-12"><div class="col-12"><a :href="'/company?id='+this.company.id" class="btn btn-warning">Indietro</a></div></div></div>
            <div class="center">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-12">
                            <div class="card">
                                <div class="card-header">
                                    <h4 class="card-title">{{this.company.name}}</h4>
                                    <p class="card-category"><b>{{this.company.vid}}</b></p>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        
                                    </div>
                                    
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-12">
                         
                            <div class="card">
                                <div class="card-header ">
                                    <div class="row">
                                    <div class="col-6">
                                    <h4 class="card-title">Collaboratori</h4>
                                </div>
                                    <div class="col-6 text-right">
                                            <button v-on:click="savePermissions()" class="btn btn-danger">Salva modifiche</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead><tr><th>User</th><th>Nome</th><th>Cognome</th><th>Messaggi</th><th>Prodotti</th><th>Offerte</th><th>Ordini</th><th>Spedizioni</th><th>Aziende</th><th>Marketplace</th><th>Corrieri</th><th>Autorizzazioni</th><th>Stato</th><th></th></tr></thead>
                                                    <tbody>
                                                        <tr v-for="(value,key) in this.authorizations" :key="key" :value="value">
                                                            <th>{{value.username}}</th>
                                                            <td>{{value.first_name}}</td>
                                                            <td>{{value.last_name}}</td>
                                                            <td v-on:click="if(value.permissions.messages.val==2){value.permissions.messages.val=0;}else{value.permissions.messages.val++;}"><i v-if="value.permissions.messages.val == 1" class="fa fa-eye text-info"></i><i v-else-if="value.permissions.messages.val == 2" class="fa fa-pencil text-success"></i><i v-else-if="value.permissions.messages.val == 0" class="fa fa-ban text-danger"></i></td>
                                                            <td v-on:click="if(value.permissions.products.val==2){value.permissions.products.val=0;}else{value.permissions.products.val++;}"><i v-if="value.permissions.products.val == 1" class="fa fa-eye text-info "></i><i v-else-if="value.permissions.products.val == 2" class="fa fa-pencil text-success"></i><i v-else-if="value.permissions.products.val == 0" class="fa fa-ban text-danger"></i></td>
                                                            <td v-on:click="if(value.permissions.offers.val==2){value.permissions.offers.val=0;}else{value.permissions.offers.val++;}"><i v-if="value.permissions.offers.val == 1" class="fa fa-eye text-info"></i><i v-else-if="value.permissions.offers.val == 2" class="fa fa-pencil text-success"></i><i v-else-if="value.permissions.offers.val == 0" class="fa fa-ban text-danger"></i></td>
                                                            <td v-on:click="if(value.permissions.orders.val==2){value.permissions.orders.val=0;}else{value.permissions.orders.val++;}"><i v-if="value.permissions.orders.val == 1" class="fa fa-eye text-info"></i><i v-else-if="value.permissions.orders.val == 2" class="fa fa-pencil text-success"></i><i v-else-if="value.permissions.orders.val == 0" class="fa fa-ban text-danger"></i></td>
                                                            <td v-on:click="if(value.permissions.shippings.val==2){value.permissions.shippings.val=0;}else{value.permissions.shippings.val++;}"><i v-if="value.permissions.shippings.val == 1" class="fa fa-eye text-info"></i><i v-else-if="value.permissions.shippings.val == 2" class="fa fa-pencil text-success"></i><i v-else-if="value.permissions.shippings.val == 0" class="fa fa-ban text-danger"></i></td>
                                                            
                                                            
                                                            <td v-on:click="if(value.permissions.companies.val==2){value.permissions.companies.val=0;}else{value.permissions.companies.val++;}"><i v-if="value.permissions.companies.val == 1" class="fa fa-eye text-info"></i><i v-else-if="value.permissions.companies.val == 2" class="fa fa-pencil text-success"></i><i v-else-if="value.permissions.companies.val  == 0" class="fa fa-ban text-danger"></i></td>
                                                            <td v-on:click="if(value.permissions.marketplaces.val==2){value.permissions.marketplaces.val=0;}else{value.permissions.marketplaces.val++;}"><i v-if="value.permissions.marketplaces.val == 1" class="fa fa-eye text-info"></i><i v-else-if="value.permissions.marketplaces.val == 2" class="fa fa-pencil text-success"></i><i v-else-if="value.permissions.marketplaces.val == 0" class="fa fa-ban text-danger"></i></td>
                                                            <td v-on:click="if(value.permissions.couriers.val==2){value.permissions.couriers.val=0;}else{value.permissions.couriers.val++;}"><i v-if="value.permissions.couriers.val == 1" class="fa fa-eye text-info"></i><i v-else-if="value.permissions.couriers.val== 2" class="fa fa-pencil text-success"></i><i v-else-if="value.permissions.couriers.val == 0" class="fa fa-ban text-danger"></i></td>
                                                            <td v-on:click="if(value.permissions.authorizations.val==2){value.permissions.authorizations.val=0;}else{value.permissions.authorizations.val++;}"><i v-if="value.permissions.authorizations.val == 1" class="fa fa-eye text-info"></i><i v-else-if="value.permissions.authorizations.val == 2" class="fa fa-pencil text-success"></i><i v-else-if="value.permissions.authorizations.val == 0" class="fa fa-ban text-danger"></i></td>
                                                            <td v-on:click="value.is_active=!value.is_active" style="font-size: 30px;;">
                                                                <template v-if="value.is_active"><i title="Attivo" class="fa fa-check text-success"></i></template>
                                                                <template v-else><i title="Disabilitato" class="fa fa-times text-danger"></i></template>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
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
// import CheckboxButton from "../components/CheckboxButton.vue";
// import RadioButton from "../components/RadioButton.vue";
import Nav from "../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {
            company:{},
            
            authorizations:{},
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
            if(this.$route.query.company!=null){
                this.getCompany().then(this.getUsers).then(this.getMyPermissions)
            }
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
        
        saveCompany(){
            this.axios.put("/api/companies/"+this.company.id+"/",this.company).then((res)=>{
                        this.$router.go();
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
        },
        
        
        getUsers(){
            
            this.axios.get("/api/authorizations/?company="+this.company.id).then((res)=>{
                for(var i=0;i<res.data.results.length;i++){
                    if(!(res.data.results[i].user.id in this.authorizations)){
                        this.authorizations[res.data.results[i].user.id]={}
                        this.authorizations[res.data.results[i].user.id]["username"]=res.data.results[i].user.username;
                        this.authorizations[res.data.results[i].user.id]["first_name"]=res.data.results[i].user.first_name;
                        this.authorizations[res.data.results[i].user.id]["last_name"]=res.data.results[i].user.last_name;
                        this.authorizations[res.data.results[i].user.id]["last_login"]=res.data.results[i].user.last_login;
                        this.authorizations[res.data.results[i].user.id]["email"]=res.data.results[i].user.email;
                        
                        if(res.data.results[i].user.profile!=null){
                            this.authorizations[res.data.results[i].user.id]["phone"]=res.data.results[i].user.profile.phone;
                        }
                        else{
                            this.authorizations[res.data.results[i].user.id]["phone"]=null;
                        }
                        this.authorizations[res.data.results[i].user.id]["is_active"]=res.data.results[i].user.is_active;
                        this.authorizations[res.data.results[i].user.id]["permissions"]={};    
                    }
                    this.authorizations[res.data.results[i].user.id]["permissions"][res.data.results[i].application]={}
                    this.authorizations[res.data.results[i].user.id]["permissions"][res.data.results[i].application]["id"]=res.data.results[i].id;
                    this.authorizations[res.data.results[i].user.id]["permissions"][res.data.results[i].application]["val"]=res.data.results[i].permission;

                }
                
            }).catch((error)=>{
                if(error.response!=null){
                    this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                }
            })
        
        },
        savePermissions(){
            var errors="";
            for(const [key,value] of Object.entries(this.authorizations)){

                for(const [application,obj] of Object.entries(value.permissions)){
                    var perm={};
                    perm["application"]=application;
                    perm["permission"]=obj["val"];
                    
                    this.axios.put("/api/authorizations/"+obj["id"]+"/?company="+this.company.id,perm).then((res)=>{
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                            errors+=String(application)+" "+String(error.response.status)+" "+String(error.response.statusText)+"\n";
                        }
                    })
                }
                
            }
            if(errors.length>0){
                this.toast.error("Alcune autorizzazioni non sono state salvate\n"+errors)
            }
            else{
                this.toast.success("Autorizzazioni salvate");
            }
        },

        
        
        
        
        
        
        



    },
    components:{
        Sidebar,
        Nav
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

td,th{
    padding:5px 5px 5px 5px;
    text-align: center;
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