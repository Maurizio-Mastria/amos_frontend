<template>
  <div class="form-check form-check-radio">
    <label class="form-check-label">
      <input class="form-check-input" type="radio"  :checked="ison" :name="name" v-on:change="ison!=ison;$emit('update:ison')">
      <span class="form-check-sign"></span><span>{{message}}</span>
    </label>
</div>
      
</template>
<script>

export default{
  data(){
    return{
      message:null,
      
    }
  },
    props:['ison','message'],
    
        
    
}
</script>
<style type="text/css">
      
    </style>