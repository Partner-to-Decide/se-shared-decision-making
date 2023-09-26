// Question.tsx
import React, { useEffect, useState } from "react";
import Layout from "../Layout";
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
    // current question from strapi
    const [question, setQuestion] = useState<any>(null);

    const [currentStep, setCurrentStep] = useState(1);
    const [questionTotal, setQuestionTotal] = useState(0);

    // current question id
    const { id } = useParams();
    // control slider value
    const [sliderValue, setSliderValue] = useState(1);
    // global language
    const [languageState, setLanguageState] = useState('en');

    useEffect(() => {
        // Sets the language at page load. If no language in local storage then uses english by default
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
            console.log('Fetched data:', data.data.attributes);
            setQuestion(data.data);
            setQuestionTotal(dataTotal.data.length);

            // add this line to dispatch the default value
            const categoryLabels: (keyof typeof categories)[] = [
                "leastImportant",
                "lessImportant",
                "important",
                "mostImportant",
            ];
            const defaultCategory = categoryLabels[0]; // "leastImportant"
            dispatch(addToCategory({ category: defaultCategory, questionText: data.data.attributes.question_detail[0].question_content }));
            setSliderValue(1); // reset slider value to 1
        };

        fetchQuestion();
    }, [id]);


    // update results array when user click the slider
    // todo: error
    const handleSliderChange = (
        value: number | number[]
    ) => {
        const categoryLabels: (keyof typeof categories)[] = [
            "leastImportant",
            "lessImportant",
            "important",
            "mostImportant",
        ];

        const category = categoryLabels[value as number - 1];
        // const category = value as number - 1;
        dispatch(addToCategory({ category, questionText: question.attributes.question_detail[0].question_content }));
        setSliderValue(value as number);
    };

    // next button
    const handleNext = () => {
      const nextId = parseInt(id!) + 1;
      if (nextId === 7) {
        navigate(`/QuizResult`);
      } else {
        navigate(`/question/${nextId}`);
        setCurrentStep(nextId); // Update the currentStep state
      }
    };

    // previous button
    const handlePrevious = () => {
      const prevId = parseInt(id!) - 1;
      if (prevId === 0) {
        navigate("/MyValues");
      } else {
        navigate(`/question/${prevId}`);
        setCurrentStep(prevId); // Update the currentStep state
      }
    };

    return (
        <StyledEngineProvider injectFirst>
            <Layout>

                <Grid
                    container
                    columns={{ xl: 12, lg: 12, md: 12, sm: 12, xs: 12 }}
                    bgcolor="#F4FCF0"
                    pt="4rem"
                    pb="4rem"
                    className="my-value-main"
                >
                    <Container maxWidth="md">
                        {question && (
                            <>
                                <Grid mb="2rem">
                                    <ProgressBar currentStep={currentStep} totalSteps={questionTotal} />
                                </Grid>

                                <Box component="span" bgcolor="#0C3A25" sx={{ p: 2, borderRadius: '100px', color: '#ffffff' }}>
                                    {question.id}
                                </Box>

                                <Typography variant="h5" letterSpacing="1.5px" mb="1.5rem" color="primary.main">
                                    {question.attributes.question_detail[0].intro_sentance}
                                </Typography>

                                 <Typography variant="h3" fontSize="2rem" color="primary.main">
                                    {question.attributes.question_detail[0].question_content}
                                </Typography>

                                <CustomSlider
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
                                />

                                <p className="drag-text">
                                    Drag slider to indicate your preference
                                </p>
                                <div className="pre-next-container">
                                    <button onClick={handlePrevious} className="Previous-circle"><span><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5.99991 12L7.40991 10.59L2.82991 6L7.40991 1.41L5.99991 -1.23266e-07L-8.72135e-05 6L5.99991 12Z" fill="#0C3A25"/>
                                    </svg>
                                    </span>Back</button>
                                    <button onClick={handleNext} className="Next-circle"><span><svg width="8" height="12" viewBox="0 0 8 12" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M2.00009 0L0.590088 1.41L5.17009 6L0.590088 10.59L2.00009 12L8.00009 6L2.00009 0Z" fill="#0C3A25"/>
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
            </Layout>
        </StyledEngineProvider>
    );
};

export default Question;
