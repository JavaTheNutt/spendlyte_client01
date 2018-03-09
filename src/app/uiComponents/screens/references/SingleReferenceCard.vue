<template>
  <v-card class="pl-0 pr-0 pb-0">
  <v-container fluid  class="pl-0 pr-0 pb-0 mb-0 ml-0 mr-0">
    <v-layout column>
      <v-flex class="text-xs-center">
        <v-card-title>
          <v-spacer/>
          <h4>{{item.title | title}}</h4>
          <v-spacer/>
        </v-card-title>
      </v-flex>
      <v-flex class="ml-5 pl-5 pr-5 mr-5 text-xs-center">
        <img v-if="item.imgName && item.imgName.length > 0" :src="require(`assets/${item.imgName}`)" width="100px">
      </v-flex>
      <v-flex class="ml-0 mr-0 mb-0 pb-0">
        <v-expansion-panel class="ml-0 mr-0 mb-0 pb-0">
          <v-expansion-panel-content>
            <div slot="header">Description</div>
            <v-card>
              <v-card-text>{{item.description}}</v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Author</div>
            <v-card>
              <v-card-text><a :href="item.authorUrl" target="_blank">{{item.primaryAuthor}}</a></v-card-text>
            </v-card>
          </v-expansion-panel-content>
          <v-expansion-panel-content>
            <div slot="header">Location</div>
            <v-card>
              <v-card-text><a :href="item.assetUrl" target="_blank">{{item.provider}}</a></v-card-text>
            </v-card>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-flex>
    </v-layout>
  </v-container>
  </v-card>
</template>
<script>
  export default {
    name: 'single-reference-card',
    props: { item: Object }
  };
</script>
