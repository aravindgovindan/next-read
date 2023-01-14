<template>
  <div class="home">
    <h1 class="title" align="center">My Next Read</h1>
    <div class="form-group" align="center">
      <input class="form-control" v-model="bookTitle" placeholder="Enter a book title" />
      <br>
      <button class="btn btn-primary" @click="submitPrompt">Show my next read</button>
    </div>
    <div v-if="recommendation">
      <p>{{ recommendation }}</p>
    </div>
  </div>
</template>


<script>
import axios from 'axios'

export default {
  data() {
    return {
      bookTitle: "",
      recommendation: ""
    }
  },
  methods: {
    generatePrompt() {
      return `You are a book suggester. Given a book the user likes, you need to suggest a new book that the user will like. You should answer with only a book title and author.
Q. I liked reading Harry Potter and the goblet of fire. What should I read next?
A. The Lightning Thief by Rick Riordan
Q. I liked reading Twilight. What should I read next?
A. Red Queen by Victoria Aveyard.
Q. I liked reading ${this.bookTitle}. What should I read next?
A. `
    },
    async submitPrompt() {
      try {
        const response = await axios.post('https://api.openai.com/v1/engines/babbage/completions', {
          temperature: 0,
          prompt: this.generatePrompt(),
        }, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer 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`,
          }
        })
        this.recommendation = response.data.choices[0].text.split('\n')[0]
      } catch (error) {
        console.log(error)
      }
    }
  }
}
</script>
