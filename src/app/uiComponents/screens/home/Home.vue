<template>
    <v-container fluid>
    <v-jumbotron color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex class="text-xs-center text-md-left">
            <h3 class="display-3" id="jumbotronTitle">Welcome to Spend Lyte</h3>
            <span class="subheading" id="jumbotronSubtitle">The only finance app you'll ever need!</span>
            <v-divider class="my-3"/>
            <div class="title mb-3" id="jumbotronInfoMessage">Read a little bit about this application</div>
            <router-link to="/about">
              <v-btn large color="primary" class="mx-0" >About</v-btn>
            </router-link>
            <router-link to="/references">
              <v-btn large color="primary" class="mx-0" >References</v-btn>
            </router-link>
            <router-link to="/item/new?type=income">
              <v-btn large color="primary" class="mx-0" >Add a new income</v-btn>
            </router-link>
            <router-link to="/item/new?type=expense">
              <v-btn large color="primary" class="mx-0" >Add a new expense</v-btn>
            </router-link>
          </v-flex>
        </v-layout>
      </v-container>
    </v-jumbotron>
  </v-container>
</template>
<script>
  export default {
    name: 'home'
  };
</script>

