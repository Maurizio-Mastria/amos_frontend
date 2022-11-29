<template>
    <div>
        <Sidebar :company.sync="company" parent="products" child="configurable"/>
        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
            <div class="center" v-if="marketplace" style="overflow-y:scroll">
                <div class="container-fluid">
                    <div class="col-12 row">
                        <div class="col-2">
                            <h5 style="font-size:25px;">Prodotti configurabili</h5>
                        </div>
                        <div class="col-6">
                            <a :href="'/product/new/?company='+this.company.id" class="btn btn-success">Nuovo</a>
                        </div>
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
                                <div class="col-4 p-2 row m-auto">
                                    <label class="pt-2 pr-2"><b>Cerca</b></label><input type="text" class="form-control" style="width:70%" placeholder="Cerca per sku,gtin,title,descrizione,ecc..." v-on:keyup="sendSearch()" v-model="this.search">
                                </div>
                                <div class="col-3 p-2" style="text-align:right"><label class="mr-2"><b>Visualizza prodotti (n.)</b></label>
                                    <select class="custom-select mr-2" v-on:change="this.page=1; this.limit=$event.target.value; this.getProducts();">
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                    </select>
                                </div>

                            </div>
                        </div>
                    </div>
                        <div class="col-12 mt-4 pt-4" v-if="loading"><span class="spinner-border  text-warning" role="status"></span></div>
                        
                            <div class="row mt-4 pt-4">
                                <div class="col-3" style="text-align:left"><a href="#" v-on:click="selectAllProducts(true)" style="color:var(--success);"><i><b>Seleziona tutti</b></i></a><a href="#" v-on:click="selectAllProducts(false)" style="color:var(--danger);"><b><i> / </i></b><i><b>Deseleziona tutti</b></i></a></div>
                                <div class="col-6"><ul class="col-12 row" ><template v-for="field,key in this.fields" :key="key"><li class="col-4" style="display: inline;" v-if="field.name!='ID' && field.name!='SKU' && field.name!='Tipo'"><span><input class="mr-2" type="checkbox" v-model="field.show">{{field.name}}</span></li></template></ul></div>
                                <div class="col-3 text-right">
                                    <button class="pb-1 btn" v-if="this.previous" v-on:click="this.page--; this.getProducts()">&lt;&lt;</button>
                                    <b class="m-2">Pagina {{this.page}} </b>
                                    <button class="pb-1 btn " v-if="this.next" v-on:click="this.page++; this.getProducts()">&gt;&gt;</button>
                                </div>
                                
                            </div>
                        <table v-if="products && !loading" class="table table-borderless table-striped table-hover table-sm">
                            <thead>
                                <tr><th></th><th v-for="(field,key) in fields" :key="key" v-show="field.name!=='ID' && field.show">{{field.name}}</th><th></th></tr>    
                            </thead>
                            <tbody>
                                <tr v-for="(product,index) in products" :key="index">
                                    <td><input :id="'check'+product.id" type="checkbox" v-on:change="checkbox(product.id,$event)" v-model="checkboxSelected[product.id]"></td>
                                    <td v-for="(field,key) in fields" :key="key" v-show="key!='id' && field.show"><template v-if="key=='sku'"><b>{{product[key]}}</b></template><template v-else>{{product[key]}}</template></td>
                                    <td><a class="btn btn-info" :href="'/product/configurable/?company='+this.company.id+'&marketplace='+this.marketplace.id+'&id='+product.id"><i class="fa fa-eye"></i></a></td>
                                </tr>
                            </tbody>
                        </table>
                </div>
            </div>
            <div class="right">
                <div>
                    <Transition name="slide-fade">
                        <div id="left-col" class="mt-5" v-if="filter || varie">
                            
                            
                            <div v-if="varie">
                                <h5><b>Applica azione</b></h5>
                                 
                                <div class="p-4"><CheckboxButton :ison.sync="checkboxAllMarketplace" @update:ison="(n) => checkboxAllMarketplace=n"/><b class="pl-2">Per tutti i marketplaces</b>
                                    <br>oppure<br>

                                
                                
                                    <b>seleziona il marketplace</b>
                                    <select class=" custom-select" v-model="checkboxMarketplace" :disabled="checkboxAllMarketplace">
                                        <option v-for="(value,key) in marketplaces" :key="key" :value="value.id">{{value._code}} - {{value._country}}</option>
                                    </select>
                                </div>
                                <p><button class="mr-2 btn btn-outline-warning" v-on:click="shutdownProducts()">Disattiva</button><button  class="btn btn-danger" v-on:click="deleteProducts()">Elimina</button></p>
                                
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
                                                    <option v-for="(val,key) in attributes" :key="key" :value="val.name">{{val.description}}</option>
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

