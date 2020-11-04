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
            <b-input class="is-small" placeholder="My Snippet" :value="snippName" @input="$emit('change-name', $event)" maxlength="15" :hasCounter="false" :readonly="readOnly"/>
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
        <div class="dropdown is-right">
          <div class="dropdown-trigger">
            <span class="icon" aria-haspopup="true" aria-controls="dropdown-menu">
              <i class="mdi mdi-cog"></i>
            </span>
          </div>
          <div class="dropdown-menu" id="dropdown-menu-settings" role="menu">
            <div class="dropdown-content">
              <div class="dropdown-item">
                <p><strong>Owner PIN</strong></p>
                <br>
                <div class="field is-horizontal">
                  <div class="field-body">
                    <div class="mr-1 field">
                      <p class="control">
                        <input class="input pinTokenInput" type="number" placeholder="0" max="1">
                      </p>
                    </div>
                    <div class="mr-1 field">
                      <p class="control">
                        <input class="input pinTokenInput" type="number" placeholder="0" max="1">
                      </p>
                    </div>
                    <div class="mr-1 field">
                      <p class="control">
                        <input class="input pinTokenInput" type="number" placeholder="0" max="1">
                      </p>
                    </div>
                    <div class="mr-1 field">
                      <p class="control">
                        <input class="input pinTokenInput" type="number" placeholder="0" max="1">
                      </p>
                    </div>
                    <div class="mr-1 field">
                      <div class="control">
                        <button class="button button is-white " disabled><strong>-</strong></button>
                      </div>
                    </div>
                    <div class="mr-1 field">
                      <p class="control">
                        <input class="input pinTokenInput" type="number" placeholder="0" max="1">
                      </p>
                    </div>
                    <div class="mr-1 field">
                      <p class="control">
                        <input class="input pinTokenInput" type="number" placeholder="0" max="1">
                      </p>
                    </div>
                    <div class="mr-1 field">
                      <p class="control">
                        <input class="input pinTokenInput" type="number" placeholder="0" max="1">
                      </p>
                    </div>
                    <div class="ml-0 field">
                      <p class="control">
                        <input class="input pinTokenInput" type="number" placeholder="0" max="1">
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <hr class="dropdown-divider">
              <div class="dropdown-item">
                <p><strong>Theme</strong></p>
                <br>
                <div class="field">
                    <b-switch 
                        v-model="darkMode"
                        passive-type='is-light'
                        type='is-dark'>
                        {{ darkMode ? "Dark Mode" : "Light Mode" }}
                    </b-switch>
                </div>
              </div>
              <hr class="dropdown-divider">
              <div class="dropdown-item">
                <p><strong>About</strong></p>
                <br>
                <p>Version: <code>{{ version }}</code></p>
              </div>
            </div>
          </div>
        </div>
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
    }
  },

  mounted() {

    // Change selected language.
    this.$data.selectedLanguage = this.snippLang

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
    selectedLanguage: function () {
      this.$emit('change-lang', this.$data.selectedLanguage) 
    }
  },

}
</script>
