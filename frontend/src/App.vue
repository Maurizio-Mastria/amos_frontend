<template>
    
    <router-view/>
    
    
</template>

<style>
#app {
  
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  
  
}
:root {
    --nav-height: 70px;
    --sidebar-width: 250px;
    --right-width: 100px;
    --first-color: #4723D9;
    --first-color-light: #AFA5D9;
    --white-color: #F7F6FB;
    --body-font: 'Nunito', sans-serif;
    --normal-font-size: 1rem;
    --z-fixed: 100;
    --top-height:70px;
    --top-a-height:0px;
    
    --warning:#ffa534 !important;
}
nav{
  height:var(--nav-height);
  position:fixed !important;
  width:calc(100% - var(--sidebar-width)); 
}

.height-100 {
    height: 100vh
}

.sidebar {
    position: fixed;
    width: var(--sidebar-width);
    top: 0;
    bottom: 0;
    left: 0;
  
    display: block;
    z-index: 1;
    color: #fff;
    font-weight: 200;
    background-size: cover;
    background-position: center center;
    padding: .5rem 1rem 0 0;
    transition: .5s;
    z-index: 9999;
}
.top{
  position:fixed;
  top:calc(var(--nav-height) - 10px);
  height:var(--top-height);
  width:calc(100% - var(--sidebar-width) - 10px);
  z-index:9;
  padding-top:20px;
  
}
.center{
    position:fixed;
    width:calc(100% - var(--sidebar-width) - var(--right-width) - 10px);
    top:calc(var(--nav-height) + var(--top-height) - 10px);
    transition: .5s;
    
    height:calc(100% - var(--nav-height) - var(--top-height) + 10px);

}



.top-a{
  position:fixed;
  top:calc(var(--nav-height) - 10px);
  height:var(--top-a-height);
  width:calc(100% - var(--sidebar-width) - 10px);
  z-index:9;
  padding-top:20px;
  
}
.center-a{
    position:fixed;
    width:calc(100% - var(--sidebar-width) - var(--right-width) - 10px);
    top:calc(var(--nav-height) + var(--top-a-height) - 10px);
    transition: .5s;
    
    height:calc(100% - var(--nav-height) - var(--top-a-height) + 10px);

}


.right {
    position:fixed;  
    width: var(--right-width);
    top: calc(var(--nav-height) + var(--top-height) - 10px);
    right:0;
    transition: .5s;
}

.main-panel{
  position: fixed;
  width:100%;
  height:100vh;
  z-index:0 important;
  top:0;
  background: rgba(203,203,210,.15);
}
.container{
  position:fixed;
  padding-top:var(--nav-height);
  height: 100vh;
}
.thumbnails{
    height:50px;
}

</style>

