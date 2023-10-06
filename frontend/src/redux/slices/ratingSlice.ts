import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RatingState {
  leastImportant: (Question | string)[];
  lessImportant: (Question | string)[];
  important: (Question | string)[];
  mostImportant: (Question | string)[];
  choiceOne: (Question | string)[];
  choiceTwo: (Question | string)[];
  choiceThree: (Question | string)[];
  choiceFour: (Question | string)[];
  choiceFive: (Question | string)[];
}

interface Question {
  text: string;
  icon: string;
  num: string;
  isChoice: boolean;
}

const initialState: RatingState = {
  leastImportant: [],
  lessImportant: [],
  important: [],
  mostImportant: [],
  choiceOne: [],
  choiceTwo: [],
  choiceThree: [],
  choiceFour: [],
  choiceFive: []
};

export const ratingSlice = createSlice({
  name: "rating",
  initialState,
  reducers: {
    addToCategory: (
      state,
      action: PayloadAction<{
        category: keyof RatingState;
        questionText: string;
        questionIcon: string;
        questionNum: string;
        isChoice: boolean;
      }>
    ) => {
      const { category, questionText, questionIcon, questionNum, isChoice } =
        action.payload;

      if (questionText === "Right now I’m leaning towards") {
        state["choiceOne"] = [];
        state["choiceTwo"] = [];
        state["choiceThree"] = [];
        state["choiceFour"] = [];
        state["choiceFive"] = [];
        if (category === "leastImportant") {
          state["choiceOne"].push("Right now I’m leaning towards");
        } else {
          const question: Question = {
            text: questionText || "",
            icon: questionIcon || "",
            num: questionNum || "", // Add questionNum
            isChoice: isChoice || false, // Add isChoice
          };
          state[category].push(question);
        }
      } else {
        const question: Question = {
          text: questionText,
          icon: questionIcon,
          num: questionNum || "", // Add questionNum
          isChoice: isChoice || false, // Add isChoice
        };
        Object.keys(state).forEach((key) => {
          state[key] = state[key].filter((q) => q.text !== questionText);
        });
        state[category].push(question);
      }

      localStorage.setItem("QuizQuestions", JSON.stringify(state));
    },
    resetCategories: (state) => {
      state.leastImportant = [];
      state.lessImportant = [];
      state.important = [];
      state.mostImportant = [];
      state.choiceOne = [];
      state.choiceTwo = [];
      state.choiceThree = [];
      state.choiceFour = [];
      state.choiceFive = [];
    },
  },
});

export const { addToCategory, resetCategories } = ratingSlice.actions;
export default ratingSlice.reducer;
