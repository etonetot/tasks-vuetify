<template>
    <v-slide-y-transition >
    <div class="ttip" v-if="show">
        <slot></slot>
    </div>    
    </v-slide-y-transition >
</template>

<script>
export default {
  props:{
        show: Boolean
    },    
    
}
</script>

<style scoped>
.ttip{
  position: absolute;
  left:-20px;
  bottom:-70px;
  background: #f44;
  color: #fff;
  border-radius: 3px;
  box-shadow: 0 3px 20px rgba(0,0,0,.15);  
  width: 200px;
  z-index: 11 !important;
  text-align: left;
  padding: 10px;
  text-transform: none;
}


.ttip:before {
	content: ""; 
	border: solid transparent;
	position: absolute;    
	left: 32px;    
	bottom: 100%;
	border-bottom-color:#f44 ;
	border-width: 9px;
	margin-left: 0;
}

</style>