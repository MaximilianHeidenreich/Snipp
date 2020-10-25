<template>
  <div>
    <!-- Main container -->
    <div class="container">

      <Nuxt />

    </div>

    <!-- Footer -->
    <!--<footer class="footer has-background-white">
      <div class="content has-text-centered">
        <p>
          <strong>Snipp</strong> by <a href="https://jgthms.com">Maximilian Heidenreich</a>. The source code is licensed
          <a href="http://opensource.org/licenses/mit-license.php">MIT</a>. The website content
          is licensed <a href="http://creativecommons.org/licenses/by-nc-sa/4.0/">CC BY NC SA 4.0</a>.
        </p>
      </div>
    </footer>-->
  </div>
</template>

<script>
export default {
  data () {
    return {
      items: [
        {
          title: 'Home',
          icon: 'home',
          to: { name: 'index' }
        },
        {
          title: 'Inspire',
          icon: 'lightbulb',
          to: { name: 'inspire' }
        }
      ]
    }
  }
}
</script>
