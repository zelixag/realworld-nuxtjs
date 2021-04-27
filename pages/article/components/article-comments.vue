<template>
  <div class="article-comments">
    <form @submit.prevent="onSubmit" class="card comment-form">
      <div class="card-block">
        <textarea
          v-model="comment.body"
          class="form-control"
          placeholder="Write a comment..."
          rows="3"
        ></textarea>
      </div>
      <div class="card-footer">
        <img v-if="user" :src="user.image" class="comment-author-img" />
        <button class="btn btn-sm btn-primary">
          Post Comment
        </button>
      </div>
    </form>

    <div class="card" v-for="comment in comments" :key="comment.id">
      <div class="card-block">
        <p class="card-text">
          {{comment.body}}
        </p>
      </div>
      <div class="card-footer">
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username,
          }
        }" class="comment-author">
          <img
            :src="comment.author.image"
            class="comment-author-img"
          />
        </nuxt-link>
        &nbsp;
        <nuxt-link :to="{
          name: 'profile',
          params: {
            username: comment.author.username,
          }
        }" class="comment-author">{{comment.author.username}}</nuxt-link>
        <span class="date-posted">{{comment.createdAt | date('MMM DD, YYYY')}}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { getComments, addComment } from '@/api/article'
import {mapState} from 'vuex'
export default {
  name: 'ArticleComments',
  props: {
    article: {
      type: Object,
      required: true
    }
  },
  data() {
    return { 
      comments: [],
      comment: {body: ''}
    }
  },
  computed: {
    ...mapState(['user'])
  },
  methods: {
    async onSubmit () {
      try {
        console.log('提交评论')
        const {comment, article} = this
        // 提交表单请求登录
        const { data } = await addComment({comment}, article.slug)
        window.alert('评论成功')
        this.comment.body = ''
        await this.loadComments(this.article.slug)

      } catch (error) {
        console.log('请求失败', error)
        this.errors = error.response.data.errors
      }
    },
    async loadComments(slug) {
      const { data } = await getComments(slug)
      this.comments = data.comments
    }
  },
  async mounted() {
    await this.loadComments(this.article.slug)
  }
};
</script>

<style></style>
