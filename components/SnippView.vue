<template>
    <section class="section">
        <!-- Title -->
        <div class="container mb-4">
            <h1 class="title">
                <b-icon icon="content-cut" size="is-large"> </b-icon>
                Snipp
            </h1>
            <h2 class="subtitle is-6">A clean way to share various snippets.</h2>
        </div>

        <!-- MenuBar -->
        <MenuBar
            @push-snipp="pushSnipp"
            @navigate-new="onNavigateNew"
            @change-name="onChangeSnippName"
            @toggle-linenums="onToggleLineNums"
            @copy-clipboard="copyContentToClipboard"
            @change-lang="onChangeSnippLang"
            @change-darkMode="onChangeDarkMode"
            @change-owner-pin="onChangeOwnerPin"

            :version="appVersion"
            :snippName="snippName"
            :snippLang="snippLang"
            :readOnly="readOnly"
            :darkMode="darkMode"
            :supportedLanguages="supportedLanguages"
        />

        <!-- CodeEditor -->
        <CodeEditor
            ref="codeEditor"

            @change-lang="onChangeSnippLang"
            
            :loading="loading"
            :darkTheme="darkTheme"

            :language="snippLang"
            :displayLineNums="displayLineNums"
            :readOnly="readOnly"
            :ownerPin="ownerPin"
            :snippContent="snippContent"
        />

        <!-- Loader -->
        <b-loading :is-full-page="true" v-model="busy" :can-cancel="false"></b-loading>
    </section>
</template>

<style>
/* Pretty Scrollbar */
*::-webkit-scrollbar,
*::-webkit-scrollbar-thumb {
  width: 26px;
  border-radius: 13px;
  background-clip: padding-box;
  border: 10px solid transparent;
}
*::-webkit-scrollbar-thumb {        
  box-shadow: inset 0 0 0 10px;
}

/* Daek Mode */
/*.invert {
    filter: invert(1) hue-rotate(180deg);
}
html {
    filter: invert(1) hue-rotate(180deg);
}*/

</style>

<script>
const consola = require('consola')
import axios from 'axios'
import { ToastProgrammatic as Toast } from 'buefy'

const supportedLanguages = [
  {
    "title": "Popular",
    "langs": [
      "Clike",
      "Java",
      "JavaScript",
      "TypeScript",
      "Python",
      "JSON",
      "Yaml",
      "Markup",
      //"HTML",
      "SQL",      
    ]
  },
  {
    "title": "Templating",
    "langs": [
      "JSX",
      "TSX",
      "HandleBars",
      "Pug",
    ]
  },
  {
    "title": "Web",
    "langs": [
      "HTTP",
      "SASS",
      "SCSS",
      "CSS",
    ]
  },
  {
    "title": "Programming",
    "langs": [
      //"Switft",
      "Go",
      "C",
      "Rust",
      "CSharp",
      "Perl",
      "PHP",
      "Ruby",
      "PowerShell",
      "AspNet",
      "Lua",
      "CoffeeScript",
    ]
  },
  {
    "title": "Other",
    "langs": [  
      "Bash",
      "Docker",
      "Nginx",
      //"XML",
      //"SVG",
      "GraphQL",
      //"Haxe",
      "Ignore",
      "Ini",
      "Smalltalk",
      "CMake",
      "Dart",
    ]
  },
]

