<template>
    <div class="wrapper">
        <Sidebar parent="products"/>
        <div class="main-panel">
        <Header />
           
        
        </div>
    </div>
</template>

<script>

const AUTH_TOKEN = "51fb50cfbedaf479a0080615e77cc82392628a21";
import { useToast } from "vue-toastification";
import Sidebar from "../../components/Sidebar.vue"
export default{
    
    setup(){
        const toast = useToast();
        return { toast }
    },
	mounted(){
        
        
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
