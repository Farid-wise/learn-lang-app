<script setup lang="ts">
import type Button from "primevue/button";
import { useTests } from "../../composables/useTests";

const props = defineProps<{ moduleName?: string }>();
const {
  testStarted,
  currentQuestionIndex,
  currentUserModuleDictionary,
  userAnswer,
  showFeedback,
  isCorrect,
  correctAnswers,
  progress,
  currentQuestion,
  answerInput,
  startTest,
  checkAnswer,
  nextQuestion,
  restartTest,
} = useTests(props.moduleName);
</script>
<template>
  <div class="overlay-test px-3">
    <div class="test-container">
      <div v-if="!testStarted">
        <h2>Тест на перевод слов</h2>
        <p>Проверьте свои знания перевода с английского на русский</p>
        <Button @click="startTest">Начать тест</Button>
      </div>

      <div v-else-if="currentQuestionIndex < currentUserModuleDictionary?.length!">
        <div class="progress-bar">
          <div class="progress" :style="{ width: progress + '%' }"></div>
        </div>
        <h3>
          Вопрос {{ currentQuestionIndex + 1 }} из
          {{ currentUserModuleDictionary?.length }}
        </h3>
        <div class="question">
          <p>
            Как переводится слово <strong>"{{ currentQuestion?.key! }}"</strong>?
          </p>
          <div v-if="!showFeedback">
            <input
              v-model="userAnswer"
              @keyup.enter="checkAnswer"
              placeholder="Введите перевод..."
              ref="answerInput"
            />
            <Button :disabled="!userAnswer" @click="checkAnswer">Ответить</Button>
          </div>
        </div>
        <div
          v-if="showFeedback"
          class="feedback"
          :class="{ correct: isCorrect, incorrect: !isCorrect }"
        >
          <p v-if="isCorrect">Правильно! 🎉</p>
          <p v-else>Неправильно. Правильный ответ: "{{ currentQuestion?.translate }}"</p>
          <Button @click="nextQuestion">Следующий вопрос</Button>
        </div>
      </div>

      <div v-else class="results">
        <h2>Результаты теста</h2>
        <p>
          Вы ответили правильно на {{ correctAnswers }} из
          {{ currentUserModuleDictionary?.length! }} вопросов
        </p>
        <p>
          Процент правильных ответов:
          {{ Math.round((correctAnswers / currentUserModuleDictionary?.length!) * 100) }}%
        </p>
        <Button @click="restartTest">Пройти тест снова</Button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.test-container {
  width: 830px;
  margin: 0 auto;
  background-color: white;
  border-radius: 10px;
  padding: 20px;
  font-family: Arial, sans-serif;
}

p, h3 {
  color: black !important;
}

.progress-bar {
  width: 100%;
  height: 10px;
  background-color: #f0f0f0;
  border-radius: 5px;
  margin-bottom: 20px;
}

.progress {
  height: 100%;
  background-color: #42b983;
  border-radius: 5px;
  transition: width 0.3s ease;
}

.question {
  margin-bottom: 20px;
}

input {
  padding: 8px 12px;
  margin-right: 10px;
  width: 200px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

button {
  padding: 8px 16px;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}


.feedback {
  padding: 15px;
  border-radius: 4px;
  margin-top: 20px;
}

.feedback.correct {
  background-color: #e6f7e6;
  border: 1px solid #a0d8a0;
}

.feedback.incorrect {
  background-color: #fde8e8;
  border: 1px solid #f0a0a0;
}

.results {
  text-align: center;
}

.overlay-test {
  position: absolute;
  overflow: hidden;
  top: 0;
  left: 0;
  width: 100%;
  height: 110%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;
}


h2 {
  color: black
}
</style>
