import React from 'react'
import db from '../../db.json'
import Widget from '../../src/components/Widget'
import QuizLogo from '../../src/components/QuizLogo'
import QuizBackground from '../../src/components/QuizBackground'
import QuizContainer from '../../src/components/QuizContainer'
import Button from '../../src/components/Button'
import AlternativesForm from '../../src/components/AlternativesForm'

function QuestionWidget({questions, totalQuestions, questionIndex, onSubmit, addResult}){
    const [selectedAlternative, setSelectedAlternative] = React.useState(undefined)
    const questionId = `question__${questionIndex}`
    const isCorrect = selectedAlternative === questions.answer
    const [isQuestionSubmited, setIsQuestionSubmited ] = React.useState(false)
    const hasAlternativeSelected = selectedAlternative !== undefined

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
            <AlternativesForm onSubmit={(infosDoEvento)=>{
                infosDoEvento.preventDefault()
                setIsQuestionSubmited(true)
                setTimeout(()=>{
                    onSubmit()
                    addResult(isCorrect)
                    setIsQuestionSubmited(false)
                    setSelectedAlternative(undefined)
                }, 1 * 1000)
            }} >
                {questions.alternatives.map((alternative, alternativeIndex)=>{
                    const alternativeId = `alternative__${alternativeIndex}`
                    const alternativeStatus = isCorrect ? 'SUCCESS' : 'ERROR'
                    const isSelected = selectedAlternative === alternativeIndex
                    return(
                        <Widget.Topic 
                        as="label" 
                        key={alternativeId} 
                        htmlFor={alternativeId}
                        data-selected={isSelected}
                        data-status={isQuestionSubmited && alternativeStatus}
                        >
                            <input 
                            id={alternativeId} 
                            style={{display: 'none'}} 
                            name={questionId} 
                            type="radio" 
                            onChange={()=>setSelectedAlternative(alternativeIndex)} 
                            />
                            {alternative}
                        </Widget.Topic>
                    )
                })}
            <Button type="submit" disabled={!hasAlternativeSelected} >
                Confirmar
            </Button>
            {isQuestionSubmited && isCorrect && <p>Você acertou!</p>}
            {isQuestionSubmited && !isCorrect && <p>Você errou!</p>}
            </AlternativesForm>
        </Widget.Content>
    </Widget>
    )
}

function ResultWidget({results}){
    return(
        <Widget>
            <Widget.Header>
                Tela de resultado
            </Widget.Header>

            <Widget.Content>
                <p>Você obteve {results.filter(resultado => resultado === true).length} acerto(s)</p>
                <ul>
                {results.map((result, index)=>(
                    <li key={Math.random} >#{index + 1} Resultado: {result === true ? 'Correta!' : 'Incorreta!'} </li>
                ))}
                </ul>
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
    
    const [results, setResults] = React.useState([])
    const [screenState, setScreenState] = React.useState(screenStates.LOADING)
    const totalQuestions = db.questions.length
    const [questionIndex, setQuestionIndex] = React.useState(0)
    const questions = db.questions[questionIndex]
        
    function addResult(result){
        setResults([...results, result])
    }

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
                    totalQuestions={totalQuestions}
                    addResult={addResult}  />}
                {screenState === screenStates.LOADING && <LoadingWidget />}
                {screenState === screenStates.RESULT && <ResultWidget results={results} />}
            </QuizContainer>
        </QuizBackground>
    )
}