<template>
  <form @submit.prevent="createPost">
    <h4>Создание поста</h4>
    <my-input 
      v-model="post.title" 
      placeholder="Название"
      v-focus
    />
    <my-input
      v-model="post.body" 
      placeholder="Описание"
    />
    <my-button class="button">Создать пост</my-button>
  </form>
</template>

<script>

export default {
	data() {
		return {
			post: {
				title: '',
				body: ''
			}
		}
	},

	methods: {
		createPost() {
			this.$emit('create', {
        id: Date.now(),
				...this.post
			})
      this.post.title = '';
      this.post.body = '';
    }
	},
}

</script>

<style scoped>
	form {
    display: flex;
    flex-direction: column;

  }
	.button {
    margin-top: 15px;
		align-self: flex-end;
	}
  
</style>