<template>
  <!--<v-container fluid>
    <v-layout>
      <v-flex>
        <p class="headline text-xs-center" id="homeHeader">Welcome to Spend Lyte!</p>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 md8>
        <p class="body-1">
          This application is designed to help you to keep track of your personal finances. If you are seeing this screen, then you are either a beta tester, or you have stumbled onto this site by accident. Either way, enjoy! If you are a developer, you can check out the source code for this project <a
          href="https://github.com/JavaTheNutt/web_app_dev_project_frontend_02" target="_blank">here</a>. If something appears to be broken, please don't hesitate to <a
          href="mailto:support@javathenutt.com" target="_blank"> contact me</a></p>
        <p class="body-1">
          I am building this application for my Final Year project for college. The app is a work in progress so please bear with me. You may also notice that if you visit this site several times, you will be prompted to install this application on your phone (as of now, iOS doesn't support this technology, yet). I would be very grateful if you could do this, so that I know that my application will work across multiple platforms.
        </p>
      </v-flex>
    </v-layout>
  </v-container>-->
  <v-container fluid>
    <v-jumbotron color="grey lighten-2">
      <v-container fill-height>
        <v-layout align-center>
          <v-flex>
            <h3 class="display-3">Welcome to Spend Lyte</h3>
            <span class="subheading">Lorem ipsum dolor sit amet, pri veniam forensibus id. Vis maluisset molestiae id, ad semper lobortis cum. At impetus detraxit incorrupte usu, repudiare assueverit ex eum, ne nam essent vocent admodum.</span>
            <v-divider class="my-3"></v-divider>
            <div class="title mb-3">Check out our newest features!</div>
            <v-btn large color="primary" class="mx-0">See more</v-btn>
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

