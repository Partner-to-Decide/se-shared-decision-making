// Question.tsx
import React, { useEffect, useState } from "react";
import LayoutNested from "../LayoutNested";
import { Slider } from "@mui/material";
import { styled } from "@mui/system";
import Link from '@mui/material/Link';
import { useDispatch, useSelector } from "react-redux";
import { addToCategory } from "../../redux/slices/ratingSlice";
import { RootState } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import "../../pages/pageStyle/MyValues.css";
import { StyledEngineProvider } from "@mui/material/styles";
import ProgressBar from "./ProgressBar";
import axios from "axios";
import { Box, Divider, Grid, Container, ThemeProvider, Typography, Stack, Button } from "@mui/material";

const CustomSlider = styled(Slider)({
    width: "437px",
    "& .MuiSlider-rail": {
        backgroundColor: "#0C3A25",
        width: "400px",
        height: "6px",
        opacity: 1,
    },
    "& .MuiSlider-track": {
        backgroundColor: "#0C3A25",
        opacity: 1,
    },
    "& .MuiSlider-thumb": {
        backgroundColor: "#0C3A25",
        width: "32px",
        height: "32px",
        opacity: 1,
    },
    "& .MuiSlider-mark": {
        backgroundColor: "#0C3A25",
        width: "16px",
        height: "16px",
        borderRadius: "50%",
        opacity: 1,
    },
    "& .MuiSlider-markLabel": {
        color: "#0C3A25", // Set the font color for the label
        fontFamily: "ClashGrotesk-Regular,sans-serif", // Set the font for the label
        fontWeight: "normal", // Set the font weight for the label
        fontSize: "14px", // Set the font size for the label
        top: "40px",
    },
    "& .MuiSlider-markActive": {
        backgroundColor: "#0C3A25",
    },
});


