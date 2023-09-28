import React, { useState, useEffect } from 'react';
import Checkbox from '@mui/material/Checkbox';
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { TooltipProps, tooltipClasses } from '@mui/material/Tooltip';
import { Grid, Container, Typography } from "@mui/material";
import Link from '@mui/material/Link';
import EditIcon from '../../siteImages/icons/pencil-icon.svg';
import PlusIcon from '../../siteImages/icons/plus-icon.svg';
import TooltipIcon from '../../siteImages/icons/tooltip-icon.svg';

const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

const ChecklistQues = (props:any) => {

  const quizquestions = props.quiz.data;
  const isloading = props.isloading

  interface Question {
    text: string;
    id: number;
    tooltip: string;
    isEditing: boolean;
    isChecked: boolean;
  }
  const [questions, setQuestions] = useState<Question[]>(() => {
    const savedQuestions = getCookie('Questions');
    return savedQuestions ? JSON.parse(savedQuestions) : [];
  });
  const [savedQuestions, setSavedQuestions] = useState<string[]>([]);
  function setCookie(name: string, value: string, days?: number) {
    const expirationDate = new Date();
    expirationDate.setDate(expirationDate.getDate() + (days || 0));
    const cookieValue = encodeURIComponent(value) + (days ? `; expires=${expirationDate.toUTCString()}` : '');
    document.cookie = `${name}=${cookieValue}; path=/`;
  }
  function getCookie(name: string) {
    const cookies = document.cookie.split(';');
    for (let i = 0; i < cookies.length; i++) {
      const cookie = cookies[i].trim();
      if (cookie.startsWith(name + '=')) {
        return decodeURIComponent(cookie.substring(name.length + 1));
      }
    }
    return null;
  }
  useEffect(() => {
  
  if(quizquestions){
    const savedQuestionsData = getCookie('Questions');
    if (savedQuestionsData) {
      const parsedQuestions = JSON.parse(savedQuestionsData);
      if (parsedQuestions.length >= quizquestions.length ) {
        setQuestions(JSON.parse(savedQuestionsData));
      } else {
          setDefaultQuestions();
      }
    } else {
      setDefaultQuestions();
    }
   }
  }, []);

 const setDefaultQuestions = () => {
    if(quizquestions) {
      const defaultQuestions: Question[] = 
        quizquestions.map((item:any) => ({
          text: item.attributes.question,
          tooltip: item.attributes.Tooltip,
          id: item.id,
          isEditing: false,
          isChecked: false,
        }));
      setQuestions(defaultQuestions);
      localStorage.setItem('Questions', JSON.stringify(defaultQuestions));
    }
  };

  useEffect(() => {
    const updatedCookieQuestions = questions.map((cookieQuestion) => {
      const matchingApiQuestion = quizquestions.find((apiQuestion:any) => apiQuestion.id === cookieQuestion.id);
      if (matchingApiQuestion && matchingApiQuestion.attributes.question !== cookieQuestion.text) {
        return { ...cookieQuestion, text: matchingApiQuestion.attributes.question };
      }
      return cookieQuestion;
    });
    setCookie('Questions', JSON.stringify(updatedCookieQuestions), 30);
  }, [quizquestions,questions]);


  const handleQuestionTextChange = (index: number, text: string) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].text = text;
    setQuestions(updatedQuestions);
  };
  const handleEditQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isEditing = true;
    setQuestions(updatedQuestions);
  };
  const handleDeleteQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions.splice(index, 1);
    setQuestions(updatedQuestions);
    const updatedSavedQuestions = [...savedQuestions];
    updatedSavedQuestions.splice(index, 1);
    setSavedQuestions(updatedSavedQuestions);
  };
  const handleSaveQuestion = (index: number) => {
    const updatedQuestions = [...questions];
    const savedText = updatedQuestions[index].text;
    updatedQuestions[index].isEditing = false;
    setQuestions(updatedQuestions);
    const updatedSavedQuestions = [...savedQuestions];
    updatedSavedQuestions[index] = savedText;
    setSavedQuestions(updatedSavedQuestions);
  };
  const handleCancelEdit = (index: number) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index].isEditing = false;
    setQuestions(updatedQuestions);
  };
  const handleAddQuestion = () => {
    const updatedQuestions = [...questions, { id: Date.now(), text: '',tooltip: '', isEditing: true,isChecked: true }];
    setQuestions(updatedQuestions);
  };

  const handleCheckboxChange = (id) => {

    const updatedQuestions = questions.map((question) =>
      question.id === id ? { ...question, isChecked: !question.isChecked } : question
    );
     console.log(updatedQuestions,'updatedQuestions');
    setQuestions(updatedQuestions);
  };


const HtmlTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip {...props} classes={{ popper: className }} />
))(({ theme }) => ({
  [`& .${tooltipClasses.tooltip}`]: {
    backgroundColor: '#ffffff',
    color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 220,
    fontSize: theme.typography.pxToRem(12),
    borderRadius: '0px',
    padding: '20px 20px 40px 20px',
    boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.4)',
  },
}));
  
  return (
    <div className="checklist-outer" style={{ width: '100%' }}>
      {props.isPdfGeneration &&
        <Grid container sx={{display:'flex', justifyContent:'center',paddingTop: '2rem', marginBottom: '2rem'}} className="nav-logo">
           <img 
              className="nav" 
              src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAALQAAAAUCAMAAAATD+fuAAAALVBMVEVMaXELOiUJNyQLOSUMOiQMOSQMOCQLOSQQQCAMOiUMOiMLOSQNOSMLOiUMOiWr+0M3AAAADnRSTlMA3CSjgL9AYBDvkHBQYmAN9wAAAAAJcEhZcwAAA+gAAAPoAbV7UmsAAAOBSURBVHicxZfZstsgDEC1ggCP/v9zWwmInbU3M51WL4lZxJHQYgP8KyGe0gd9vVUr/CcpzV2O2tH1+GrjaP4APSRkHF+b/72gY/5W9G4fV9oVx9gfoQ915yqMKH+Jm97dpS5oIHT8SK2u10d8hIbDPX+H49+hZvkTNFBz/qRC3ctH6LKgoXp7R03vOF6t9T9Dw3AfH3QYkf0M+vFSfuK8ZyH8CTSgt89hDT+Eru72pfOel2KkSCWAg1G5voOWlVyFEXlfMAnvLetuC6PWDV064po+oUtGktW644kAykEX5xFYDKTYsdcZgR2rihVpriJEyIWK3uWJXqDJI6pNsVDd6rt3sopIYNJyKWMxEpwlT5pQYe/P0NZVeB5ljKbuCNq8hSpiDUdOswf2HoMABWuNEnxDi384+fo1T/QCDaEYeB6EHib3qaL4AM5Z6E7nrdR5bk/qu/AgDu8dEdzUHFlIOXZFrpfmqIUko1HiOMJGoVK0HDe4hK6JMUHtJTR6g7JqSAmVdc1SaOrxsKctoZcbrEU4nNC4E9EyuGuujWiY0GlULiOgmfwldE+uW9QnNO6SVS5lQq/QzRF4zVks0m1B/Ejew7Y8YjodObVwqk1f2IoKKiW5wv51wIIucx97hT6hrDkB36dpQp919uYJeAwPBQ2v0NDWi8HNOtvQ6dMNnQxWGXVYQqOIcGvRW2vTMTTTNd34Alq8g3qJ01TKNOIZeo/xSaoX6OLeAZ07po7MzIuagDa/h0aZ1q3t5RhS83FdQjrvHXR1jpI+TYbX0G0m+fbZMzRHqKHj0vEGup7Qw72fXfKM6dSbYTRm3LyGJkfozrf8egXNl9B6FR6UFW/m9JLTzm0q7pGAnvX4E/Qxk/c1tLnPfP8AfebfZVbPdw/M/KGIkSl2b0FC9z2SdfrcPWP6amHiUTjqHTRE9u1cp/oMHSCyCjStShWyj7XaVtORbZtIVOtpAfUFvV+rJG0reTnZF4DY/fyWMHQxKNr8oO5tXQi7QiVbINS8W/gqupUSod/6cEg4UUYcWw3K7D8Q24a7IzNHr5LlVHHno9RoBuF+LkSiBge6C2WrGEMF3ecg1nJEQ+rxCXS6ygYiih05zDwLJSnigBoDUfjnhqqtaQXLdZd3llgcNZC6Ii4FOZ5fG/HBEW8mt1FGxOxocQPaGoqB5bpjzmoBnSlIIzT+Zv0FBGokW+QMFWsAAAAASUVORK5CYII=" 
              crossOrigin="anonymous"
              alt="Logo" 
            />
        </Grid>
      }

      {questions.map((question, index) => (
        <div key={index} style={{ width: '100%', marginBottom: '20px' }}>
          <div className="question-outer">
            {question.isEditing ? (
              <>
                <Checkbox {...label} />
                <div className="question no-flex">
                  <input type="text" value={question.text} autoFocus onChange={(e) => handleQuestionTextChange(index, e.target.value)} />
                  <div className="edit-case-btn-group">
                    <button className="delete-btn" onClick={() => handleDeleteQuestion(index)}>Delete</button>
                    <button className="cancel-btn" onClick={() => handleCancelEdit(index)}>Cancel</button>
                    <button className="save-btn" onClick={() => handleSaveQuestion(index)}>Save</button>
                  </div>
                </div>
              </>
            ) : (
              <>
                {props.isPdfGeneration == true ? (<>
                  {question.isChecked === true &&
                    <div className="question pdf-ques">
                       {question.text}
                        <div className="tooltop-pdf" style={{ marginTop: '7px', display: 'block', width: '100%' }}>
                          <h4>Learn more about</h4>
                          <p>{question.tooltip}</p>
                        </div>
                    </div>
                  }
                </>) : (<>
                  <Checkbox {...label}  checked={question.isChecked === true ? true : false } onChange={() => handleCheckboxChange(question.id)}/>
                  <div className="question">
                    {question.text}
                    {question.tooltip != null ? (
                    <HtmlTooltip
                      title={
                        <React.Fragment>
                          <Typography color="inherit">Learn more about</Typography>
                          <Link href="#">{question.tooltip}</Link>
                        </React.Fragment>
                      }
                      placement="top"
                    >
                      <div className="tooltip-icon"><img src={TooltipIcon} alt="Tooltip Icon" /></div>
                    </HtmlTooltip>
                    ) : null}
                    <button className="edit-btn" onClick={() => handleEditQuestion(index)}><img src={EditIcon} alt="Edit Icon" /></button>
                  </div>
                </>) 
              }
              </>
            )}
          </div>
        </div>
      ))}
      {!props.isPdfGeneration &&
        <button className="add-ques-btn" onClick={handleAddQuestion}><img src={PlusIcon} alt="Plus Icon" />Add Question</button>
      }
    </div>
  );
}

export default ChecklistQues;
