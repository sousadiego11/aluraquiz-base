import styled from 'styled-components'
import db from '../db.json'
import Head from 'next/head'
import React from 'react'
import {useRouter} from 'next/router'

import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'

//const BackgroundImage = styled.div`
//  flex: 1;
  
//  background-image: url(${db.bg});
//  background-size: cover;
//  background-position: center;
//`
export const QuizContainer = styled.div`
  width: 100%;
  max-width: 350px;
  padding-top: 45px;
  margin: auto 10%;
  @media screen and (max-width: 500px) {
    margin: auto;
    padding: 15px;
  }
`
export const QuizBotao = styled.button`
  width: 100%;
  height: 40px;

  background-color: ${({ theme }) => theme.colors.secondary};

  margin-top: 30px;

  border-radius: 7px;
  border: 0;
`
export const QuizInput = styled.input`
  width: 100%;
  height: 40px;

  border-radius: 7px;
  border: 0;
`

export default function Home() {
  
  const router = useRouter() 
  const [name, setName] = React.useState('')

  return (
  <QuizBackground backgroundImage={db.bg}>
    <Head>
    <title>Alura Quiz DnD</title>
    </Head>
    <QuizContainer>
    <QuizLogo/>
      <Widget>
        <Widget.Header>
          <h1>Dungeons and Dragons</h1>
        </Widget.Header>
          
        <Widget.Content>
          <p>Teste seus conhecimentos nesse famoso RPG de mesa!</p>
          <form style={{display: 'flex', flexDirection: 'column', alignItems: 'center'}} onSubmit={function(infoEvento){
              infoEvento.preventDefault()
              router.push(`/quiz?name=${name}`)
            }} >
            <QuizInput onChange={function(infoEvento){
              setName(infoEvento.target.value)
            }} placeholder="Digita ai o seu nome! :D"/>
            <QuizBotao type="submit" disabled={name.length === 0} >
              JOGAR {name}
            </QuizBotao>
          </form>
        </Widget.Content>
      </Widget>
      
      <Widget>
        <Widget.Content>
          <h1>Quizes da galera</h1>
          <p>Aqui irão os quizes</p>
        </Widget.Content>
      </Widget>
      <Footer />
    </QuizContainer>
    <GitHubCorner projectUrl="https://github.com/sousadiego11" />
  </QuizBackground>
  )
}
