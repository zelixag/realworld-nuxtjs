<template>
  <div class="home-page">

  <div class="banner">
    <div class="container">
      <h1 class="logo-font">conduit</h1>
      <p>A place to share your knowledge.</p>
    </div>
  </div>

  <div class="container page">
    <div class="row">

      <div class="col-md-9">
        <div class="feed-toggle">
          <ul class="nav nav-pills outline-active">
            <li class="nav-item" v-if="user">
              <nuxt-link 
              class="nav-link" 
              :class="{active: tab === 'your_feed'}"
              exact
              :to="{
                name: 'home',
                query: {
                  tab: 'your_feed'
                }
              }">Your Feed</nuxt-link>
            </li>
            <li class="nav-item">
              <nuxt-link 
              class="nav-link"
              :class="{active: tab === 'global_feed'}"
              exact
              :to="{
                name: 'home',
                query: {
                  tab: 'global_feed'
                }
              }">Global Feed</nuxt-link>
            </li>
            <li v-if="tag" class="nav-item">
              <nuxt-link 
              class="nav-link" 
              :class="{active: tab === 'tag'}"
              exact
              :to="{
                name: 'home',
                query: {
                  tab: 'tag',
                  tag
                }
              }">#{{tag}}</nuxt-link>
            </li>
          </ul>
        </div>

        <div
          class="article-preview"
          v-for="article in articles"
          :key="article.slug"
        >
          <div class="article-meta">
            <nuxt-link href="profile.html" :to="{
              name: 'profile',
              params: {
                username: article.author.username,
              }
            }">
              <img :src="article.author.image" />
            </nuxt-link>
            <div class="info">
              <nuxt-link href="profile.html" :to="{
                name: 'profile',
                params: {
                  username: article.author.username,
                }
              }">
                {{article.author.username}}
              </nuxt-link>
              <span class="date">{{article.createdAt | date}}</span>
            </div>
            <button 
            @click="onFavorite(article)"
            :disabled="article.favoriteDisabled"
            class="btn btn-outline-primary btn-sm pull-xs-right" 
            :class="{
              active: article.favorited,
            }">
              <i class="ion-heart"></i> {{article.favoritesCount}}
            </button>
          </div>
          <h1>{{article.title}}</h1>
          <p>{{article.description}}</p>
          <nuxt-link
          class="preview-link;"
          :to="{
            name: 'article',
            params: {
              slug: article.slug,
            }
          }" >
            <span>Read more...</span>
          </nuxt-link>
        </div>

        <!-- 分页列表 -->
        <nav>
          <ul class="pagination">

            <li
            class="page-item"
            v-for="item in totalPage"
            :class="{active: item === page}"
            :key="item">

              <nuxt-link class="page-link ng-binding" :to="{
                path: '/',
                query: {
                  page: item,
                  tag,
                  tab
                }
              }">{{item}}</nuxt-link>
            </li>
          </ul>
        </nav>
        <!-- /分页列表 -->

      </div>

      <div class="col-md-3">
        <div class="sidebar">
          <p>Popular Tags</p>

          <div class="tag-list">
            <nuxt-link
            :to="{
              name: 'home',
              query: {
                tag: item,
                tab: 'tag'
              }
            }"
            class="tag-pill tag-default"
            v-for="item in tags"
            :key="item">
              <span>{{item}}</span>
            </nuxt-link>
          </div>
        </div>
      </div>

    </div>
  </div>

</div>
</template>

<script>
import { getArticles, getFeedArticles, delFavorite, addFavorite } from '@/api/article'
import { getTags } from '@/api/tag'
import {mapState} from 'vuex'

export default {
  name: 'HomeIndex',
  async asyncData ({ query, store }) {
    const page = Number.parseInt(query.page || 1)
    const limit = 20

    const {tag, tab="global_feed"} = query

    const loadArticles = store.state.user && tab === 'your_feed' ? getFeedArticles:getArticles
    const [articleRes, tagRes] = await  Promise.all([
      loadArticles({
        limit,
        offset: (page - 1) * limit,
        tag: tag
      }),
      getTags()
    ])

    const {articles, articlesCount } = articleRes.data

    articles.forEach(article => article.favoriteDisabled = false)


    const { tags } = tagRes.data
    return {
      tab,
      tag,
      tags,
      articles,
      articlesCount,
      limit,
      page
    }
  },
  computed: {
    ...mapState(['user']),
    totalPage() {
      return Math.ceil(this.articlesCount / this.limit)
    }
  },
  watchQuery: ['page', 'tag', 'tab'],
  methods: {
    async onFavorite(article) {
      article.favoriteDisabled = true
      console.log(article);
      if(article.favorited) {
        // 取消点赞
        await delFavorite(article.slug);
        article.favorited = false;
        article.favoritesCount += -1
      } else {
        // 添加点赞
        await addFavorite(article.slug);
        article.favorited = true;
        article.favoritesCount += 1
      }
      article.favoriteDisabled = false
    }
  }
}
</script>

<style>

</style>