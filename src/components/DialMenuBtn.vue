<template>
    <v-speed-dial v-model="fab" right direction="right" :open-on-hover="true" transition="scale-transition" class="menuBtn">

        <template v-slot:activator>
            <v-btn v-model="fab" color="blue darken-2"  dark fab x-small class="ml-6 menuBtnActivator">
            <v-fade-transition group leave-absolute>
                <v-icon small v-if="fab" :key="1">fas fa-times</v-icon>
                <v-icon small v-else :key="2">fas fa-ellipsis-h</v-icon> 
            </v-fade-transition >
            </v-btn>
        </template>

        <slot>
        </slot>

    </v-speed-dial>
 
</template>

<script>
export default {
    props:{
        // fab: Number
    },
    data() {
    return {
       fab: false 
    }
  },    
}
</script>

<style>
.menuBtn .v-speed-dial__list
{
  z-index: 100 !important;
}

.menuBtn .v-speed-dial__list button
{
  margin-right: 0px;
}

.menuBtnActivator
{
  margin-right: -15px;
}
</style>
