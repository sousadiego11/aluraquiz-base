import React from 'react'
import db from '../db.json'
import Widget from '../src/components/Widget'
import QuizLogo from '../src/components/QuizLogo'
import QuizBackground from '../src/components/QuizBackground'
import QuizContainer from '../src/components/QuizContainer'
import Button from '../src/components/Button'

function QuestionWidget({questions, totalQuestions, questionIndex, onSubmit}){
    const questionId = `question__${questionIndex}`
    
    return(
        <Widget>
        <Widget.Header>
            {/* <BackLinkArrow href="/" />*/}
            <h3>
                {`Pergunta ${questionIndex + 1} de ${totalQuestions}`}
            </h3>
        </Widget.Header>

        <img
            alt="Descrição"
            style={{
                width: '100%',
                height: '150px',
                objectFit: 'cover',
            }}
            src={questions.image}
        />
        <Widget.Content>
            <h2>
                {questions.title}
            </h2>
            <p>
                {questions.description}
            </p>
            <form onSubmit={(infosDoEvento)=>{
                infosDoEvento.preventDefault()
                onSubmit()
            }} >
                {questions.alternatives.map((alternative, alternativeIndex)=>{
                    return(
                        <Widget.Topic as="label">
                            <input id={alternativeIndex} name={questionId} type="radio" />
                            {alternative}
                        </Widget.Topic>
                    )
                })}
            <Button type="submit" >
                Confirmar
            </Button>
            </form>
        </Widget.Content>
    </Widget>
    )
}


function LoadingWidget(){
    return(
        <Widget>
            <Widget.Header>
                Carregando...
            </Widget.Header>

            <Widget.Content>
                [Desafio do Loading]
            </Widget.Content>
        </Widget>
    )
}

const screenStates = {
    QUIZ: 'QUIZ',
    LOADING: 'LOADING',
    RESULT: 'RESULT'
}

export default function QuizPage(){
    
    const [screenState, setScreenState] = React.useState(screenStates.LOADING)
    const totalQuestions = db.questions.length
    const [questionIndex, setQuestionIndex] = React.useState(0)
    const questions = db.questions[questionIndex]
    
    function handleSubmitQuiz(){
        const nextQuestion = questionIndex + 1
        if(nextQuestion < totalQuestions){
            setQuestionIndex(prevQuestion => prevQuestion + 1)
        }

        else{
            setScreenState(screenStates.RESULT)
        }
    }

    React.useEffect(()=>{
        setTimeout(()=>{
            setScreenState(screenStates.QUIZ)
        }, 1 * 1000)
    }, [])

    return(
        <QuizBackground backgroundImage={db.bg}>
            <QuizContainer>
                <QuizLogo/>
                    {screenState === screenStates.QUIZ && 
                    <QuestionWidget 
                    onSubmit={handleSubmitQuiz}
                    questions={questions} 
                    questionIndex={questionIndex}
                    totalQuestions={totalQuestions}  />}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <div>Você finalizou o quiz!</div>}
            </QuizContainer>
        </QuizBackground>
    )
}