<template>
  <b-navbar class="is-transparent">
    <template slot="start">

        <!-- New -->
        <b-navbar-item v-on:click="$emit('navigate-new', {})">
            <span class="icon">
              <i class="mdi mdi-plus-box"></i>
            </span>
        </b-navbar-item>
        
         <!-- Clone -->
        <b-navbar-item>
            <span class="icon">
              <i class="mdi mdi-content-duplicate"></i>
            </span>
        </b-navbar-item>

         <!-- Name -->
        <b-navbar-item>
            <b-field>
              <b-input placeholder="Snippet name" :value="snippName" @input="$emit('change-name', $event)" maxlength="15" :hasCounter="false" :readonly="readOnly"/>
            </b-field>
        </b-navbar-item>

         <!-- Save -->
        <b-navbar-item v-on:click="$emit('push-snipp', {})">
            <span class="icon">
              <i class="mdi mdi-content-save"></i>
            </span>
        </b-navbar-item>

    </template>
    <template slot="end">
        
        <!-- Toggle Lines -->
        <b-navbar-item v-on:click="$emit('toggle-linenums', {})">
            <span class="icon">
              <i class="mdi mdi-format-list-numbered"></i>
            </span>
        </b-navbar-item>

        <!-- Copy to clip -->
        <b-navbar-item v-on:click="$emit('copy-clipboard', {})">
            <span class="icon">
              <i class="mdi mdi-clipboard-multiple-outline"></i>
            </span>
        </b-navbar-item>

        <!-- Settings -->
        <b-navbar-item>
            <span class="icon">
              <i class="mdi mdi-cog"></i>
            </span>
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
