<template>
    <div>
        <Sidebar parent="products" child="bulk"/>
        <div class="main">
            <table v-if="products" class="table table-borderless table-striped table-hover table-sm">
                <thead>
                    <tr><th v-for="(field,key) in fields" :key="key" >{{field.name}}</th></tr>    
                </thead>
                <tbody>
                    <tr v-for="(product,index) in products" :key="index">
                        <td v-for="(field,key) in fields" :key="key" >{{product[key]}}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</template>

<script>
const AUTH_TOKEN = "51fb50cfbedaf479a0080615e77cc82392628a21";
import Sidebar from "../../components/Sidebar.vue";
import { useToast } from "vue-toastification";
export default{
    data(){
        return {
            products:[],
            fields: {
                id: { name :"ID",show:false },
                sku:{ name :"SKU",show:true },
                productType: {name :"Tipo",show:true},
                gtin:{name :"GTIN",show:true},
                title:{name :"Titolo", show:true},
                short_description:{ name:"Descrizione Breve",show:false},
                description: { name :"Descrizione",show:false},
                images:{name :"Immagini",show:true},
                keywords:{name :"Parole chiave",show:false},
                bullet_point:{name :"Punti di forza (Bullet Point)",show:false},
                attributes:{name :"Attributi",show:false},
            }
        }
    },
    setup(){
        const toast = useToast();
        return { toast }
    },
	mounted(){
        this.axios.get("http://3.126.248.102:8000/api/products/bulk/", {"headers": { Authorization: 'Token '+AUTH_TOKEN } }).then((res) => {
                  for(var i=0; i<res.data.count; i++){
                    var obj=res.data.results[i];
                    var product = {
                         "id":obj["id"],
                        "sku":obj.sku,
                        "productType":"Misto",
                        "gtin":obj.gtin,
                        "gtin_type":obj.gtin_type
                    };
                    for(var k=0; k<obj.text_eav.length;k++){
                        product[obj.text_eav[k].attribute]=obj.text_eav[k].value;
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
                })
                .catch((error) => {
                    if(error.response!=null){
                        this.toast.error(error.response.data.detail);
                    }
                    else{
                        this.toast.error("Errore indefinito");
                    }
                }).finally(() => {
                  
                });
        
    },
  computed(){

  },
	methods(){
        

    },
    components:{
        Sidebar
        
    }


    
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN

// axios.defaults.xsrfCookieName = 'csrftoken'
// axios.defaults.xsrfHeaderName = "X-CSRFTOKEN"
}
</script>
