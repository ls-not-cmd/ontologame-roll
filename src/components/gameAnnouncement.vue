<template>
    <div>
        <md-dialog class="game-announcement-dialog"
                   :md-fullscreen="false"
                   :md-active.sync="show">
            <md-dialog-title><div class="title-text">{{$t('Announcement.Title')}}</div></md-dialog-title>
            <md-dialog-content v-html="$t('Announcement.Content')"/>
        </md-dialog>
    </div>
</template>

<script>
  export default {
    name: "game-announcement",
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

</style>