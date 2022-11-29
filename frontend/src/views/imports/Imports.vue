<template>
    <div>
        <Sidebar :company.sync="company" parent="imports"/>
        <div class="main-panel">
            <Nav :company.sync="this.company" :companies.sync="this.companies" @update:company="(index) => changeCompany(index)" />
            <div class="top">
                
                <a :href="'/imports/new?company='+this.company.id" class="ml-4 float-left btn btn-warning">Nuovo</a>
                    
                
            </div>
            <div class="center"> 
                <hr>
                <div class="container-fluid">
                   
                        
                        
                        <template v-if="imports.length>0">
                            <table class="table table-borderless table-striped table-hover table-sm">
                                <thead>
                                    <tr><th>Data</th><th>Tipo</th><th>Marketplace</th><th>File</th><th>Stato</th><th></th><th></th></tr>    
                                </thead>
                                <tbody>
                                    <tr v-for="(value,index) in imports" :key="index">
                                        <td>{{value.create}}</td>
                                        <td>{{value.ftype}}</td>
                                        <td>{{value.template}}</td>
                                        <td><a href="#" class="text-warning" v-on:click="download(value.id)">Download</a></td>
                                        <td>
                                            <b v-if="value.status=='N'">Nuovo</b>
                                            <b v-if="value.status=='R'">In elaborazione</b>
                                            <b v-if="value.status=='E'">Errore</b>
                                            <b v-if="value.status=='D'">Elaborato</b>
                                            <b v-if="value.status=='DE'">Elaborato con errori</b>
                                        </td>
                                        <td>
                                            <span v-if="value.status=='N'" class="spinner-grow spinner-grow-sm text-warning" role="status"></span>
                                            <span v-if="value.status=='R'" class="spinner-grow spinner-grow-sm text-success" role="status"></span>
                                            <span v-if="value.status=='E'" class="spinner-error" role="status"></span>
                                            <span v-if="value.status=='D'" class="spinner-done" role="status"></span>
                                            <span v-if="value.status=='DE'" class="spinner-done" role="status"></span>
                                        </td>
                                        <td>
                                            <button  class="btn btn-outline" v-if="value.status=='E' || value.status=='DE'" v-on:click="showModal(index)" data-toggle="modal" data-backdrop="false"  data-target="#exampleModalLong" style="color:var(--error)"><b>Informazioni</b></button>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                            
                        </template>
                        


<!-- Modal -->
<div v-if="modalData!=null" class="modal fade" id="exampleModalLong" tabindex="-1" role="dialog" aria-labelledby="exampleModalLongTitle" aria-hidden="true">
  <div class="modal-dialog modal-lg" role="document" >
    <div class="modal-content" style="border:1px solid var(--warning); background:whitesmoke; ">
      <div class="modal-header pt-0 pb-3" style="background:#ffa534; color:white; display:block; width:100%;">
        <h4 class="modal-title" id="exampleModalLongTitle"><b class="float-left">Import {{modalData._ftype}} del {{modalData._create}} - {{modalData._status}}</b><button type="button" class="float-right btn " data-dismiss="modal">Close</button></h4>
        
      </div>
      <div class="modal-body">
        <div>
        <table class="table table-striped table-hover table-sm">
            <tr style="background:#e9e9e9"><th>Riga</th><th>Messaggio</th></tr>
            <tr v-for="(val,key) in JSON.parse(modalData.messages)" :key="key">
                <td><b>{{key}}</b></td><td>{{val}}</td>
            </tr>
        </table>
        </div>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-outline" data-dismiss="modal">Close</button>
        
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
import CheckboxButton from "../../components/CheckboxButton.vue";
import RadioButton from "../../components/RadioButton.vue";
import Nav from "../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {
            importbar:false,
            imports:[],
            file:{
                name:null
            },
            marketplaces:[],
            marketplace:null,
            company:{},
            companies:{},
            showMarketList:false,
            pendingImport:false,
            modalData:null,
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
        // INIT
        async init(){
            this.getCompanies().then(this.getMarketplaces).then(this.getImports)
        },


        // GETTERS
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
            if(this.company!==null){
                try{
                    const res = await this.axios.get("/api/marketplaces/?company="+this.company.id)
                    this.marketplaces=res.data.results;
                    
                    
                    
                }  
                catch (error){
                    this.toast.error(error.response.data.detail);
                }  
            }
        },
        getImports() {
            this.axios.get("/api/imports/?company="+this.company.id).then((res)=>{
                this.imports=res.data.results
                
            }).catch((error)=>{
                
            })
        },
        getPendingImports(){
            this.axios.get("/api/imports/?company="+this.company.id+"&status=N").then((res)=>{
                if(res.data.results.length>0){
                    this.pendingImport=true;
                }
            }).catch((error)=>{
                
            });
            this.axios.get("/api/imports/?company="+this.company.id+"&status=C").then((res)=>{
                
                if(res.data.results.length>0){
                    this.pendingImport=true;
                }
                
            }).catch((error)=>{
                
            })
        },
       
        // VIEWS
        changeCompany(key){
            
            window.location.href='/imports?company='+this.companies[key].id;
            
        },

        showModal(index){
            this.modalData=this.imports[index];
        },

        download(id){
            this.axios.get("/api/files/imports/"+id+"/?company="+this.company.id,{responseType: 'blob'}).then((res)=>{
                const url = window.URL.createObjectURL(new Blob([res.data]));
                const link = document.createElement('a');
                link.href = url;
                var fileName=res.headers["content-disposition"].split(";")[1].split("=")[1]
                link.setAttribute('download', fileName);
                document.body.appendChild(link);
                link.click();
                                
            }).catch((error)=>{
                this.toast.error(error.response.detail)
            })
        }
       
        
        

        
        
        
        
        



    },
    components:{
        Sidebar,
        Nav,CheckboxButton,RadioButton
        
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

.spinner-error{
    color: var(--red);
    width: 1rem;
    height: 1rem;
    display: inline-block;
    vertical-align: -0.125em;
    background-color: currentColor;
    border-radius: 50%;
}

    

.spinner-done{
    color: #28a745!important;
    width: 1rem;
    height: 1rem;
    display: inline-block;
    vertical-align: -0.125em;
    background-color: currentColor;
    border-radius: 50%;
}
.spinner-warning{
    color: var(--warning);
    width: 1rem;
    height: 1rem;
    display: inline-block;
    vertical-align: -0.125em;
    background-color: currentColor;
    border-radius: 50%;
}





</style>