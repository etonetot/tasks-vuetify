<template>
  <v-app>
    <v-app-bar app>
      <v-toolbar-title class="headline text-uppercase">
        <v-btn text  to="/">Tasks-Vuetify</v-btn>
        
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn  icon color="indigo" to="/settings">
        <v-icon>fas fa-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-content>
      <router-view/>
    </v-content>
  </v-app>
</template>

<script>

export default {
  name: 'App',
  data: () => ({
    //
  }),
};
</script>