export default {
    
    // ========== DATA
    data() {
        return {

            // Snipp
            snippID: this.$route.params.snippID ? this.$route.params.snippID : null,
            snippName: '',
            snippLang: 'javascript',
            isOwner: true,
            snippContent: 'Y29uc29sZS5sb2coIkhlbGxvIFdvcmxkISIpOw==',

            // Config
            darkMode: false,
            displayLineNums: false,

            // Util.
            loading: true,
            busy: false,
            appVersion: process.env.appVersion,
            supportedLanguages: supportedLanguages

        }
    },

    // ========== WATCH
    watch: {
        snippContent: function () {
            this.$refs.codeEditor.setCode() // = this.b64_to_utf8(this.snippContent)
        }
    },

    // ========== COMPUTED
    computed: {

        // Returns whether to display line numbers.
        displayLineNumsStorage() {
            if (typeof(Storage) !== "undefined") {
                if (!localStorage.hasOwnProperty('displayLineNums')) localStorage.setItem('displayLineNums', false)
                return JSON.parse(localStorage.getItem('displayLineNums'))
            }
            else return true;
        },

        // Returns existing owner pin or generates & stores new one.
        ownerPin() {
            if (typeof(Storage) !== "undefined") {
                if (!localStorage.hasOwnProperty('ownerPin')) {
                    const genPin = () => (Math.floor(Math.random() * 10000) + 10000).toString().substring(1)
                    localStorage.setItem('ownerPin', `${genPin()}-${genPin()}`)
                }
                return localStorage.getItem('ownerPin')
            }
            else return "0000-0000";
        },

        readOnly() { return !this.$data.isOwner },

        // Whether to use dark theme.
        darkTheme() { return false },

        // Returns raw editor content.
        rawEditorContent() { return this.$refs.codeEditor.code },

        // Returns encoded editor content.
        encodedEditorContent() { return this.utf8_to_b64(this.rawEditorContent) },

    },

    // ========== FETCH
    async fetch() {

        // Fetch Snipp.
        if (this.$route.params.snippID) {
            consola.info(`Fetching Snipp data (${this.$route.params.snippID})...`)

            const result = await axios.get(
                `${process.env.apiBaseUrl}/v1/snipp/${this.$route.params.snippID}`,
                {
                    headers: {
                        'owner-pin': this.ownerPin
                    }
                }
            )

            if (result.status === 200) {
                consola.success('Snipp data received!')

                // Update data.
                this.$data.snippID = this.$route.params.snippID
                this.$data.snippName = result.data.data.name
                this.$data.snippLang = result.data.data.lang
                this.$data.isOwner = result.data.data.isOwner
                this.$data.snippContent = result.data.data.content

                this.$data.loading = false

            }
            else {
                consola.error('Error fetching data!')
                console.log(result)

                Toast.open({
                    duration: 10000,
                    message: `Snipp could not be loaded!`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }

        }

        // Empty editor.
        else {
            this.$data.loading = false
        }

    },
    fetchOnServer: false,

    // ========== HOOKS
    mounted() {

        // Load settings from storage
        this.$data.displayLineNums = this.displayLineNumsStorage

    },

    created() {
        // Foo
    },

    // ========== METHODS
    methods: {

        // Creates / Updates Snipp.
        pushSnipp() {
            const that = this;
            
            // RET: Busy
            if (this.$data.busy) return

            // Create
            if (!this.$data.snippID) {
                consola.info('Creating Snipp...')

                this.$data.busy = true
                
                axios.post(`${process.env.apiBaseUrl}/v1/snipp/`, {
                    name: this.$data.snippName,
                    lang: this.$data.snippLang,
                    ownerPin: this.ownerPin,
                    content: this.encodedEditorContent
                }).then(function (response) {

                    if (response.status === 200) {
                        consola.success(`Created Snipp (${response.data.data.snippID})`)
                        console.log(response)
                        that.$router.push({ path: `/${response.data.data.snippID}` })

                        that.copyShareLinkToClipboard(response.data.data.snippID)

                        Toast.open({
                            duration: 3000,
                            message: `👍 &nbsp; Link copied to clipboard!`,
                            position: 'is-bottom',
                            type: 'is-info'
                        })
                    }
                    else {
                        consola.error('None 200 Status Code!')
                        consola.error(response)

                        Toast.open({
                            duration: 3000,
                            message: `😬 &nbsp; Snipp could not be created: No 200 Code received!`,
                            position: 'is-bottom',
                            type: 'is-danger'
                        })
                    }

                    that.$data.busy = false

                })
                .catch(function (error) {
                    console.log(error);

                    Toast.open({
                        duration: 3000,
                        message: `😬 &nbsp; Snipp could not be created: Request error!`,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })

                    that.$data.busy = false

                });
            }

            // Update
            else {
                consola.info(`Updating Snipp (PIN: ${this.ownerPin})...`)

                this.$data.busy = true

                axios.post(`${process.env.apiBaseUrl}/v1/snipp/${this.$data.snippID}`, {
                    name: this.$data.snippName,
                    lang: this.$data.snippLang,
                    ownerPin: this.ownerPin,
                    content: this.encodedEditorContent
                }).then(function (response) {

                    if (response.status === 200) {
                        consola.success(`Updated Snipp (${response.data.data.snippID})`)

                        Toast.open({
                            duration: 3000,
                            message: `👍 &nbsp; Snipp has been updated!`,
                            position: 'is-bottom',
                            type: 'is-success'
                        })

                    }
                    else if (response.status === 401) {
                        consola.error('Invalid ownerPin!')
                        consola.error(response)

                        Toast.open({
                            duration: 3000,
                            message: `😬 &nbsp; Snipp could not be updated: Incorrect PIN`,
                            position: 'is-bottom',
                            type: 'is-danger'
                        })

                    }
                    else {
                        consola.error('None 200 Status Code!')
                        consola.error(response)

                        Toast.open({
                            duration: 3000,
                            message: `😬 &nbsp; Snipp could not be created: No 200 Code received!`,
                            position: 'is-bottom',
                            type: 'is-danger'
                        })
                    }

                    that.$data.busy = false

                })
                .catch(function (error) {
                    console.log(error);

                    Toast.open({
                        duration: 3000,
                        message: `😬 &nbsp; Snipp could not be updated: Request error`,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })

                    that.$data.busy = false

                });

            }

        },

        // Copies editor content to clipboard.
        copyContentToClipboard() {
            try {
                this.copyToClipboard(this.rawEditorContent)
                Toast.open({
                    duration: 3000,
                    message: `📋 &nbsp; Content copied to clipboard!`,
                    position: 'is-bottom',
                    type: 'is-info'
                })
            }
            catch (err) {
                consola.error('Could not copy content to clipboard!')
                console.log(err)
                Toast.open({
                    duration: 3000,
                    message: `Could not copy content to clipboard!`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
        },

        // Copies sharable link to clipboard.
        copyShareLinkToClipboard(snippID) {
            try {
                this.copyToClipboard(`${process.env.baseUrl}/${snippID}`)
            }
            catch (err) {
                consola.error('Could not copy link to clipboard!')
                console.log(err)
                Toast.open({
                    duration: 3000,
                    message: `Could not copy link to clipboard!`,
                    position: 'is-bottom',
                    type: 'is-danger'
                })
            }
        },

        // Navigate to /
        onNavigateNew() {
            this.$router.push({ path: `/` })
        },

        // Toggles displaying line numbers.
        onToggleLineNums() {
            localStorage.setItem('displayLineNums', !JSON.parse(localStorage.getItem('displayLineNums')))
            this.$data.displayLineNums = JSON.parse(localStorage.getItem('displayLineNums'))
        },

        onChangeSnippName(event) {
            this.$data.snippName = event
        },

        onChangeSnippLang(event) {
            this.$data.snippLang = event
        },

        onChangeDarkMode(event) {
            this.$data.darkMode = event
            console.log(this.$data.darkMode)
        },

        onChangeOwnerPin(event) {
            if (typeof(Storage) !== "undefined") localStorage.setItem('ownerPin', event)
        },

        // Clipboard helper.
        copyToClipboard(text) {
            var input = document.createElement('textarea');
            input.style.position = "fixed";  // Prevent scrolling to bottom of page in Microsoft Edge.
            input.innerHTML = text;
            document.body.appendChild(input);
            input.select();
            var result = document.execCommand('copy');
            document.body.removeChild(input);
            return result;
        },

        // Encoding / Decoding
        utf8_to_b64: (str) => btoa(unescape(encodeURIComponent(str))),
        b64_to_utf8: (str) => decodeURIComponent(escape(atob(str)))

    }


}
</script>
