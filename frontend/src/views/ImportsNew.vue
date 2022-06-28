<template>
    <div>
        <Sidebar parent="importsNew"/>
        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
            <div class="top pt-4  pl-4 pr-4">
                <div v-if="checking">
                    <div class="text-left">
                        <b class="ml-4 mr-4" style="color:#ffa534;" >Attendi... Sto controllando il file</b>
                        <div class="spinner-grow spinner-grow-sm text-warning " role="status"></div>
                    </div>
                </div>
                <div v-if="fieldsErrorMessage">
                    <div class="text-left">
                        
                        <b class="ml-4 mr-4" style="color:#fb404b;" >{{fieldsErrorMessage}}</b>
                        <div class="spinner-grow spinner-grow-sm text-danger " role="status"></div>
                    </div>
                    
                </div>
                    
            </div>
            
            <div class="center"  style="overflow-y:scroll"> 
                
                <div class="container-fluid">
                <div class="col-12 text-left m-4"><h3>Importa</h3></div>
                    
                                                
                        
                        <Transition name="slide-fade">
                        <div class="row" v-if="firstRow">    
                            <div class="col-3 pl-4">
                                <div class="card d-flex align-items-strech p-4">
                                    <h5>Seleziona i Marketplace</h5>
                                    <select class=" custom-select" id="selectMarketplace" v-model="marketplace" multiple>
                                        <option v-for="(value,key) in marketplaces" :key="key" :value="value.id">{{value._code}} - {{value._country}}</option>
                                    </select>
                                    </div>
                            </div>
                            <div class="col-3 pl-4">
                                <div class="card d-flex align-items-strech p-4">
                                
                                    <h5>Seleziona cosa vuoi importare</h5>
                                    <select class=" custom-select" id="selectImport" v-model="ftype" :disabled="marketplace.length == 0">
                                        <option v-for="(value,key) in ftypes" :key="key" :value="key">{{value}}</option>
                                    </select>
                                    </div>
                            </div>
                            <div class="col-3 pl-4">
                                <div class="card d-flex align-items-strech p-4">
                                
                                    <h5>Scegli il file</h5>
                                    <div class="custom-file">
                                        <label class="custom-file-label" style="height:38px" :class="{ 'bg-disabled': ftype == null }" for="customFile" aria-describedby="customFile"  data-browse="Import File" aria-label="customFile">{{file.name}}</label>
                                        <input :disabled="ftype == null"   name="file" type="file" class="custom-file-input" accept=".csv,.xls,.xlsm,.txt,.odt" id="customFile" v-on:change="file=$event.target.files[0]">
                                    </div>
                                </div>
                            </div>
                            <div class="col-3 pl-4">
                                <div class="card d-flex align-items-strech p-4">
                                    <h5>Inizia la configurazione</h5>
                                        <button type="button" class="btn btn-warning" :disabled="(ftype == null) || (file.name == null)" v-on:click="upload();">Configura</button>
                                </div>
                            </div>
                        </div>
                        </Transition>
                        
                        <Transition name="slide-fade">
                            <div class="row" v-if="secondRow">
                                <div class="col-4" >
                                    <template v-if="importobj.datasheet">
                                        <div class="input-group mb-3" v-if="importobj.datasheet.sheetnames.length>0">
                                            <div class="ml-4">
                                                <label class="input-group-text" for="selectSheetIndex">Scegli il foglio</label>
                                            </div>
                                            <select :disabled="sheetindexSelect" class=" custom-select" id="selectSheetIndex" v-model="importobj.datasheet.sheetindex" v-on:change="this.importobj.datasheet.sheetindex=$event.target.value;">
                                                <option v-for="(value,key) in importobj.datasheet.sheetnames" :key="key" :value="key">{{value}}</option>
                                            </select>
                                            <div class="ml-4">
                                        <button class="btn btn-warning" v-on:click=" setDatasheet();">Seleziona</button></div>
                                        </div>
                                    </template>
                                </div>
                                <div class="col-1">
                                   
                                </div>
                                <div class="col-4">
                                    <template v-if="selectedFields">
                                        <div class="input-group mb-3">
                                            <div class="ml-4">
                                                <label class="input-group-text" for="selectUpdateType">Tipo di aggiornamento</label>
                                            </div>
                                            <select class=" custom-select" id="selectUpdateType" v-model="updateType">
                                                <option value="0">Aggiungi</option>
                                                <option value="1">Aggiorna esistenti</option>
                                                <option value="2">Aggiorna e Aggiungi</option>
                                            </select>
                                        </div>
                                    </template>
                                </div>
                                <div class="col-1">
                                    <template v-if="importobj.datasheet">
                                        <button class="btn btn-warning" v-if="isAllOk" type="button" v-on:click="sendOk()" style="float:right;">Invia</button>
                                    </template>
                                </div>
                                <div class="col-2">
                                    
                                    <template v-if="importobj.id">
                                        <button class="btn btn-danger" type="button" v-on:click="deleteImport()" style="float:right;">Annulla import</button>
                                    </template>
                                    
                                </div>
                            </div>
                        </Transition>
                        <Transition name="slide-fade">
                        <div class="col-12" v-if="selectedFields">
                            
                             
                                 
                                        
                                 
                                             
                                            
                                            
                                        
                                    
                            <table class="table table-borderless table-striped table-hover table-sm">
                                <tbody>
                                    <tr><th></th><th></th><th style="background-color:#ffa534; border-radius:5px 5px 0px 0px;" :colspan="importobj.datasheet.datasheet.length-jump-1"><span class="float-left"><a href="#" style="color:white; float:left;" v-on:click="rowAll()"><b>Seleziona tutti i prodotti</b></a><b style="color:white">&nbsp;/&nbsp;</b><a href="#" style="color:white;" v-on:click="noRowAll()"><b>Deseleziona tutti i prodotti</b></a></span></th></tr>
                                    <tr class="bg-transparent"><th style="background-color:#ffa534; border-radius:5px 5px 0px 0px;"><b>Seleziona i campi da importare</b></th><th v-if="selectedFields"><button class="btn btn-warning" :disabled="this.jump<1" v-on:click="this.jump--; changeJump()"><i class="fa fa-arrow-left"></i></button><b class="ml-4 mr-4">Campi</b><button class="btn btn-warning" v-on:click="this.jump++;changeJump()"><i class="fa fa-arrow-right"></i></button></th><th style="background-color:#ffa534; " v-for="j in importobj.datasheet.datasheet.length-jump-1" :key="j"><input type="checkbox" v-model="row[j-1]"></th></tr>   
                                    <tr v-for="i in importobj.datasheet.datasheet[jump].length" :key="i">
                                        <td style="min-width:250px;" >
                                            <select class="custom-select" v-model="selectedFields[i-1]">
                                                <option selected></option>
                                                <option v-for="(valuefield,keyfield) in importobj.datasheet.attributes" :key="keyfield" :value="keyfield" >{{valuefield}}</option>
                                            </select>
                                        </td>
                                        <template v-for="k in importobj.datasheet.datasheet.length-jump" :key="k">
                                            <template v-if="k==1">
                                                <th style="border-right:1px solid #ffa534;">{{importobj.datasheet.datasheet[k-1+jump][i-1]}}</th>
                                            </template>
                                            <template v-else>
                                                <td>{{importobj.datasheet.datasheet[k-1+jump][i-1]}}</td>
                                            </template>
                                        </template>
                                    </tr>
                                
                                </tbody>
                            </table>
                        </div>
                           

                        </Transition>
                </div>
            </div>
                    
                
            
                 
                    
        </div>
    </div>
    
