<template>
    <div>
        <Sidebar :company.sync="company" parent="products" child="new"/>
        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
           
            <div class="center-top">
                <div class="container-fluid" >
                    
                    <!-- STEP 0-->
                    <template v-if="step==0">
                        
                        <div class="card col-6 m-auto p-4">
                            <div class="card-header">
                                <div class="card-title">Nuovo prodotto</div>
                                <div class="card-category">Scegli il tipo di prodotto da creare</div>
                            </div>
                            <div class="card-body m-auto">
                                <table class="table-borderless table-sm">
                                    <tr><th>SKU</th><td><input class="form-control" type="text" v-model="product.sku"></td></tr>
                                    <tr><th>Tipo di prodotto</th>
                                        <td>
                                            <select class="custom-select" style="width:100%" v-model="this.product.type">
                                                <option value="simple">Semplice</option>
                                                <option value="configurable">Configurabile</option>
                                                <option value="multiple">Multiplo</option>
                                                <option value="bulk">Bulk</option>
                                            </select>
                                        </td>
                                    </tr>
                                    <template v-if="this.product.type!='configurable'">
                                        <tr> 
                                            <th>Tipo GTIN</th>
                                            <td>
                                                <select class="custom-select" style="width:100%" v-model="this.product.gtinType">
                                                    <option value="NOGTIN">ESENTE</option>
                                                    <option value="EAN">EAN</option>
                                                    <option value="ISBN">ISBN</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>GTIN</th>
                                            <td><input class="form-control" type="text" v-model="this.product.gtin" :disabled="this.product.gtinType=='NOGTIN'"></td>
                                        </tr>
                                    </template>
                                    <tr v-if="this.product.type=='configurable'"><th>Scegli il marketplace</th>
                                        <td>
                                            <select class="custom-select form-control" v-model="this.marketplace">
                                                <option v-for="(market,key) in this.marketplaces" :key="key" :value="market">{{market._code}} - {{market._country}}</option>
                                            </select>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <div class="card-footer">
                                <template v-if="this.product.type=='simple' && this.product.sku && (this.product.gtinType=='NOGTIN' || this.product.gtin)">
                                    <button class="btn btn-warning float-right" v-on:click="simpleCreate()">Crea</button>
                                </template>
                                <template v-if="this.product.type=='configurable' && this.product.sku && this.marketplace">
                                    <button class="btn btn-warning float-right" v-on:click="nextStep()">Successivo</button>
                                </template>
                            </div>
                        </div>
                    </template>
                    <!-- STEP 1-->
                    <template v-if="this.step==1">
                        <template v-if="this.product.type=='configurable'">
                            <div class="card col-6 m-auto p-4">
                                <div class="card-header">
                                    <div class="card-title">Stai creando un prodotto configurabile</div>
                                    <div class="card-category">SKU {{this.product.sku}}</div>
                                    <div class="card-category">in {{this.marketplace._code}} {{this.marketplace._country}} ({{this.marketplace.account}})</div>
                                </div>
                                <div class="card-body mt-2">
                                    <template v-if="Object.keys(this.categories).length>0">
                                        <div class="card-category">Seleziona la categoria</div>
                                        <select class="custom-select form-control" v-model="this.configurable.category" v-on:change="getConfigurableCombinations(true)">
                                            <option v-for="categ,key in this.pathCategories" :key="key" :value="categ.id">{{categ.title}}</option>
                                        </select>
                                        <template v-if="this.configurable.category">
                                            <div class="row">
                                                <div class="col-6">
                                                    <div class="card-category mt-3">Seleziona i prodotti figli</div>
                                                    <select class="custom-select form-control" multiple v-model="this.childs" v-on:change="this.getConfigurableCombinations()" style="height:400px">
                                                        <option v-for="child,key in this.configurable.childs_selected" :key="key" :value="child" selected >{{child.sku}}</option>
                                                        <option v-for="child,key in this.configurable.childs_availables" :key="key" :value="child" >{{child.sku}}</option>
                                                    </select>
                                                </div>
                                                <div class="col-6">
                                                    <div class="card-category mt-3">Seleziona gli attributi varianti</div>
                                                    <select class="custom-select form-control" multiple v-on:change="this.getConfigurableCombinations()" v-model="this.variations" style="height:400px">
                                                        <option v-for="variation,key in this.configurable.variations_selected" :key="key" :value="variation" selected>{{variation.description}}</option>
                                                        <option v-for="variation,key in this.configurable.variations_availables" :key="key" :value="variation">{{variation.description}}</option>
                                                    </select>
                                                </div>
                                            </div>
                                        </template>

                                        
                                    
                                    </template>

                                    <template v-else>
                                        <h6>Non hai ancora creato nessuna categoria in questo Marketplace <a class="btn btn-success" :href="'/categories/new/?company='+this.company.id+'&marketplace='+this.marketplace.id">Crea</a></h6>                                        
                                    </template>
                                </div>
                                <div class="card-footer">
                                    <button class="btn btn-warning float-left" v-on:click="this.step--">Indietro</button>
                                </div>
                            </div>









                        </template>
                        <template v-else-if="this.product.type=='multiple'">
                        </template>
                        <template v-else-if="this.product.type=='bulk'">
                        </template>
                    </template>
                </div>
            </div>
        </div>  
    </div>
