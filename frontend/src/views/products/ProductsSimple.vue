<template>
    <div>
        <Sidebar parent="products" child="simple"/>
        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
            <div class="top" v-if="marketplace">
                <div class="row">
                    <div class="col-md-5 pl-5 pt-1 writer" style="text-align:left;"><strong style="font-size:25px;">Prodotti semplici</strong></div>
                    <div class="col-md-3" v-if="marketplace" style="text-align:left">
                        <div class="p-2 writer">
                            <img class="p-1 me-2 thumbnails" :src="marketplaceImg" />
                            <b>Sei in {{marketplace._code}} {{marketplace._country}}</b>
                        </div>
                    </div>
                    <div class="col-md-3">
                        <div class="btn-group bootstrap-select dropup">
                            <button type="button" class="btn dropdown-toggle bs-placeholder btn-default btn-outline" data-toggle="dropdown" role="button" title="Marketplace" aria-expanded="false">
                                <span class="filter-option pull-left">I tuoi marketplace</span>
                                <span class="bs-caret">
                                    <span class="caret"></span>
                                </span>
                            </button>
                            <div class="dropdown-menu open">
                                <ul class="dropdown-menu inner" role="listbox" aria-expanded="false" style="max-height: 395px; overflow-y: auto; min-height: 0px;">
                                    <li data-original-index="key" >
                                        <a type="button" v-on:click="changeMarketplace(key)" v-for="(market,key) in marketplaces" :key="key" tabindex="0" class="" data-tokens="null" role="option" aria-disabled="false" aria-selected="false">
                                            <span class="text">{{market._code}} - {{market._country}}</span>
                                            <span class="nc-icon nc-check-2 check-mark"></span>
                                        </a>
                                    </li>  
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-1"></div>
                </div>
            </div>
            <div class="center" v-if="marketplace" style="overflow-y:scroll"> 
                <div class="container-fluid">
                        <div class="col-12 mt-4 pt-4" v-if="loading"><span class="spinner-border  text-warning" role="status"></span></div>
                        
                            <div class="row mt-4 pt-4">
                                <div class="col-3" style="text-align:left"><a href="#" v-on:click="selectAllProducts(true)" style="color:var(--warning);"><i><b>Seleziona tutti</b></i></a><a href="#" v-on:click="selectAllProducts(false)" style="color:var(--warning);"><b><i> / </i></b><i><b>Deseleziona tutti</b></i></a></div>
                                <div class="col-6" style="font-size:20px;"><a style="color:var(--warning)" v-if="this.page>1" href="#" v-on:click="this.page--; this.getProducts()">&lt;&lt;</a><b class="writer m-2">Pagina {{this.page}} </b><a style="color:var(--warning)" href="#" v-on:click="this.page++; this.getProducts()">&gt;&gt;</a></div>
                                <div class="col-3" style="text-align:right"><label >Visualizza prodotti</label>
                                    <select class="custom-select mb-2" v-on:change="this.page=1; this.count=$event.target.value; this.getProducts();">
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                    </select>
                                </div>
                            </div>
                        <table v-if="products && !loading" class="table table-borderless table-striped table-hover table-sm">
                            <thead>
                                <tr><th></th><th v-for="(field,key) in fields" :key="key" v-show="field.name!=='ID'">{{field.name}}</th><th></th></tr>    
                            </thead>
                            <tbody>
                                <tr v-for="(product,index) in products" :key="index">
                                    <td><input :id="'check'+product.id" type="checkbox" v-on:change="checkbox(product.id,$event)" v-model="checkboxSelected[product.id]"></td>
                                    <td v-for="(field,key) in fields" :key="key" v-show="key!='id'"><template v-if="key=='sku'"><b>{{product[key]}}</b></template><template v-else>{{product[key]}}</template></td>
                                    <td><button class="btn btn-outline" v-on:click="editProduct(product.id)"><i class="fa fa-eye"></i></button></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
            <div class="right">
                <div>
                    <Transition name="slide-fade">
                        <div id="left-col" class="mt-5" v-if="search || filter || varie">
                            
                            <div v-if="search">
                                <h5><b>Ricerca</b></h5>
                                <p><input type="text" class="form-control" placeholder="Cerca per sku,gtin,title,descrizione,ecc..."></p>
                                <p><button type="button" class="mr-2 btn btn-outline">Reset</button><button type="button" class="btn btn-warning ms-2">Cerca</button></p>
                            </div>
                            <div v-if="varie">
                                <h5><b>Applica azione</b></h5>
                                 
                                <div class="p-4"><CheckboxButton :ison.sync="checkboxAllMarketplace" @update:ison="(n) => checkboxAllMarketplace=n"/><b class="pl-2">Per tutti i marketplaces</b>
                                    <br>oppure<br>

                                
                                
                                    <b>seleziona il marketplace</b>
                                    <select class=" custom-select" v-model="checkboxMarketplace" :disabled="checkboxAllMarketplace">
                                        <option v-for="(value,key) in marketplaces" :key="key" :value="value.id">{{value._code}} - {{value._country}}</option>
                                    </select>
                                </div>
                                <p ><button class="mr-2 btn btn-outline-warning" v-on:click="shutdownProducts()">Disattiva</button><button  class="btn btn-outline-danger" v-on:click="deleteProducts()">Elimina</button></p>
                                
                            </div>

                            <div v-if="filter">
                                <h5><b>Filtri</b></h5>
                                <p>
                                    <table  class="m-auto">
                                        <tr>
                                            <td>
                                                <CheckboxButton :ison.sync="filters.sku.active" @update:ison="(n) => filters.sku.active=n"/>
                                            </td>
                                            <td>
                                                <input type="text" class="form-control" v-model="filters.sku.value" placeholder="Sku">
                                            </td>
                                            <td>
                                                <select class="custom-select" v-model="filters.sku.action">
                                                    <option value="==">Uguale</option>
                                                    <option value="<>">Diverso</option>
                                                    <option value="cc">Contiene</option>
                                                    <option value="nc">Non contiene</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td>
                                                <CheckboxButton :ison.sync="filters.title.active" @update:ison="(n) => filters.title.active=n"/>
                                            </td>
                                            <td><input type="text" class="form-control" v-model="filters.title.value" placeholder="Titolo"></td>
                                            <td>
                                                <select class="custom-select" v-model="filters.title.action">
                                                    <option value="==">Uguale</option>
                                                    <option value="<>">Diverso</option>
                                                    <option value="cc">Contiene</option>
                                                    <option value="nc">Non contiene</option>
                                                </select>
                                            </td>
                                            
                                        </tr>
                                        <tr>
                                            <td><CheckboxButton :ison.sync="filters.description.active" @update:ison="(n) => filters.description.active=n"/></td>
                                            <td><input type="text" class="form-control" v-model="filters.description.value" placeholder="Descrizione"></td>
                                            <td>
                                                <select class="custom-select" v-model="filters.description.action">
                                                    <option value="cc">Contiene</option>
                                                    <option value="nc">Non contiene</option>
                                                </select>
                                            </td>
                                            </tr>
                                        <tr>
                                            <td><CheckboxButton :ison.sync="filters.short_description.active" @update:ison="(n) => filters.short_description.active=n"/></td>
                                            <td><input type="text" class="form-control" v-model="filters.short_description.value" placeholder="Descrizione breve"></td>
                                            <td>
                                                <select class="custom-select" v-model="filters.short_description.action">
                                                    <option value="cc">Contiene</option>
                                                    <option value="nc">Non contiene</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><CheckboxButton :ison.sync="filters.images.active" @update:ison="(n) => filters.images.active=n"/></td>
                                            <td colspan="2">
                                                <select class="custom-select" v-model="filters.images.value">
                                                    <option value="true">Contiene immagini</option>
                                                    <option  value="false">Non contiene immagini</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><CheckboxButton :ison.sync="filters.attributes.active" @update:ison="(n) => filters.attributes.active=n"/></td>
                                            <td colspan="2">
                                                <select class="custom-select form-control" v-model="filters.attributes.value" multiple >
                                                    <option v-for="(val,key) in attributes" :value="val.name">{{val.description}}</option>
                                                </select>
                                                <span style="font-size:12px">Usa il tasto <b>CTRL</b> per selezioni multiple</span>
                                            </td>
                                        </tr>
                                    </table>
                                </p>
                                
                                <button v-on:click="filtersReset()" type="button" class="mr-2 btn btn-outline">Reset</button><button type="button" v-on:click="getProducts(marketplaceKey)" class="btn btn-warning ml-2">Filtra</button>
                            </div>


                        </div>
                    </Transition>
                    <div class="pt-5" v-if="marketplace">
                        <div class="p-2"><b>Azioni</b></div>
                        <ul class="nav nav-pills flex-column ">
                            <li class="nav-item"><button class="btn btn-outline" :class="{ active : search  }" v-on:click="expand('search')" title="Cerca"><span class="material-icons">search</span></button></li>
                        </ul>
                        
                        <hr>
                        
                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item"><button class="btn btn-outline" :class="{ active : filter  }" v-on:click="expand('filter')"  title="Filtri"><span class="material-icons">filter_alt</span></button></li>
                        </ul>
                        <hr>
                        <ul class="nav nav-pills flex-column">
                            <li class="nav-item"><button class="btn btn-outline" :class="{ active : varie  }" v-on:click="expand('varie')" title="Varie"><span class="material-icons">build</span></button></li>
                        </ul>
                    </div>
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

            listStage:true,


            products:[],
            fields: {
                id: { name :"ID",show:false },
                sku:{ name :"SKU",show:true },
                productType: {name :"Tipo",show:true},
                gtin:{name :"GTIN",show:true},
                brand:{name :"Marca",show:true},
                title:{name :"Titolo", show:true},
                short_description:{ name:"Descrizione Breve",show:false},
                description: { name :"Descrizione",show:false},
                images:{name :"Immagini",show:true},
                keywords:{name :"Parole chiave",show:false},
                bullet_point:{name :"Punti di forza (Bullet Point)",show:false},
                attributes:{name :"Attributi",show:false},
            },
            marketplaces:[],
            marketplaceKey:"",
            marketplace:null,
            marketplaceImg:"",
            search:false,
            filter:false,
            varie:false,
            filters:{
                sku:{ value:"", action:"==",active:false},
                title:{ value:"", action:"cc", active:false},
                description:{value:"", action:"cc", active:false},
                short_description:{value:"", action:"cc", active:false},
                images:{ value:true,  active:false},

                keywords:{value :"",active:false},
                bullet_point:{name :"Punti di forza (Bullet Point)",show:false},
                attributes:{value:[], active:false}
            },
            attributes:[],
            company:{},
            companies:[],

            //Edit product
            product:{},

            loading:false,


            checkboxSelected:{},
            checkboxAllMarketplace:true,
            checkboxMarketplace:{},

            count:20,
            
            page:1,
            






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
            this.getCompanies().then(this.getMarketplaces).then(this.getProducts).then(this.getAttributes)
        },
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
                        this.toast.error("Errore indefinito");
                    }
                };

        },
        async getMarketplaces(){
            if(this.company!==null){
                try{
                    const res = await this.axios.get("/api/marketplaces/?company="+this.company.id)
                    this.marketplaces=res.data.results;
                    if(res.data.results.length>0){
                        this.marketplace=res.data.results[0];
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
        async getProducts() {
            if(this.marketplace!==null){
                this.loading=true;
                var querystring="";
                for(const [obj,key] of Object.entries(this.filters)){
                    var operator="";
                    var attribute=obj;
                    var value=this.filters[obj].value;
                    var active=this.filters[obj].active;
                    if(attribute!="images" && attribute!="attributes"){
                        operator=(this.filters[obj].action);
                    }
                    if(active){
                        querystring=querystring+"&"+attribute+"="+operator+value
                    }
                }
            
            try{
                const res = await this.axios.get("/api/products/simple/?company="+this.company.id+"&marketplace="+this.marketplace.id+"&page="+this.page+"&limit="+this.count+querystring).then((res) => {
                    this.products=[]
                    for(var i=0; i<res.data.results.length; i++){
                        this.next=res.data.next;
                        this.previous=res.data.previous;
                        this.count=res.data.count;
                        var obj=res.data.results[i];
                        var product = {
                            "id":obj.id,
                            "sku":obj.sku,
                            "productType":"Semplice",
                            "gtin":obj.gtin,
                            "gtin_type":obj.gtin_type
                        }
                        for(var k=0; k<obj.text_eav.length;k++){
                            product[obj.text_eav[k].attribute]=obj.text_eav[k].value.substring(0,200);
                        }
                        for(var k=0; k<obj.int_eav.length;k++){
                            product[obj.int_eav[k].attribute]=obj.int_eav[k].value;
                        }
                        for(var k=0; k<obj.char_eav.length;k++){
                            product[obj.char_eav[k].attribute]=obj.char_eav[k].value;
                        }
                        for(var k=0; k<obj.decimal_eav.length;k++){
                            product[obj.decimal_eav[k].attribute]=obj.decimal_eav[k].value;
                        }
                        for(var k=0; k<obj.boolean_eav.length;k++){
                            product[obj.boolean_eav[k].attribute]=obj.boolean_eav[k].value;
                        }
                        for(var k=0; k<obj.url_eav.length;k++){
                            product[obj.url_eav[k].attribute]=obj.url_eav[k].value;
                        }
                        this.products.push(product);
                    };
                    if(this.products.length==0){
                        this.listStage=false;
                    }
                    this.loading=false;
                });
            }
            catch(error){
                this.toast.error("Errore indefinito");
            }
        }
            
        },
        async getAttributes(){
            try {
                const res = await this.axios.get("/api/products/attributes/?company="+this.company.id)
                this.attributes=res.data.results;
            } catch (error) {
                if(error.response!=null){
                    this.toast.error(error.response.data.detail);
                }
                else{
                    this.toast.error("Errore indefinito");
                }
            }
        },
        changeCompany(index){
            var data=initialState();
            data["companies"]=this.companies;
            data["company"]=this.companies[index];
            Object.assign(this.$data,data);
            this.getMarketplaces().then(this.getProducts).then(this.getAttributes)
        },
        changeMarketplace(index){
            this.marketplace=this.marketplaces[index]
            this.marketplaceImg="/imgs/"+this.marketplace.code+".png"
            this.getProducts();
        },
        
        
        expand(value){
            if(value==="search"){
                this.search = !this.search;
                this.filter=false;
                this.varie=false;
            }
            else if(value==="filter"){
                this.filter= !this.filter;
                this.search = false;
                this.varie=false;
            }
            else if(value==="varie"){
                this.varie= !this.varie;
                this.search = false;
                this.filter=false;
            }
        },
        filtersReset(){
            this.filters={
                sku:{ value:"", action:"==",active:false},
                title:{ value:"", action:"cc", active:false},
                description:{value:"", action:"cc", active:false},
                short_description:{value:"", action:"cc", active:false},
                images:{ value:true,  active:false},
                attributes:{value:[], active:false}
            }
            this.getProducts(this.marketplaceKey);
        },
        
        editProduct(key){
            this.$router.push("/products/edit?id="+key+"&type=simple&marketplace="+this.marketplace.id);            
        },
        shutdownProducts(){

        },
        deleteProducts(){
            var url=null;
            if(this.checkboxAllMarketplace){
                url="/api/products/delete/?company="+this.company.id+"&type=S";
            }
            else{
                url="/api/products/delete/?company="+this.company.id+"&type=S&marketplace="+this.checkboxMarketplace;
            }
            this.axios.post(url,this.checkboxSelected).then((res) => {
                this.toast.success("Prodotto eliminato")
                this.checkboxSelected={};
                this.getProducts();
            }).catch((error)=>{
                this.toast.error(error.response.detail)
                this.getProducts();
            })
            
        },
        checkbox(id,event){
            this.checkboxSelected[id]=event.target.checked;
            if(event.target.checked==false){
                delete(this.checkboxSelected[id])
            }
        },

        selectAllProducts(value){
            for(var i=0; i<this.products.length;i++){
                this.checkboxSelected[this.products[i].id]=value;
                

            }
        },
        



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
</style>