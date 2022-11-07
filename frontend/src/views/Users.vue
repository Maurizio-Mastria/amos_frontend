<template>
    <div>
        <Sidebar parent="dashboard" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav />
            <!-- End Navbar -->
            <div class="content">
                <div class="container-fluid">
                    <div class="row">
                        <div class="col-md-5">
                            <div class="card ">
                                <div class="card-header">
                                    <h4 class="card-title">{{this.company.name}}</h4>
                                    <p class="card-category"><b>{{this.company.vid}}</b></p>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody v-if="!this.modify.company" >
                                                        <tr><th>Rag. Sociale</th><td>{{company.name}}</td></tr>
                                                        <tr><th>Vendor ID</th><td>{{company.vid}}</td></tr>
                                                        <tr><th>Indirizzo</th><td>{{company.address}}</td></tr>
                                                        <tr><th>Città</th><td>{{company.city}}</td></tr>
                                                        <tr><th>CAP</th><td>{{company.cap}}</td></tr>
                                                        <tr><th>Provincia</th><td>{{company.province}}</td></tr>
                                                        <tr><th>Nazione</th><td>{{company.country}}<img class="ml-2" :src="'/src/assets/img/flags/'+company.country+'.png'"/></td></tr>
                                                        <tr><th>PEC</th><td>{{company.pec}}</td></tr>
                                                        <tr><th>SDI</th><td>{{company.sdi}}</td></tr>
                                                    </tbody>
                                                    <tbody v-else>
                                                        <tr><th>Rag. Sociale</th><td><input type="text" v-model="company.name"/></td></tr>
                                                        <tr><th>Vendor ID</th><td>{{company.vid}}</td></tr>
                                                        <tr><th>Indirizzo</th><td><input type="text" v-model="company.address"/></td></tr>
                                                        <tr><th>Città</th><td><input type="text" v-model="company.city"/></td></tr>
                                                        <tr><th>CAP</th><td><input type="text" max="5" v-model="company.cap"/></td></tr>
                                                        <tr><th>Provincia</th><td><input maxlength="2" style="text-transform:uppercase" type="text" v-model="company.province"/></td></tr>
                                                        <tr><th>Nazione</th><td>{{company.country}}<img class="ml-2" :src="'/src/assets/img/flags/'+company.country+'.png'"/></td></tr>
                                                        <tr><th>PEC</th><td><input type="email" v-model="company.pec"/></td></tr>
                                                        <tr><th>SDI</th><td><input type="text" maxlength="7" v-model="company.sdi"/></td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 text-left">
                                            <button v-if="!modify.company" class="btn btn-info" v-on:click="this.modify.company=!this.modify.company">Modifica</button>
                                            <button v-if="modify.company" class="btn btn-info" v-on:click="this.modify.company=!this.modify.company" >Annulla</button>
                                        </div>
                                        <div class="col-6 text-right">
                                            <button v-if="modify.company" class="btn btn-success" v-on:click="this.saveCompany()">Invia modifiche</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="card ">
                                <div class="card-header ">
                                    <h4 class="card-title">Amministratori</h4>
                                </div>
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr><th>User</th><th>Nome</th><th>Cognome</th><th>Email</th><th>Tel</th><th>Ultimo login</th><th>Stato</th></tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                        <tr v-for="profile in this.vendors">
                                                            <th>{{profile.user.username}}</th>
                                                            <td>{{profile.user.first_name}}</td>
                                                            <td>{{profile.user.last_name}}</td>
                                                            <td>{{profile.user.email}}</td>
                                                            <td>{{profile.phone}}</td>
                                                            <td>{{profile.user.last_login}}</td>
                                                            <td class="text-center">
                                                                <template v-if="profile.user.is_active"><i title="Attivo" class="fa fa-circle text-success"></i></template>
                                                                <template v-else><i title="Disabilitato" class="fa fa-circle text-danger"></i></template>
                                                            </td>
                                                            <td class="td-actions text-right">
                                                                <a href="#" rel="tooltip" title="Vedi/Modifica" class="btn btn-info btn-link btn-xs" data-original-title="View Profile">
                                                                    <i class="fa fa-user"></i>
                                                                </a>
                                                                <a href="#" rel="tooltip" title="Elimina" class="btn btn-danger btn-link btn-xs" data-original-title="Remove">
                                                                    <i class="fa fa-times"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card ">
                                <div class="card-header ">
                                    <h4 class="card-title">Staff</h4>
                                </div>
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <thead><tr><th>User</th><th>Nome</th><th>Cognome</th><th>Email</th><th>Tel</th><th>Ultimo login</th><th>Stato</th></tr></thead>
                                                    <tbody>
                                                        <tr v-for="profile in this.staff">
                                                            <th>{{profile.user.username}}</th>
                                                            <td>{{profile.user.first_name}}</td>
                                                            <td>{{profile.user.last_name}}</td>
                                                            <td>{{profile.user.email}}</td>
                                                            <td>{{profile.phone}}</td>
                                                            <td>{{profile.user.last_login}}</td>
                                                            <td class="text-center">
                                                                <template v-if="profile.user.is_active"><i title="Attivo" class="fa fa-circle text-success"></i></template>
                                                                <template v-else><i title="Disabilitato" class="fa fa-circle text-danger"></i></template>
                                                            </td>
                                                            <td class="td-actions text-right">
                                                                <a href="#" rel="tooltip" title="Vedi/Modifica" class="btn btn-info btn-link btn-xs" data-original-title="View Profile">
                                                                    <i class="fa fa-user"></i>
                                                                </a>
                                                                <a href="#" rel="tooltip" title="Elimina" class="btn btn-danger btn-link btn-xs" data-original-title="Remove">
                                                                    <i class="fa fa-times"></i>
                                                                </a>
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="card table-with-links">
                                <div class="card-header ">
                                    <h4 class="card-title">Collaboratori</h4>
                                </div>
                                <div class="card-body ">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-full-width">
                                                <table class="table">
                                                    <thead><tr><th>User</th><th>Nome</th><th>Cognome</th><th>Email</th><th>Tel</th><th>Ultimo login</th><th>Stato</th></tr></thead>
                                                    <tbody>
                                                        <tr v-for="profile in this.collaborators">
                                                            <th>{{profile.user.username}}</th>
                                                            <td>{{profile.user.first_name}}</td>
                                                            <td>{{profile.user.last_name}}</td>
                                                            <td>{{profile.user.email}}</td>
                                                            <td>{{profile.phone}}</td>
                                                            <td>{{profile.user.last_login}}</td>
                                                            <td class="text-center">
                                                                <template v-if="profile.user.is_active"><i title="Attivo" class="fa fa-circle text-success"></i></template>
                                                                <template v-else><i title="Disabilitato" class="fa fa-circle text-danger"></i></template>
                                                            </td>
                                                            <td class="td-actions text-right">
                                                                <a href="#" rel="tooltip" title="" class="btn btn-info btn-link btn-xs" data-original-title="View Profile">
                                                                    <i class="fa fa-user"></i>
                                                                </a>
                                                                <a href="#" rel="tooltip" title="" class="btn btn-danger btn-link btn-xs" data-original-title="Remove">
                                                                    <i class="fa fa-times"></i>
                                                                </a>
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
                                    <Footer />
                                </div>
    </div>
    
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import Footer from "../components/Footer.vue";
// import CheckboxButton from "../components/CheckboxButton.vue";
// import RadioButton from "../components/RadioButton.vue";
import Nav from "../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {
            company:{},
            vendors:[],
            staff:[],
            collaborators:[],
            modify:{
                company:false,
            }
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
                this.getCompany().then(this.getUsers)
            }
        },
        async getCompany(){
            try{
                    const res = await this.axios.get("/api/companies/"+this.$route.query.id+"/").then((res)=>{
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
        getUsers(){
                this.company.vendors.forEach(element=>{
                    this.axios.get("/api/users/"+element+"/").then((res)=>{
                        this.vendors.push(res.data);                        
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
                })
                this.company.staff.forEach(element=>{
                    this.axios.get("/api/users/"+element+"/").then((res)=>{
                        this.staff.push(res.data);
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
                })
                this.company.collaborators.forEach(element=>{
                    this.axios.get("/api/users/"+element+"/").then((res)=>{
                        this.collaborators.push(res.data);
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
                })
        },
        saveCompany(){
            this.axios.post("/api/companies/"+this.company.id+"/",this.company).then((res)=>{
                        this.vendors.push(res.data);
                        
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
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