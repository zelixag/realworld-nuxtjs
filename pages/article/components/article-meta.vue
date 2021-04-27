<template>
  <div class="article-meta">
    <nuxt-link
    class="author"
    :to="{name: 'profile', params: {usename: author.username}}">
      <img :src="author.image" />
    </nuxt-link>
    <div class="info">
    <nuxt-link
    class="author"
    :to="{name: 'profile', params: {usename: author.username}}">
      {{author.username}}
    </nuxt-link>
      <span class="date">{{ article.createdAt | date('MMM DD, YYYY')}}</span>
    </div>

    <button 
    class="btn btn-sm btn-outline-secondary"
    :class="{
      active: author.following
    }">
      <i class="ion-plus-round"></i>
      &nbsp;
      Follow Eric Simons <span class="counter">(10)</span>
    </button>
    &nbsp;
    <button
    class="btn btn-sm btn-outline-primary"
    :class="{
      active: article.favorited
    }">
      <i class="ion-heart"></i>
      &nbsp;
      Favorite Post <span class="counter">(29)</span>
    </button>
  </div>
</template>

<script>
export default {
  name: "ArticleMeta",
  props: {
    article: {
      type: Object,
      required: true,
    }
  },
  computed: {
    author() {
      return this.article.author;
    }
  }
}
</script>

<style>

</style>