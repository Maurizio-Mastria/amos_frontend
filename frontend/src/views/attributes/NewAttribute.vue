<template>
  <div>
      <Sidebar :company.sync="company" parent="products" />

      <div class="main-panel">
          <Nav :company.sync="company" :companies.sync="companies" @update:company="(index) => changeCompany(index)" />
          <div class="center-top" > 
              <div class="container-fluid">
                  <div class="col-12 row">
                      <div class="col-8">
                        <h5 style="font-size:25px;">Nuovo attributo</h5>
                      </div>
                      
                     
                  </div>
                  <div class="col-12 row">
                    <div class="mt-4 col-12 card" >
                      <div class="card-header">

                      </div>
                        <div class="card-body m-auto">
                          <table style="min-width:500px;">
                            <tr>
                              <th>Nome/codice</th>
                              <td><input type="text" class="form-control" v-model="this.attribute.name"></td>
                            </tr>
                            <tr>
                              <th>Descrizione (visibile ai clienti)</th>
                              <td><input type="text" class="form-control" v-model="this.attribute.description"></td>
                            </tr>
                            <tr>
                              <th>Tipo</th>
                              <td>
                                <select class="custom-select" v-model="this.attribute.type">
                                  <option value="INT">Numero Intero (INT)</option>
                                  <option value="DECIMAL">Numero decimale (DECIMAL)</option>
                                  <option value="BOOLEAN">Booleano (Vero/Falso)</option>
                                  <option value="TEXT">Testo (TEXT)</option>
                                  <option value="URL">URL</option>
                                  <option value="CHAR">Caratteri (CHAR)</option>
                                </select>
                              </td>
                            </tr>
                          </table>
                          <hr/>
                          <button class="btn btn-success " v-on:click="create()">Crea</button><button class="float-right btn btn-danger " v-on:click="this.$router.push('/attributes/')">Annulla</button>
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
import Sidebar from "../../components/Sidebar.vue";
import CheckboxButton from "../../components/CheckboxButton.vue";
import RadioButton from "../../components/RadioButton.vue";
import Nav from "../../components/Nav.vue";
import { useToast } from "vue-toastification";
function initialState (){
return {  
        
        attribute:{},
        company:{},
        companies:[],
        user:null,
        

        


        
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
          this.getCompanies()
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
      
      changeCompany(key){
          window.location.href='/categories?company='+this.companies[key].id;
          
      },
     
      
     

      create(){
        var data={"name":this.attribute.name,"description":this.attribute.description,"type":this.attribute.type,"company":this.company.id}
        if(this.$route.query.company){
          this.axios.post("/api/products/custom_attributes/?company="+this.company.id,data).then((res)=>{
            window.location.href='/attributes/?company='+this.company.id;
            
          }).catch((error)=>{
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                this.toast.error(String(error.message)+"\n"+String(error.response.statusText)+"\n"+String(error.request.response))
                
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              this.toast.error(String(error.request.response))
            } else {
                // Something happened in setting up the request that triggered an Error
                this.toast.error(String(error.message))
            }
            
          });
        }
        else{
          this.axios.post("/api/products/attributes/",data).then((res)=>{
            window.location.href='/attributes/?company='+this.company.id;
            
          }).catch((error)=>{
            if (error.response) {
                // The request was made and the server responded with a status code
                // that falls out of the range of 2xx
                this.toast.error(String(error.message)+"\n"+String(error.response.statusText)+"\n"+String(error.request.response))
                
            } else if (error.request) {
              // The request was made but no response was received
              // `error.request` is an instance of XMLHttpRequest in the browser and an instance of
              // http.ClientRequest in node.js
              this.toast.error(String(error.request.response))
            } else {
                // Something happened in setting up the request that triggered an Error
                this.toast.error(String(error.message))
            }
            
          });

        }
        
        
      },
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

.bg-personal{
background-color:#ff770042;
}
.hover-delete:hover{
color:red;
text-decoration:line-through;
cursor: pointer;
}
</style>