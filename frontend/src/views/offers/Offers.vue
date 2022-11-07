<template>
    <div>
        <Sidebar/>
        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
            <div class="top" style="border-bottom:1px solid var(--warning)" v-if="marketplace">
                <div class="row">
                    <div class="col-md-8" v-if="marketplace" style="text-align:left">
                        <div class="pb-3">
                            <img class="mb-2 ml-2 p-1 me-2 thumbnails" :src="marketplaceImg" />
                            <b class="writer ml-2" style="font-size:35px;">{{marketplace._code}} {{marketplace._country}}</b>
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
                <div class="container-fluid" >
                    <div class="col-12">
                        <div class="md-auto float-left mt-3"><b class="p-4 writer"><i>Loading...</i></b></div>
                        <div class="md-auto float-right"><button class="btn btn-warning mt-3" v-on:click="saveProduct()">Salva bozza</button></div>
                    </div>
                    <div class="row col-12">
                        <div class="col-12 mb-5 content-full-width">
                            <ul role="tablist" class="nav nav-tabs nav-fill">
                                <li  class="nav-item">
                                    <a v-on:click="tab='general'" class="nav-link nav-link-info" :class="{ 'active' : tab=='general'}" id="general-tab" href="#" role="tab" ><b>Generale</b></a>
                                </li>
                                <li class="nav-item">
                                    <a v-on:click="tab='descriptions'" class="nav-link nav-link-success" :class="{ 'active' : tab=='descriptions'}" id="descriptions-tab" href="#" role="tab" ><b>Descrizioni</b></a>
                                </li>
                                <li class="nav-item">
                                    <a v-on:click="tab='seo'" class="nav-link nav-link-warning" :class="{ 'active' : tab=='seo'}" id="seo-tab" href="#" role="tab" ><b>SEO</b></a>
                                </li>                                
                            </ul>
                        </div>
                    </div>
                        <div class="tab-content" id="tabContent" >
                            <div class="tab-pane fade show" :class="{ 'active' : tab=='general'}" role="tabpanel" aria-labelledby="general-tab">
                                <div class="row col-12 pr-5 pl-5">
                                    <div class="row col-5" style="border-right:1px solid blue;">
                                        <div class="p-0 m-0 row">
                                        <div class="col-3 p-0 pt-3">
                                            <template v-for="i in (1,3)">
                                                <div class="m-1" style="width:100px; display:inline-block; text-align:center;">
                                                    <div class="drop" :class="this['getClasses'+i]" @dragover.prevent="dragOver(i)" @dragleave.prevent="dragLeave(i)" @drop.prevent="drop($event,i)" style="width:100%;height:100px; margin:auto;">
                                                        <img :src="productImages['image'+i]" v-if="productImages['image'+i]"/>
                                                        <h1 v-if="this['image'+i].wrongFile">File immagine sbagliato o corrotto</h1>
                                                        <svg v-if="this['image'+i].wrongFile" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                                        </svg>
                                                        <template v-if="!productImages['image'+i] && !this['image'+i].isDragging && !this['image'+i].wrongFile">
                                                            <img v-if="i<8"  src="/src/assets/img/uploads/blue.png"/>
                                                            <img v-else  src="/src/assets/img/uploads/violet.png"/>
                                                        </template>
                                                    </div>
                                                    <div class="pt-1">
                                                        <button class="btn  btn-danger btn-outline float-left p-0" v-on:click="delImages(i)"><i class="fa fa-trash"></i></button>
                                                        <button class="btn  float-right p-0 "  v-on:click="moveImage(i,'left')"><i v-if="i!=1" class="fa fa-arrow-up" ></i><i v-else class="fa fa-arrow-right"></i></button>
                                                        <button class="btn btn-warning float-right mr-2 p-0"  v-on:click="moveImage(i,'right')" ><i class="fa fa-arrow-down"></i></button>
                                                    </div>
                                                    
                                                </div>
                                            </template>    
                                        
                                        </div>
                                        <div class="col-7 p-0">
                                            
                                            <div style="width:400px; height:400px;">
                                                <div class="mb-1 drop" :class="getClasses0" @dragover.prevent="dragOver(0)" @dragleave.prevent="dragLeave(0)" @drop.prevent="drop($event,0)" style="width:100%; height:100%">
                                                    <img :src="productImages.image0" v-if="productImages.image0" style="width:95%; height:95%; overflow:hidden;"/>
                                                    <h1 v-if="image0.wrongFile">File immagine sbagliato o corrotto</h1>
                                                    <svg v-if="image0.wrongFile" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                                    </svg>
                                                    <img v-if="!productImages.image0 && !image0.isDragging && !image0.wrongFile" src="/src/assets/img/uploads/yellow.png"/>
                                                </div>
                                                <div>
                                                    <button v-on:click="delImages(0)" class="btn btn-outline btn-danger float-left p-1" ><i class="fa fa-trash"></i></button>
                                                    <button class="btn btn-warning p-1 float-right" v-on:click="moveImage(0,'right')"><i class="fa fa-arrow-up" style="transform:rotate(-45deg);"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 p-0">
                                            <template v-for="i in 5">
                                                
                                                <div class="m-1" style="width:100px; display:inline-block; text-align:center;" >
                                                    <div class="drop" :class="this['getClasses'+(i+3)]" @dragover.prevent="dragOver((i+3))" @dragleave.prevent="dragLeave((i+3))" @drop.prevent="drop($event,(i+3))" style="width:100%;height:100px; margin:auto;">
                                                        <img :src="productImages['image'+(i+3)]" v-if="productImages['image'+(i+3)]"/>
                                                        <h1 v-if="this['image'+(i+3)].wrongFile">File immagine sbagliato o corrotto</h1>
                                                        <svg v-if="this['image'+(i+3)].wrongFile" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                                        </svg>
                                                        <template v-if="!productImages['image'+(i+3)] && !this['image'+(i+3)].isDragging && !this['image'+(i+3)].wrongFile">
                                                            <img v-if="i+3<8"  src="/src/assets/img/uploads/blue.png"/>
                                                            <img v-else  src="/src/assets/img/uploads/violet.png"/>
                                                        </template>
                                                    </div>
                                                    <div class="pt-1">
                                                        <button class="btn btn-danger btn-outline float-left p-0" v-on:click="delImages((i+3))"><i class="fa fa-trash"></i></button>
                                                        <button class="btn btn-warning float-right p-0"  v-on:click="moveImage((i+3),'right')" v-if="i+3<8"><i  class="fa fa-arrow-right"></i></button>
                                                        <button class="btn float-right p-0 mr-2"  v-on:click="moveImage((i+3),'left')" ><i v-if="i+3>4" class="fa fa-arrow-left"></i><i v-else class="fa fa-arrow-up"></i></button>
                                                    </div>
                                                </div>
                                            </template>    

                                        </div>
                                    </div>
                                        
                                </div>
                                    
                                  
                                    <div class="row col-7 p-4" >
                                        <div class="col-12 pb-0 mb-0">
                                            <template v-if="this.product.id">
                                                <h6>SKU</h6>
                                                <h4 class="p-1 m-0">{{product.sku}}</h4>
                                            </template>
                                            <template v-else>
                                                <h6>SKU</h6>
                                                <input class="form-control" :disabled="product.id" type="text" v-model="product.sku">
                                            </template>
                                        </div>
                                        <div class="col-12 pb-0 mb-0">
                                            <h6>Categoria</h6>
                                            <input class="form-control mr-2" list="brow" v-model="product.category">
                                                <datalist id="brow">
                                                    <option v-for="val,key in this.categories" :key="key" :value="val.title"></option>    
                                                </datalist>  
                                        </div>
                                        <div class="col-12 pb-0 mb-0">
                                                <h6>Marca</h6>
                                                <input class="form-control" type="text" v-model="product.brand">
                                        </div>
                                        <div class="col-12 pb-0 mb-0">
                                            <h6>Tipo GTIN</h6>
                                            <select class="custom-select mr-2" v-model="product.gtin_type">
                                                    <option value="NOGTIN">ESENTE</option>
                                                    <option value="EAN">EAN</option>
                                                    <option value="ISBN">ISBN</option>
                                            </select>
                                        </div>
                                        <div class="col-12 pb-0 mb-0">
                                            <h6>GTIN</h6>
                                            <input class="form-control mr-2" type="text" v-model="product.gtin" :disabled="this.product.gtin_type=='NOGTIN'">
                                        </div>
                                        <div class="col-12">
                                                <h6>Titolo</h6>
                                                <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].title">
                                        </div>
                                        <div class="col-12">
                                            <h6>Descrizione breve</h6>
                                            <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].short_description">
                                        </div>
                                        
                                    </div>
                                </div>
                                <div class="row col-12 mt-4 pr-0 pl-0">
                                    <div class="col-5" style="border-right:1px solid blue;">
                                        <h6>Descrizione HTML</h6>
                                        <textarea class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].description" style="min-height:400px"></textarea>
                                    </div>
                                    <div class="col-7">
                                        <h6>Vista descrizione</h6>
                                        <div class="form-control" style="min-height:400px;" v-html="product.marketplace[this.marketplace.id].description"></div>
                                    </div>
                                </div>
                                    
                                
                            
                        </div>
                        <div class="tab-pane fade show" :class="{ 'active' : tab=='descriptions'}"  role="tabpanel" aria-labelledby="descriptions-tab">
                                              
                        </div>
                        <div class="tab-pane fade show" :class="{ 'active' : tab=='seo'}"  role="tabpanel" aria-labelledby="seo-tab"></div>
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
            prev:null,
            next:null,
            tab:'general',
            
            categories:[],
            
            marketplaces:[],
            marketplaceKey:"",
            marketplace:null,
            marketplaceImg:"",
            
            company:{},
            companies:[],

            product:{},
            // product:{
            //     id:null,
            //     sku:"",
            //     gtin:null,
            //     gtin_type:"NOGTIN",
            //     type:"S",
            //     title:"",
            //     description:"",
            //     short_description:"",
            //     brand:"",
            // },
            
            
            productImages:{
                image0:null,
                image1:null,
                image2:null,
                image3:null,
                image4:null,
                image5:null,
                image6:null,
                image7:null,
                image8:null,
                image9:null,
            },
            gtinIsOn:false,
            
            image0:{
                isDragging:false,
                wrongFile:false,
            },
            image1:{
                isDragging:false,
                wrongFile:false,
            },
            image2:{
                isDragging:false,
                wrongFile:false,
            },
            image3:{
                isDragging:false,
                wrongFile:false,
            },
            image4:{
                isDragging:false,
                wrongFile:false,
            },
            image5:{
                isDragging:false,
                wrongFile:false,
            },
            image6:{
                isDragging:false,
                wrongFile:false,
            },
            image7:{
                isDragging:false,
                wrongFile:false,
            },
            image8:{
                isDragging:false,
                wrongFile:false,
            },
            image9:{
                isDragging:false,
                wrongFile:false,
            },
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
        getClasses0(){
            return { isDragging : this.image0.isDragging }
        },
        getClasses1(){
            return { isDragging : this.image1.isDragging }
        },
        getClasses2(){
            return { isDragging : this.image2.isDragging }
        },
        getClasses3(){
            return { isDragging : this.image3.isDragging }
        },
        getClasses4(){
            return { isDragging : this.image4.isDragging }
        },
        getClasses5(){
            return { isDragging : this.image5.isDragging }
        },
        getClasses6(){
            return { isDragging : this.image6.isDragging }
        },
        getClasses7(){
            return { isDragging : this.image7.isDragging }
        },
        getClasses8(){
            return { isDragging : this.image8.isDragging }
        },
        getClasses9(){
            return { isDragging : this.image9.isDragging }
        },
    },
	methods:{
        dragOver(id){
            this["image"+id].isDragging = true;
        },
        dragLeave(id){
            this["image"+id].isDragging = false;
        },

        drop(e,id){
            let files = e.dataTransfer.files
            this["image"+id].wrongFile = false
            // allows only 1 file
            if (files.length === 1) {
            let file = files[0]
            // allows image only
                if (file.type.indexOf('image/') >= 0) {
                    var reader = new FileReader()
                    reader.onload = f => {
                    this.productImages["image"+id] = f.target.result
                    this["image"+id].isDragging = false
                    }
                    reader.readAsDataURL(file)
                }else{
                    this["image"+id].wrongFile = true
                    this.productImages["image"+id] = null
                    this["image"+id].isDragging = false
                }
            }
        },
        delImages(i){
            this["image"+i]={isDragging:false,wrongFile:false}
            this.productImages["image"+i]=null;
        },

        moveImage(i,direction){
            var tmpImageA=this["image"+i];
            var tmpImageB=this.productImages["image"+i];
            var k=i;
            if(direction=="right"){
                k=i+1;
            }
            else{
                k=i-1;
            }
            this["image"+i]=this["image"+k];
            this.productImages["image"+i]=this.productImages["image"+k];
            this["image"+k]=tmpImageA;
            this.productImages["image"+k]=tmpImageB;
        },


        


        


        async init(){
            this.getCompanies().then(this.getMarketplaces).then(this.getCategories).then(this.getProduct)
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
            
            
                
            this.axios.get("/api/products/categories/?company="+this.company.id).then((res)=>{
                    
                    
                    this.categories=res.data.results;
                    
            }).catch((error)=>{
                this.toast.error(error);
            })
        
    },
        
        


        
        async getProduct(){
            
            
                
                this.axios.get("/api/products/simple/"+this.$route.query.id+"/?company="+this.company.id).then((res)=>{
                        
                        
                        this.product.id=res.data.id;
                        this.product.sku=res.data.sku;
                        this.product.gtin_type=res.data.gtin_type;
                        this.product.gtin=res.data.gtin;

                        this.product.marketplace={};
                        this.product.category=res.data.category.title;
                        
                        for(var i=0;i<res.data.char_eav.length;i++){
                            if(!(res.data.char_eav[i].marketplace in this.product.marketplace)){
                                this.product.marketplace[res.data.char_eav[i].marketplace]={}
                            }
                            this.product.marketplace[res.data.char_eav[i].marketplace][res.data.char_eav[i].attribute]=res.data.char_eav[i].value;
                        }
                        for(var i=0;i<res.data.text_eav.length;i++){
                            if(!(res.data.text_eav[i].marketplace in this.product.marketplace)){
                                this.product.marketplace[res.data.text_eav[i].marketplace]={}
                            }
                            this.product.marketplace[res.data.text_eav[i].marketplace][res.data.text_eav[i].attribute]=res.data.text_eav[i].value;
                        }
                        for(var i=0;i<res.data.url_eav.length;i++){
                            if(!(res.data.url_eav[i].marketplace in this.product.marketplace)){
                                this.product.marketplace[res.data.url_eav[i].marketplace]={}
                            }
                            this.product.marketplace[res.data.url_eav[i].marketplace][res.data.url_eav[i].attribute]=res.data.url_eav[i].value;
                        }
                        for(var i=0;i<res.data.int_eav.length;i++){
                            if(!(res.data.int_eav[i].marketplace in this.product.marketplace)){
                                this.product.marketplace[res.data.int_eav[i].marketplace]={}
                            }
                            this.product.marketplace[res.data.int_eav[i].marketplace][res.data.int_eav[i].attribute]=res.data.int_eav[i].value;
                        }
                        for(var i=0;i<res.data.boolean_eav.length;i++){
                            if(!(res.data.boolean_eav[i].marketplace in this.product.marketplace)){
                                this.product.marketplace[res.data.boolean_eav[i].marketplace]={}
                            }
                            this.product.marketplace[res.data.boolean_eav[i].marketplace][res.data.boolean_eav[i].attribute]=res.data.boolean_eav[i].value;
                        }
                        for(var i=0;i<res.data.decimal_eav.length;i++){
                            if(!(res.data.decimal_eav[i].marketplace in this.product.marketplace)){
                                this.product.marketplace[res.data.decimal_eav[i].marketplace]={}
                            }
                            this.product.marketplace[res.data.decimal_eav[i].marketplace][res.data.decimal_eav[i].attribute]=res.data.decimal_eav[i].value;
                        }

                         
                        // for(var i=0;i<res.data.char_eav.length;i++){
                        //     if(res.data.char_eav[i].attribute=="title"){
                        //         this.product.title=res.data.char_eav[i].value
                        //     }
                        //     else if(res.data.char_eav[i].attribute=="brand"){
                        //         this.product.brand=res.data.char_eav[i].value
                        //     }                            
                        // }
                        
                        // for(var i=0;i<res.data.url_eav.length;i++){
                        //     if(res.data.url_eav[i].attribute.substr(0,5)=="image"){
                        //         // console.log(res.data.url_eav[i].attribute)
                        //         let url = res.data.url_eav[i].value+"?"+performance.now();
                        //         let attribute=res.data.url_eav[i].attribute;
                        //         this.axios.get(url, {responseType: 'blob'}).then((response) => {
                        //             let reader = new FileReader();
                        //             reader.onload = f => {
                        //                 this.productImages[attribute]=f.target.result;
                        //             }
                        //             reader.readAsDataURL(response.data);
                        //         }); 
                                 
                                
                        //     }
                        // }
                        // for(var i=0;i<res.data.text_eav.length;i++){
                        //     if(res.data.text_eav[i].attribute=="description"){
                        //         this.product.description=res.data.text_eav[i].value
                        //         this.product.html=res.data.text_eav[i].value
                        //     }
                        //     else{
                                
                        //     }                            
                        // }

                }).catch((error)=>{
                    this.toast.error(error);
                })
            
        },
        changeCompany(index){
            var data=initialState();
            data["companies"]=this.companies;
            data["company"]=this.companies[index];
            Object.assign(this.$data,data);
            
        },
        changeMarketplace(index){
            this.marketplace=this.marketplaces[index]
            this.marketplaceImg="/imgs/"+this.marketplace.code+".png"
        },
        
        
        
        saveProduct(){

            

            

            
            
            if(this.product.id){
                this.axios.put("/api/products/simple/"+this.product.id+"/?company="+this.company.id+"&marketplace="+this.marketplace.id,this.product).then((res)=>{
                    this.toast.success(res.data.results);
                }).catch((error)=>{
                    this.toast.error(error.response.data.detail)
                })
            }
            // else{
            //     this.axios.post("/api/products/save/?company="+this.company.id+"&marketplace="+this.marketplace.id,product).then((res)=>{
            //         this.toast.success(res.data.results);
            //     }).catch((error)=>{
            //         this.toast.error(error.response.data.detail)
            //     })
            // }
            
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
    background-color: transparent;

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
}
.drop img{
  width: 70px;
  height: 70px;
  object-fit: contain;
}
</style>