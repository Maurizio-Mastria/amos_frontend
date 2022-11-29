<template>
    <div>
        <Sidebar parent="orders"/>
        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
            <div class="top" v-if="company">
                <div class="row">
                    <div class="col-md-5 pl-5 pt-1 writer" style="text-align:left;"><strong style="font-size:25px;">Tutti gli Ordini</strong></div>
                </div>
            </div>
            <div class="center" v-if="company" style="overflow-y:scroll"> 
                <div class="container-fluid">
                        <div class="col-12 mt-4 pt-4" v-if="loading"><span class="spinner-border  text-warning" role="status"></span></div>
                        
                            <div class="row mt-4 pt-4">
                                <div class="col-3" style="text-align:left"><a href="#" v-on:click="selectAllOrders(true)" style="color:var(--warning);"><i><b>Seleziona tutti</b></i></a><a href="#" v-on:click="selectAllOrders(false)" style="color:var(--warning);"><b><i> / </i></b><i><b>Deseleziona tutti</b></i></a></div>
                                <div class="col-6" style="font-size:20px;"><a style="color:var(--warning)" v-if="this.previous" href="#" v-on:click="this.page--; this.getOrders()">&lt;&lt;</a><b class="writer m-2">Pagina {{this.page}} </b><a style="color:var(--warning)" href="#" v-if="this.next" v-on:click="this.page++; this.getOrders()">&gt;&gt;</a></div>
                                <div class="col-3" style="text-align:right"><label >Visualizza ordini</label>
                                    <select class="custom-select mb-2" v-on:change="this.page=1; this.limit=$event.target.value; this.getOrders();">
                                        <option value="20">20</option>
                                        <option value="50">50</option>
                                        <option value="100">100</option>
                                        <option value="200">200</option>
                                    </select>
                                </div>
                            </div>
                        <table v-if="orders && !loading" class="table table-striped table-sm">
                            <thead>
                                <tr>
                                    <th></th><th>ID</th><th>Marketplace</th><th>Destinatario</th><th>Indirizzo</th><th>Città</th><th>CAP</th><th>Provincia</th><th>Nazione</th><th>Telefono</th><th>Stato ordine</th><th>Visualizza</th>
                                </tr>
                            </thead>
                            <tbody>
                                <template v-for="(order,index) in orders" :key="index">
                                    <tr>
                                        <td><input :id="'check'+order.id" type="checkbox" v-on:change="checkbox(order.id,$event)" v-model="checkboxSelected[order.id]"></td>
                                        <td><b>{{order.order_id}}</b></td>
                                        <td class="writer"><img style="width:20px;" :src="'/imgs/'+this.getMarketById(order.marketplace['id']).code+'.png'"/><br/><b>{{this.getMarketById(order.marketplace["id"])._code}} - {{this.getMarketById(order.marketplace["id"])._country}}</b></td>
                                        <td><b>{{(order.order_detail[0].shipping.shipping_name||"").toUpperCase()}}</b></td>
                                        <td>{{(order.order_detail[0].shipping.shipping_address||"").toUpperCase()}}</td>
                                        <td>{{(order.order_detail[0].shipping.shipping_city||"").toUpperCase()}}</td>
                                        <td>{{order.order_detail[0].shipping.shipping_cap}}</td>
                                        <td>{{(order.order_detail[0].shipping.shipping_state||"").toUpperCase()}}</td>
                                        <td>{{(order.order_detail[0].shipping.shipping_country||"").toUpperCase()}}</td>
                                        <td>{{order.order_detail[0].shipping.shipping_phone}}</td>
                                        <td>{{order.order_detail[0]._status}}</td>
                                        <td><button class="btn btn-outline" v-on:click="order.show=!order.show"><i class="fa fa-eye"></i></button></td>
                                    </tr>
                                    <template v-if="order.show">
                                    <tr style="background-color:white !important; border:2px solid var(--warning);">
                                        <td colspan="1"></td>
                                        <td colspan="11">
                                            <table class="table table-borderless">
                                                <tr style="background-color:unset !important;">
                                                    <th colspan="2"></th><th>SKU</th><th colspan="2">Titolo</th><th>Qtà</th><th>Prezzo art.</th><th>IVA art.</th><th>Prezzo sped.</th><th>IVA sped.</th>
                                                </tr>
                                                <tr v-for="(val,key) in order.order_detail" :key="key" :val="val" style="background-color:unset !important;">
                                                    <td colspan="2"></td>
                                                    <td><b>{{val.sku}}</b></td>
                                                    <td colspan="2">{{val.title}}</td>
                                                    <td>{{val.qty}}</td>
                                                    <td>{{val.price}}</td>
                                                    <td>{{val.iva}}</td>
                                                    <td>{{val.shipping_price}}</td>
                                                    <td>{{val.shipping_iva}}</td>
                                                </tr>
                                                
                                                <tr style="border-top:1px solid black"><td colspan="11"></td></tr>
                                                
                                                <tr style="background:var(--warning)"><td colspan="6"></td><th>{{order.order_price}}</th><th>{{order.order_iva}}</th><th>{{order.shipping_price}}</th><th>{{order.shipping_iva}}</th></tr>
                                                <tr><td colspan="11"></td></tr>
                                                <tr><td colspan="8"></td><th style="border-top:1px solid black">Tot ordine</th><th style="border-top:1px solid black">{{(parseFloat(order.order_price)+parseFloat(order.shipping_price)).toFixed(2)}}</th></tr>
                                                <tr><td colspan="8"></td><th>Totale IVA</th><th>{{(parseFloat(order.order_iva)+parseFloat(order.shipping_iva)).toFixed(2)}}</th></tr>
                                                <tr><td colspan="8"></td><th>Totale IVA incl.</th><th>{{order.order_shipping_total}}</th></tr>
                                            </table>
                                            <hr/>
                                            <button class="btn btn-warning float-right">Modifica</button>
                                        </td>
                                    </tr>
                                    
                                    </template>
                                </template>
                                
                                
                                        
                                        
                                        
                                        
                                    <!-- <td v-for="(field,key) in fields" :key="key" v-show="key!='id'"><template v-if="key=='order_id'"><b>{{order[key]}}</b></template><template v-else>{{order[key]}}</template></td> -->
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
                    <div class="pt-5" v-if="orders">
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

