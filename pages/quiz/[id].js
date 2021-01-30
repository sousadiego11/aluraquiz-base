import React from 'react'

export default function QuizDaGaleraPage(){
    return(
        <div>
            Desafio da proxima aula
        </div>
    )
}

export async function getServerSideProps(context){
    console.log('infos', context.query)
    return{
        props: {
            
        }
    }
}