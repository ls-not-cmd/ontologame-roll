<template>
    <div>
        <md-dialog class="game-description-dialog"
                :md-fullscreen="false"
                :md-active.sync="show">
            <md-dialog-title><div class="title-text">{{$t('Description.Title')}}</div></md-dialog-title>
            <md-dialog-content v-html="descContent"/>
        </md-dialog>
    </div>
</template>
<script>
  import MardownIt from 'markdown-it'

  export default {
    components: {
    },
    name: "game-description",
    data() {
      return {
        showDialog: this.value,
        content: ""
      }
    },
    props: ["value"],
    computed: {
      descContent() {
        let md = new MardownIt({
          html: true,
          linkify: true,
          typographer: true,
        })
        let result = md.render(this.$t('Description.ContentMarkdown'));

        return result
      },
      show: {
        get() {
          return this.showDialog.val
        },

        set(v) {
          this.showDialog.val = v
        }
      },
    }
  }
</script>

<style scoped>
    .game-description-dialog .md-dialog-title {
        padding: 20px;
        padding-bottom: 0;
        margin-bottom: 4px;
    }

    .game-description-dialog .md-dialog-title .title-text {
        border-bottom:  1px solid #ffffff;
        padding-bottom: 20px;
    }

    .game-description-dialog {
        min-width: 880px;
    }

    .game-description-dialog .md-dialog-content {
        padding-top: 20px;
    }

    .game-description-dialog .md-dialog-content::-webkit-scrollbar {
        width: 0 !important;
    }

</style>

<style>
    table {
        display: table;
        border-collapse: separate;
        border-spacing: 0px;
        border: 1px solid #ffffff;
        text-align: center;
    }

    table thead th {
        padding: 10px 20px;
        border-bottom: 1px solid #ffffff;
    }

    table tbody td {
        padding: 10px 20px;
    }
</style>