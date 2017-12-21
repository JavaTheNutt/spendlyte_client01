<template>
  <div>
    <nav-toolbar></nav-toolbar>
    <navigation-drawer></navigation-drawer>
  </div>
</template>
<script>
  import NavToolbar from './NavToolbar';
  import NavigationDrawer from './NavDrawer';

  export default {
    components: {
      NavigationDrawer,
      NavToolbar },
    name: 'nav-container'
  };
</script>
