export default {
  filters: {
    formatNumber(number) {
      return (number*10).toFixed(2);
    }
  },
  computed: {
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
  methods: {

  },
}
