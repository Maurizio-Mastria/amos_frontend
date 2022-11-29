<template>
    <div>
        <Sidebar parent="" />
        
        <div class="main-panel">
            <!-- Navbar -->
            <Nav />
            <!-- End Navbar -->
            <div class="top"><div class="row col-12"><div class="col-12"><a class="btn btn-warning" @click="this.$router.go(-1)">Indietro</a></div></div></div>
            <div class="center">
                <div class="container-fluid" >
                    <div class="row">
                        <div class="col-md-6 m-auto">
                            <div class="card ">
                                <div class="card-header">
                                    <h4 class="card-title"><i class="text-info fa fa-user"></i> Aggiungi utente</h4>
                                </div>
                                <div class="card-body" >
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="table-responsive">
                                                <table class="table">
                                                    <tbody>
                                                        <tr><th>Nome</th><td><input type="text" v-model="this.newUser.first_name"/></td></tr>
                                                        <tr><th>Cognome</th><td><input type="text" v-model="this.newUser.last_name"/></td></tr>
                                                        <tr><th>Email</th><td><input type="text" v-model="this.newUser.email"/></td></tr>
                                                    </tbody>
                                                </table>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="row">
                                        <div class="col-12 text-right">
                                            <button class="btn btn-success" v-on:click="this.addUser()">Aggiungi utente</button>
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
            newUser:{},
            
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
        
        
        addUser(){
            this.axios.post("/api/users/",this.newUser).then((res)=>{
                        this.toast.success("Utente aggiunto");
                        this.$router.push("/users");
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                            this.toast.error(String(error.response.status)+" "+String(error.response.statusText))
                        }
                    });
        },
        async getMe(){
            try{
                    const res = await this.axios.get("/api/me/").then((res)=>{
                        this.user=res.data.results[0];
                        if(!this.user.is_staff || !this.user.is_superuser){
                            this.$router.push("/dashboard/");
                        }
                        
                        
                    }).catch((error)=>{
                        if(error.response!=null){
                        this.toast.error(error.response.data.detail);
                        }
                    })
                }
                catch(error) {
                    this.toast.error("Errore indefinito (Utente)");
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