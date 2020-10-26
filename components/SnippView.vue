<template>
    <section class="section">
        <!-- Title -->
        <div class="container mb-4">
            <h1 class="title">
                <b-icon icon="content-cut" size="is-large"> </b-icon>
                Snipp
            </h1>
            <h2 class="subtitle">A clean way to share various snippets.</h2>
        </div>

        <!-- MenuBar -->
        <MenuBar
            @push-snipp="pushSnipp"
            @navigate-new="navigateNew"
            @toggle-linenums="toggleLineNums"
            @copy-clipboard="copyContentToClipboard"

            :snippName="snippName"
        />

        <!-- CodeEditor -->
        <CodeEditor
            ref="codeEditor"
            
            :displayLineNums="displayLineNums"
            :ownerPin="ownerPin"
            readOnly="false"
            :snippContent="snippContent"
            :darkTheme="darkTheme"
        />
    </section>
</template>

<style>
/* CSS */
</style>

<script>
const consola = require('consola')
import axios from 'axios'
import { ToastProgrammatic as Toast } from 'buefy'

export default {
    
    // ========== DATA
    data() {
        return {

            // Snipp
            snippID: this.$route.params.snippID ? this.$route.params.snippID : null,
            snippName: 'New Snipp',
            snippLang: 'js',
            snippContent: 'Y29uc29sZS5sb2coIkhlbGxvIFdvcmxkISIpOw==',

            // Config
            displayLineNums: this.displayLineNumsStorage,

            // Util.
            loader: null

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
                `${process.env.apiBaseUrl}/v1/snipp/${this.$route.params.snippID}`
            )

            if (result.status === 200) {
                consola.success('Snipp data received!')

                // Update data.
                this.$data.snippID = result.data.data.ID
                this.$data.snippName = result.data.data.name
                this.$data.snippLang = result.data.data.lang
                this.$data.snippContent = result.data.data.content

                this.loader.close()

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
        else {}

    },
    fetchOnServer: false,

    // ========== HOOKS
    mounted() {

        // Display loader.
        this.loader = this.$buefy.loading.open({})

    },

    // ========== METHODS
    methods: {

        // Creates / Updates Snipp.
        pushSnipp() {
            const that = this;
            console.log(this.$data)

            // Create
            if (!this.$data.snippID) {
                consola.info('Creating Snipp...')
                
                axios.post(`${process.env.apiBaseUrl}/v1/snipp/`, {
                    name: this.$data.snippName,
                    lang: this.$data.snippLang,
                    ownerPin: this.ownerPin,
                    content: this.encodedEditorContent
                }).then(function (response) {

                    if (response.status === 200) {
                        consola.success(`Created Snipp (${response.data.data.snippID})`)
                        console.log(response)
                        that.$data.snippID = response.data.data.snippID
                        that.$router.push({ path: `/${response.data.data.snippID}` })

                        that.copyShareLinkToClipboard()

                        Toast.open({
                            duration: 3000,
                            message: `Snipp has been created! The link has been copied to your clipboard!`,
                            position: 'is-bottom',
                            type: 'is-success'
                        })
                    }
                    else {
                        consola.error('None 200 Status Code!')
                        consola.error(response)
                    }

                })
                .catch(function (error) {
                    console.log(error);

                    Toast.open({
                        duration: 3000,
                        message: `Snipp could not be created: Request error!`,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })

                });
            }

            // Update
            else {
                consola.info(`Updating Snipp (PIN: ${this.ownerPin})...`)

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
                            message: `Snipp has been updated!`,
                            position: 'is-bottom',
                            type: 'is-success'
                        })

                    }
                    else if (response.status === 401) {
                        consola.error('Invalid ownerPin!')
                        consola.error(response)

                        Toast.open({
                            duration: 3000,
                            message: `Snipp could not be updated: Incorrect PIN`,
                            position: 'is-bottom',
                            type: 'is-danger'
                        })

                    }
                    else {
                        consola.error('None 200 Status Code!')
                        consola.error(response)
                    }

                })
                .catch(function (error) {
                    console.log(error);

                    Toast.open({
                        duration: 3000,
                        message: `Snipp could not be updated: Request error`,
                        position: 'is-bottom',
                        type: 'is-danger'
                    })

                });

            }

        },

        // Copies editor content to clipboard.
        copyContentToClipboard() {
            try {
                this.copyToClipboard(this.rawEditorContent)
                Toast.open({
                    duration: 3000,
                    message: `Content copied to clipboard!`,
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
        copyShareLinkToClipboard() {
            try {
                this.copyToClipboard(`${process.env.baseUrl}/${this.$data.snippID}`)
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
        navigateNew() {
            this.$router.push({ path: `/` })
        },

        // Toggles displaying line numbers.
        toggleLineNums() {
            localStorage.setItem('displayLineNums', !JSON.parse(localStorage.getItem('displayLineNums')))
            this.$data.displayLineNums = !this.$data.displayLineNums
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
