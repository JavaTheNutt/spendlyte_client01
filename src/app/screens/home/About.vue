<template>
  <v-container fluid>
    <v-layout>
      <v-flex>
        <p class="display-2 text-xs-center" id="homeHeader">Welcome to Spend Lyte!</p>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 md9>
        <p class="subheading">
          This application is designed to help you to keep track of your personal finances. If you are seeing this screen, then you are either a beta tester, or you have stumbled onto this site by accident. Either way, enjoy! If something appears to be broken, please don't hesitate to <a
          href="mailto:support@javathenutt.com" target="_blank" rel="noopener"> contact me</a></p>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 md9>
        <p class="display-1 text-xs-left">About this application</p>
      </v-flex>
    </v-layout>
    <v-layout row justify-center>
      <v-flex xs12 md9>
        <p class="headline">Application Functionality</p>
        <p class="subheading">
          I am building this application for my Final Year project for college.
          The app is a work in progress so please bear with me. You may also notice that if you visit this site several times
          , you will be prompted to install this application on your phone (as of now, iOS doesn't support this technology, yet).
          I would be very grateful if you could do this, so that I know that my application will work across multiple platforms.
        </p>
        <p class="subheading">
          The aim of this application is to provide a useful method of managing the personal finances of you and your household.
          Currently, none of this functionality has been implemented, but hopefully that will change in the coming weeks.
        </p>
        <p class="subheading">
          The first set of functionality that I plan to implement is the ability to make budgets. I plan to implement functionality that will
          allow users to add regularly occurring incomes and expenditures. Examples of these would be things like wages and phone bills. A bill will be added,
          along with a frequency, amount and a possible offset. The offset will be used to determine the range that an income or expenditure could be within.
          An example of this would be if you were expecting a bill of €100 and you believed that it would usually be either 20% more or less, you could specify an
          offset of 20%. This would allow you to perform what-if analysis of your budget.
        </p>
        <p class="subheading">
          The historical data about transactions will then be used to provide a better understanding of what the offsets should be set to. It would be also possible to set it so that once enough data
          is gathered, the offsets could be automatically set to the statistical averages.
        </p>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
  export default {
    name: 'about-view'
  };
</script>
