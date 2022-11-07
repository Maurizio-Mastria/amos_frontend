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
                        <div class="col-8  float-left">
                            <h5 style="text-align:left;" class="mt-3 col-12 ">Scheda prodotto - <b>{{product.sku}}</b></h5>
                            <h5 style="text-align:left;" class="mt-3 col-12 mb-4"><b>{{product.title}}</b></h5>
                        </div>
                        <template v-if="this.product.id">
                            <template v-if="this.prev || this.next">
                            <div class="md-auto float-left"><a v-if="this.prev!=null" class="btn btn-warning mt-3" :href="'/products/edit?id='+this.prev+'&type=simple&marketplace='+this.marketplace.id"><i class="fa fa-arrow-left"></i></a></div>
                            <div class="md-auto float-left mt-4"><b class="p-4"><i>Cambia prodotto</i></b></div>
                            <div class="md-auto float-left"><a v-if="this.next!=null" class="btn btn-warning mt-3" :href="'/products/edit?id='+this.next+'&type=simple&marketplace='+this.marketplace.id"><i class="fa fa-arrow-right"></i></a></div>
                            </template>
                            <template v-else><div class="md-auto float-left mt-3"><b class="p-4 writer"><i>Loading...</i></b></div></template>
                        </template>
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
                                <div class="col-12 row">
                                    <div class="input-group col-xl-5 col-12" style="display:block;">
                                        <div class="mb-4" style="min-width:100%; height:300px; min-height:300px; max-height: 300px;">
                                            <h6>Immagine principale</h6>
                                        
                                            <div class="mb-1 drop" :class="getClasses0" @dragover.prevent="dragOver(0)" @dragleave.prevent="dragLeave(0)" @drop.prevent="drop($event,0)" style="width:100%; height:90%;">
                                                <img :src="productImages.image0" v-if="productImages.image0" style="width:95%; height:95%; overflow:hidden;"/>
                                                <h1 v-if="image0.wrongFile">File immagine sbagliato o corrotto</h1>
                                                <svg v-if="image0.wrongFile" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 16 16">
                                                <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z"/>
                                                <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z"/>
                                                </svg>
                                                <img v-if="!productImages.image0 && !image0.isDragging && !image0.wrongFile" src="/src/assets/img/uploads/yellow.png"/>
                                            </div>
                                            <div><button v-on:click="delImages(0)" class="btn btn-danger float-left p-1" ><i class="fa fa-trash"></i></button><button class="btn btn-warning float-right p-1 " v-on:click="moveImage(0,'right')"><i class="fa fa-arrow-right"></i></button></div>
                                        </div>
                                    <div>
                                    <div class="col-12 mx-auto">
                                        <div class="input-group">
                                            <div v-for="i in (1,8)" class="p-3">
                                                <template v-if="i<8">Immagine {{i}}</template><template v-else>Swatch Image</template>
                                                    <div class="drop" :class="this['getClasses'+i]" @dragover.prevent="dragOver(i)" @dragleave.prevent="dragLeave(i)" @drop.prevent="drop($event,i)" style="width:100px;height:100px;">
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
                                                        <button class="btn btn-danger float-left p-0" v-on:click="delImages(i)"><i class="fa fa-trash"></i></button>
                                                        <button class="btn btn-warning float-right p-0"  v-on:click="moveImage(i,'right')" v-if="i<8"><i  class="fa fa-arrow-right"></i></button>
                                                        <button class="btn btn-warning float-right p-0 mr-2"  v-on:click="moveImage(i,'left')"><i class="fa fa-arrow-left"></i></button>
                                                    </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-xl-7 col-sm-12">
                                <div class="row">
                                    <div class="col-xl-6 col-12">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend mr-2" >
                                                <span class="input-group-text" style="min-width:200px;" id="product_type">Tipo prodotto</span>
                                            </div>
                                            <select style="font-weight:bold;" class="custom-select" aria-label="Tipo prodotto"  aria-describedby="product_type" :disabled="product.id" v-model="product.type" v-on:change="selectProductType($event.target.value)">
                                                <option value="S">Semplice</option>
                                                <option value="C">Configurabile</option>
                                                <option value="M">Multiplo</option>
                                                <option value="B">Misto</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="col-xl-6 col-12">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend mr-2">
                                                <span class="input-group-text" id="product_sku" style="min-width:100px;">SKU</span>
                                            </div>
                                            <input class="form-control" style="font-weight:bold;" :disabled="product.id" type="text" v-model="product.sku">
                                        </div>
                                    </div>
                                    <div class="col-xl-8 col-12">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend mr-2">
                                                <span class="input-group-text" id="product_title" style="min-width:100px;">Titolo</span>
                                            </div>
                                            <input class="form-control" style="font-weight:bold;" type="text" v-model="product.title">
                                        </div>
                                    </div>
                                    <div class="col-xl-4">
                                        <div class="input-group mb-3">
                                            <div class="input-group-prepend mr-2">
                                                <span class="input-group-text" id="product_brand" style="min-width:100px;">Brand</span>
                                            </div>
                                            <input class="form-control" style="font-weight:bold;" type="text" v-model="product.brand">
                                        </div>
                                    </div>
                                
                                    <div class="col-12 row">
                                        <template v-if="product.type!='C'">
                                            <div class="col-12 input-group mb-3">
                                                <div class="input-group-prepend">
                                                    <div class="input-group-prepend mr-2">
                                                        <span class="input-group-text" id="product_gtin" style="height:39px; min-width:200px;">GTIN</span>
                                                    </div>
                                                    
                                                    <select class="custom-select mr-2" style="font-weight:bold !important; height:39px; min-width:150px;"  v-model="product.gtin_type" :disabled="gtinIsOn">
                                                        <option value="EAN">EAN</option>
                                                        <option value="ISBN">ISBN</option>
                                                    </select>
                                                    <input class="form-control mr-2" type="text" style=" min-width:300px;" v-model="product.gtin" :disabled="gtinIsOn">
                                                    <span class="p-2"><CheckboxButton :ison.sync="gtinIsOn" @update:ison="(n) => gtinIsOn=n"/></span><span class="p-2"><b v-if="gtinIsOn" style="color:var(--info);">Esente</b><b v-else style="color:grey;">Esente</b></span>
                                                </div>
                                            </div>
                                        </template>
                                        <template v-else>
                                            <div class="col-12 pr-2 pl-2">
                                                <div class="p-2 col-6 float-left" style="text-align:left"><RadioButton :ison.sync="!iHaveChilds" message="Crea nuovi prodotti figlio" @update:ison="iHaveChilds=!iHaveChilds"/></div>
                                                <div class="p-2 col-6 float-left" style="text-align:left"><RadioButton :ison.sync="iHaveChilds" message="Usa prodotti esistenti" @update:ison="iHaveChilds=!iHaveChilds"/></div>
                                            </div>
                                            <div class="col-xl-12 pl-2 pr-2 mr-3 ml-3 mb-4" style="background:white; border:1px solid var(--warning); border-radius:4px;">
                                                <template v-if="!iHaveChilds">
                                                </template>
                                                <template v-else>
                                                    <div class="row col-xl-12 pl-2 pr-2">

                                                        <div class="col-12 p-2" style="text-align:left;">
                                                            <div class="col-12 p-2"><b>Prodotti selezionati</b></div>
                                                            <span class="m-1" v-for="(value,key) in abstract.childs_selected" :key="key"><span class="p-2 m-1" style="border-radius:5px; color:white; background:var(--warning);">{{value.sku}}</span><i class="p-2 fa fa-remove" style="cursor:pointer; position:relative; top:-15px; left:-15px; color:var(--danger);" v-on:click="removeChildSelected(key)"></i></span>
                                                        </div>
                                                        <div class="col-xl-10">
                                                            <div class="input-group-prepend">
                                                                <div class="input-group-prepend mr-2">
                                                                    <span class="input-group-text" id="product_gtin">Figli disponibili</span>
                                                                </div>
                                                                <input class="form-control" style="font-weight:bold;"  placeholder="Filtra per SKU" type="text" v-model="skufiltervalue">
                                                                <select class="custom-select" data-live-search="true" v-model="s_child">
                                                                    <template v-for="(value,key) in abstract.childs_availables" :key="key">
                                                                        <template v-if="value.sku.includes(this.skufiltervalue) || this.skufiltervalue==''">
                                                                            <option :value="value">{{value.sku}} - {{value.title}}</option>
                                                                    </template>
                                                                    </template>
                                                                </select>
                                                            </div>
                                                        </div>
                                                        <div class="col-2 m-auto">
                                                            <button class="btn btn-warning" :disabled="s_child==null" v-on:click="addChildSelected()">Aggiungi</button>
                                                        </div>
                                                    </div>
                                                    <hr/>
                                                    <div class="row col-xl-12 p-2">
                                                        <div class="col-12 p-2" style="text-align:left;">
                                                            <span class="m-1" v-for="(value,key) in abstract.variations_selected" :key="key"><span class="p-2 m-1" style="border-radius:5px; color:white; background:var(--warning);">{{value.description}}</span><i class="p-2 fa fa-remove" style="cursor:pointer; position:relative; top:-15px; left:-15px; color:var(--danger);" v-on:click="removeVariationSelected(key)"></i></span>
                                                        </div>
                                                    <div class="col-xl-10">
                                                        <div class="input-group-prepend">
                                                            <div class="input-group-prepend mr-2">
                                                                <span class="input-group-text" id="product_gtin">Varianti disponibili</span>
                                                            </div>
                                                            
                                                        <select class="custom-select" data-live-search="true" v-model="s_variation">
                                                                <option v-for="(value,key) in abstract.variations_availables" :key="key" :value="value">{{value.description}}</option>
                                                            </select>
                                                        </div>
                                                    </div>
                                                    <div class="col-2 m-auto">
                                                        <button class="btn btn-warning" :disabled="s_variation==null" v-on:click="addVariationSelected()" >Aggiungi</button>
                                                    </div>
                                                    </div>
                                                </template>
                                            </div>
                                            
                                        
                                        </template>
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                        </div>
                        <div class="tab-pane fade show" :class="{ 'active' : tab=='descriptions'}"  role="tabpanel" aria-labelledby="descriptions-tab">
                            <div class="col-12 row">
                                <div class="col-xl-6 col-12">
                                    <div class="col-xl-12 col-12 mb-3">
                                        <div class="input-group">
                                            <div class="input-group-prepend mr-2" style="min-width:100%">
                                                <span class="input-group-text" id="product_short_description" style="min-width:100%">Descrizione breve</span>
                                            </div>
                                        </div>
                                        <textarea class="form-control" type="text" v-model="product.short_description"></textarea>
                                    </div>
                                    <div class="col-xl-12 col-12">
                                        <div class="input-group">
                                            <div class="input-group-prepend mr-2" style="min-width:100%">
                                                <span class="input-group-text" id="product_description" style="min-width:100%">Descrizione</span>
                                            </div>
                                        </div>
                                        <textarea class="form-control" type="text" v-model="product.description" style="min-height:300px"></textarea>
                                    </div>
                                </div>
                                <div class="col-xl-6">
                                    <div class="col-xl-12 col-12">
                                        <div class="input-group">
                                            <div class="input-group-prepend mr-2" style="min-width:100%">
                                                <span class="input-group-text" id="product_description" style="min-width:100%">Vista descrizione</span>
                                            </div>
                                        </div>
                                        <div class="form-control" style="all:revert !important; text-align:left !important;" v-html="product.description"></div>
                                    </div>
                                </div>
                            </div>
                            <template v-if="product.type=='C'">
                                <hr/>

                                <div class="col-12 mt-4 row">
                                    <div class="col-xl-6 col-12">
                                        <div class="col-xl-12 col-12 mb-3">
                                            <div class="input-group">
                                                <div class="input-group-prepend mr-2" style="min-width:100%">
                                                    <span class="input-group-text" id="product_short_description" style="min-width:100%">Descrizione breve</span>
                                                </div>
                                            </div>
                                            <textarea class="form-control" type="text" v-model="product.short_description"></textarea>
                                        </div>
                                        <div class="col-xl-12 col-12">
                                            <div class="input-group">
                                                <div class="input-group-prepend mr-2" style="min-width:100%">
                                                    <span class="input-group-text" id="product_description" style="min-width:100%">Descrizione</span>
                                                </div>
                                            </div>
                                            <textarea class="form-control" type="text" v-model="product.description" style="min-height:300px"></textarea>
                                        </div>
                                    </div>
                                    <div class="col-xl-6">
                                        <div class="col-xl-12 col-12">
                                            <div class="input-group">
                                                <div class="input-group-prepend mr-2" style="min-width:100%">
                                                    <span class="input-group-text" id="product_description" style="min-width:100%">Vista descrizione</span>
                                                </div>
                                            </div>
                                            <div class="form-control" style="all:revert !important; text-align:left !important;" v-html="product.description"></div>
                                        </div>
                                    </div>
                                </div>
                            </template>                       
                        </div>
                        <div class="tab-pane fade show" :class="{ 'active' : tab=='seo'}"  role="tabpanel" aria-labelledby="seo-tab"></div>
                    </div>
                    
                </div>
            </div>
        <div class="right">
            <div>
                <Transition name="slide-fade">
                    <div id="left-col" class="mt-0" v-if="showfx" style="height:700px; overflow-y:scroll;">
                        <div v-if="showfx">
                            <div class="row">
                                <div class="col-12 mb-3" style="background:var(--warning); color:white;"><h2 class="float-left writer" >Azioni</h2></div>
                                <div class="col-6">
                                    <RadioButton  :ison.sync="fx.copyfrom" message="Copia da" @update:ison="fx.copyfrom=!fx.copyfrom"/>
                                </div>
                                <div class="col-6">
                                    <RadioButton :ison.sync="!fx.copyfrom" message="Copia su" @update:ison="fx.copyfrom=!fx.copyfrom"/>
                                </div>
                            </div>
                            <div style="border-color: var(--success) var(--success) #fff;border-style: solid;border-radius: 5px 5px 0px 0px;">
                                <div v-if="fx.copyfrom">
                                    <h5 class="pt-4 pb-4 writer"><b>COPIA DA</b></h5>
                                    <table  class="m-auto table" style="text-align:left">
                                        <tr>
                                            <th>Ditta</th>
                                            <td>
                                                <select class="custom-select" v-on:change="getAbstractProducts($event,null,null)" v-model="fx.company">
                                                    <option v-for="(val,key) in companies" :key="key" :value="val.id">{{val.name}}</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Marketplace</th>
                                            <td>
                                                <select class="custom-select" v-on:change="getAbstractProducts(this.fx.company,$event,null)" v-model="fx.marketplace">
                                                    <option v-for="(val,key) in fx.marketplaces" :key="key" :value="val.id">{{val._code}} {{val._country}}</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Prodotto</th>
                                            <td>
                                                <select class="custom-select" v-model="fx.product">
                                                    <option v-for="(val,key) in fx.abstractProducts" :key="key" :value="val">{{val.sku}} - {{val.title}}</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                                <div v-if="!fx.copyfrom">
                                    <h5 class="pt-4 pb-4 writer"><b>COPIA SU</b></h5>
                                    <table  class="m-auto table" style="text-align:left">
                                        <tr>
                                            <th>Ditta</th>
                                            <td>
                                                <select class="custom-select" v-on:change="getAbstractProducts($event,null,null)" v-model="fx.company">
                                                    <option v-for="(val,key) in companies" :key="key" :value="val.id">{{val.name}}</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Marketplace</th>
                                            <td>
                                                <select class="custom-select" v-on:change="getAbstractProducts(this.fx.company,$event,null)" v-model="fx.marketplace">
                                                    <option v-for="(val,key) in fx.marketplaces" :key="key" :value="val.id">{{val._code}} {{val._country}}</option>
                                                </select>
                                            </td>
                                        </tr>
                                        <tr>
                                            <th>Prodotto</th>
                                            <td>
                                                <select class="custom-select" style="min-height:200px" v-model="fx.productDest" multiple>
                                                    <option v-for="(val,key) in fx.abstractProducts" :key="key" :value="val">{{val.sku}} - {{val.title}}</option>
                                                </select>
                                            </td>
                                        </tr>
                                    </table>
                                </div>
                            </div>
                            <br>
                            <div class="p-2" style="border-color: var(--info) var(--info) #fff;border-style: solid;border-radius: 5px 5px 0px 0px;">
                                <h5 class="pt-4 pb-4 writer"><b>GENERALE</b></h5>
                                <table class="m-auto table table-sm" style="text-align:left">
                                    <tr><th>Titolo</th><td><input type="checkbox" v-model="fx.fields.title"></td></tr>
                                    <tr><th>Marca</th><td><input type="checkbox" v-model="fx.fields.brand"></td></tr>
                                    <tr><th>Descrizione breve</th><td><input type="checkbox" v-model="fx.fields.short_description"></td></tr>
                                    <tr><th>Descrizione</th><td><input type="checkbox" v-model="fx.fields.description"></td></tr>
                                    <tr>
                                        <th>Immagini</th>
                                        <td>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image0"><label >Immagine principale</label><br>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image1"><label>Immagine 1</label><br>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image2"><label>Immagine 2</label><br>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image3"><label>Immagine 3</label><br>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image4"><label>Immagine 4</label><br>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image5"><label>Immagine 5</label><br>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image6"><label>Immagine 6</label><br>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image7"><label>Immagine 7</label><br>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image8"><label>Immagine 8</label><br>
                                            <input class="mr-2" type="checkbox" v-model="fx.fields.image9"><label>Swatch Image</label><br>
                                        </td>
                                    </tr>
                                </table>
                            </div>
                            <br>
                            <div class="p-2" style="border-color: var(--warning) var(--warning) #fff;border-style: solid;border-radius: 5px 5px 0px 0px;">
                            <h5 class="pt-4 pb-4 writer"><b>SEO</b></h5>
                                <table class="m-auto table table-sm" style="text-align:left">
                                    <tr><th>Parole chiave</th><td><input type="checkbox" v-model="fx.fields.keywords"></td></tr>
                                    <tr><th>Bullet point</th><td><input type="checkbox" v-model="fx.fields.bullet_point"></td></tr>
                                    <tr><th>Attributi</th><td><input type="checkbox" v-model="fx.fields.attributes"></td></tr>
                                    <tr><th>Varianti/Figli</th><td><input type="checkbox" v-model="fx.fields.variations_childs"></td></tr>
                                </table>
                            </div>
                            <button type="button" v-if="!fx.copyfrom" v-on:click="sendFieldsValues()" class="btn btn-warning ml-2"><span>Copia<svg  xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up-right ml-2 mb-1" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M8.636 3.5a.5.5 0 0 0-.5-.5H1.5A1.5 1.5 0 0 0 0 4.5v10A1.5 1.5 0 0 0 1.5 16h10a1.5 1.5 0 0 0 1.5-1.5V7.864a.5.5 0 0 0-1 0V14.5a.5.5 0 0 1-.5.5h-10a.5.5 0 0 1-.5-.5v-10a.5.5 0 0 1 .5-.5h6.636a.5.5 0 0 0 .5-.5z"/>
  <path fill-rule="evenodd" d="M16 .5a.5.5 0 0 0-.5-.5h-5a.5.5 0 0 0 0 1h3.793L6.146 9.146a.5.5 0 1 0 .708.708L15 1.707V5.5a.5.5 0 0 0 1 0v-5z"/></svg></span></button>
                            <button type="button" v-if="fx.copyfrom" v-on:click="getFieldsValues()" class="btn btn-warning ml-2"><span>Copia<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-in-down-right ml-2 mb-1" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M6.364 2.5a.5.5 0 0 1 .5-.5H13.5A1.5 1.5 0 0 1 15 3.5v10a1.5 1.5 0 0 1-1.5 1.5h-10A1.5 1.5 0 0 1 2 13.5V6.864a.5.5 0 1 1 1 0V13.5a.5.5 0 0 0 .5.5h10a.5.5 0 0 0 .5-.5v-10a.5.5 0 0 0-.5-.5H6.864a.5.5 0 0 1-.5-.5z"/>
  <path fill-rule="evenodd" d="M11 10.5a.5.5 0 0 1-.5.5h-5a.5.5 0 0 1 0-1h3.793L1.146 1.854a.5.5 0 1 1 .708-.708L10 9.293V5.5a.5.5 0 0 1 1 0v5z"/>
