<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input
      v-model="searchQuery"
      placeholder="Поиск..."
    />
    <div class="app__btns">
      <my-button 
        @click="showDialog"
      >
        Создать пост
      </my-button>

      <my-select 
        v-model="selectedSort"
        :options='sortOptions'
      />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form 
        @create="createPost" 
      />
    </my-dialog>
    
    <post-list
      :posts="sertedAndSearchedPosts" 
      @remove="removePost"
      v-if="!isPostsLoading"
    />
    <div v-else>Идёт загрузка...</div>
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>

</template>

<script>
import PostForm from '@/componenst/PostForm.vue';
import PostList from '@/componenst/PostList.vue';
import axios from 'axios'

export default {
  components: { PostList, PostForm },
  data() {
    return {
      posts: [],
      dialogVisible: false,
      isPostsLoading: false,
      selectedSort: '',
      searchQuery: '',
      page: 1,
      limit: 10,
      totalPage: 0, 
      sortOptions: [
        {
          value: 'title',
          name: 'По названию'
        },
        {
          value: 'body',
          name: 'По содержимому'
        }
      ]
    }
  },

  mounted() {
    this.fetchPosts();
  },

  methods: {
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    showDialog() {
      this.dialogVisible = true;
    },

    removePost(post) {
      this.posts = this.posts.filter(elem => elem.id !== post.id)
    },

    fetch() {

    },

    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        this.getListPosts.then(resp => {
          const { data, headers} = resp;
          this.totalPage = Math.ceil(headers['x-total-count'] / this.limit);
          this.posts = data;
        });
      } catch (error) {
        console.log('error in fetchPost', new Error(error));
      } finally {
        this.isPostsLoading = false;
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1; 
        this.getListPosts.then(resp => {
          const { data, headers} = resp;
          this.totalPage = Math.ceil(headers['x-total-count'] / this.limit);
          this.posts = [...this.posts, ...data];
        });
      } catch (error) {
        console.log('error in loadMorePosts', new Error(error));
      }
    },
  },

  computed: {
    async getListPosts() {
      return await axios.get('https://jsonplaceholder.typicode.com/posts', {
        params: {
          _page: this.page,
          _limit: this.limit
        }
      });
    },

    sortedPosts() {
      return [ ...this.posts ].sort((post1, post2) => post1[this.selectedSort]?.localeCompare(post2[this.selectedSort]))
    },
    sertedAndSearchedPosts() {
      return this.sortedPosts.filter(post => post.title.toLowerCase().includes(this.searchQuery.toLowerCase()))
    }
  },
}
</script>

<style scoped>
  
</style>