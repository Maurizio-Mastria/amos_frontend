<template>
    <div>
        <Sidebar parent="dashboard" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav />
            <!-- End Navbar -->
            <div class="center">
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
                                                            
                                                            <!-- <td class="text-right">
                                                                <a :href="'/profile?id='+profile.id+'&company='+this.company.id" rel="tooltip" class="btn btn-info" title="Vedi profilo">
                                                                    <i class="fa fa-user"></i>
                                                                </a>
                                                            </td> -->
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
            company:{},
            vendors:[],
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
                        this.$router.go();
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