import Sidebar from "../../components/Sidebar.vue";
import CheckboxButton from "../../components/CheckboxButton.vue";
import RadioButton from "../../components/RadioButton.vue";
import Nav from "../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {

            listStage:true,


            orders:[],
            fields: {
                id: { name :"ID",show:false },
                order_id:{ name :"Num Ordine",show:true },
                marketplaceDescription: {name :"Marketplace",show:true},
                date:{name :"Data",show:true},
                _status:{name :"Stato",show:true},
                customer:{name :"Ordinato da", show:true},
                shipping:{ name:"Spedito con",show:false},
                
                // description: { name :"Descrizione",show:false},
                // images:{name :"Immagini",show:true},
                // keywords:{name :"Parole chiave",show:false},
                // bullet_point:{name :"Punti di forza (Bullet Point)",show:false},
                // attributes:{name :"Attributi",show:false},
            },
            marketplaces:[],
            
            
            
            search:false,
            filter:false,
            varie:false,
            filters:{
                date:{ value:"", action:"==",active:false},
                marketplace:{value:"",action:"==",active:false},
                status:{ value:"", action:"cc", active:false},
                shipping:{value:"", action:"cc", active:false},
                customer:{value:"", action:"cc", active:false},
            },
            company:{},
            companies:[],

            //Edit product
            order:{},
            
            loading:false,


            checkboxSelected:{},

            count:null,
            limit:20,
            page:1,
            next:null,
            previous:null,






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
            this.getCompanies().then(this.getMarketplaces).then(this.getOrders)
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
                }  
                catch (error){
                    this.toast.error("Errore indefinito");
                }  
            }
        },
        async getOrders() {
            this.loading=true;
            var querystring="";
            for(const [obj,key] of Object.entries(this.filters)){
                var operator="";
                var attribute=obj;
                var value=this.filters[obj].value;
                var active=this.filters[obj].active;
                if(active){
                    querystring=querystring+"&"+attribute+"="+operator+value
                }
            }
        
            try{
                const res = await this.axios.get("/api/orders/?company="+this.company.id+"&page="+this.page+"&limit="+this.limit+querystring).then((res) => {
                    
                    
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
                        this.orders=res.data.results;
                        
                        
                        
                    if(this.orders.length==0){
                        this.listStage=false;
                    }
                    this.loading=false;
                });
            }
            catch(error){
                this.toast.error("Errore indefinito");
            }
        
            
        },
        
        changeCompany(key){
            window.location.href='/orders?company='+this.companies[key].id;
        },
        
        // expand(value){
        //     if(value==="search"){
        //         this.search = !this.search;
        //         this.filter=false;
        //         this.varie=false;
        //     }
        //     else if(value==="filter"){
        //         this.filter= !this.filter;
        //         this.search = false;
        //         this.varie=false;
        //     }
        //     else if(value==="varie"){
        //         this.varie= !this.varie;
        //         this.search = false;
        //         this.filter=false;
        //     }
        // },
        // filtersReset(){
        //     this.filters={
        //         orders_id:{ value:"", action:"==",active:false},
        //         date:{ value:"", action:"==", active:false},
        //         marketplace:{value:[], action:"==", active:false},
        //         customer:{value:"", action:"cc", active:false},
        //         shipping:{ value:[], action:"==", active:false},
        //         status:{value:"", active:false}
        //     }
        //     this.getOrders();
        // },
        
        // editOrder(key){
        //     this.$router.push("/order/"+key);            
        // },
        
        deleteOrder(){
            var url="/api/orders/delete/?company="+this.company.id
            this.axios.post(url,this.checkboxSelected).then((res) => {
                this.toast.success("Ordine cancellato")
                this.checkboxSelected={};
                this.getOrders();
            }).catch((error)=>{
                this.toast.error(error.response.detail)
                this.getOrders();
            })
            
        },
        checkbox(id,event){
            this.checkboxSelected[id]=event.target.checked;
            if(event.target.checked==false){
                delete(this.checkboxSelected[id])
            }
        },

        selectAllOrders(value){
            for(var i=0; i<this.orders.length;i++){
                this.checkboxSelected[this.orders[i].id]=value;
            }
        },
        

        getMarketById(id){
            for(var i=0;i<this.marketplaces.length;i++){
                if(id==this.marketplaces[i].id){
                    return this.marketplaces[i];
                }
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