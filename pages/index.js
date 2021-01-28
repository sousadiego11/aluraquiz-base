import styled from 'styled-components'
import db from '../db.json'
import Head from 'next/head'
import React from 'react'
import {useRouter} from 'next/router'

import Button from '../src/components/Button'
import Input from '../src/components/Input'
import Widget from '../src/components/Widget'
import Footer from '../src/components/Footer'
import GitHubCorner from '../src/components/GitHubCorner'
import QuizBackground from '../src/components/QuizBackground'
import QuizLogo from '../src/components/QuizLogo'
import QuizContainer from '../src/components/QuizContainer'

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
            <Input name="nomeDoUsuario" value={name} placeholder="Digita ai o seu nome! :D" onChange={(infoEvento)=> setName(infoEvento.target.value) }/>
            <Button name={name} type="submit" disabled={name.length === 0} >
              {`JOGAR ${name}`}
            </Button>
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
