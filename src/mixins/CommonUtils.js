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
    isSafari() {
      return /^((?!chrome|android).)*safari/i.test(navigator.userAgent);
    },
    videoExtension() {
      return this.isSafari ? '.mp4' : '.gif';
    }
  },
  methods: {

  },
}