import Sidebar from "../../../components/Sidebar.vue";
import CheckboxButton from "../../../components/CheckboxButton.vue";
import RadioButton from "../../../components/RadioButton.vue";
import Nav from "../../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {

            listStage:true,


            products:[],
            fields: {
                id: { name :"ID",show:false },
                sku:{ name :"SKU",show:true },
                productType: {name :"Tipo",show:true},
                brand:{name :"Marca",show:true},
                title:{name :"Titolo", show:true},
                short_description:{ name:"Descrizione Breve",show:false},
                description: { name :"Descrizione",show:false},
                images:{name :"Immagini",show:false},
                keywords:{name :"Parole chiave",show:false},
                bullet_point:{name :"Punti di forza (Bullet Point)",show:false},
                attributes:{name :"Attributi",show:true},
            },
            marketplaces:[],
            marketplaceKey:"",
            marketplace:null,
            marketplaceImg:"",
            search:"",
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

            count:null,
            limit:20,
            page:1,
            previous:null,
            next:null,
            






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
                const res = await this.axios.get("/api/products/configurable/?company="+this.company.id+"&marketplace="+this.marketplace.id+"&page="+this.page+"&limit="+this.limit+"&search="+this.search).then((res) => {
                    this.products=[]
                    for(var i=0; i<res.data.results.length; i++){
                        if(res.data.next){
                            this.next=this.page+1;
                        }
                        else{
                            this.next=false;
                        }
                        if(res.data.previous){
                            this.previous=this.page-1;
                        }
                        else{
                            this.previous=false;
                        }
                        this.count=res.data.count;
                        var obj=res.data.results[i];
                        var product = {
                            "id":obj.id,
                            "sku":obj.sku,
                            "productType":"Configurabile",
                        }
                        for(var k=0; k<obj.text_eav.length;k++){
                            if(obj.text_eav[k].marketplace==this.marketplace.id){
                                product[obj.text_eav[k].attribute]=obj.text_eav[k].value.substring(0,200);
                            }
                        }
                        for(var k=0; k<obj.int_eav.length;k++){
                            if(obj.int_eav[k].marketplace==this.marketplace.id){
                                product[obj.int_eav[k].attribute]=obj.int_eav[k].value;
                            }
                        }
                        for(var k=0; k<obj.char_eav.length;k++){
                            if(obj.char_eav[k].marketplace==this.marketplace.id){
                                product[obj.char_eav[k].attribute]=obj.char_eav[k].value;
                            }
                        }
                        for(var k=0; k<obj.decimal_eav.length;k++){
                            if(obj.decimal_eav[k].marketplace==this.marketplace.id){
                                product[obj.decimal_eav[k].attribute]=obj.decimal_eav[k].value;
                            }
                        }
                        for(var k=0; k<obj.boolean_eav.length;k++){
                            if(obj.boolean_eav[k].marketplace==this.marketplace.id){
                                product[obj.boolean_eav[k].attribute]=obj.boolean_eav[k].value;
                            }
                        }
                        for(var k=0; k<obj.url_eav.length;k++){
                            if(obj.url_eav[k].marketplace==this.marketplace.id){
                                product[obj.url_eav[k].attribute]=obj.url_eav[k].value;
                            }
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
        changeCompany(key){
            
            window.location.href='/products/configurable?company='+this.companies[key].id;
            
        },
        changeMarketplace(event){
            window.location.href='/products/configurable?company='+this.company.id+'&marketplace='+event.target.value
        },
        
        
        expand(value){
            if(value==="filter"){
                this.filter= !this.filter;
                this.varie=false;
            }
            else if(value==="varie"){
                this.varie= !this.varie;
                
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
            this.$router.push("/product/configurable?company="+this.company.id+"&id="+key);         
        },
        shutdownProducts(){

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

        sendSearch(){
            if(this.search.length==0 || this.search.length>2){
                this.getProducts();
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
.table-striped tbody tr:nth-of-type(odd) {
    border-top: 1px solid var(--warning);
    border-bottom: 1px solid var(--warning);
}
.table-striped tbody tr:hover {
    
    background-color:var(--warning);
}
</style>