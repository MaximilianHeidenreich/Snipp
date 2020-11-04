<template>
  <b-navbar class="is-transparent">
    <template slot="start">

      <!-- New -->
      <b-navbar-item v-on:click="$emit('navigate-new', {})">
        <b-tooltip label="New Snipp" :delay="500" type="is-dark" position="is-bottom">
          <span class="icon">
            <i class="mdi mdi-plus-box"></i>
          </span>
        </b-tooltip>
      </b-navbar-item>

      <!-- Clone -->
      <b-navbar-item v-if="readOnly">
        <b-tooltip label="Clone Snipp" :delay="500" type="is-dark" position="is-bottom">
            <span class="icon">
              <i class="mdi mdi-content-duplicate"></i>
            </span>
        </b-tooltip>
      </b-navbar-item>
      
      <!-- Save -->
      <b-navbar-item v-else v-on:click="$emit('push-snipp', {})">
          <b-tooltip label="Save / Update Snipp" :delay="500" type="is-dark" position="is-bottom">
              <span class="icon">
                <i class="mdi mdi-content-save"></i>
              </span>
          </b-tooltip>
      </b-navbar-item>

      <!-- Name -->
      <b-navbar-item>
          <b-field label-position="on-border">
            <template slot="label">
              <span class="has-text-grey-dark">Name</span>
            </template>
            <b-input class="is-small" placeholder="My Snippet" :value="snippName" @input="$emit('change-name', $event)" maxlength="20" :hasCounter="false" :readonly="readOnly"/>
          </b-field>
      </b-navbar-item>
        
    </template>
    <template slot="end">

        <!-- Language -->
        <b-navbar-item>
            <b-field>
              <b-select v-model="selectedLanguage" size="is-small" placeholder="Select language" icon="web">
                  <optgroup v-for="section in supportedLanguages" :key="section.title" :label="section.title">
                      <option v-for="lang in section.langs" :key="lang" :value="lang.toLowerCase()">{{ lang }}</option>
                  </optgroup>

              </b-select>
          </b-field>
        </b-navbar-item>
        
      <!-- Toggle Lines -->
      <b-navbar-item v-on:click="$emit('toggle-linenums', {})">
        <b-tooltip label="Toggle line numbers" :delay="500" type="is-dark" position="is-bottom">
          <span class="icon">
            <i class="mdi mdi-format-list-numbered"></i>
          </span>
        </b-tooltip>
      </b-navbar-item>

      <!-- Copy to clip -->
      <b-navbar-item v-on:click="$emit('copy-clipboard', {})">
        <b-tooltip label="Copy content to clipboard" :delay="500" type="is-dark" position="is-bottom">
          <span class="icon">
            <i class="mdi mdi-clipboard-multiple-outline"></i>
          </span>
        </b-tooltip>
      </b-navbar-item>

      <!-- Settings -->
      <b-navbar-item>
        <b-dropdown position="is-bottom-left" append-to-body aria-role="menu" trap-focus>
          <span class="icon" slot="trigger" role="button" aria-haspopup="true" aria-controls="dropdown-menu">
            <i class="mdi mdi-cog"></i>
          </span>

          <b-dropdown-item
              aria-role="menu-item"
              :focusable="false"
              custom
              >
            <p><strong>Owner PIN</strong></p>
            <br>
            <b-field style="min-width: 250px" grouped>
                <b-field 
                  :type="{ 'is-danger': !isPinValid.first }"
                  :message="{ 'Invalid PIN.': !isPinValid.first }"
                  expanded>
                    <b-input 
                      v-model="pinFirstPart" 
                      type="text" 
                      maxlength="4" 
                      placeholder="0000"
                      />
                </b-field>
                <b-field expanded>
                  <button class="button button is-white " disabled><strong>-</strong></button>
                </b-field>
                <b-field 
                  :type="{ 'is-danger': !isPinValid.second }"
                  :message="{ 'Invalid PIN.': !isPinValid.second }"
                  expanded>
                    <b-input 
                    v-model="pinSecondPart" 
                    type="text" 
                    maxlength="4" 
                    placeholder="0000"
                    />
                </b-field>
            </b-field>
            <small>Using the same owner pin will allow you to edit Snipps you created.</small>
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item
              aria-role="menu-item"
              :focusable="false"
              custom
              >
            <p><strong>Theme</strong></p>
            <br>
            <div class="field">
                <b-switch 
                    v-model="selectedDarkMode"
                    passive-type='is-light'
                    type='is-dark'>
                    {{ selectedDarkMode ? "Dark Mode" : "Light Mode" }}
                </b-switch>
            </div>
          </b-dropdown-item>
          <hr class="dropdown-divider">
          <b-dropdown-item
              aria-role="menu-item"
              :focusable="false"
              custom
              >
            <p><strong>About</strong></p>
            <br>
            <p>Version: <code>{{ version }}</code></p>
          </b-dropdown-item>
        </b-dropdown>
      </b-navbar-item>

      <!-- Search -->
      <!--<div class="navbar-item">
        <b-field>
          <b-autocomplete
              :data="data"
              placeholder="Search..."
              field="snippSearch"
              icon="magnify"
              :loading="isFetching"
              @typing="getAsyncData"
              @select="option => selected = option" rounded>

              <template slot-scope="props">
                  <div class="media">
                      <div class="media-left">
                          <img width="32" :src="`https://image.tmdb.org/t/p/w500/${props.option.poster_path}`">
                      </div>
                      <div class="media-content">
                          {{ props.option.title }}
                          <br>
                          <small>
                              Released at {{ props.option.release_date }},
                              rated <b>{{ props.option.vote_average }}</b>
                          </small>
                      </div>
                  </div>
              </template>
          </b-autocomplete>
        </b-field>
      </div>-->

    </template>
  </b-navbar>