const Question = () => {
    // redux usage
    const dispatch = useDispatch();
    // page change
    const navigate = useNavigate();
    // update data in redux
    const categories = useSelector((state: RootState) => state.rating);
    const [question, setQuestion] = useState<any>(null);
    const [currentStep, setCurrentStep] = useState(1);
    const [questionTotal, setQuestionTotal] = useState(0);
    const { id } = useParams();
    const [sliderValue, setSliderValue] = useState(1);
    const [languageState, setLanguageState] = useState('en');
    const [questionSr, setQuestionSr] = useState(1);

    useEffect(() => {
        window.addEventListener('storage', () => {
            setLanguageState(localStorage.getItem('language') || 'en')
        });
    }, []);

    // reset slider value to 1 when a new question is loaded
    useEffect(() => {
        setSliderValue(1);
    }, [id]);

      // update question content when id changes
      useEffect(() => {
        const fetchQuestion = async () => {
            const response = await fetch(
                process.env.REACT_APP_api_base_url + `/api/my-values-questions/${id}?populate=deep&locale=` + languageState
                );
            const responseTotal = await fetch(
                process.env.REACT_APP_api_base_url + `/api/my-values-questions/`
                );
            console.log(process.env.REACT_APP_api_base_url + `/api/my-values-questions/${id}?populate=deep&locale=` + languageState)
            const data = await response.json();
            const dataTotal = await responseTotal.json();
            setQuestion(data.data);
            setQuestionTotal(dataTotal.data.length);
            const categoryLabels: (keyof typeof categories)[] = [
                "leastImportant",
                "lessImportant",
                "important",
                "mostImportant",
                ];
            const defaultCategory = categoryLabels[0]; // "leastImportant"
            dispatch(addToCategory({ category: defaultCategory, questionText: data.data.attributes.question_detail[0].question_content, questionIcon: question.attributes.question_detail[0].Icon,isChoice: false }));
            setSliderValue(1);
        }
        fetchQuestion();
        let currentStepKey = questionsByLanguage[languageState].indexOf(parseInt(id!));
        setQuestionSr(parseInt(currentStepKey) + 1);
        setCurrentStep(parseInt(currentStepKey) + 1);
    }, [id]);


    // update results array when user click the slider
    // todo: error
      const handleSliderChange = (
        value: number | number[],
        ) => {      
        // const category = value as number - 1;
        if (question.id === 19) {
            const categoryLabels: (keyof typeof categories)[] = [
                "choiceOne",
                "choiceTwo",
                "choiceThree",
                "choiceFour",
                "choiceFive",
                ];

            const category = categoryLabels[value as number - 1];
            dispatch(addToCategory({ category, questionText: question.attributes.question_detail[0].question_content,questionIcon: question.attributes.question_detail[0].Icon, isChoice: true }));
        } else {
            const categoryLabels: (keyof typeof categories)[] = [
                "leastImportant",
                "lessImportant",
                "important",
                "mostImportant",
                ];

            const category = categoryLabels[value as number - 1];
            dispatch(addToCategory({ category, questionText: question.attributes.question_detail[0].question_content,questionIcon: question.attributes.question_detail[0].Icon, isChoice: false }));
        }
        setSliderValue(value as number);
    };

    let questionsByLanguage = [];
    questionsByLanguage['en'] = [1,2,3,4,6,19, 'quiz'];
    questionsByLanguage['es'] = [7,9,10,11,13,20, 'quiz'];
    questionsByLanguage['bah'] = [8,14,15,16,18,21, 'quiz'];

    let lastQuest = {'en': 19, 'es': 20,'bah': 21 }
    //let label[19] = {''};
    


    const handleNext = () => {
        let currentStepKey = questionsByLanguage[languageState].indexOf(parseInt(id!));
        const nextKey = parseInt(currentStepKey) + 1;
        setQuestionSr(parseInt(currentStepKey) + 1);
        setCurrentStep(parseInt(currentStepKey) + 1);

        if (questionsByLanguage[languageState][nextKey] !== 'quiz') {
            setQuestionSr(nextKey);
            const nextId = questionsByLanguage[languageState][nextKey];

            navigate(`/question/${nextId}`);
            setCurrentStep(nextId); // Update the currentStep state

        } else {
            navigate(`/QuizResult`);
        }

    };

    // previous button
    const handlePrevious = () => {
        let currentStepKey = questionsByLanguage[languageState].indexOf(parseInt(id!));
        setQuestionSr(parseInt(currentStepKey) + 1);
        setCurrentStep(parseInt(currentStepKey) + 1);
        const prevKey = parseInt(currentStepKey) - 1;

        if (prevKey !== -1) {
            setQuestionSr(prevKey);
            const prevId = questionsByLanguage[languageState][prevKey];

            navigate(`/question/${prevId}`);
            setCurrentStep(prevId); // Update the currentStep state

        } else {
            navigate(`/MyValues`);
        }
    };

    // // next button
    // const handleNext = () => {
    //   const nextId = parseInt(id!) + 1;
    //   if (nextId === 7) {
    //     navigate(`/QuizResult`);
    //   } else {
    //     navigate(`/question/${nextId}`);
    //     setCurrentStep(nextId); // Update the currentStep state
    //   }
    // };

    // // previous button
    // const handlePrevious = () => {
    //   const prevId = parseInt(id!) - 1;
    //   if (prevId === 0) {
    //     navigate("/MyValues");
    //   } else {
    //     navigate(`/question/${prevId}`);
    //     setCurrentStep(prevId); // Update the currentStep state
    //   }
    // };


    return (
        <StyledEngineProvider injectFirst>
            <LayoutNested>
                <Grid
                    container
                    columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                    bgcolor="#F4FCF0"
                    pt="3rem"
                    pb="4rem"
                    className="my-value-main"
                >
                    <Container maxWidth="md">
                        {question && (
                            <>
                                <Grid mb="2rem">
                                    <ProgressBar currentStep={currentStep} totalSteps={questionTotal} />
                                </Grid>

                                <Box component="span" className="question-id" bgcolor="#0C3A25" sx={{ p: 2, borderRadius: '100px', color: '#ffffff' }}>
                                    {questionSr}
                                </Box>

                                <Container maxWidth="sm">
                                    <Typography variant="h5" letterSpacing="1.5px" mb="1.5rem" color="primary.main">
                                       {question.attributes.question_detail[0].intro_sentence}
                                    </Typography>

                                    <Typography variant="h3" fontSize="2rem" color="primary.main">
                                        {question.attributes.question_detail[0].question_content}
                                    </Typography>
                                </Container>
                                {question.id === 19 || question.id === 20 || question.id === 21 ?
                                    <CustomSlider
                                        className="step-slider step-slider-v2"
                                        value={sliderValue}
                                        step={null}
                                        marks={[
                                            { value: 1, label: "Wait for spontaneous labor past 42 weeks", },
                                            { value: 2, label: "Schedule induction at or around 42 weeks" },
                                            { value: 3, label: "Schedule induction sometime between 41 and 42 weeks" },
                                            { value: 4, label: "Schedule induction at or around 41 weeks" },
                                            { value: 5, label: "Request induction between 39-41 weeks" },
                                        ]}
                                        min={1}
                                        max={5}
                                        onChange={(event, value) => handleSliderChange(value)}
                                    /> : <CustomSlider
                                        className="step-slider"
                                        value={sliderValue}
                                        step={null}
                                        marks={[
                                            { value: 1, label: "Least Important", },
                                            { value: 2 },
                                            { value: 3 },
                                            { value: 4, label: "Most Important" },
                                        ]}
                                        min={1}
                                        max={4}
                                        onChange={(event, value) => handleSliderChange(value)}
                                    />}

                                <p className="drag-text">
                                   {question.attributes.question_detail[0].slider_description}
                                </p>
                                <div className="pre-next-container">
                                    <button onClick={handlePrevious} className="Previous-circle"><span><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M5.99991 12L7.40991 10.59L2.82991 6L7.40991 1.41L5.99991 -1.23266e-07L-8.72135e-05 6L5.99991 12Z" fill="#0C3A25" />
                                    </svg>
                                    </span>Back</button>
                                    <button onClick={handleNext} className="Next-circle"><span><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M2.00009 0L0.590088 1.41L5.17009 6L0.590088 10.59L2.00009 12L8.00009 6L2.00009 0Z" fill="#0C3A25" />
                                    </svg>
                                    </span>Next</button>
                                </div>

                                <div className="back_btn">
                                    <Link href="#">Come Back Later</Link>
                                </div>

                            </>
                        )}
                    </Container>
                </Grid>
            </LayoutNested>
        </StyledEngineProvider>
    );
};

export default Question;
