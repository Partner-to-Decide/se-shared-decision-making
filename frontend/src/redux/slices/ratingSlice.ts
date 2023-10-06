import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface RatingState {
  leastImportant: string[];
  lessImportant: string[];
  important: string[];
  mostImportant: string[];
  choiceOne: string[];
  choiceTwo: string[];
  choiceThree: string[];
  choiceFour: string[];
  choiceFive: string[];
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
      action: PayloadAction<{ category: keyof RatingState; questionText: string, questionIcon:string , isChoice: boolean }>
    ) => {
      const { category, questionText, isChoice } = action.payload;
      if(questionText === 'WHAT SHOULD I KNOW ABOUT THESE CHOICES?'){
        state['choiceOne'] = [];
        state['choiceTwo'] = [];
        state['choiceThree'] = [];
        state['choiceFour'] = [];
        state['choiceFive'] = [];
        if(category === 'leastImportant'){
          state['choiceOne'].push('WHAT SHOULD I KNOW ABOUT THESE CHOICES?');
        } else {
          state[category].push(questionText);
        }
          
      } else {
        // Remove the question from the previous category
        Object.values(state).forEach((questionsArray) => {
          const index = questionsArray.indexOf(questionText);
          if (index !== -1) {
            questionsArray.splice(index, 1);
          }
        });

        // Add the question to the new category
        state[category].push(questionText);
      }

      localStorage.setItem('QuizQuestions', JSON.stringify(state));

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