</template>

<style>

/* PIN INPUT */
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
/* Firefox */
input[type=number] {
  -moz-appearance: textfield;
}
.pinTokenInput {
  min-width: 33px;
  border: none;
}

</style>

<script>
export default {
  props: [
    'snippName',
    'snippLang',
    'readOnly',
    'darkMode',
    'version',
    'supportedLanguages',
  ],


  // ========== DATA
  data() {
    return {
      selectedLanguage: 'javascript',
      selectedDarkMode: this.darkMode,
      pinFirstPart: '',
      pinSecondPart: '',
    }
  },


  // ========== COMPUTED
  computed: {

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

    // Returns whether the entered parts are valid.
    isPinValid() {
      var validFirst = (this.pinFirstPart.match(/^[0-9]+$/) != null) && (this.pinFirstPart.length === 4)
      var validSecond = (this.pinSecondPart.match(/^[0-9]+$/) != null)&& (this.pinSecondPart.length === 4)
      
      return { 'first': validFirst, 'second': validSecond, 'full': (validFirst && validSecond) }
    },

    // Returns the assembled owner pin.
    ownerPinFullInputValue() {
      return `${this.pinFirstPart}-${this.pinSecondPart}`
    },


  },


  // ========== HOOKS
  mounted() {

    // Change selected language.
    this.$data.selectedLanguage = this.snippLang

    // Prefill owner pin inputs.
    this.$data.pinFirstPart = this.ownerPin.split('-')[0]
    this.$data.pinSecondPart = this.ownerPin.split('-')[1]

    // Enable dropdowns.
    document.querySelector('.dropdown').addEventListener('click', function(event) {
      event.stopPropagation()
      document.querySelector('.dropdown').classList.toggle('is-active')
    })

  },


  // ========== WATCH
  watch: {
    snippLang: function () {
      this.$data.selectedLanguage = this.snippLang
    },
    selectedDarkMode: function () {
      this.$emit('change-darkMode', this.selectedDarkMode) 
    }, 
    selectedLanguage: function () {
      this.$emit('change-lang', this.$data.selectedLanguage) 
    },
    pinFirstPart: function () {
      if (this.isPinValid.full) this.$emit('change-owner-pin', this.ownerPinFullInputValue)
    },
    pinSecondPart: function () {
      if (this.isPinValid.full) this.$emit('change-owner-pin', this.ownerPinFullInputValue)
    },
  },

}
</script>
