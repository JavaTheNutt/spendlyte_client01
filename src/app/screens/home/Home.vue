<template>
    <v-container fluid>
    <v-jumbotron color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3" id="jumbotronTitle">Welcome to Spend Lyte</h3>
            <span class="subheading" id="jumbotronSubtitle">The only finance app you'll ever need!</span>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3" id="jumbotronInfoMessage">Read a little bit about this application</div>
            <router-link to="/about">
              <v-btn large color="primary" class="mx-0" >About</v-btn>
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

