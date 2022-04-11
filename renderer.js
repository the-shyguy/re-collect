const Vue = require("./vue");
const { clipboard } = require("electron");

const App = new Vue({
  el: "#app",
  data: {
    title: "Recollect",
    history: [],
  },
  mounted() {
    this.history.push({
      text: clipboard.readText(),
      clipped: new Date().toLocaleTimeString(),
    });
    setInterval(this.checkClipboard, 500);
  },
  computed: {
    showHistory() {
      return this.history.slice().reverse();
    },
  },
  methods: {
    checkClipboard() {
      const text = clipboard.readText();
      console.log(text);
      if (this.history.length > 0) {
        if (
          this.history[this.history.length - 1].text !== text &&
          text.trim() !== ""
        ) {
          this.history.push({ text, clipped: new Date().toLocaleTimeString() });
        }
      }
    },
    itemClicked(item) {
      const index = this.history.indexOf(item);
      if (this.history.length !== 1) {
        this.history.splice(index, 1);
      }
      clipboard.writeText(item.text);
      window.scrollTo(0, 0);
    },
    clearHistory() {
      this.history.splice(0, this.history.length);
    },
  },
});