</template>

<script>
const AUTH_TOKEN = "51fb50cfbedaf479a0080615e77cc82392628a21";
import Sidebar from "../../components/Sidebar.vue";
import CheckboxButton from "../../components/CheckboxButton.vue";
import RadioButton from "../../components/RadioButton.vue";
import Nav from "../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {  
            marketplace:null,
            marketplaces:[],
            company:{},
            companies:[],
            categories:{},
            
            pathCategories:{},
            product:{},
            abstractProducts:{
                "simple":{},
                "configurable":{},
                "bulk":{},
                "multiple":{}
            },
            simpleExists:false,
            
            
            step:0,
            newSkus:false,
            configurable:{
                category:null,
                childs_selected:[],
                childs_availables:[],
                variations_selected:[],
                variations_availables:[],
            },
            variations:[],
            childs:[],

                
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
            this.getCompanies().then(this.getMarketplaces)
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
            if(this.company!==null){
                try{
                    const res = await this.axios.get("/api/marketplaces/?company="+this.company.id)
                    this.marketplaces=res.data.results;
                    if(res.data.results.length<0){
                        this.toast.error("Nessun marketplace");
                    }
                       
                    
                }  
                catch (error){
                    this.toast.error("Errore indefinito");
                }  
            }
        },
        
        
        
        async getCategories(){
            
                const res = await this.axios.get("/api/simplify/products/categories/?company="+this.company.id+"&marketplace="+this.marketplace.id).then((res)=>{
                    
                    this.categories={}
                    this.pathCategories={}
                    for(var k=0;k<res.data.results.length;k++){
                        this.categories[res.data.results[k].id]=res.data.results[k];
                    }
                    for(const [a,aValue] of Object.entries(this.categories)){
                        this.pathCategories[a]={"id":a,"title":aValue.title,"variations":aValue.variations}
                        for(var b=0;b<aValue.childs.length;b++){
                            this.pathCategories[aValue.childs[b].id]={"id":aValue.childs[b].id,"title":aValue.title+"\\"+aValue.childs[b].title,"variations":aValue.childs[b].variations}
                        }
                    }
                    

                    
                    
                    //         this.pathCategories[this.marketplaces[i].id].push({"id":this.categories[this.marketplaces[i].id][a].childs[b].id,"title":this.categories[this.marketplaces[i].id][a].title+"\\"+this.categories[this.marketplaces[i].id][a].childs[b].title})
                    //         for(var c=0;c<this.categories[this.marketplaces[i].id][a].childs[b].childs.length;c++){
                    //             this.pathCategories[this.marketplaces[i].id].push({"id":this.categories[this.marketplaces[i].id][a].childs[b].childs[c].id,"title":this.categories[this.marketplaces[i].id][a].title+"\\"+this.categories[this.marketplaces[i].id][a].childs[b].title+"\\"+this.categories[this.marketplaces[i].id][a].childs[b].childs[c].title})
                    //             for(var d=0;d<this.categories[this.marketplaces[i].id][a].childs[b].childs[c].childs.length;d++){
                    //                 this.pathCategories[this.marketplaces[i].id].push({"id":this.categories[this.marketplaces[i].id][a].childs[b].childs[c].childs[d].id,"title":this.categories[this.marketplaces[i].id][a].title+"\\"+this.categories[this.marketplaces[i].id][a].childs[b].title+"\\"+this.categories[this.marketplaces[i].id][a].childs[b].childs[c].title+"\\"+this.categories[this.marketplaces[i].id][a].childs[b].childs[c].childs[d].title})
                    //             }
                    //         }
                    //     } 
                    // } 
             

              
            //   this.getAttributes()
            //   this.getCustomAttributes()
              
              
                }).catch((error)=>{
                    this.toast.error(error);
                })
            
        
        },


        changeCompany(index){
            window.location.href='/product/new?company='+this.companies[index].id;   
        },
        
        
        
        
        saveProduct(){
            
            this.axios.put("/api/products/simple/"+this.product.id+"/?company="+this.company.id+"&marketplace="+this.marketplace.id,this.product).then((res)=>{
                this.toast.success("Prodotto salvato");
                this.getProduct();
            }).catch((error)=>{
                this.toast.error(error.response.data.detail)
            })
            
            
            
        },

        

        checkIfSkuExists(){

        },
        getConfigurableCombinations(reset){
            var data={}
            if(reset){
                this.childs=[]
                this.variations=[]
            }
            data["childs_selected"]=this.childs
            data["variations_selected"]=this.variations
            data["category"]=this.configurable["category"]
            this.axios.put("/api/simplify/products/configurable/combinations/?company="+this.company.id+"&marketplace="+this.marketplace.id,data).then((res)=>{
                // mi deve ritornare
                this.configurable["childs_selected"]=res.data.result["childs_selected"]
                this.configurable["childs_availables"]=res.data.result["childs_availables"]
                this.configurable["variations_selected"]=res.data.result["variations_selected"]
                this.configurable["variations_availables"]=res.data.result["variations_availables"]
                
                

            }).catch((error)=>{
                this.toast.error(error);
            });
        },

        
        nextStep(){
            if(this.step==0){
                if(this.product.type=='configurable'){
                    this.getCategories();
                }
            }
            this.step++;
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
    width:900px;
    right:var(--right-width);
    padding:20px;
    
    color: rgb(26, 26, 26);
    min-height:100px;

    background:linear-gradient(white, white) padding-box, border-box;
    
  box-shadow: 15px 15px 15px 0px #000000;
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
.drop{
    width: 100px;
    height: 100px;
    background-size:70px;
    background-position:center;
    background-repeat:no-repeat;

    display: flex;
    align-items: center;
    justify-content: center;

    transition: background-color .2s ease-in-out;
    text-align:center;
    -webkit-box-shadow: 5px 5px 10px 0px #000000;
    -moz-box-shadow: 5px 5px 10px 0px #000000;
    -o-box-shadow: 5px 5px 10px 0px #000000;
    box-shadow: 5px 5px 10px 0px #000000;

}

.boxed{
  -webkit-box-shadow: 5px 5px 10px 0px #000000;
-moz-box-shadow: 5px 5px 10px 0px #000000;
-o-box-shadow: 5px 5px 10px 0px #000000;
box-shadow: 5px 5px 10px 0px #000000;
}
.drop .isDragging{
  background-color: #999;
  border-color: #fff;
  width: 100px;
    height: 100px;
}
.drop img{
  
  height: 70px;
  object-fit: contain;
}
</style>