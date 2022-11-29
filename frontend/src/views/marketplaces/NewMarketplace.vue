<template>
    <div>
        <Sidebar parent="dashboard" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav :company.sync="this.company" :companies.sync="this.companies" @update:company="(index) => changeCompany(index)" />
            <!-- End Navbar -->
            <div class="top"><div class="row col-12"><div class="col-12"><a v-if="company" class="btn btn-warning" :href="'/marketplaces/?company='+this.company.id">Indietro</a></div></div></div>
            <div class="center">
                <div class="container-fluid">
                    

                    <div class="row">
                        <div class="col-md-6 m-auto">
                            <div class="card ">
                                <div class="card-header">
                                    <h4 class="card-title">Aggiungi un nuovo Marketplace</h4>
                                    
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table table-company">
                                                    <tbody>
                                                        <tr><th>Account</th><td><input placeholder="L'email del tuo account" type="email" v-model="marketplace.account"/></td></tr>
                                                        <tr>
                                                            <th>Nazione<img v-if="marketplace.country!=null" class="ml-2" :src="'/src/assets/img/flags/'+marketplace.country+'.png'"/></th>
                                                            <td>
                                                                <select class="custom-select" v-model="marketplace.country">
                                                                    <option selected value="IT">Italia</option>
                                                                    <option value="DE">Germania</option>
                                                                    <option value="ES">Spagna</option>
                                                                    <option value="FR">Francia</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        <tr>
                                                            <th>Tipo Marketplace</th>
                                                            <td>
                                                                <select class="custom-select" v-model="marketplace.code">
                                                                    <option selected value="AMZ">Amazon</option>
                                                                    <option value="NVX">Nevix</option>
                                                                    <option value="EBY">Ebay</option>
                                                                    <option value="WDP">Wordpress</option>
                                                                    <option value="MAG">Magento</option>
                                                                    <option value="Prestashop">Prestashop</option>
                                                                </select>
                                                            </td>
                                                        </tr>
                                                        
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        
                                    </div>
                                    <div class="row">
                                        <div class="col-6 text-left">
                                            <button class="btn btn-info" v-on:click="this.$router.go(-1)">Annulla</button>
                                        </div>
                                        <div class="col-6 text-right">
                                            <button class="btn btn-danger" v-on:click="this.addMarketplace()">Aggiungi</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <!-- <div class="card ">
                                <div class="card-header ">
                                    <div class="row">
                                        <div class="col-6">
                                            <h4 class="card-title">Collaboratori</h4>
                                        </div>
                                        <div class="col-6 text-right">
                                            <a :href="'/permissions/?company='+this.company.id" class="btn btn-info">Modifica permessi</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr><th>User</th><th>Nome</th><th>Cognome</th><th>Email</th><th>Tel</th><th>Ultimo login</th><th class="text-center">Stato</th><th></th></tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                        <tr v-for="(value,key) in this.authorizations" :key="key" :value="value">
                                                            <th>{{value.username}}</th>
                                                            <td>{{value.first_name}}</td>
                                                            <td>{{value.last_name}}</td>
                                                            <td>{{value.email}}</td>
                                                            <td>{{value.phone}}</td>
                                                            <td>{{value.last_login}}</td> 
                                                            <td class="text-center">
                                                                <template v-if="value.is_active"><i title="Attivo" class="fa fa-circle text-success"></i></template>
                                                                <template v-else><i title="Disabilitato" class="fa fa-circle text-danger"></i></template>
                                                            </td>
                                                            <td class="text-right">
                                                                <a :href="'/user?id='+key+'&company='+this.company.id" rel="tooltip" class="btn btn-warning" title="Vedi profilo">
                                                                    <i class="fa fa-user"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div> -->
                           
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
            company:null,
            companies:[],
            marketplace:{
                company:null,
                country:null,
                code:null,
                status:false,
                website:null,
                endpoint:null,
                endpoint_user:null,
                endpoint_password:null,
                
            },
            me:null,
            
            
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
            this.getCompanies().then(this.getMarketplaces).then(this.getMe())
        },
        async getCompanies(){
            try{
                    const res = await this.axios.get("/api/companies/").then((res)=>{
                        
                        if(res.data.results.length==0){
                            this.toast.warning("Nessuna azienda registrata");
                        }
                        else{
                            this.companies=res.data.results;
                            if(this.$route.query.company){
                                for(var i=0;i<this.companies.length;i++){
                                    if(this.companies[i].id==this.$route.query.company){
                                        this.company=this.companies[i];
                                    }
                                }
                            }
                            else{
                            this.company=this.companies[0];
                            }
                            this.marketplace.company=this.company.id;
                        }
                            

                        
                    }).catch((error)=>{
                        if(error.response!=null){
                        this.toast.error(error.response.data.detail);
                        }
                    })
                }
                catch(error) {
                    this.toast.error("Errore indefinito (Azienda)");
                };

        },
        async getMarketplaces(){
            try{
                    const res = await this.axios.get("/api/marketplaces/?company="+this.company.id).then((res)=>{
                        this.marketplaces=res.data.results;
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                        this.toast.error(error.response.data.detail);
                        }
                    })
                }
                catch(error) {
                    this.toast.error("Errore indefinito (Marketplaces)");
                };

        },
        
        async getMe(){
            try{
                    const res = await this.axios.get("/api/me/").then((res)=>{
                        this.user=res.data.results[0];
                        if(this.user.is_staff){
                            
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
        addMarketplace(){
            this.axios.post("/api/marketplaces/?company="+this.company.id,this.marketplace).then((res)=>{
                        this.toast.success("Marketplace aggiunto");
                        this.$router.push("/marketplaces?company="+this.company.id);
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText));
                            var message="";
                            for(const [field,value] of Object.entries(error.response.data)){
                                message+=String(field)+" ";
                                for(var i=0;i<value.length; i++){
                                    message+=String(value[i])+" ";
                                }
                                message+="\n";
                            }
                            this.toast.error(message);
                        }
                    })
        },

        
        changeCompany(key){
            
            window.location.href='/marketplaces/new?company='+this.companies[key].id;
            
        }
        
        
        
        
        
        
        
        
        



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
.table-company tr td > *{
    
    width:100%;
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