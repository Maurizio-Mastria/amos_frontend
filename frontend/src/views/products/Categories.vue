<template>
    <div>
        <Sidebar/>
        <div class="main-panel">
            <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
            <div class="top" style="border-bottom:1px solid var(--warning)">
                <div class="row">
                    <div class="col-md-5 pl-5 pt-1 writer" style="text-align:left;"><strong style="font-size:25px;">Categorie</strong></div>
                </div>
            </div>
            <div class="center" > 
                <div class="container-fluid" >
                    <div class="col-12">
                        
            <!-- <ul>
              <li><span v-on:click="cat1=!cat1" :class="{'caret-down': cat1==true}" class="caret">Beverages</span>
    <ul class="nested active">
      <li>Water</li>
      <li>Coffee</li>
      <li><span class="caret">Tea</span>
        <ul class="nested">
          <li>Black Tea</li>
          <li>White Tea</li>
          <li><span class="caret">Green Tea</span>
            <ul class="nested">
              <li>Sencha</li>
              <li>Gyokuro</li>
              <li>Matcha</li>
              <li>Pi Lo Chun</li>
            </ul>
          </li>
        </ul>
      </li>
    </ul>
  </li>
</ul> -->
                      
                      <div class="col-12 pb-0 mb-0">
                                            <h6>Categoria</h6>
                                            <div class="dropdown">
                                            <div id="myDropdown" class="dropdown-content">
                                              <input type="text" placeholder="Cerca.." id="myInput" v-model="searchValue" v-on:keyup="this.paths=[];searchCategories(this.searchValue,this.categories)">
                                              <a v-for="value,key in this.paths" :key="key" :value="value" href="#" v-on:click="">{{value.path}}</a>
                                            </div>
                                          </div>
                                        </div>


                                        
                  <template v-for="value,key in categories" :key="key" :id="value.id">
                    <div class="p-2">
                    <div v-if="value.childs.length>0"><button v-on:click="this.expand[value.id]=!this.expand[value.id]" class="btn btn-outline mr-2" style="border:none;"><template v-if="this.expand[value.id]">-</template><template v-else>+</template></button><strong style="text-transform:uppercase;">{{value.title}}</strong>
                    </div>
                    <div v-else><strong style="margin-left:48px;text-transform:uppercase;">{{value.title}}</strong></div>
                  </div>
                    <template v-if="this.expand[value.id]" v-for="value,key in value.childs" :key="key" :id="value.id">
                      <div style="margin-left:20px;" v-if="value.childs.length>0">
                        <button v-on:click="this.expand[value.id]=!this.expand[value.id]" class="btn btn-outline mr-1" style="border:none;"><template v-if="this.expand[value.id]">-</template><template v-else>+</template></button><strong style="text-transform:uppercase;">{{value.title}}</strong>
                      </div>
                      <div v-else><span style="color:grey;margin-left:80px;" ></span><strong style="text-transform:uppercase;">{{value.title}}</strong></div>
                      <template v-if="this.expand[value.id]" v-for="value,key in value.childs" :key="key" :id="value.id">
                        <div style="margin-left:40px;" v-if="value.childs.length>0">
                          <button v-on:click="this.expand[value.id]=!this.expand[value.id]" class="btn btn-outline mr-1" style="border:none;"><template v-if="this.expand[value.id]">-</template><template v-else>+</template></button><strong style="text-transform:uppercase;">{{value.title}}</strong>
                        </div>
                        <div v-else><span style="color:grey;margin-left:100px;" ></span><strong style="text-transform:uppercase;">{{value.title}}</strong></div>
                        <template v-if="this.expand[value.id]" v-for="value,key in value.childs" :key="key" :id="value.id">
                          <div style="margin-left:60px;" v-if="value.childs.length>0">
                            <button v-on:click="this.expand[value.id]=!this.expand[value.id]" class="btn btn-outline mr-1" style="border:none;"><template v-if="this.expand[value.id]">-</template><template v-else>+</template></button><strong style="text-transform:uppercase;">{{value.title}}</strong>
                          </div>
                          <div v-else><span style="color:grey;margin-left:100px;" ></span><strong style="text-transform:uppercase;">{{value.title}}</strong></div>
                        </template>
                      </template>
                    </template>
                  </template>
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
            searchValue:null,
            expand:{},
            categories:[],
            category:"",
            company:{},
            companies:[],
            tree:[],
            paths:[],
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
            this.getCompanies().then(this.getCategories)
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
        
        
        
        async getCategories(){
            this.axios.get("/api/simplify/products/categories/?company="+this.company.id).then((res)=>{
              this.categories=res.data.results;
              function iterate(tree,expand){
                for(var i=0; i<tree.length;i++){
                  
                  expand[tree[i].id]=false;
                  iterate(tree[i].childs,expand);
                }
              }
              iterate(res.data.results,this.expand);
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

        // for expand
        // searchCategories(value,tree){
        //   var exres=false;
        //   var re=new RegExp(value);
        //   for(var i=0; i<tree.length;i++){
            
        //     if(tree[i].title.match(re) || tree[i].name.match(re)){
        //       exres=true;
        //     }
        //     if(this.searchCategories(value,tree[i].childs)){
        //       this.expand[tree[i].id]=true;
        //       exres=true;
        //     }
        //   }
        //   return exres;
        //   // return false;
        // },

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
        }

        
        
        
        // expand(id){
            
        //         this.parentElement.querySelector(".nested").classList.toggle("active");
        //         this.classList.toggle("caret-down");
            
        // },

        
        
        
        
        



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

td{
    padding:5px 5px 5px 5px;
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
</style>