<template>
  <div :class="{ 'bootstrap-switch-on' : ison , 'bootstrap-switch-off' : !ison }" 
  class="bootstrap-switch bootstrap-switch-wrapper bootstrap-switch-animate"  style="width: 72px;" v-on:click="ison=!ison; $emit('update:ison',ison)">
      <div class="bootstrap-switch-container" style="width: 122px; margin-left: -50px;">
          <span class="bootstrap-switch-handle-on bootstrap-switch-info" style="width: 50px;">ON</span>
          <span class="bootstrap-switch-label" style="width: 30px;">&nbsp;</span>
          <span class="bootstrap-switch-handle-off bootstrap-switch-info" style="width: 50px;" >OFF</span>
          <input type="checkbox" checked="" data-toggle="switch" data-on-color="info" data-off-color="info"  >
      </div>
  </div>
      
</template>
<script>

export default{
  data(){
    return{
      
    }
  },
    props:['ison'],
    
        
    
}
</script>
<style type="text/css">
      
    </style>