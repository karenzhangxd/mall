import BackTop from "components/content/backTop/BackTop";
export const backTopMixin = {
  components: {
    BackTop
  },
  data() {
    return {
      isBackTopShow: false,
    }
  },
  methods: {
    backTop() {
      this.$refs.scroll.backTopClick(0, 0, 1000);
    },
  }
}
