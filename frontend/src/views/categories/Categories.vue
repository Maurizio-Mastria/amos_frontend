<template>
    <div>
        <Sidebar :company.sync="company" parent="products" />

        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
            <div class="center-top" > 
                <div class="container-fluid" >
                    <div class="col-12 row">
                        <div class="col-2">
                          <h5 style="font-size:25px;">Categorie</h5>
                        </div>
                        <div class="col-6"></div>
                        <div class="col-4" v-if="marketplace" style="text-align:right">
                            <img class="me-2 thumbnails" :src="marketplaceImg" />
                            <b>Sei in {{marketplace._code}} {{marketplace._country}}</b>
                        </div>
                        <div class="col-12" style="background-color: var(--warning);">
                            <div class="row">
                                <div class="col-3 p-2">
                                    <b>Cambia Marketplace</b>
                                    <select class="custom-select ml-2" v-on:change="changeMarketplace($event)">
                                        <option :selected="market.id==this.marketplace.id" v-for="(market,key) in this.marketplaces" :key="key" :value="market.id">{{market._code}} - {{market._country}}</option>
                                    </select>
                                </div>
                                <div class="col-9 p-2 ">
                                  <a class="btn btn-success mr-2" style="float:right; border-color:white;" :href="'/categories/new/?company='+this.company.id+'&marketplace='+this.marketplace.id">Nuova</a>
                                </div>
                                
                                
                            </div>
                        </div>
                    </div>
                    <div class="col-12 row m-auto pt-5">
                        <table class="table table-sm">
                          <thead>
                          <tr><th>Principale</th><th>Sottocategoria 1</th><th>Sottocategoria 2</th><th>Sottocategoria 3</th></tr>
                        </thead>
                        <tbody>
                          <template v-for="(category0,key) in this.categories" :key="key">
                            <tr>
                              <td>{{category0['title']}}</td><td></td><td></td><td></td><td><button v-on:click="this.expand(category0['id'])" class="btn btn-info">Info</button></td>
                            </tr>
                            <tr  v-if="this.info[category0['id']]">
                              <td colspan="5">
                                <div class="col-12 card border-personal">
                                  <div class="card-body">
                                    <div class="row col-12">
                                      <div class="col-12">
                                        <div><b style="font-size:25px">{{category0['title']}}</b><a :href="'/category/?company='+this.company.id+'&marketplace='+this.marketplace.id+'&id='+category0['id']" class="btn btn-info ml-3">Modifica</a></div>
                                        <div class="card-category">{{category0['name']}}</div>
                                      </div>
                                      </div>
                                      <hr/>
                                      <div class="row col-12">
                                      <div class="col-4">
                                        <div><b>Attributi</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(attribute0,keyattr0) in category0['attributes']" :key="keyattr0"><i class="text-success mr-2 fa fa-check"></i>{{attribute0.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="col-4">
                                        <div><b>Attributi Personalizzati</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(attribute0,keyattr0) in category0['custom_attributes']" :key="keyattr0"><i class="text-success mr-2 fa fa-check"></i>{{attribute0.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="col-4">
                                        <div><b>Variazioni disponibili</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(variation0,keyvary0) in category0['variations']" :key="keyvary0"><i class="text-success mr-2 fa fa-check"></i>{{variation0.description}}</li>
                                            <li v-for="(variation0,keyvary0) in category0['custom_variations']" :key="keyvary0"><i class="text-success mr-2 fa fa-check"></i>{{variation0.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr/>
                                    <div class="row col-12 mt-3">
                                        <div class="col-3">
                                          <div><b>Prodotti semplici associati</b></div>
                                          <ul>
                                            <li v-for="(product0,keyprod0) in category0['simple']" :key="keyprod0"><i class="fa fa-check text-success mr-2"></i>{{product0.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti multipli associati</b></div>
                                          <ul>
                                            <li v-for="(product0,keyprod0) in category0['multiple']" :key="keyprod0"><i class="fa fa-check text-success mr-2"></i>{{product0.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti composti associati</b></div>
                                          <ul>
                                            <li v-for="(product0,keyprod0) in category0['bulk']" :key="keyprod0"><i class="fa fa-check  text-success mr-2"></i>{{product0.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti configurabili associati</b></div>
                                          <ul>
                                            <li v-for="(product0,keyprod0) in category0['configurable']" :key="keyprod0"><i class="fa fa-check text-success mr-2"></i>{{product0.sku}}</li>
                                          </ul>
                                        </div>
                            
                                    </div>
                                  </div>
                                
                              </div>
                              </td>
                            </tr>
                            <template v-for="(category1,key1) in category0.childs" :key="key1" >
                              <tr >
                                <td>{{category0['title']}}</td><td>{{category1['title']}}</td><td></td><td></td><td><button v-on:click="this.expand(category1['id'])" class="btn btn-info">Info</button></td>
                              </tr>
                              <tr  v-if="info[category1['id']]">
                                <td colspan="5">
                                <div class="col-12 card border-personal">
                                  <div class="card-body">
                                    <div class="row col-12">
                                      <div class="col-12">
                                        <div><b style="font-size:25px">{{category1['title']}}</b><a :href="'/category/?company='+this.company.id+'&marketplace='+this.marketplace.id+'&id='+category1['id']" class="btn btn-info ml-3">Modifica</a></div>
                                        <div class="card-category">{{category1['name']}}</div>
                                      </div>
                                    </div>
                                      <hr/>
                                      <div class="row col-12">
                                      <div class="col-4">
                                        <div><b>Attributi</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(attribute1,keyattr1) in category1['attributes']" :key="keyattr1"><i class="mr-2 fa fa-check text-success"></i>{{attribute1.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="col-4">
                                        <div><b>Attributi Personalizzati</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(attribute1,keyattr1) in category1['custom_attributes']" :key="keyattr1"><i class="mr-2 fa fa-check text-success"></i>{{attribute1.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="col-4">
                                        <div><b>Variazioni disponibili</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(variation1,keyvary1) in category1['variations']" :key="keyvary1"><i class="mr-2 fa fa-check text-success"></i>{{variation1.description}}</li>
                                            <li v-for="(variation1,keyvary1) in category1['custom_variations']" :key="keyvary1"><i class="mr-2 fa fa-check text-success"></i>{{variation1.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr/>
                                    <div class="row col-12 mt-3">
                                        <div class="col-3">
                                          <div><b>Prodotti semplici associati</b></div>
                                          <ul>
                                            <li v-for="(product1,keyprod1) in category1['simple']" :key="keyprod1"><i class="fa fa-check mr-2 text-success"></i>{{product1.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti multipli associati</b></div>
                                          <ul>
                                            <li v-for="(product1,keyprod1) in category1['multiple']" :key="keyprod1"><i class="fa fa-check mr-2 text-success"></i>{{product1.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti composti associati</b></div>
                                          <ul>
                                            <li v-for="(product1,keyprod1) in category1['bulk']" :key="keyprod1"><i class="fa fa-check mr-2 text-success"></i>{{product1.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti configurabili associati</b></div>
                                          <ul>
                                            <li v-for="(product1,keyprod1) in category1['configurable']" :key="keyprod1"><i class="fa fa-check mr-2 text-success"></i>{{product1.sku}}</li>
                                          </ul>
                                        </div>
                                    </div>
                                  </div>
                              </div>
                              </td>
                              </tr>
                              <template v-for="(category2,key2) in category1.childs" :key="key2">
                                <tr v-on:click="this.info[category2['id']]=!this.info[category2['id']]">
                                  <td>{{category0['title']}}</td><td>{{category1['title']}}</td><td>{{category2['title']}}</td><td></td><td><button v-on:click="this.expand(category2['id'])" class="btn btn-info">Info</button></td>
                                </tr>
                                <tr  v-if="info[category2['id']]">
                                  <td colspan="5">
                                <div class="col-12 card border-personal">
                                  <div class="card-body">
                                    <div class="row col-12">
                                      <div class="col-12">
                                        <div><b style="font-size:25px">{{category2['title']}}</b><a :href="'/category/?company='+this.company.id+'&marketplace='+this.marketplace.id+'&id='+category2['id']" class="btn btn-info ml-3">Modifica</a></div>
                                        <div class="card-category">{{category2['name']}}</div>
                                      </div>
                                    </div>
                                      <hr/>
                                      <div class="row col-12">
                                      <div class="col-4">
                                        <div><b>Attributi</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(attribute2,keyattr2) in category2['attributes']" :key="keyattr2"><i class="mr-2 fa fa-check text-success"></i>{{attribute2.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="col-4">
                                        <div><b>Attributi Personalizzati</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(attribute2,keyattr2) in category2['custom_attributes']" :key="keyattr2"><i class="mr-2 fa fa-check text-success"></i>{{attribute2.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="col-4">
                                        <div><b>Variazioni disponibili</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(variation2,keyvary2) in category2['variations']" :key="keyvary2"><i class="mr-2 fa fa-check text-success"></i>{{variation2.description}}</li>
                                            <li v-for="(variation2,keyvary2) in category2['custom_variations']" :key="keyvary2"><i class="mr-2 fa fa-check text-success"></i>{{variation2.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr/>
                                    <div class="row col-12 mt-3">
                                        <div class="col-3">
                                          <div><b>Prodotti semplici associati</b></div>
                                          <ul>
                                            <li v-for="(product2,keyprod2) in category2['simple']" :key="keyprod2"><i class="fa fa-check mr-2 text-success"></i>{{product2.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti multipli associati</b></div>
                                          <ul>
                                            <li v-for="(product2,keyprod2) in category2['multiple']" :key="keyprod2"><i class="fa fa-check mr-2 text-success"></i>{{product2.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti composti associati</b></div>
                                          <ul>
                                            <li v-for="(product2,keyprod2) in category2['bulk']" :key="keyprod2"><i class="fa fa-check mr-2 text-success"></i>{{product2.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti configurabili associati</b></div>
                                          <ul>
                                            <li v-for="(product2,keyprod2) in category2['configurable']" :key="keyprod2"><i class="fa fa-check mr-2 text-success"></i>{{product2.sku}}</li>
                                          </ul>
                                        </div>
                                    </div>
                                  </div>
                                
                              </div>
                              </td>
                                </tr>
                                <template v-for="(category3,key3) in category2.childs" :key="key3">
                                  <tr v-on:click="this.info[category3['id']]=!this.info[category3['id']]">
                                    <td>{{category0['title']}}</td><td>{{category1['title']}}</td><td>{{category2['title']}}</td><td>{{category3['title']}}</td><td><button v-on:click="this.expand(category3['id'])" class="btn btn-info">Info</button></td>
                                  </tr>
                                  <tr v-if="info[category3['id']]">
                                    <td colspan="5">
                                <div class="col-12 card border-personal">
                                  <div class="card-body">
                                    <div class="row col-12">
                                      <div class="col-12">
                                        <div><b style="font-size:25px">{{category3['title']}}</b><a :href="'/category/?company='+this.company.id+'&marketplace='+this.marketplace.id+'&id='+category3['id']" class="btn btn-info ml-3">Modifica</a></div>
                                        <div class="card-category">{{category3['name']}}</div>
                                      </div>
                                    </div>
                                      <hr/>
                                      <div class="row col-12">
                                      <div class="col-4">
                                        <div><b>Attributi</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(attribute3,keyattr3) in category3['attributes']" :key="keyattr3"><i class="mr-2 fa fa-check text-success"></i>{{attribute3.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="col-4">
                                        <div><b>Attributi Personalizzati</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(attribute3,keyattr3) in category3['custom_attributes']" :key="keyattr3"><i class="mr-2 fa fa-check text-success"></i>{{attribute3.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                      <div class="col-4">
                                        <div><b>Variazioni disponibili</b></div>
                                        <div>
                                          <ul>
                                            <li v-for="(variation3,keyvary3) in category3['variations']" :key="keyvary3"><i class="mr-2 fa fa-check text-success"></i>{{variation3.description}}</li>
                                            <li v-for="(variation3,keyvary3) in category3['custom_variations']" :key="keyvary3"><i class="mr-2 fa fa-check text-success"></i>{{variation3.description}}</li>
                                          </ul>
                                        </div>
                                      </div>
                                    </div>
                                    <hr/>
                                    <div class="row col-12 mt-3">
                                        <div class="col-3">
                                          <div><b>Prodotti semplici associati</b></div>
                                          <ul>
                                            <li v-for="(product3,keyprod3) in category3['simple']" :key="keyprod3"><i class="fa fa-check mr-2 text-success"></i>{{product3.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti multipli associati</b></div>
                                          <ul>
                                            <li v-for="(product3,keyprod3) in category3['multiple']" :key="keyprod3"><i class="fa fa-check mr-2 text-success"></i>{{product3.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti composti associati</b></div>
                                          <ul>
                                            <li v-for="(product3,keyprod3) in category3['bulk']" :key="keyprod3"><i class="fa fa-check mr-2 text-success"></i>{{product3.sku}}</li>
                                          </ul>
                                        </div>
                                        <div class="col-3">
                                          <div><b>Prodotti configurabili associati</b></div>
                                          <ul>
                                            <li v-for="(product3,keyprod3) in category3['configurable']" :key="keyprod3"><i class="fa fa-check mr-2 text-success"></i>{{product3.sku}}</li>
                                          </ul>
                                        </div>
                                    </div>
                                  </div>
                                
                              </div>
                              </td>
                                  </tr>
                                </template>
                              </template>
                            </template>
                            
                        </template>
                      </tbody>
                        </table>
                    </div>
                  
                        
                    
                </div>
            </div>
        </div>
    </div>
                <!-- <div class="col-5">
                                          <select style="width:400px;height:300px;" class="custom-select" multiple>
                                            <option v-for="product in this.abstractProducts['simple']" :value="product.id">{{product.sku}} - {{product.title}}</option>
                                          </select>
                                          Seleziona e associa <button class="btn btn-warning">Associa</button>
                                        </div>
                                        <div class="col-2">
                                          <div class="card-title">Stai associando</div>
                                          <ul>
                                            <li v-for="(product0,keyprod0) in category0['simple']"><i class="fa fa-check mr-2"></i>{{product0.sku}}</li>
                                          </ul>
                                        </div> -->

                                        
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
          
          categories:[],
          category:"",
          company:{},
          companies:[],
          marketplaces:[],
          marketplace:{},
          info:{},
          abstractProducts:{}
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
            this.getCompanies().then(this.getMarketplaces).then(this.getCategories).then(this.getAbstractProducts)
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
                    if(res.data.results.length>0){
                        if(this.$route.query.marketplace!=null){
                            for(var i=0; i<res.data.results.length;i++){
                                if(res.data.results[i].id==this.$route.query.marketplace){
                                    this.marketplace=res.data.results[i];
                                }
                            }
                        }
                        else{
                            this.marketplace=res.data.results[0];
                        }
                        this.marketplaceImg="/imgs/"+this.marketplace.code+".png"
                    }
                    else{
                        this.marketplace=null;
                        this.toast.error("Nessun marketplace");
                    }
                }  
                catch (error){
                    this.toast.error("Errore indefinito");
                }  
            }
        },
        
        
        async getCategories(){
            this.axios.get("/api/simplify/products/categories/?company="+this.company.id+"&marketplace="+this.marketplace.id).then((res)=>{
              this.categories=res.data.results;
              for(var a=0;a<this.categories.length;a++){
                this.info[this.categories[a].id]=false;
                for(var b=0;b<this.categories[a].childs.length;b++){
                  this.info[this.categories[a].childs[b].id]=false;
                  for(var c=0;c<this.categories[a].childs[b].childs.length;c++){
                    this.info[this.categories[a].childs[b].childs[c].id]=false;
                    for(var d=0;d<this.categories[a].childs[b].childs[c].childs.length;d++){
                      this.info[this.categories[a].childs[b].childs[c].childs[d].id]=false;
                    } 
                  } 
                } 
              } 
            }).catch((error)=>{
                this.toast.error(error);
            })
        
        },

        async getAbstractProducts(){
            this.axios.get("/api/abstract/simple/?company="+this.company.id).then((res)=>{
              this.abstractProducts["simple"]=res.data.results;
            }).catch((error)=>{
                this.toast.error(error);
            });
            this.axios.get("/api/abstract/configurable/?company="+this.company.id).then((res)=>{
              this.abstractProducts["configurable"]=res.data.results;
            }).catch((error)=>{
                this.toast.error(error);
            });
            this.axios.get("/api/abstract/multiple/?company="+this.company.id).then((res)=>{
              this.abstractProducts["multiple"]=res.data.results;
            }).catch((error)=>{
                this.toast.error(error);
            })
            this.axios.get("/api/abstract/bulk/?company="+this.company.id).then((res)=>{
              this.abstractProducts["bulk"]=res.data.results;
            }).catch((error)=>{
                this.toast.error(error);
            })


        
        },
        
        
        
        changeCompany(key){
            window.location.href='/categories?company='+this.companies[key].id;
            
        },
        changeMarketplace(event){
            window.location.href='/categories?company='+this.company.id+'&marketplace='+event.target.value;
        },
        
       

        searchCategories(value,tree,path=""){
          if(value==""){
            this.paths=[];
            return;
          }
          var re=new RegExp(value.toLowerCase());
          
          for(var i=0; i<tree.length;i++){
            if(tree[i].title.toLowerCase().match(re)){
              this.paths.push({"id":tree[i].id,"path":path+" \\ "+tree[i].title});
            }
            this.searchCategories(value,tree[i].childs,path+" \\ "+tree[i].title);
          }
        },

        
        expand(id){
          for(var key of Object.keys(this.info)){
            if(key==id){
              this.info[id]=!this.info[id];
            }
            else{
              this.info[key]=false;
            }
          }
        }
        

        
        
        
        
        



    },
    components:{
        Sidebar,
        Nav
        
    },


    

}

</script>


<style scoped>
/* Dropdown Button */


/* Dropdown button on hover & focus */

/* The search field */
#myInput {
  box-sizing: border-box;

  background-position: 14px 12px;
  background-repeat: no-repeat;
  font-size: 16px;
  padding: 14px 20px 12px 45px;
  border: none;
  border-bottom: 1px solid #ddd;
}

/* The search field when it gets focus/clicked on */
#myInput:focus {outline: 3px solid #ddd;}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  position: absolute;
  background-color: #f6f6f6;
  min-width: 230px;
  border: 1px solid #ddd;
  z-index: 1;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 12px 16px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {background-color: #f1f1f1}

/* Show the dropdown menu (use JS to add this class to the .dropdown-content container when the user clicks on the dropdown button) */
.show {display:block;}
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

td,th{
    padding:5px 5px 5px 5px;
    text-align:left;
}

.z-9{
    z-index:999999;
}

.boxed{
  -webkit-box-shadow: 5px 5px 10px 0px #000000;
-moz-box-shadow: 5px 5px 10px 0px #000000;
-o-box-shadow: 5px 5px 10px 0px #000000;
box-shadow: 5px 5px 10px 0px #000000;
}
ul, #myUL {
  list-style-type: none;
}

/* Remove margins and padding from the parent ul */
#myUL {
  margin: 0;
  padding: 0;
}

/* Style the caret/arrow */
.caret {
  cursor: pointer;
  user-select: none; /* Prevent text selection */
}

/* Create the caret/arrow with a unicode, and style it */
.caret::before {
  content: "\25B6";
  color: black;
  display: inline-block;
  margin-right: 6px;
}

/* Rotate the caret/arrow icon when clicked on (using JavaScript) */
.caret-down::before {
  transform: rotate(90deg);
}

/* Hide the nested list */
.nested {
  display: none;
}

/* Show the nested list when the user clicks on the caret/arrow (with JavaScript) */
.active {
  display: block;
}

.border-personal{
  border-color:var(--warning);
  border-width: 4px;
}
</style>