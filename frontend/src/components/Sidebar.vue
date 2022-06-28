<template>
    <div id="sidebar" class="sidebar" data-color="orange" data-image="/src/assets/img/sidebar/sidebar-5.jpg">
        <div class="sidebar-wrapper">
            <div class="logo">
                <router-link to="/" class="simple-text logo-normal writer" style="font-size:35px;" ><b>AMOS</b></router-link>
            </div>
            <div class="user">
                <div>
                    <i class="fa fa-user" style="font-size:26px;"></i>
                </div>
                <div class="info ">
                    <a href="#">Maurizio Mastria</a>
                </div>
            </div>
            <ul class="nav">
                <li class="nav-item"><router-link to="/" class="nav-link"><i class="nc-icon nc-chart-pie-35"></i><p>Dashboard</p></router-link></li>
                    

                    <li class="nav-item">
                        <a class="nav-link collapsed" data-toggle="collapse" href="#products" aria-expanded="false">
                            <i class="nc-icon nc-app"></i>
                            <p>Prodotti<b class="caret"></b></p>
                        </a>
                        <div class="collapse " id="products" style="height: auto;">
                            <ul class="nav">
                                <li class="nav-item"><router-link to="/products/edit"  class="nav-link"><template v-if="child=='new'"><b>Nuovo</b></template><template v-else>Nuovo</template></router-link></li>
                                <li class="nav-item"><router-link to="/products/simple"  class="nav-link"><template v-if="child=='simple'"><b>Semplici</b></template><template v-else>Semplici</template></router-link></li>
                                <li class="nav-item"><router-link to="/products/configurable"  class="nav-link"><template v-if="child=='configurable'"><b>Configurabili</b></template><template v-else>Configurabili</template></router-link></li>
                                <li class="nav-item"><router-link to="/products/multiple"  class="nav-link" ><template v-if="child=='multiple'"><b>Multipli</b></template><template v-else>Multipli</template></router-link></li>
                                <li class="nav-item"><router-link to="/products/bulk"  class="nav-link"  ><template v-if="child=='bulk'"><b>Misti</b></template><template v-else>Misti</template></router-link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link collapsed" data-toggle="collapse" href="#orders" aria-expanded="false">
                            <i class="nc-icon nc-bullet-list-67"></i>
                            <p>Ordini<b class="caret"></b></p>
                        </a>
                        <div class="collapse " id="orders" style="height: auto;">
                            <ul class="nav">
                                <li class="nav-item"><router-link to="/orders/new/"  class="nav-link"><template v-if="child=='simple'"><b>Nuovi</b></template><template v-else>Nuovi</template></router-link></li>
                                <li class="nav-item"><router-link to="/orders/waiting/"  class="nav-link"><template v-if="child=='configurable'"><b>In attesa</b></template><template v-else>In attesa</template></router-link></li>
                                <li class="nav-item"><router-link to="/orders/refund/"  class="nav-link" ><template v-if="child=='multiple'"><b>Rimborsi</b></template><template v-else>Rimborsi</template></router-link></li>
                            </ul>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link collapsed" data-toggle="collapse" href="#shippings" aria-expanded="false">
                            <i class="nc-icon nc-delivery-fast"></i>
                            <p>Spedizioni<b class="caret"></b></p>
                        </a>
                        <div class="collapse " id="shippings" style="height: auto;">
                            <ul class="nav">
                                <li class="nav-item"><router-link to="/shippings/"  class="nav-link">Visualizza</router-link></li>
                                <li class="nav-item"><router-link to="/shippings/list/"  class="nav-link">Distinte</router-link></li>
                            </ul>
                        </div>
                    </li>
                    <hr>
                    <li class="nav-item"><router-link to="/messages/" class="nav-link"><i class="nc-icon nc-letter"></i><p>Messaggi</p></router-link></li>
                    <hr>
                    <li class="nav-item">
                        <a class="nav-link collapsed" data-toggle="collapse" href="#imports" aria-expanded="false">
                            <i class="nc-icon nc-delivery-fast"></i>
                            <p>Importa<b class="caret"></b></p>
                        </a>
                        <div class="collapse " id="imports" style="height: auto;">
                            <ul class="nav">
                                <li class="nav-item"><router-link to="/imports/new/"  class="nav-link">Nuovo Import</router-link></li>
                                <li class="nav-item"><router-link to="/imports/"  class="nav-link">Storico</router-link></li>
                            </ul>
                        </div>
                    </li>
                    
            </ul>
            <hr>
        </div>
        <div class="sidebar-background" style="background-image: url(/src/assets/img/sidebar/sidebar-5.jpg)"></div>
    </div>    
</template>

<script>


export default{
    props: {
        parent: String,
        child: String,
    }
}
</script>
