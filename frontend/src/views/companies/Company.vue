<template>
    <div>
        <Sidebar parent="dashboard" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav :company.sync="this.company" :companies.sync="this.companies" @update:company="(index) => changeCompany(index)" />
            <!-- End Navbar -->
            <div class="top"><div class="row col-12"><div class="col-12"><a class="btn btn-warning" @click="this.$router.push('/companies')">Tutte le Aziende</a></div></div></div>
            <div class="center">
                <div class="container-fluid" v-if="this.company">
                    

                    <div class="row">
                        <div class="col-md-5">
                            <div class="card ">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-7">
                                            <h4 class="card-title">{{this.company.name}}</h4>
                                            <p class="card-category"><b>{{this.company.vid}}</b></p>
                                        </div>
                                        <div class="col-5 text-right">
                                            <template v-if="user.is_staff">
                                                <button class="btn btn-danger" v-on:click="this.setCompanyStatus()" v-if="company.active==true">Disattiva</button>
                                                <button class="btn btn-success" v-on:click="this.setCompanyStatus()" v-if="company.active==false">Attiva</button>
                                            </template>
                                        </div>        
                                    </div>
                                </div>
                                
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody v-if="!this.modify.company" >
                                                        <tr><th>Rag. Sociale</th><th>{{company.name}}</th></tr>
                                                        <tr><th>Vendor ID</th><td>{{company.vid}}</td></tr>
                                                        <tr><th>Indirizzo</th><td>{{company.address}}</td></tr>
                                                        <tr><th>Città</th><td>{{company.city}}</td></tr>
                                                        <tr><th>CAP</th><td>{{company.cap}}</td></tr>
                                                        <tr><th>Provincia</th><td>{{company.province}}</td></tr>
                                                        <tr><th>Nazione</th><td>{{company.country}}<img class="ml-2" :src="'/src/assets/img/flags/'+company.country+'.png'"/></td></tr>
                                                        <tr><th>PEC</th><td>{{company.pec}}</td></tr>
                                                        <tr><th>SDI</th><td>{{company.sdi}}</td></tr>
                                                        <tr><th>Stato</th><th><template v-if="company.active"><i class="fa fa-circle text-success mr-4"></i>ATTIVA</template><template v-else><i class="fa fa-circle text-danger mr-4"></i>NON ATTIVA</template></th></tr>
                                                    </tbody>
                                                    <tbody v-else>
                                                        <tr><th>Rag. Sociale</th><td><input type="text" style="text-transform:uppercase" v-model="company.name"/></td></tr>
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
                                <button v-if="user.is_superuser && company.active==false" class="btn btn-danger" v-on:click="this.deleteCompany()"> !!! Elimina definitivamente !!! </button>
                            </div>
                        </div>
                        <div class="col-md-7">
                            <div class="card ">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-6">
                                            <h4 class="card-title">Venditore</h4>
                                        </div>
                                        <div class="col-6  text-right">
                                            <button v-if="user.is_staff && company.vendor==null && modify.vendor==false"  class="btn btn-danger" v-on:click="modify.vendor=true">Assegna proprietà</button>
                                            <button v-if="user.is_staff && company.vendor==null && modify.vendor==true"  class="btn btn-success" v-on:click="modify.vendor=false; this.assign_vendor=null;">Annulla</button>
                                            <button v-if="user.is_staff && company.vendor!=null && company.active==false"  v-on:click="modify.vendor=true" class="btn btn-danger">Modifica venditore</button>
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="card-body">
                                    <template v-if="modify.vendor">
                                        <div class="row col-12 pt-4 pb-4">
                                            <div class="col-3 p-2"><h5>Seleziona il venditore</h5></div>
                                            <div class="col-7">
                                                <select class="custom-select" v-model="assign_vendor">
                                                    <option selected :value=null></option>
                                                    <option v-for="(value,key) in this.all_users" :key="key" :value="value.id">{{value.username}} | {{value.first_name}} {{value.last_name}}</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <button class="btn btn-danger" v-on:click="this.assignVendor()">Assegna</button>
                                            </div>
                                        </div>

                                    </template>
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div  v-if="this.company.vendor" class="table-responsive">
                                                <table class="table">
                                                    <thead>
                                                        <tr><th>User</th><th>Nome</th><th>Cognome</th><th>Email</th><th>Tel</th><th>Ultimo login</th><th class="text-center">Stato</th><th></th></tr>
                                                    </thead>
                                                    <tbody>
                                                        
                                                        <tr>
                                                            <th>{{this.company.vendor.username}}</th>
                                                            <td>{{this.company.vendor.first_name}}</td>
                                                            <td>{{this.company.vendor.last_name}}</td>
                                                            <td>{{this.company.vendor.email}}</td>
                                                            <td>{{this.company.vendor.phone}}</td>
                                                            <td>{{this.company.vendor.last_login}}</td> 
                                                            <td class="text-center">
                                                                <template v-if="this.company.vendor.is_active"><i title="Attivo" class="fa fa-circle text-success"></i></template>
                                                                <template v-else><i title="Disabilitato" class="fa fa-circle text-danger"></i></template>
                                                            </td>
                                                            <td class="text-right">
                                                                <a :href="'/user?id='+this.company.vendor.id+'&company='+this.company.id" rel="tooltip" class="btn btn-warning" title="Vedi profilo">
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
                            </div>



                            <div class="card ">
                                <div class="card-header ">
                                    <div class="row">
                                        <div class="col-6">
                                            <h4 class="card-title">Collaboratori</h4>
                                        </div>
                                        <div class="col-6 text-right">
                                            <template  v-if="this.user.is_staff">
                                                <button class="btn btn-warning mr-2" v-on:click="modify.collaborator=!modify.collaborator">
                                                    <template v-if="!modify.collaborator">Aggiungi un collaboratore</template>
                                                    <template v-else>Annulla</template>
                                                </button>
                                            </template>
                                            
                                            <a :href="'/permissions/?company='+this.company.id" class="btn btn-info">Modifica permessi</a>
                                        </div>
                                    </div>
                                </div>
                                <div class="card-body ">
                                    <template v-if="modify.collaborator">
                                        <div class="row col-12 pt-4 pb-4">
                                            <div class="col-3 p-2"><h5>Seleziona un collaboratore</h5></div>
                                            <div class="col-7">
                                                <select class="custom-select" v-model="assign_collaborator">
                                                    <option selected :value=null></option>
                                                    <option v-for="(value,key) in this.all_users" :key="key" :value="value.id">{{value.username}} | {{value.first_name}} {{value.last_name}}</option>
                                                </select>
                                            </div>
                                            <div class="col-2">
                                                <button class="btn btn-danger" v-on:click="this.assignCollaborator()">Assegna</button>
                                            </div>
                                        </div>

                                    </template>
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
            authorizations:{},
            company:null,
            vendors:[],
            modify:{
                company:false,
                vendor:false,
            },
            user:{},
            all_users:null,
            assign_vendor:null,
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
                this.getMe().then(this.getCompany).then(this.getVendor).then(this.getUsers)
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
                            }
                        }
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
                
        },
        saveCompany(){
            this.axios.put("/api/companies/"+this.company.id+"/",this.company).then((res)=>{
                        this.toast.success("Modifiche salvate");
                        this.modify.company=false;
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
        },
        
        setCompanyStatus(){
            var data={};
            data["active"]=!this.company.active;
            this.axios.put("/api/companies/"+this.company.id+"/",data).then((res)=>{
                        if(res.data.active){
                            this.toast.success("Azienda attivata");
                            this.init();
                        }
                        else{
                            this.toast.error("Azienda disattivata");
                            this.init();
                        }
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
        },
        
        async getVendor(){
            if(this.company.vendor!=null){
                    try{    
                
                        const res = await this.axios.get("/api/users/"+this.company.vendor+"/").then((res)=>{
                            this.company.vendor=res.data;
                            
                        
                        }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(error.response.data.detail);
                        }
                    })
                }
                catch(error) {
                    this.toast.error("Errore indefinito (Azienda)");
                };
            }
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
                    this.toast.error("Errore indefinito (Azienda)");
                };

        },
        getAllUsers(){
            this.axios.get("/api/users/").then((res)=>{
                        this.all_users=res.data.results;
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                        this.toast.error(error.response.data.detail);
                        }
                    })
        },
        assignVendor(){
            var data={};
            data["vendor"]=this.assign_vendor;
            this.axios.put("/api/companies/"+this.company.id+"/",data).then((res)=>{
                        this.toast.success("Venditore assegnato");
                        this.$router.go();
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
        },
        assignCollaborator(){
            const applications=["products","orders","offers","messages","shippings","marketplaces","companies","couriers","authorizations","imports"]
            var data={};
            for(var i=0; i<applications.length;i++){
                data["user"]=this.assign_collaborator;
                data["company"]=this.company.id
                data["permission"]=0
                data["application"]=applications[i]
                this.axios.post("/api/auth/?company="+this.company.id+"/",data)
                        
                    
                
            }
            this.toast.success("Collaboratore assegnato");
        },
        
        deleteCompany(){
            this.axios.delete("/api/companies/"+this.company.id+"/").then((res)=>{
                        this.toast.success("Azienda eliminata definitivamente");
                        this.$router.go("/companies");
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText));
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