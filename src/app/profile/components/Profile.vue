<template>
  <v-container fluid>
    <group-details></group-details>
  </v-container>
</template>
<script>
  import GroupDetails from './GroupDetails';

  export default {
    components: { GroupDetails },
    name: 'profile'
  };
</script>
