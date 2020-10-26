<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <div class="navbar-burger burger" data-target="menuBar">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div id="menuBar" class="navbar-menu">
      <div class="navbar-start">

        <!-- New -->
        <a class="navbar-item" v-on:click="$emit('navigate-new', {})">
          <span class="icon">
            <i class="mdi mdi-plus-box"></i>
          </span>
        </a>

        <!-- Clone -->
        <a class="navbar-item">
          <span class="icon">
            <i class="mdi mdi-content-duplicate"></i>
          </span>
        </a>

        <!-- Name -->
        <a class="navbar-item">
          <b-field>
            <b-input placeholder="Snippet name" :value="snippName" @input="$emit('change-name', $event)" maxlength="15" :hasCounter="false" :readonly="readOnly"/>
          </b-field>
        </a>

        <!-- Save -->
        <a class="navbar-item" v-on:click="$emit('push-snipp', {})">
          <span class="icon">
            <i class="mdi mdi-content-save"></i>
          </span>
        </a>


        <!--<div class="navbar-item has-dropdown is-hoverable">
          <a class="navbar-link" href="https://bulma.io/documentation/overview/start/">
            Docs
          </a>
          <div class="navbar-dropdown is-boxed">
            <a class="navbar-item" href="https://bulma.io/documentation/overview/start/">
              Overview
            </a>
            <a class="navbar-item" href="https://bulma.io/documentation/overview/modifiers/">
              Modifiers
            </a>
            <a class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
              Columns
            </a>
            <a class="navbar-item" href="https://bulma.io/documentation/layout/container/">
              Layout
            </a>
            <a class="navbar-item" href="https://bulma.io/documentation/form/general/">
              Form
            </a>
            <hr class="navbar-divider">
            <a class="navbar-item" href="https://bulma.io/documentation/elements/box/">
              Elements
            </a>
            <a class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
              Components
            </a>
          </div>
        </div>-->

      </div>

      <div class="navbar-end">

        <!-- Toggle Lines -->
        <a class="navbar-item" v-on:click="$emit('toggle-linenums', {})">
          <span class="icon">
            <i class="mdi mdi-format-list-numbered"></i>
          </span>
        </a>

        <!-- Copy to clip -->
        <a class="navbar-item" v-on:click="$emit('copy-clipboard', {})">
          <span class="icon">
            <i class="mdi mdi-clipboard-multiple-outline"></i>
          </span>
        </a>

        <!-- Settings -->
        <a class="navbar-item">
          <span class="icon">
            <i class="mdi mdi-cog"></i>
          </span>
        </a>

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
      </div>
    </div>
  </nav>
</template>

<style>
/* CSS */
</style>

<script>
export default {
  props: [
    'snippName',
    'readOnly',
  ]
}
</script>
