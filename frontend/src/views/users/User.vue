<template>
    <div>
        <Sidebar parent="" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav />
            <!-- End Navbar -->
            <div class="top"><div class="row col-12"><div class="col-12"><a class="btn btn-warning" @click="this.$router.go(-1)">Indietro</a></div></div></div>
            <div class="center">
                <div class="container-fluid" v-if="this.user && this.user.profile">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="card ">
                                <div class="card-header">
                                    <div class="row">
                                        <div class="col-md-6 text-left">
                                            <h4 class="card-title"><i class="text-info fa fa-user"></i> {{this.user.username}}</h4>
                                            <p class="card-category"><b>{{this.user.first_name}} {{this.user.last_name}}</b></p>
                                        </div>
                                        <div class="col-md-6 text-right">
                                            <template v-if="this.me.is_staff">
                                                <button class="btn btn-danger" v-on:click="this.setUserStatus()" v-if="this.user.is_active==true">Disattiva</button>
                                                <button class="btn btn-success" v-on:click="this.setUserStatus()" v-if="this.user.is_active==false">Attiva</button>
                                            </template>
                                        </div>

                                    </div>
                                    <div class="row">
                                        <div class="col-md-6 card-category text-left">Iscritto dal {{this.user.date_joined}}</div>
                                        <div class="col-md-6 card-category text-right">Ultimo login {{this.user.last_login}}</div>
                                    </div>
                                </div>
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody v-if="!this.modify.user">
                                                        <tr><th>Nome</th><td>{{this.user.first_name}}</td></tr>
                                                        <tr><th>Cognome</th><td>{{this.user.last_name}}</td></tr>
                                                        <tr><th>Email</th><td>{{this.user.email}}</td></tr>
                                                        <tr><th>Telefono</th><td>{{this.user.profile.phone}}</td></tr>
                                                    </tbody>
                                                    
                                                    <tbody v-else>
                                                        <tr><th>Nome</th><td><input type="text" v-model="this.user.first_name"/></td></tr>
                                                        <tr><th>Cognome</th><td><input type="text" v-model="this.user.last_name"/></td></tr>
                                                        <tr><th>Email</th><td>{{this.user.email}}</td></tr>
                                                        <tr><th>Telefono</th><td><input type="text" v-model="this.user.profile.phone"/></td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-6 text-left">
                                            <button v-if="!modify.user" class="btn btn-info" v-on:click="this.modify.user=!this.modify.user">Modifica</button>
                                            <button v-if="modify.user" class="btn btn-info" v-on:click="this.modify.user=!this.modify.user" >Annulla</button>
                                        </div>
                                        <div class="col-6 text-right">
                                            <button v-if="modify.user" class="btn btn-success" v-on:click="this.saveUser()">Invia modifiche</button>
                                        </div>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="card ">
                                <div class="card-header">
                                    <h4 class="card-title"><i class="text-info fa fa-tablet"></i> 2FA - Two Factor Authentication</h4>
                                </div>
                                <div class="card-body">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <p><i class="text-success fa fa-circle"></i> L'autenticazione a due fattori è attiva</p>
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
import Footer from "../../components/Footer.vue";
// import CheckboxButton from "../components/CheckboxButton.vue";
// import RadioButton from "../components/RadioButton.vue";
import Nav from "../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {
            user:{},
            modify:{
                user:false,
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
                this.getUser();
                this.getMe();
            }
            else{
                this.router.push("/dashboard");
            }
        },
        
        getUser(){
                this.axios.get("/api/users/"+this.$route.query.id+"/?company="+this.$route.query.company).then((res)=>{
                        this.user=res.data;
                        if(this.user.profile==null){
                            this.user.profile={}
                        }
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    });
        },
        saveUser(){
            this.axios.put("/api/users/"+this.user.id+"/",this.user).then((res)=>{
                        this.toast.success("Modifiche salvate");
                        this.$router.go("/users/");
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    });
        },
        setUserStatus(){
            var data={};
            data["is_active"]=!this.user.is_active;
            this.axios.put("/api/users/"+this.user.id+"/",data).then((res)=>{
                        if(res.data.is_active){
                            this.toast.success("Utente attivato");
                            this.init();
                        }
                        else{
                            this.toast.error("Utente disattivato");
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
                        this.me=res.data.results[0];
                        
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