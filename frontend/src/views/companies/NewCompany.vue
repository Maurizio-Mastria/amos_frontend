<template>
    <div>
        <Sidebar parent="dashboard" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav />
            <!-- End Navbar -->
            <div class="top"><div class="row col-12"><div class="col-12"><a class="btn btn-warning" @click="this.$router.go(-1)">Indietro</a></div></div></div>
            <div class="center">
                <div class="container-fluid">
                    

                    <div class="row">
                        <div class="col-md-12">
                            <div class="card ">
                                <div class="card-header">
                                    <h4 class="card-title">Aggiungi una nuova Azienda</h4>
                                    
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-6">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody>
                                                        <tr><th>Rag. Sociale</th><td><input type="text" v-model="company.name"/></td></tr>
                                                        <tr><th>P.IVA</th><td><input type="text" max="20" v-model="company.vat"/></td></tr>
                                                        <tr><th>Indirizzo</th><td><input type="text" v-model="company.address"/></td></tr>
                                                        <tr><th>Città</th><td><input type="text" v-model="company.city"/></td></tr>
                                                        <tr><th>CAP</th><td><input type="text" max="5" v-model="company.cap"/></td></tr>
                                                        <tr><th>Provincia</th><td><input maxlength="2" style="text-transform:uppercase" type="text" v-model="company.province"/></td></tr>
                                                        <tr><th>Nazione <img v-if="company.country!=null" class="ml-2" :src="'/src/assets/img/flags/'+company.country+'.png'"/></th><td>
                                                            <select class="custom-select" v-model="company.country">
                                                                <option selected value="IT">Italia</option>
                                                                <option value="DE">Germania</option>
                                                                <option value="ES">Spagna</option>
                                                                <option value="FR">Francia</option>
                                                            </select>
                                                        </td></tr>
                                                        <tr><th>PEC</th><td><input type="email" v-model="company.pec"/></td></tr>
                                                        <tr><th>SDI</th><td><input type="text" maxlength="7" v-model="company.sdi"/></td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                        <div class="col-md-6">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody>
                                                        <tr><th>Email</th><td><input type="email" v-model="user.username"/></td></tr>
                                                        <tr><th>Nome</th><td><input type="text" max="20" v-model="user.first_name"/></td></tr>
                                                        <tr><th>Cognome</th><td><input type="text" v-model="user.last_name"/></td></tr>
                                                        <tr><th>Telefono</th><td><input type="phone" v-model="user.profile.phone"/></td></tr>
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
                                            <button class="btn btn-danger" v-on:click="this.addCompany()">Aggiungi</button>
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
            
            company:{
                name:null,
                address:null,
                city:null,
                cap:null,
                province:null,
                country:null,
                pec:null,
                sdi:null,
                vat:null,
            },
            user:{
                username:null,
                first_name:null,
                last_name:null,
                profile:{
                    phone:null,
                },
                email:null,
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
        
    },
    computed:{
        
        
        },
	methods:{
        
        addCompany(){
            this.axios.post("/api/companies/",this.company).then((res)=>{
                        this.toast.success("Azienda aggiunta");
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

        addUser(){
            this.axios.post("/api/users/",this.user).then((res)=>{
                        this.toast.success("Utente aggiunto");
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    })
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