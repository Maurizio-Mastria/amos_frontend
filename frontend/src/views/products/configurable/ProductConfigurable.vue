<template>
    <div>
        <Sidebar :company.sync="company" parent="products" />
        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
           
            <div class="center-top" v-if="this.ready">
                <div class="container-fluid" >
                    <div class="col-12 row">
                        <div class="col-1">
                            <a :href="'/products/simple/?company='+this.company.id+'&marketplace='+this.marketplace.id" class="btn btn-success">Tutti i prodotti</a>
                        </div>
                        <div class="col-7">
                            <h5 class="p-1" style="font-size:25px;">Modifica prodotto {{this.product.sku}}</h5>
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
                                <div class="col-9 p-2 ">
                                    <button class="btn btn-outline" style="color:white; background:grey; float:right; border-color:white;" v-on:click="saveProduct()">Salva bozza</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="row col-12">
                        <div class="col-12 mt-1 content-full-width">
                            <ul role="tablist" class="nav nav-tabs nav-fill">
                                <li  class="nav-item">
                                    <a v-on:click="tab='general'" class="nav-link nav-link-info" :class="{ 'active' : tab=='general'}" id="general-tab" href="#" role="tab" ><b>Generale</b></a>
                                </li>
                                <li class="nav-item">
                                    <a v-on:click="tab='attribute'" class="nav-link nav-link-warning" :class="{ 'active' : tab=='attribute'}" id="attribute-tab" href="#" role="tab" ><b>Attributi</b></a>
                                </li>                                
                                <li class="nav-item">
                                    <a v-on:click="tab='fx'" class="nav-link nav-link-warning" :class="{ 'active' : tab=='fx'}" id="fx-tab" href="#" role="tab" ><b>Funzionalità</b></a>
                                </li>                                
                            </ul>
                        </div>
                    </div>
                        <div class="tab-content" id="tabContent">
                            <div class="tab-pane fade show" :class="{ 'active' : tab=='general'}" role="tabpanel" aria-labelledby="general-tab">
                                <div class="row col-12 pr-5 pl-5">
                                    <div class="m-auto row col-4" style="border-right:1px solid blue;">
                                        <div class="p-0 m-0 row">
                                        <div class="col-3 p-0 pt-3">
                                            <div v-for="i in (1,3)" :key="i" class="m-1" style="width:100px; display:inline-block; text-align:center;">
                                                <div class="drop" :class="this['getClasses'+i]" @dragover.prevent="dragOver(i)" @dragleave.prevent="dragLeave(i)" @drop.prevent="drop($event,i)" style="width:100%;height:100px; background-image:url('/src/assets/img/uploads/blue.png'); margin:auto;">
                                                    <img :src="this.product.marketplace[this.marketplace.id]['image'+i]" v-if="this.product.marketplace[this.marketplace.id]['image'+i]"/>
                                                    <h1 v-if="this['image'+i].wrongFile">File immagine sbagliato o corrotto</h1>
                                                    <svg v-if="this['image'+i].wrongFile" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                                    </svg>
                                                    
                                                </div>
                                                <div class="pt-1">
                                                    <button class="btn  btn-danger btn-outline float-left p-0" v-on:click="delImages(i)"><i class="fa fa-trash"></i></button>
                                                    <button class="btn  float-right p-0 "  v-on:click="moveImage(i,'left')"><i v-if="i!=1" class="fa fa-arrow-up" ></i><i v-else class="fa fa-arrow-right"></i></button>
                                                    <button class="btn btn-warning float-right mr-2 p-0"  v-on:click="moveImage(i,'right')" ><i class="fa fa-arrow-down"></i></button>
                                                </div>
                                                
                                            </div>
                                        
                                        </div>
                                        <div class="col-7 p-0">
                                            <div style="width:400px; height:400px;">
                                                <div class="mb-1 drop" :class="getClasses0" @dragover.prevent="dragOver(0)" @dragleave.prevent="dragLeave(0)" @drop.prevent="drop($event,0)" style="width:100%; height:100%;" :style="{ 'background-image': 'url(\'/src/assets/img/uploads/yellow.png\')' }">
                                                    <img :src="this.product.marketplace[this.marketplace.id].image0" v-if="this.product.marketplace[this.marketplace.id].image0" style="width:95%; height:95%; overflow:hidden;"/>
                                                    <h1 v-if="image0.wrongFile">File immagine sbagliato o corrotto</h1>
                                                    <svg v-if="image0.wrongFile" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <button v-on:click="delImages(0)" class="btn btn-outline btn-danger float-left p-1" ><i class="fa fa-trash"></i></button>
                                                    <button class="btn btn-warning p-1 float-right" v-on:click="moveImage(0,'right')"><i class="fa fa-arrow-up" style="transform:rotate(-45deg);"></i></button>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="col-12 p-0">
                                                <div v-for="i in 4" :key="i" class="m-1" style="width:100px; height:80px; display:inline-block; text-align:center;" >
                                                    <div class="drop" :class="this['getClasses'+(i+3)]" @dragover.prevent="dragOver((i+3))" @dragleave.prevent="dragLeave((i+3))" @drop.prevent="drop($event,(i+3))" style="width:100px;height:100px; margin:auto; background-image:url('/src/assets/img/uploads/blue.png');">
                                                        <img :src="this.product.marketplace[this.marketplace.id]['image'+(i+3)]" v-if="this.product.marketplace[this.marketplace.id]['image'+(i+3)]"/>
                                                        <h1 v-if="this['image'+(i+3)].wrongFile">File immagine sbagliato o corrotto</h1>
                                                        <svg v-if="this['image'+(i+3)].wrongFile" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                                        </svg>
                                                        
                                                    </div>
                                                    <div class="pt-1">
                                                        <button class="btn btn-danger btn-outline float-left p-0" v-on:click="delImages((i+3))"><i class="fa fa-trash"></i></button>
                                                        <button class="btn btn-warning float-right p-0"  v-on:click="moveImage((i+3),'right')" v-if="i+3<8"><i  class="fa fa-arrow-right"></i></button>
                                                        <button class="btn float-right p-0 mr-2"  v-on:click="moveImage((i+3),'left')" ><i v-if="i+3>4" class="fa fa-arrow-left"></i><i v-else class="fa fa-arrow-up"></i></button>
                                                    </div>
                                                </div>
                                                <div class="m-1" style="width:100px; height:80px; display:inline-block; text-align:center;">
                                                <div class="mb-1 drop" :class="getClasses8" @dragover.prevent="dragOver(8)" @dragleave.prevent="dragLeave(9)" @drop.prevent="drop($event,8)" style="width:100px; height:100px; margin:auto; background-image:url('/src/assets/img/uploads/violet.png');">
                                                    <img :src="this.product.marketplace[this.marketplace.id].image8" v-if="this.product.marketplace[this.marketplace.id].image8" />
                                                    <h1 v-if="image0.wrongFile">File immagine sbagliato o corrotto</h1>
                                                    <svg v-if="image0.wrongFile" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                    <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                    <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                                    </svg>
                                                </div>
                                                <div>
                                                    <button v-on:click="delImages(8)" class="btn btn-outline btn-danger float-left p-0" ><i class="fa fa-trash"></i></button>
                                                    <button class="btn btn-warning p-0 mr-2 float-right" v-on:click="moveImage(8,'left')"><i class="fa fa-arrow-left"></i></button>
                                                </div>
                                            </div>
                                                
                                                
                                        </div>
                                    </div>
                                        
                                </div>
                                    
                                  
                                    <div class="row col-8 p-4 m-auto" >
                                        <div class="col-12 pb-0 mb-0">
                                            <table class="table table-sm table-responsive">
                                                <tr><th>SKU</th><td>
                                                    <template v-if="this.product.id">
                                                        <b>{{product.sku}}</b>
                                                    </template>
                                                    <template v-else>
                                                        <input class="form-control" :disabled="product.id" type="text" v-model="product.sku">
                                                    </template>
                                                </td></tr>
                                                <tr><th>Marca</th><td>
                                                    <input class="form-control" type="text" v-model="product.brand">
                                                </td></tr>
                                                <tr><th>Tipo GTIN</th>
                                                    <td>
                                                        <select class="custom-select mr-2" v-model="product.gtin_type">
                                                            <option value="NOGTIN">ESENTE</option>
                                                            <option value="EAN">EAN</option>
                                                            <option value="ISBN">ISBN</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr><th>GTIN</th><td>
                                                    <input class="form-control mr-2" type="text" v-model="product.gtin" :disabled="this.product.gtin_type=='NOGTIN'">
                                                </td></tr>
                                                <tr><th>Titolo</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].title">
                                                </td></tr>
                                                <tr><th>Descrizione breve</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].short_description">
                                                </td></tr>
                                                <tr><th>Parole chiave</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].keywords">
                                                </td></tr>
                                                <tr><th>Bullet point 1</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].bullet_point1">
                                                </td></tr>
                                                <tr><th>Bullet point 2</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].bullet_point2">
                                                </td></tr>
                                                <tr><th>Bullet point 3</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].bullet_point3">
                                                </td></tr>
                                                <tr><th>Bullet point 4</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].bullet_point4">
                                                </td></tr>
                                                <tr><th>Bullet point 5</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].bullet_point5">
                                                </td></tr>
                                                <tr><th>Bullet point 6</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].bullet_point6">
                                                </td></tr>
                                                <tr><th>Bullet point 7</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].bullet_point7">
                                                </td></tr>
                                                <tr><th>Bullet point 8</th><td>
                                                    <input class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].bullet_point8">
                                                </td></tr>

                                            </table>
                                        </div>
                                       
                                        
                                        
                                        
                                    </div>
                                </div>
                                <div class="row col-12 pr-5 pl-5">
                                    <div class="col-12 p-3" >
                                        <h6>Descrizione HTML</h6>
                                        <textarea class="form-control" type="text" v-model="product.marketplace[this.marketplace.id].description" style="min-height:200px"></textarea>
                                        <hr/>
                                    </div>
                                    <div class="m-auto col-12">
                                        <h6>Vista descrizione</h6>
                                        <div style="background:white;" class="p-4" v-html="product.marketplace[this.marketplace.id].description"></div>
                                    </div>
                                </div>
                                    
                                
                            
                        </div>
                        
                        <div class="tab-pane fade show" :class="{ 'active' : tab=='attributi'}"  role="tabpanel" aria-labelledby="attribute-tab">
                        
                        </div>
                        
                        
                        <div class="tab-pane fade show" :class="{ 'active' : tab=='fx'}"  role="tabpanel" aria-labelledby="fx-tab">
                            <div class="card">
                                <div class="card-header mb-4">
                                    <h6>Copia su altri prodotti</h6>
                                </div>
                                <div class="card-body">
                                    <div class="col-12 row">
                                        <div class="col-10 row">
                                            <div class="col-5">
                                                <ul>
                                                    <li><input type="checkbox" v-model="copyTo['title']">Titolo</li>
                                                    <li><input type="checkbox" v-model="copyTo['description']">Descrizione</li>
                                                    <li><input type="checkbox" v-model="copyTo['short_description']">Descrizione breve</li>
                                                    <li><input type="checkbox" v-model="copyTo['bullet_point']">Bullet Point</li>
                                                    <li><input type="checkbox" v-model="copyTo['keywords']">Parole chiave</li>
                                                    <li><input type="checkbox" v-model="copyTo['brand']">Marca</li>
                                                    <li><input type="checkbox" v-model="copyTo['images']">Immagini</li>
                                                </ul>                                        
                                            </div>
                                            <div class="col-7">
                                                Scegli i Marketplace sui quali vuoi copiare
                                                <select class="custom-select" multiple style="width:100%;height:150px;" v-model="this.marketTo">
                                                    <option v-for="market,key in this.marketplaces" :value="market.id" :key="key">{{market._code}} {{market._country}} ({{market.account}})</option>
                                                </select>
                                            </div>
                                            <div class="col-12 mt-5">
                                                <h6>Scegli i Prodotti sui quali vuoi copiare</h6>
                                            </div>
                                            <div class="col-3 mt-4">
                                                <b>Semplici</b>
                                                <select class="custom-select mt-2" multiple style="width:100%;height:150px;" v-model="this.productsTo.simple">
                                                    <option v-for="product,key in this.abstractProducts.simple" :value="product.id" :key="key">{{product.sku}}</option>
                                                </select>
                                            </div>
                                            <div class="col-3 mt-4">
                                                <b>Configurabili</b>
                                                <select class="custom-select mt-2" multiple style="width:100%;height:150px;" v-model="this.productsTo.configurable">
                                                    <option v-for="product,key in this.abstractProducts.configurable" :value="product.id" :key="key">{{product.sku}}</option>
                                                </select>
                                            </div>
                                            <div class="col-3 mt-4">
                                                <b>Multipli</b>
                                                <select class="custom-select mt-2" multiple style="width:100%;height:150px;" v-model="this.productsTo.multiple">
                                                    <option v-for="product,key in this.abstractProducts.multiple" :value="product.id" :key="key">{{product.sku}}</option>
                                                </select>
                                            </div>
                                            <div class="col-3 mt-4">
                                                <b>Composti</b>
                                                <select class="custom-select mt-2" multiple style="width:100%;height:150px;" v-model="this.productsTo.bulk">
                                                    <option v-for="product,key in this.abstractProducts.bulk" :value="product.id" :key="key">{{product.sku}}</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div class="col-2 m-auto text-center">
                                            <input class="mr-2" type="checkbox" v-model="this.overwriteTo">Copia anche se nullo<br/><br/>
                                            <button class="btn btn-danger" v-on:click="this.copyToProducts()">Copia</button>

                                        </div>
                                    </div>
                                        
                                        
                                    
                                </div>
                            </div>
                            <div class="card">
                                <div class="card-header mb-4">
                                    <h6>Copia da un altro prodotto</h6>
                                </div>
                                <div class="card-body">
                                    <div class="col-12 row">
                                        <div class="col-2"><b>Cosa vuoi copiare?</b>
                                            <ul class="mt-2">
                                                <li><input type="checkbox" v-model="copyFrom['title']">Titolo</li>
                                                <li><input type="checkbox" v-model="copyFrom['description']">Descrizione</li>
                                                <li><input type="checkbox" v-model="copyFrom['short_description']">Descrizione breve</li>
                                                <li><input type="checkbox" v-model="copyFrom['bullet_point']">Bullet Point</li>
                                                <li><input type="checkbox" v-model="copyFrom['keywords']">Parole chiave</li>
                                                <li><input type="checkbox" v-model="copyFrom['brand']">Marca</li>
                                                <li><input type="checkbox" v-model="copyFrom['images']">Immagini</li>
                                            </ul>                                        
                                        </div>
                                        <div class="col-3">
                                            <b>Scegli il Marketplace dal quale vuoi copiare</b>
                                            
                                            <select class="custom-select mt-2" style="width:100%;" v-model="this.marketFrom">
                                                <option v-for="market,key in this.marketplaces" :value="market.id" :key="key">{{market._code}} {{market._country}} ({{market.account}})</option>
                                            </select>
                                        </div>
                                        <div class="col-3">
                                            <b>Scegli il Prodotto dal quale vuoi copiare</b>
                                            <table>
                                                <tr>
                                                    <th>Semplici</th>
                                                    <td>
                                                        <select class="custom-select mt-2" style="width:100%;" v-model="this.productFrom.simple" v-on:change="this.resetOtherProductFrom('simple')">
                                                            <option v-for="product,key in this.abstractProducts.simple" :key="key" :value="product.id">{{product.sku}}</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Configurabili</th>
                                                    <td>
                                                        <select class="custom-select mt-2" style="width:100%;" v-model="this.productFrom.configurable" v-on:change="this.resetOtherProductFrom('configurable')">
                                                            <option v-for="product,key in this.abstractProducts.configurable" :key="key" :value="product.id">{{product.sku}}</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Multipli</th>
                                                    <td>
                                                        <select class="custom-select mt-2" style="width:100%;" v-model="this.productFrom.multiple" v-on:change="this.resetOtherProductFrom('multiple')">
                                                            <option v-for="product,key in this.abstractProducts.multiple" :key="key" :value="product.id">{{product.sku}}</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                                <tr>
                                                    <th>Composti</th>
                                                    <td>
                                                        <select class="custom-select mt-2" style="width:100%;" v-model="this.productFrom.bulk" v-on:change="this.resetOtherProductFrom('bulk')">
                                                            <option v-for="product,key in this.abstractProducts.bulk" :key="key" :value="product.id">{{product.sku}}</option>
                                                        </select>
                                                    </td>
                                                </tr>
                                            </table>
                                        </div>
                                        <div class="col-4 m-auto text-center">
                                            <input class="mr-2" type="checkbox" v-model="this.overwriteFrom">Sovrascrivi anche se nullo<br/><br/>
                                            <button class="btn btn-danger" v-on:click="this.copyFromProduct()">Copia</button>
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
const AUTH_TOKEN = "51fb50cfbedaf479a0080615e77cc82392628a21";
import Sidebar from "../../../components/Sidebar.vue";
import CheckboxButton from "../../../components/CheckboxButton.vue";
import RadioButton from "../../../components/RadioButton.vue";
import Nav from "../../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
  return {  
            prev:null,
            next:null,
            tab:'general',
            categories:[],
            ready:false,
            
            marketplaces:[],
            marketplaceKey:"",
            marketplace:null,
            marketplaceImg:"",
            
            company:{},
            companies:[],

            product:{},
            abstractProducts:{
                "simple":{},
                "configurable":{},
                "multiple":{},
                "bulk":{}
            },
            copyFrom:{
                "title":false,
                "images":false,
                "description":false,
                "short_description":false,
                "bullet_point":false,
                "keywords":false,
                "brand":false,
            },
            copyTo:{
                "title":false,
                "images":false,
                "description":false,
                "short_description":false,
                "bullet_point":false,
                "keywords":false,
                "brand":false,
            },
            marketTo:{},
            productsTo:{
                "simple":{},
                "configurable":{},
                "multiple":{},
                "bulk":{},
            },
            marketFrom:null,
            productFrom:{
                "simple":null,
                "configurable":null,
                "multiple":null,
                "bulk":null,
            },
            overwriteFrom:false,
            overwriteTo:false,
            
            
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
                    this.product.marketplace[this.marketplace.id]["image"+id] = f.target.result
                    this["image"+id].isDragging = false
                    }
                    reader.readAsDataURL(file)
                }else{
                    this["image"+id].wrongFile = true
                    this.product.marketplace[this.marketplace.id]["image"+id] = null
                    this["image"+id].isDragging = false
                }
            }
        },
        delImages(i){
            this["image"+i]={isDragging:false,wrongFile:false}
            this.product.marketplace[this.marketplace.id]["image"+i]=null;
        },

        moveImage(i,direction){
            var tmpImageA=this["image"+i];
            var tmpImageB=this.product.marketplace[this.marketplace.id]["image"+i];
            var k=i;
            if(direction=="right"){
                k=i+1;
            }
            else{
                k=i-1;
            }
            this["image"+i]=this["image"+k];
            if(this.product.marketplace[this.marketplace.id]["image"+k]==undefined){
                this.product.marketplace[this.marketplace.id]["image"+i]=null    
            }
            else{
                this.product.marketplace[this.marketplace.id]["image"+i]=this.product.marketplace[this.marketplace.id]["image"+k];
            }
            this["image"+k]=tmpImageA;
            this.product.marketplace[this.marketplace.id]["image"+k]=tmpImageB;
        },


        


        


        async init(){
            this.getCompanies().then(this.getMarketplaces).then(this.getProduct).then(this.getAbstractProducts)
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
            
            
                
            this.axios.get("/api/simplify/products/categories/?company="+this.company.id).then((res)=>{
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
                        this.product.marketplace[this.marketplace.id]={};
                        
                        for(var i=0;i<res.data.char_eav.length;i++){
                            if(res.data.char_eav[i].marketplace == this.marketplace.id){
                                this.product.marketplace[this.marketplace.id][res.data.char_eav[i].attribute]=res.data.char_eav[i].value;
                            }
                        }
                        for(var i=0;i<res.data.text_eav.length;i++){
                            if(res.data.text_eav[i].marketplace == this.marketplace.id){
                                this.product.marketplace[this.marketplace.id][res.data.text_eav[i].attribute]=res.data.text_eav[i].value;
                            }
                        }
                        for(var i=0;i<res.data.url_eav.length;i++){
                            if(res.data.url_eav[i].marketplace == this.marketplace.id){
                                this.product.marketplace[this.marketplace.id][res.data.url_eav[i].attribute]=res.data.url_eav[i].value;
                            }
                        }
                        for(var i=0;i<res.data.int_eav.length;i++){
                            if(res.data.int_eav[i].marketplace == this.marketplace.id){
                                this.product.marketplace[this.marketplace.id][res.data.int_eav[i].attribute]=res.data.int_eav[i].value;
                            }
                        }
                        for(var i=0;i<res.data.boolean_eav.length;i++){
                            if(res.data.boolean_eav[i].marketplace == this.marketplace.id){
                                this.product.marketplace[this.marketplace.id][res.data.boolean_eav[i].attribute]=res.data.boolean_eav[i].value;
                            }
                        }
                        for(var i=0;i<res.data.decimal_eav.length;i++){
                            if(res.data.decimal_eav[i].marketplace == this.marketplace.id){
                                this.product.marketplace[this.marketplace.id][res.data.decimal_eav[i].attribute]=res.data.decimal_eav[i].value;
                            }
                        }
                        
                         
                        
                        this.ready=true;
                }).catch((error)=>{
                    this.toast.error(error);
                })
            
        },
        changeCompany(index){
            window.location.href='/products/simple?company='+this.companies[key].id;
            
        },
        changeMarketplace(event){
            window.location.href='/product/simple?company='+this.company.id+'&marketplace='+event.target.value+'&id='+this.product.id
        },
        
        
        
        saveProduct(){
            
            this.axios.put("/api/products/simple/"+this.product.id+"/?company="+this.company.id+"&marketplace="+this.marketplace.id,this.product).then((res)=>{
                this.toast.success("Prodotto salvato");
                this.getProduct();
            }).catch((error)=>{
                this.toast.error(error.response.data.detail)
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
        resetOtherProductFrom(except){
            for(var key of Object.keys(this.productFrom)){
                if(except!==key){
                    this.productFrom[key]=null
                }
            }
            
            
        },
        copyToProducts(){

            var data={}
            data["marketplace"]=[]
            for(var value of Object.values(this.marketTo)){
                data["marketplace"].push(value);
            }
            data["fields"]=[]
            for(var [key,value] of Object.entries(this.copyTo)){
                if(value){
                    data["fields"].push(key);
                }
            }
            data["products"]={}
            data["products"]["simple"]=[]
            for(var [key,value] of Object.entries(this.productsTo.simple)){
                if(value){
                    data["products"]["simple"].push(value);
                }
            }
            data["products"]["configurable"]=[]
            for(var [key,value] of Object.entries(this.productsTo.configurable)){
                if(value){
                    data["products"]["configurable"].push(value);
                }
            }
            data["products"]["multiple"]=[]
            for(var [key,value] of Object.entries(this.productsTo.multiple)){
                if(value){
                    data["products"]["multiple"].push(value);
                }
            }
            data["products"]["bulk"]=[]
            for(var [key,value] of Object.entries(this.productsTo.bulk)){
                if(value){
                    data["products"]["bulk"].push(value);
                }
            }
            data["overwrite"]=this.overwriteTo
            
            this.axios.put("/api/copy/to/simple/?company="+this.company.id+"&marketplace="+this.marketplace.id+"&product="+this.product.id,data).then((res)=>{
                this.toast.success("Copia effettuata");                
            }).catch((error)=>{
                this.toast.error(error.response.data.detail)
            })
            
            
        },
        copyFromProduct(){
            var data={}
            
            data["product"]=this.productFrom
            data["marketplace"]=this.marketFrom
            data["overwrite"]=this.overwriteFrom
            data["fields"]=[]
            for(var [key,value] of Object.entries(this.copyFrom)){
                if(value){
                    data["fields"].push(key);
                }
            }
            
            this.axios.put("/api/copy/from/simple/?company="+this.company.id+"&marketplace="+this.marketplace.id+"&product="+this.product.id,data).then((res)=>{
                this.toast.success("Copia effettuata");                
            }).catch((error)=>{
                this.toast.error(error.response.data.detail)
            })
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