<template>
  <section class="section editor-section" v-on:paste="detectLanguage">
    <div class="loading-skeleton" v-if="loading">
      <b-skeleton width="10%" animated="animated"></b-skeleton>
      <b-skeleton width="40%" animated="animated"></b-skeleton>
      <b-skeleton width="20%" animated="animated"></b-skeleton>
      <b-skeleton width="50%" animated="animated"></b-skeleton>
    </div>
    <prism-editor v-else
      ref="editor"
      v-bind:class="['snipp-editor', darkTheme ? 'editor-dark' : 'editor-light']"
      v-model="code"
      :highlight="highlighter"
      :readonly="readOnly"
      :line-numbers="displayLineNums"
    />
  </section>
</template>

<style>
.editor-section {
  padding: 0;
  padding-top: 2rem;
  padding-left: 0.5rem;
}
.loading-skeleton {
  min-height: 65vh;
}

/* Editor Style */
.snipp-editor {
  /*background: #2d2d2d;
  /*color: #ccc;*/

  font-family: Fira code, Fira Mono, Consolas, Menlo, Courier, monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 6px;
}
.prism-editor__textarea:focus {
  outline: none;
}
.prism-editor__editor {
  min-height: 50vh;
}

/* Light Theme */
.editor-light code[class*="language-"],.editor-light pre[class*="language-"]{text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;color:#90a4ae;background:#fafafa;font-family:Roboto Mono, monospace;font-size:1em;line-height:1.5em;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}.editor-light code[class*="language-"]::-moz-selection,.editor-light pre[class*="language-"]::-moz-selection,.editor-light code[class*="language-"] ::-moz-selection,.editor-light pre[class*="language-"] ::-moz-selection{background:#cceae7;color:#263238}.editor-light code[class*="language-"]::selection,.editor-light pre[class*="language-"]::selection,.editor-light code[class*="language-"] ::selection,.editor-light pre[class*="language-"] ::selection{background:#cceae7;color:#263238}.editor-light:not(pre) > code[class*="language-"]{white-space:normal;border-radius:0.2em;padding:0.1em}.editor-light pre[class*="language-"]{overflow:auto;position:relative;margin:0.5em 0;padding:1.25em 1em}.editor-light .language-css > code,.editor-light .language-sass > code,.editor-light .language-scss > code{color:#f76d47}.editor-light [class*="language-"] .namespace{opacity:0.7}.editor-light .token.atrule{color:#7c4dff}.editor-light .token.attr-name{color:#39adb5}.editor-light .token.attr-value{color:#f6a434}.editor-light .token.attribute{color:#f6a434}.editor-light .token.boolean{color:#7c4dff}.editor-light .token.builtin{color:#39adb5}.editor-light .token.cdata{color:#39adb5}.editor-light .token.char{color:#39adb5}.editor-light .token.class{color:#39adb5}.editor-light .token.class-name{color:#6182b8}.editor-light .token.comment{color:#aabfc9}.editor-light .token.constant{color:#7c4dff}.editor-light .token.deleted{color:#e53935}.editor-light .token.doctype{color:#aabfc9}.editor-light .token.entity{color:#e53935}.editor-light .token.function{color:#7c4dff}.editor-light .token.hexcode{color:#f76d47}.editor-light .token.id{color:#7c4dff;font-weight:bold}.editor-light .token.important{color:#7c4dff;font-weight:bold}.editor-light .token.inserted{color:#39adb5}.editor-light .token.keyword{color:#7c4dff}.editor-light .token.number{color:#f76d47}.editor-light .token.operator{color:#39adb5}.editor-light .token.prolog{color:#aabfc9}.editor-light .token.property{color:#39adb5}.editor-light .token.pseudo-class{color:#f6a434}.editor-light .token.pseudo-element{color:#f6a434}.editor-light .token.punctuation{color:#39adb5}.editor-light .token.regex{color:#6182b8}.editor-light .token.selector{color:#e53935}.editor-light .token.string{color:#f6a434}.editor-light .token.symbol{color:#7c4dff}.editor-light .token.tag{color:#e53935}.editor-light .token.unit{color:#f76d47}.editor-light .token.url{color:#e53935}.editor-light .token.variable{color:#e53935}

/* Dark Theme */
.editor-dark code[class*="language-"],.editor-dark pre[class*="language-"]{color:#f8f8f2;background:none;font-family:"Fira Code", Consolas, Monaco, 'Andale Mono', 'Ubuntu Mono', monospace;text-align:left;white-space:pre;word-spacing:normal;word-break:normal;word-wrap:normal;line-height:1.5;-moz-tab-size:4;-o-tab-size:4;tab-size:4;-webkit-hyphens:none;-moz-hyphens:none;-ms-hyphens:none;hyphens:none}.editor-dark pre[class*="language-"]{padding:1em;margin:0.5em 0;overflow:auto;border-radius:0.3em}.editor-dark:not(pre) > code[class*="language-"],.editor-dark pre[class*="language-"]{background:#2E3440}.editor-dark:not(pre) > code[class*="language-"]{padding:0.1em;border-radius:0.3em;white-space:normal}.editor-dark .token.cdata,.editor-dark .token.comment,.editor-dark .token.doctype,.editor-dark .token.prolog{color:#636f88}.editor-dark .token.punctuation{color:#81A1C1}.editor-dark .namespace{opacity:0.7}.editor-dark .token.constant,.editor-dark .token.deleted,.editor-dark .token.property,.editor-dark .token.symbol,.editor-dark .token.tag{color:#81A1C1}.editor-dark .token.number{color:#B48EAD}.editor-dark .token.boolean{color:#81A1C1}.editor-dark .token.attr-name,.editor-dark .token.builtin,.editor-dark .token.char,.editor-dark .token.inserted,.editor-dark .token.selector,.editor-dark .token.string{color:#A3BE8C}.editor-dark .language-css .token.string,.editor-dark .style .token.string,.editor-dark .token.entity,.editor-dark .token.operator,.editor-dark .token.url,.editor-dark .token.variable{color:#81A1C1}.editor-dark .token.atrule,.editor-dark .token.attr-value,.editor-dark .token.class-name,.editor-dark .token.function{color:#88C0D0}.editor-dark .token.keyword{color:#81A1C1}.editor-dark .token.important,.editor-dark .token.regex{color:#EBCB8B}.editor-dark .token.bold,.editor-dark .token.important{font-weight:bold}.editor-dark .token.italic{font-style:italic}.editor-dark .token.entity{cursor:help}

</style>

<script>
const consola = require('consola')
import axios from 'axios'
import { PrismEditor } from 'vue-prism-editor'
const detectLang = require('lang-detector');
import 'vue-prism-editor/dist/prismeditor.min.css'
import { highlight, languages } from 'prismjs/components/prism-core'
import 'prismjs/components/prism-markup'
import 'prismjs/components/prism-markdown'
import 'prismjs/components/prism-markup-templating'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-css'
import 'prismjs/components/prism-javascript'
import 'prismjs/components/prism-typescript'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-lua'
import 'prismjs/components/prism-coffeescript'
import 'prismjs/components/prism-perl'
import 'prismjs/components/prism-ruby'
import 'prismjs/components/prism-scss'
import 'prismjs/components/prism-sass'
import 'prismjs/components/prism-bash'
import 'prismjs/components/prism-java'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-rust'
import 'prismjs/components/prism-go'
import 'prismjs/components/prism-csharp'
import 'prismjs/components/prism-powershell'
import 'prismjs/components/prism-aspnet'
import 'prismjs/components/prism-smalltalk'
import 'prismjs/components/prism-cmake'
import 'prismjs/components/prism-json'
import 'prismjs/components/prism-yaml'
import 'prismjs/components/prism-sql'
import 'prismjs/components/prism-http'
import 'prismjs/components/prism-docker'
import 'prismjs/components/prism-nginx'
import 'prismjs/components/prism-graphql'
import 'prismjs/components/prism-ignore'
import 'prismjs/components/prism-ini'
import 'prismjs/components/prism-dart'
import 'prismjs/components/prism-php'
import 'prismjs/components/prism-handlebars'
import 'prismjs/components/prism-pug'
import 'prismjs/components/prism-jsx'
import 'prismjs/components/prism-tsx'


export default {

  // ========== COMPONENTS
  components: {
    PrismEditor
  },

  // ========== PROPS
  props: [
    'loading',
    'darkTheme',

    'language',
    'displayLineNums',
    'snippContent',
    'readOnly'
  ],

  // ========== WATCH
  watch: {
    snippContent: function () {
      this.setCode(this.b64_to_utf8(this.snippContent))
    },
    readOnly: function () { console.log(this.readOnly) }
  },

  // ========== DATA
  data() {
      return {
          code: 'console.log("Hello World");' // TODO: Fix / Implement pretty
      }
  },


  // ========== HOOKS
  mounted() {

    // Create Flask.
    //this.setCode(this.b64_to_utf8(this.snippContent))

  },

  // ========== COMPUTED
  computed: {

      // Editor content
      // editorCode() { return this.$refs.editor.code },

  },


  // ========== METHODS
  methods: {

    highlighter(code) {
      return highlight(code, languages[this.language]);
    },

    createJar() {
      //if (this.displayLineNums) this.$data.codeJar = CodeJar(document.getElementById('editor'), withLineNumbers(Prism.highlightElement), {})
      //else this.$data.codeJar = CodeJar(document.getElementById('editor'), Prism.highlightElement)
    },
    
    // Sets the contents.
    setCode(text) {
      this.$data.code = text
    },

    // Tries to detect language of editor content.
    detectLanguage(event) {
      var lang = detectLang((event.clipboardData || window.clipboardData).getData('text')).toLowerCase();
      
      // Ignore unsupported languages.
      if (lang === 'c++') lang = 'clike'
      if (lang === 'unknown') lang = 'clike'

      this.$emit('change-lang', lang)

    },

    // Force update
    forceUpdateEditor() { this.$forceUpdate() },

    // Encoding / Decoding
    utf8_to_b64: (str) => btoa(unescape(encodeURIComponent(str))),
    b64_to_utf8: (str) => decodeURIComponent(escape(atob(str)))

  }
}
</script>