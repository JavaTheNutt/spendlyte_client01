<template>
  <v-tabs class="elevation-0">
    <v-tabs-slider color="primary"/>
    <v-tab>
      Frequency
    </v-tab>
    <v-tab-item>
      <advanced-frequency-details @input-triggered="inputTriggered"/>
    </v-tab-item>
  </v-tabs>
</template>
<script>
  import AdvancedFrequencyDetails from './AdvancedFrequencyDetails';
  export default {
    name: 'advanced-details',
    components: { AdvancedFrequencyDetails },
    props: {
      isExpense: {
        type: Boolean,
        default: false
      }
    },
    methods: {
      inputTriggered (data) {
        console.log('input triggered in advanced details');
        this.$emit('input-triggered', data.data);
      }
    }
  };
</script>