</template>

<script>
import Sidebar from "../components/Sidebar.vue";
import CheckboxButton from "../components/CheckboxButton.vue";
import RadioButton from "../components/RadioButton.vue";
import Nav from "../components/Nav.vue";
import { useToast } from "vue-toastification";
import ImportsVue from './Imports.vue';
function initialState (){
  return {

            checking:false,
            firstRow:true,
            secondRow:false,
            thirdRow:false,
            
            notAvailableYet:{},
            importobj:null,
            file:{
                name:null
            },
            fields: {
                id: { name :"ID",show:false },
                _create:{name :"Data",show:true },
                _ftype:{ name :"Tipo",show:true },
                _marketplace:{ name :"Marketplace",show:true },
                _status:{ name :"Stato",show:true },
                
                
            },
            marketplaces:[],
            marketplace:[],
            company:{},
            companies:{},
            ftype:null,
            ftypes:{
                "products":"Prodotti",
                "orders":"Ordini",
                "prices":"Prezzi",
                "qty":"Quantità",
            },
            row:[],
            datasheet:{sheetnames:[],datasheet:[]},
            sheetindex:null,
            sheetindexSelect:false,
            jump:0,
            selectedFields:null,
            updateType:0,
            fieldsErrorMessage:null,
            
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
        isAllOk(){
            if(this.selectedFields){

                for(const keyA in this.selectedFields){
                    if(this.selectedFields[keyA]!==null && this.selectedFields[keyA]!==""){
                        for(const keyB in this.selectedFields){
                        if(this.selectedFields[keyB]!==null && this.selectedFields[keyB]!==""){
                            
                            if(keyB>keyA){
                                console.log(keyA)
                                console.log(keyB)
                                if(this.selectedFields[keyA]==this.selectedFields[keyB]){
                                    this.fieldsErrorMessage="Attenzione. Non puoi selezionare lo stesso valore per due righe diverse. Ricontrolla"
                                    return false;
                                }
                            }
                        }
                    }
                }
            }
            this.fieldsErrorMessage=null;
            return true;
            
            }
            
        },
        
                    
        
    },
	methods:{
        // INIT
        async init(){
            this.getCompanies().then(this.getMarketplaces).then(this.getNewImport).then(this.getImport)
            
        },
        

        // GETTERS
        async getCompanies(){
            try{
                    const res = await this.axios.get("/api/companies/").then((res)=>{
                        this.companies=res.data.results;
                        this.company=res.data.results[0];
                    })
                }
                catch(error) {
                    if(error.response!=null){
                        this.toast.error(error.response.data.detail);
                    }
                    else{
                        this.toast.error("Errore indefinito DITTA");
                    }
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
        getImport() {
            
            this.axios.get("/api/imports/?company="+this.company.id+"&status=C").then((res)=>{
                        if(res.data.results.length>0){
                            
                            this.importobj=res.data.results[0];
                            this.firstRow=false;
                            this.secondRow=true;
                            this.sheetindexSelect=false;
                            if(this.importobj.datasheet.datasheet.length>0){
                                this.changeJump();
                            }
                            this.checking=false;
                        };
                        if(this.checking){
                            console.log("Repeat")
                            window.setTimeout(this.getImport,10000)
                        }
                        
                    })
                
            
                
        },

        async getNewImport(){
            this.axios.get("/api/imports/?company="+this.company.id+"&status=N").then((res)=>{
                        if(res.data.results.length>0){
                            this.checking=true;
                            this.importobj=res.data.results[0]
                            this.firstRow=false;
                            this.secondRow=true;
                        }
                    })
        },


        // VIEWS
        changeCompany(index){
            var data=initialState();
            data["companies"]=this.companies;
            data["company"]=this.companies[index];
            Object.assign(this.$data,data);
            this.getMarketplaces().then(this.getImport)
        },

        // OTHERS
        expand(value){
            if(value==="importbar"){
                if (this.importobj==null){
                    this.importbar = !this.importbar;
                }
                else{
                    this.toast.info("Configura e concludi il tuo import\nPuoi effettuare solo un import alla volta.\n")
                }
                
            }
        },



        // DATASHEET
        upload(){
            let formdata=new FormData()
            formdata.append("file",this.file)
            formdata.append("company",this.company.id)
            formdata.append("ftype",this.ftype)
            formdata.append("marketplace",this.marketplace)
                this.checking=true;
                this.axios.post("/api/imports/",formdata, {headers:{ 'X-CSRFToken':$cookies.get('csrftoken'), 'Content-Type': 'multipart/form-data','Content-Disposition':'attachment;filename='+this.file.name}}).then((res)=>{
                    if(res.status===200){
                        this.importobj={}
                        this.importobj["id"]=res.data.id;
                        this.toast.success(res.data.detail);
                        this.firstRow=false;
                        this.secondRow=true;
                        this.getImport()
                    };

                }).catch((error)=>{
                    this.checking=false
                    this.toast.error(error.response.data.detail)
                });
            
        },
        // DATASHEET MANIPULATION
        changeJump(){
            if(this.importobj.datasheet.datasheet.length>0){
                var fields={}
                for(var i=0; i<this.importobj.datasheet.datasheet[this.jump].length;i++){
                    fields[i]=null;
                    
                }
                this.selectedFields=fields;
                this.row.length=this.importobj.datasheet.datasheet.length-this.jump-1;
                for(var k=0; k<this.importobj.datasheet.datasheet.length-this.jump-1;k++){
                    this.row[k]=false;
                }
                
            }
        },

        // UPDATE
        setDatasheet() {
            this.axios.put("/api/imports/"+this.importobj.id+"/",{"company":this.company.id,"sheetindex":this.importobj.datasheet.sheetindex}).then((res)=>{
                this.toast.success(res.data.detail);
                this.sheetindexSelect=true;
                this.checking=true;
                this.getImport();
                // this.changeJump();
            }).catch((error)=>{
                this.toast.error(error.response);
            })
        },

        sendOk(){
            this.axios.put("/api/imports/"+this.importobj.id+"/",{"company":this.company.id,"sheetindex":this.importobj.datasheet.sheetindex,"jump":this.jump,"columns":this.selectedFields,"rows":this.row}).then((res)=>{
                this.toast.success(res.data.detail);
                this.$router.push({name:'Imports'});
                // this.changeJump();
            }).catch((error)=>{
                this.toast.error(error.response);
            })
        },
        
        
        rowAll(){
            for(var i=0; i<this.importobj.datasheet.datasheet.length-this.jump-1;i++){
                this.row[i]=true;
            }
        },
        noRowAll(){
            for(var i=0; i<this.importobj.datasheet.datasheet.length-this.jump-1;i++){
                this.row[i]=false;
            }
        },
        
        
        filtersReset(){
            
        },
        
        
        // DELETE
        deleteImport(){
            this.axios.delete("/api/imports/"+this.importobj.id+"/?company="+this.company.id).then((res)=>{
                this.toast.success("Import annullato");
                this.$router.go()
            }).catch((error)=>{
                this.toast.error(error.response.data.detail)
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
.card{
    min-height:200px;
    height:200px;

}
.bg-disabled{
    background:#e9ecef;
}
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
  transform: translateY(-500px);
  opacity: 0;
}
.z-9{
    z-index:999999;
}

</style>