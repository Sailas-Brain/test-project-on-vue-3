<template>
  <div v-if="posts.length > 0">
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <post-item
        v-for="post in posts" 
        :key="post.id" 
        :post="post"
        @remove="$emit('remove', post)"
      />
    </transition-group>
    
  </div>
  <h2 class="title" v-else>Список постов пуст</h2>
</template>

<script>

import PostItem from '@/componenst/PostItem.vue';

export default {
  components: {
    PostItem
  },

  props: {
    posts: {
      type: Array,
      default: () => {[]},
      required: true,
    }
  }
}
</script>

<style scoped>
	.post {
    padding: 15px;
    border: 2px solid teal;
    margin-top: 15px;
  }

  .title {
    display: flex;
    justify-content: center;
    margin-top: 15px;
    color: red;
  }

  .post-list-item {
    display: inline-block;
    margin-right: 10px;
  }
  .post-list-enter-active,
  .post-list-leave-active {
    transition: all .4s ease;
  }
  .post-list-enter-from,
  .post-list-leave-to {
    opacity: 0;
    transform: translateX(130px);
  }
  .post-list-move {
    transition: transform 0.4s ease;
  }
</style>