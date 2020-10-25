<template>
  <section class="section"><div id="editor"></div></section>
</template>

<style>
/* CSS */
</style>

<script>
const consola = require('consola')
import axios from 'axios'
import { CodeJar } from 'codejar'
import Prism from 'prismjs';
import { withLineNumbers } from 'codejar/linenumbers'

export default {

  props: [
    'displayLineNums',
    'snippContent'
  ],

  watch: {
    displayLineNums: function () {
      this.createJar()
    },
    snippContent: function () {
      this.setCode(this.b64_to_utf8(this.snippContent))
    }
  },

  // ========== DATA
  data() {
      return {
          codeJar: null,
      }
  },


  // ========== HOOKS
  mounted() {

    // Create Flask.
    this.createJar()
    this.setCode(this.b64_to_utf8(this.snippContent))

  },

  // ========== COMPUTED
  computed: {

      // CodeJar content
      content() { return this.codeJar.toString()},

      // Returns whether to display line numbers.
      /*displayLineNums() {
          if (typeof(Storage) !== "undefined") {
              if (!localStorage.hasOwnProperty('displayLineNums')) localStorage.setItem('displayLineNums', false)
              return JSON.parse(localStorage.getItem('displayLineNums'))
          }
          else return true;
      },*/

  },


  // ========== METHODS
  methods: {

    createJar() {
      if (this.displayLineNums) this.$data.codeJar = CodeJar(document.getElementById('editor'), withLineNumbers(Prism.highlightElement), {})
      else this.$data.codeJar = CodeJar(document.getElementById('editor'), Prism.highlightElement)
    },
    
    // Sets the contents.
    setCode(text) {
      this.$data.codeJar.updateCode(text)
    },

    // Force update
    forceUpdateEditor() { this.$forceUpdate() },

    // Encoding / Decoding
    utf8_to_b64: (str) => btoa(unescape(encodeURIComponent(str))),
    b64_to_utf8: (str) => decodeURIComponent(escape(atob(str)))

  }
}
</script>