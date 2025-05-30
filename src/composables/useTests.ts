import { useAppStore } from "@/stores/app";
import { useAuthStore } from "@/stores/auth";
import { useTestsStore } from "@/stores/tests.store";
import { storeToRefs } from "pinia";
import { ref, computed, nextTick, watch, toValue } from "vue";

export const useTests = (moduleName?: string) => {
  const { userId } = storeToRefs(useAuthStore());
  const { appModules } = storeToRefs(useAppStore());

  const testsStore = useTestsStore();

  const currentUserModuleDictionary = computed(
    () =>
      appModules.value[userId.value].find(
        (module) => module.moduleName === moduleName || ""
      )?.dic
  );

  const testStarted = ref(false);
  const currentQuestionIndex = ref(0);
  const userAnswer = ref("");
  const showFeedback = ref(false);
  const isCorrect = ref(false);
  const correctAnswers = ref(0);
  const answerInput = ref(null);

  const progress = computed(() => {
    if (currentUserModuleDictionary.value) {
      return (
        (currentQuestionIndex.value /
          currentUserModuleDictionary.value.length) *
        100
      );
    }
  });

  function startTest() {
    testStarted.value = true;
    focusInput();
  }

  const shuffledQuestions = computed(() => {
    if (!currentUserModuleDictionary.value) return [];
    const questions = [...currentUserModuleDictionary.value];
    for (let i = questions.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [questions[i], questions[j]] = [questions[j], questions[i]];
    }
    return questions;
  });

  const currentQuestion = computed(() => {
    return shuffledQuestions.value[currentQuestionIndex.value];
  });

  function checkAnswer() {
    if (!userAnswer.value.trim()) return;

    showFeedback.value = true;
    isCorrect.value =
      userAnswer.value.trim().toLowerCase() ===
      currentQuestion?.value?.translate.toLowerCase()!;

    if (isCorrect.value) {
      correctAnswers.value++;
    }
  }

  function nextQuestion() {
    showFeedback.value = false;
    userAnswer.value = "";
    currentQuestionIndex.value++;

    if (
      currentQuestionIndex.value < currentUserModuleDictionary?.value?.length!
    ) {
      focusInput();
    }
  }

  function focusInput() {
    nextTick(() => {
      // @ts-ignore
      answerInput.value?.focus();
    });
  }

  function restartTest() {
    testStarted.value = false;
    currentQuestionIndex.value = 0;
    userAnswer.value = "";
    showFeedback.value = false;
    isCorrect.value = false;
    correctAnswers.value = 0;
  }

  watch(
    [correctAnswers, currentQuestionIndex, currentUserModuleDictionary],
    () => {
      if (
        currentQuestionIndex.value ===
        currentUserModuleDictionary?.value?.length
      ) {
        testsStore.setResults({
          [toValue(moduleName)!]: [
            {
              date: new Date().toLocaleString(),
              score: `${Math.round((correctAnswers.value / currentUserModuleDictionary?.value?.length!) * 100)}%`,
            }
          ]
        });
      }
    }
  );
  return {
    moduleName,
    currentUserModuleDictionary,
    testStarted,
    currentQuestionIndex,
    userAnswer,
    currentQuestion,
    showFeedback,
    isCorrect,
    correctAnswers,
    answerInput,
    progress,
    appModules,
    userId,
    startTest,
    checkAnswer,
    nextQuestion,
    restartTest,
  };
};
