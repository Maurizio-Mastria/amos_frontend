<template>
    <div>
        <Sidebar :company.sync="company" parent="dashboard" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav :company.sync="this.company" :companies.sync="this.companies" @update:company="(index) => changeCompany(index)" />
            <!-- End Navbar -->
            <div class="center">
                <div class="container-fluid">
                         
                    <div class="row">
                        <div class="col-xl-12">
                            <div class="card ">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-6">
                                            <h4 class="card-title">Marketplaces</h4>
                                            <p class="card-category">Stato dei tuoi Marketplace</p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <a :href="'/marketplaces/new/?company='+this.company.id" v-if="this.user.is_staff" class="btn btn-info">Aggiungi Marketplace</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody>
                                                        <tr><th>Vendor ID</th><th>Vendor</th><th>Account</th><th>Tipo</th><th>Nazione</th><th>Sito Web</th><th class="text-center">Stato</th><th></th></tr>
                                                        <tr v-for="(marketplace,key) in this.marketplaces" :key="key">
                                                            <td>{{company.vid}}</td>
                                                            <td>{{company.name}}</td>
                                                            <td><b>{{marketplace.account}}</b></td>
                                                            <td>
                                                                
                                                                    <template v-if="marketplace.code=='AMZ'"><b>Amazon</b></template>
                                                                    <template v-else-if="marketplace.code=='EBY'"><b>EBAY</b></template>
                                                                    <template v-else-if="marketplace.code=='NVX'"><b>Nevix</b></template>
                                                                    <template v-else-if="marketplace.code=='WDP'"><b>Wordpress</b></template>
                                                                    <template v-else-if="marketplace.code=='MAG'"><b>Magento</b></template>
                                                                
                                                            </td>    
                                                            
                                                            <td>
                                                                <div class="flag">
                                                                    <img :src="'/src/assets/img/flags/'+marketplace.country+'.png'"/> </div>
                                                                </td>
                                                            <td>{{marketplace.website}}</td>
                                                            <td>
                                                                <template v-if="marketplace.status"><i class="fa fa-circle text-success"></i></template>
                                                                <template v-else><i class="fa fa-circle text-danger"></i></template>
                                                            </td>
                                                            <td class="text-right"><a class="btn btn-warning" title="Vedi" :href="'/marketplace?id='+marketplace.id+'&company='+this.company.id">Vedi</a></td>
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
                                       
                                            
                                        </div>
                                    </div>
                                    
                                </div>
    </div>
    
</template>

<script>
import Sidebar from "../../components/Sidebar.vue";
// import Footer from "../../components/Footer.vue";
// import CheckboxButton from "../components/CheckboxButton.vue";
// import RadioButton from "../components/RadioButton.vue";
import Nav from "../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {
            company:{},
            companies:[],
            marketplaces:[],
            user:{},
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
                        
                        if(res.data.results.length==0){
                            this.toast.warning("Nessun marketplace registrato");
                        }
                        else{
                            this.marketplaces=res.data.results;
                        }
                            

                        
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
        changeCompany(key){
            
            window.location.href='/marketplaces?company='+this.companies[key].id;
            
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

td,th{
    padding:5px 5px 5px 5px;
    text-align:center;
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