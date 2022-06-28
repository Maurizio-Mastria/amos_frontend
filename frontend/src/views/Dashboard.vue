<template>
    <div>
        <Sidebar parent="products" child="simple"/>
        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
            <div class="top" v-if="marketplace">
                <div class="row">
                    <div class="col-md-8" v-if="marketplace" style="text-align:left">
                        <div class="p-2">
                            <img class="p-1 me-2 thumbnails" :src="marketplaceImg" />
                            <b>{{marketplace._code}} {{marketplace._country}}</b>
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
            <div class="center" v-if="marketplace"> 
                <div class="container-fluid">
                    
                    <h4 class="float-left">Nuovo prodotto</h4>
                    <div class="col-12 row">
                        <div class="col-xl-3 col-sm-12">
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="product_type">Tipologia</span>
                                </div>
                                <select class="custom-select" aria-label="Tipo prodotto" aria-describedby="product_type" v-model="product.type" v-on:change="selectProductType($event.target.value)">
                                    <option selected></option>
                                    <option value="S">Semplice</option>
                                    <option value="C">Configurabile</option>
                                    <option value="M">Multiplo</option>
                                    <option value="B">Misto</option>
                                </select>
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="product_sku">SKU</span>
                                </div>
                                <input class="form-control" type="text" v-model="product.sku">
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="product_title">Titolo</span>
                                </div>
                                <input class="form-control" type="text" v-model="product.title">
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <span class="input-group-text" id="product_category">Categoria</span>
                                </div>
                                <select class="custom-select" aria-label="Categoria" aria-describedby="product_category" v-model="product.category">
                                    <option value=""></option>
                                    
                                </select>
                            </div>
                            <div class="input-group mb-3">
                                <div class="input-group-prepend">
                                    <select class="custom-select" style="background-color:#e9ecef" v-model="product.gtin_type">
                                        <option value="NOGTIN">Esente</option>
                                        <option value="EAN">Configurabile</option>
                                        <option value="ISBN">Multiplo</option>
                                    </select>
                                </div>
                                <input class="form-control" type="text" v-model="product.gtin">
                            </div>
                           
                        </div>
                        
                    </div>







        
      








                   
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
function initialState (){
  return {
            
            // fields: {
            //     id: { name :"ID",show:false },
            //     sku:{ name :"SKU",show:true },
            //     productType: {name :"Tipo",show:true},
            //     gtin:{name :"GTIN",show:true},
            //     title:{name :"Titolo", show:true},
            //     short_description:{ name:"Descrizione Breve",show:false},
            //     description: { name :"Descrizione",show:false},
            //     images:{name :"Immagini",show:true},
            //     keywords:{name :"Parole chiave",show:false},
            //     bullet_point:{name :"Punti di forza (Bullet Point)",show:false},
            //     attributes:{name :"Attributi",show:false},
            // },
            marketplaces:[],
            marketplaceKey:"",
            marketplace:null,
            marketplaceImg:"",
            // search:false,
            // filter:false,
            // sort:false,

            company:{},
            companies:[],

            // product:{
            //     sku:null,
            //     gtin:null,
            //     gtin_type:"NOGTIN",
            //     type:"S",
            //     int_eav:[],
            //     boolean_eav:[],
            //     char_eav:[],
            //     decimal_eav:[],
            //     text_eav:[],
            //     url_eav:[],
            // }
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
                        this.marketplaceImg="/src/assets/"+this.marketplace.code+".png"
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
        // async getProducts() {
        //     if(this.marketplace!==null){
        //         var querystring="";
        //         for(const [obj,key] of Object.entries(this.filters)){
        //             var operator="";
        //             var attribute=obj;
        //             var value=this.filters[obj].value;
        //             var active=this.filters[obj].active;
        //             if(attribute!="images" && attribute!="attributes"){
        //                 operator=(this.filters[obj].action);
        //             }
        //             if(active){
        //                 querystring=querystring+"&"+attribute+"="+operator+value
        //             }
        //         }
        //         try{
        //             const res = await this.axios.get("/api/products/simple/?company="+this.company.id+"&marketplace="+this.marketplace.id+querystring).then((res) => {
        //                 this.products=[]
        //                 for(var i=0; i<res.data.count; i++){
        //                     var obj=res.data.results[i];
        //                     var product = {
        //                         "id":obj["id"],
        //                         "sku":obj.sku,
        //                         "productType":"Semplice",
        //                         "gtin":obj.gtin,
        //                         "gtin_type":obj.gtin_type
        //                     };
        //                     for(var k=0; k<obj.text_eav.length;k++){
        //                         product[obj.text_eav[k].attribute]=obj.text_eav[k].value;
        //                     }
        //                     for(var k=0; k<obj.int_eav.length;k++){
        //                         product[obj.int_eav[k].attribute]=obj.int_eav[k].value;
        //                     }
        //                     for(var k=0; k<obj.char_eav.length;k++){
        //                         product[obj.char_eav[k].attribute]=obj.char_eav[k].value;
        //                     }
        //                     for(var k=0; k<obj.decimal_eav.length;k++){
        //                         product[obj.decimal_eav[k].attribute]=obj.decimal_eav[k].value;
        //                     }
        //                     for(var k=0; k<obj.boolean_eav.length;k++){
        //                         product[obj.boolean_eav[k].attribute]=obj.boolean_eav[k].value;
        //                     }
        //                     for(var k=0; k<obj.url_eav.length;k++){
        //                         product[obj.url_eav[k].attribute]=obj.url_eav[k].value;
        //                     }
        //                     this.products.push(product);
        //                 };
        //             })
        //         }
        //         catch(error){
        //             if(error.response!=null){
        //                 this.toast.error(error.response.data.detail);
        //             }
        //             else{
        //                 this.toast.error("Errore indefinito");
        //             }
        //         }
        //     }
            
        // },
        // async getAttributes(){
        //     try {
        //         const res = await this.axios.get("/api/products/attributes/?company="+this.company.id)
        //         this.attributes=res.data.results;
        //     } catch (error) {
        //         if(error.response!=null){
        //             this.toast.error(error.response.data.detail);
        //         }
        //         else{
        //             this.toast.error("Errore indefinito");
        //         }
        //     }
        // },
        // changeCompany(index){
        //     var data=initialState();
        //     data["companies"]=this.companies;
        //     data["company"]=this.companies[index];
        //     Object.assign(this.$data,data);
        //     this.getMarketplaces().then(this.getProducts).then(this.getAttributes)
        // },
        // changeMarketplace(index){
        //     this.marketplace=this.marketplaces[index]
        //     this.marketplaceImg="/src/assets/"+this.marketplace.code+".png"
        //     this.getProducts();
        // },
        
        
        
        
        
        
        
        



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