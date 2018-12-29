<template>
    <div class="page-footer clear-after">
        <div class="footer-logo"><img src="../assets/logoRect.png"/></div>
        <div class="md-body-2" v-html="$t('Footer.Declaration')"></div>
    </div>
</template>

<script>
  export default {
    name: "nav-footer"
  }
</script>

<style scoped>
    .page-footer {
        width: 100%;
        padding: 20px 0;
        background-color: #000000;
    }

    .page-footer > .footer-logo > img {
        width: 96px;
        margin-bottom: 10px;
    }

    .page-footer > div {
        max-width: 1200px;
        margin: 0 auto;
    }
</style>