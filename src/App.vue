<template>
  <div
    id="app"
    class="container-fluid">
    <MainComponent/>
  </div>
</template>

<script>
import MainComponent from './components/MainComponent.vue'
import ResizeObserver from 'resize-observer-polyfill';

export default {
  name: 'App',
  components: {
    MainComponent
  },
  data() {
    return {}
  },
  created() {
    this.$store.dispatch('fetchData');
  },
  mounted() {
    const elementRoot = this.$root.$el;
    const resizeObserver = new ResizeObserver(entries => {
      for (const entry of entries) {
        const {
          height
        } = entry.contentRect;
        const elementHeight = 'elementHeight:' + height;
        // console.log(elementHeight);
        parent.postMessage(elementHeight, '*');
      }
    });
    resizeObserver.observe(elementRoot);
  },
  methods: {

  },
}
</script>

<style lang="scss">
@import "./styles/custom";
@import "./styles/player";

</style>
