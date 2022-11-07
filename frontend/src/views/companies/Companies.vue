<template>
    <div>
        <Sidebar :company.sync="company" parent="dashboard" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
            <!-- End Navbar -->
            <div class="center">
                <div class="container-fluid">
                         
                    <div class="row">
                        <div class="col-xl-8">
                            <div class="card ">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-6">
                                            <h4 class="card-title">Aziende</h4>
                                            <p class="card-category">Stato delle tue aziende</p>
                                        </div>
                                        <div class="col-6 text-right">
                                            <button v-if="this.user.is_superuser" class="btn btn-info">Aggiungi azienda</button>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody>
                                                        <tr><th></th><th>Vendor ID</th><th>Rag. Sociale</th><th>P.IVA</th><th>PEC</th><th>SDI</th><th class="text-center">Stato</th><th></th></tr>
                                                        <tr v-for="(company,key) in this.companies" :key="key">
                                                            <td>
                                                                <div class="flag">
                                                                    <img :src="'/src/assets/img/flags/'+company.country+'.png'"/> </div>
                                                            </td>
                                                            <td><a title="Vedi" :href="'/company?id='+company.id"><b>{{company.vid}}</b></a></td>
                                                            <td>{{company.name}}</td>
                                                            <td>{{company.vat}}</td>
                                                            <td>{{company.pec}}</td>
                                                            <td>{{company.sdi}}</td>
                                                            <td class="text-center">
                                                                <template v-if="company.active"><i class="fa fa-circle text-success"></i></template>
                                                                <template v-else><i class="fa fa-circle text-danger"></i></template>
                                                            </td>
                                                            <td class="text-right"><a class="btn btn-warning" title="Vedi" :href="'/company?id='+company.id">Vedi</a></td>
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
                                    <Footer />
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
            this.getCompanies().then(this.getMe())
        },
        async getCompanies(){
            try{
                    const res = await this.axios.get("/api/companies/").then((res)=>{
                        this.companies=res.data.results;
                        if(this.companies.length>0){
                            this.company=res.data.results[0];
                        }
                        else{
                            this.company=null;
                            this.toast.warning("Nessuna azienda registrata");
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
        async getMe(){
            try{
                    const res = await this.axios.get("/api/me/").then((res)=>{
                        this.user=res.data.results[0];
                        
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