</svg></span></button>
                            <button type="button" v-on:click="for(key of Object.keys(this.fx.fields))this.fx.fields[key]=false;" class="btn btn-success ml-2">Reset</button>
                        </div>


                    </div>
                </Transition>
                <div class="pt-5" v-if="marketplace">
                    <ul class="nav nav-pills flex-column">
                        <li class="nav-item"><button class="btn btn-outline-info" :class="{ active : fx  }" v-on:click="expand()" title="Funzionalità"><span class="writer" style="font-size:20px;"><b>FX</b></span></button></li>
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
            prev:null,
            next:null,
            tab:'general',
            showfx:false,
            fx:{
                copyfrom:true,
                marketplace:null,
                company:null,
                sku:null,
                id:null,
                type:null,
                field:null,
                marketplaces:[],
                abstractProducts:[],
                productDest:[],
                product:{},
                fields:{
                    title:false,
                    brand:false,
                    short_description:false,
                    description:false,
                    image0:false,
                    image1:false,
                    image2:false,
                    image3:false,
                    image4:false,
                    image5:false,
                    image6:false,
                    image7:false,
                    image8:false,
                    image9:false,
                    keywords:false,
                    bullet_point:false,
                    attributes:false,
                    variations_childs:false,
                }

            },
            
            marketplaces:[],
            marketplaceKey:"",
            marketplace:null,
            marketplaceImg:"",
            
            company:{},
            companies:[],

            product:{
                sku:"",
                gtin:null,
                gtin_type:"NOGTIN",
                type:"S",
                title:"",
                description:"",
                short_description:"",
                brand:"",
                id:null,
            },
            abstract:{
                childs_selected:[],
                variations_selected:[],
                childs_availables:[],
                variations_availables:[],
            },
            
            s_child:null,
            s_variation:null,
            skufiltervalue:'',
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
            iHaveChilds:false,
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


        // filterChilds(value){
            
        //     if(value==""){
        //         for(var i=0;i<this.abstract.childs_availables.length;i++){
        //             this.filterSelected[i]=i;
        //         }
        //     }
        //     else{
        //         this.filterSelected=[];
        //         for(var i=0;i<this.abstract.childs_availables.length;i++){
        //             if(this.abstract.childs_availables[i].sku.includes(value)){
        //                 this.filterSelected.push(i);
        //             }
        //         }
        //     }
        // },


        goToProduct(id){
            
            window.location.href="/product/?id="+id+"&type=simple&marketplace="+this.marketplace.id;

        },


        async init(){
            this.getCompanies().then(this.getMarketplaces).then(this.getProduct)
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
        selectProductType(type){
            if(type=="C"){
                this.postAbstractVariations();
            }
        },

        addChildSelected(){
            this.abstract.childs_selected.push(this.s_child);
            this.s_child=null;
            this.s_variation=null;
            this.postAbstractVariations()
        },
        removeChildSelected(index){
            this.abstract.childs_selected.splice(index,1);
            this.postAbstractVariations();
        },
        addVariationSelected(){
            this.abstract.variations_selected.push(this.s_variation);
            this.s_variation=null;
            this.s_child=null;
            this.postAbstractVariations()
        },
        removeVariationSelected(index){
            this.abstract.variations_selected.splice(index,1);
            this.postAbstractVariations();
        },
        postAbstractVariations() {
            if(this.marketplace!==null){
                
                const objdata={"childs":this.abstract.childs_selected,"variations":this.abstract.variations_selected}
                this.axios.post("/api/abstract/variations/?company="+this.company.id+"&marketplace="+this.marketplace.id,objdata).then((res) => {
                    this.abstract=res.data.results;
                    
                }).catch((error)=>{
                    this.toast.error("Errore indefinito");    
                });
                
            }
        },
        //FX Mi serve la lista dei prodotti in base al marketplace scelto
        getAbstractProducts(company,marketplace) {
            
            if(marketplace!==null){
                this.axios.get("/api/abstract/products/?company="+this.fx.company+"&marketplace="+marketplace.target.value).then((res) => {
                    this.fx.abstractProducts=res.data.results;
                }).catch((error)=>{
                    this.toast.error(error.response.detail);        
                })
            }
            else{
                this.axios.get("/api/marketplaces/?company="+company.target.value).then((res)=>{
                        this.fx.marketplaces=res.data.results;
                    })
            }
        },

        getFieldsValues(){
            var productType={"S":"simple", "C":"configurable", "M":"multiple", "B":"bulk"};
            var fields=[]
            for(const [key,val] of Object.entries(this.fx.fields)){
                if(val==true){
                    fields.push(key);
                }
            }
            
            this.axios.get("/api/products/"+productType[this.fx.product.type]+"/"+this.fx.product.id+"/?company="+this.fx.company+"&marketplace="+this.fx.marketplace).then((res)=>{
                    for(const [key,val] of Object.entries(res.data)){
                        if(!["id","sku","gtin","gtin_type"].includes(key)){
                            for(var i=0; i<val.length;i++){
                                if(key=="url_eav" && val[i].attribute.substr(0,5)=="image" && fields.includes(val[i].attribute)){
                                    let url = val[i].value+"?"+performance.now();
                                    let attribute=val[i].attribute;
                                    this.axios.get(url, {responseType: 'blob'}).then((response) => {
                                        let reader = new FileReader();
                                        reader.onload = f => {
                                            this.productImages[attribute]=f.target.result;
                                        }
                                        reader.readAsDataURL(response.data);
                                    }); 
                                }
                                else if(fields.includes(val[i]["attribute"])){
                                    this.product[val[i]["attribute"]]=val[i]["value"];
                                }
                            }
                        }
                    }
            }).catch((error)=>{
                this.toast.error(error.response.data);
            })
        },
        sendFieldsValues(){
            var productType={"S":"simple", "C":"configurable", "M":"multiple", "B":"bulk"};
            var fields=[]
            for(const [key,val] of Object.entries(this.fx.fields)){
                if(val==true){
                    fields.push(key);
                }
            }
            for(var i=0;i<this.fx.productDest.length;i++){
                var data={};
                for(var k=0; k<fields.length;k++){
                    if(fields[k].substr(0,5)=="image"){
                        if(!data["images"]){
                            data["images"]={}
                        }
                        data["images"][fields[k]]=this.productImages[fields[k]];
                    }
                    else{
                        data[fields[k]]=this.product[fields[k]];
                    }
                }
                data["id"]=this.fx.productDest[i].id;
                data["sku"]=this.fx.productDest[i].sku;
                data["type"]=this.fx.productDest[i].type;
                this.axios.post("/api/products/save/?company="+this.fx.company+"&marketplace="+this.fx.marketplace,data).then((res)=>{
                        this.toast.success(res.data.results);
                    }).catch((error)=>{
                        this.toast.error(error.response.data.detail)
                    })
            }
        },


        
        async getProduct(){
            var productType=[ "simple", "configurable", "multiple", "bulk"];
            if(this.$route.query.id!=null && productType.includes(this.$route.query.type)){
                
                this.axios.get("/api/products/"+this.$route.query.type+"/"+this.$route.query.id+"/?company="+this.company.id+"&marketplace="+this.marketplace.id).then((res)=>{
                        
                        if(this.product.gtin_type=="NOGTIN"){
                            this.product.gtin_type=null;
                            this.product.gtin=null;
                            this.gtinIsOn=true;
                        }
                        else{
                            this.product.gtin_type=res.data.gtin_type;
                            this.product.gtin=res.data.gtin;
                        }
                        this.product.sku=res.data.sku;
                        this.product.type="S";
                        this.product.id=res.data.id;
                        for(var i=0;i<res.data.char_eav.length;i++){
                            if(res.data.char_eav[i].attribute=="title"){
                                this.product.title=res.data.char_eav[i].value
                            }
                            else if(res.data.char_eav[i].attribute=="brand"){
                                this.product.brand=res.data.char_eav[i].value
                            }                            
                        }
                        
                        for(var i=0;i<res.data.url_eav.length;i++){
                            if(res.data.url_eav[i].attribute.substr(0,5)=="image"){
                                // console.log(res.data.url_eav[i].attribute)
                                let url = res.data.url_eav[i].value+"?"+performance.now();
                                let attribute=res.data.url_eav[i].attribute;
                                this.axios.get(url, {responseType: 'blob'}).then((response) => {
                                    let reader = new FileReader();
                                    reader.onload = f => {
                                        this.productImages[attribute]=f.target.result;
                                    }
                                    reader.readAsDataURL(response.data);
                                }); 
                                 
                                
                            }
                        }
                        for(var i=0;i<res.data.text_eav.length;i++){
                            if(res.data.text_eav[i].attribute=="description"){
                                this.product.description=res.data.text_eav[i].value
                                this.product.html=res.data.text_eav[i].value
                            }
                            else{
                                
                            }                            
                        }

                }).catch((error)=>{
                    this.toast.error(error.response.data);
                })
            }
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
            this.goToProduct(this.product.id);
        },
        async getProducts(){
            
            if(this.marketplace!==null && this.$route.query.id){
                
                this.axios.get("/api/abstract/products/?type=S&company="+this.company.id+"&marketplace="+this.marketplace.id).then((res) => {
                    var prev=null;
                    var next=null;
                    for(var i=0; i<res.data.results.length; i++){
                        if(i>0){
                            prev=res.data.results[i-1].id;
                        }
                        if(this.$route.query.id==res.data.results[i].id){
                            try{
                                next=res.data.results[i+1].id;
                            }catch{

                            }
                            this.prev=prev;
                            this.next=next;
                            return true;
                        }
                    }
                });
            }
        },
        
        
        saveProduct(){

            if(this.product.type==null || this.product.sku==null || this.product.sku=="" || this.product.type==null || this.product.title == null || this.product.title == "" ){
                var message="Campi obbligatori:\nSku, Tipo prodotto, Titolo, GTIN"
                this.toast.error(message);
                return;
            }

            var product={}

            product["sku"]=this.product.sku
            product["type"]=this.product.type
            if(this.product.type=="S"){
                if(!this.gtinIsOn){
                    product["gtin"]=this.product.gtin
                    product["gtin_type"]=this.product.gtin_type
                }
                else{
                    product["gtin"]=null
                    product["gtin_type"]="NOGTIN"
                }
            }
            else if(this.product.type=="C"){
                if(this.iHaveChilds){
                    if(this.abstract.childs_selected.length<2 || this.abstract.variations_selected.length<1){
                        this.toast.error("Devi selezionare almeno 2 prodotti figli e almeno 1 attributo variante");
                        return;
                    }
                    product["childs"]=this.abstract.childs_selected;
                    product["variations"]=this.abstract.variations_selected;
                }
                else{

                }
            }
        
            product["title"]=this.product.title
            product["brand"]=this.product.brand
            product["images"]=this.productImages
            product["description"]=this.product.description
            product["short_description"]=this.product.short_description

            if(this.product.id){
                product["id"]=this.product.id;
                this.axios.post("/api/products/save/?company="+this.company.id+"&marketplace="+this.marketplace.id,product).then((res)=>{
                    this.toast.success(res.data.results);
                }).catch((error)=>{
                    this.toast.error(error.response.data.detail)
                })
            }
            else{
                this.axios.put("/api/products/save/?company="+this.company.id+"&marketplace="+this.marketplace.id,product).then((res)=>{
                    this.toast.success(res.data.results);
                }).catch((error)=>{
                    this.toast.error(error.response.data.detail)
                })
            }
            
        },
        expand(){
            this.showfx = !this.showfx;
            
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