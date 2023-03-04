import clsx from 'clsx'
import React, { useEffect, useState } from 'react'

import * as HoverCard from '@radix-ui/react-hover-card';

import '../main.css'

import smiley from './assets/smiley.png'
import { api } from './services/api'
import { WeekDays } from './types/types'
import { currentUsersPerWeek, calculatePercentage, currentUsersPerYear } from './utils/extraData'

import {BsFillSquareFill} from 'react-icons/bs'

const App = () => {

      const[weekDays, setWeekDays] = useState<WeekDays[]>([])

      useEffect(()=>{
        api.get('/weekDays')
          .then(response =>{
            setWeekDays(response.data)
          })
      }, [])

      const expectedUsersPerWeek = weekDays.map(day => day.users)
          .reduce((last, current)=> last + current, 0)

      const accessPerMinute = Math.floor((expectedUsersPerWeek) / 24 * 60 * 7)
      
      const expectedUsersPerYear = Math.floor((expectedUsersPerWeek * 365) / 7)
      
      const percentageWeek = calculatePercentage(currentUsersPerWeek, expectedUsersPerWeek)
      const percentageYear = calculatePercentage(currentUsersPerYear, expectedUsersPerYear)
      
      // const dayLess = weekDays.reduce(()=>{

      // })
  
  return (
    <main id='app' className='grid'>

      <div className='box nps grid'>
        <div className="top text-center">Frequência de acessos na plataforma</div>
        <div className="middle grid">
          {<img src={smiley}/>}
          Excelente
        </div>
          <div className="bottom grid">
            Acessos por minuto: 
            <strong>
              {accessPerMinute.toString().substring(0, 2)}
            </strong>
          </div>
      </div>

      <div className='box active-users grid'>
        <div className="top text-center">Usuários ativos por semana</div>
        <div className="middle text-center">
          <svg viewBox='0 0 232 232'>
            <circle
              cx='50%' cy='50%'
              r='90'
              opacity='0.1'
              stroke='#D9D9D9'
            />

            <circle
              cx='50%' cy='50%'
              r='90'
              stroke='url(#paint0_linear_201_85)'
            />

          <defs>
            <linearGradient id="paint0_linear_201_85" x1="-9" y1="82" x2="145" y2="178" gradientUnits="userSpaceOnUse">
              <stop stopColor="#CE9FFC"/>
              <stop offset="1" stop-color="#7367F0"/>
            </linearGradient>
          </defs>
          </svg>

          <div className="content">
            <h3>{percentageWeek.toString()}%</h3>
            <p>dos usuários</p>
          </div>
        </div>
        <div className="bottom">
          <div className="item">
            <span>Esperado:</span>
            <span>{expectedUsersPerWeek.toString().substring(0, 3)}mil</span>
          </div>
          <div className="item">
            <span>Alcançado:</span>
            <span>{currentUsersPerWeek.toString().substring(0, 3)}mil</span>
          </div>
        </div>
      </div>

      <div className='box target grid'>
        <div className="top text-center">Meta anual de ativos</div>
        <div className="middle text-center">
        <svg viewBox='0 0 232 232'>
            <circle
              cx='50%' cy='50%'
              r='90'
              opacity='0.1'
              stroke='#D9D9D9'
            />

            <circle
              cx='50%' cy='50%'
              r='90'
              stroke='url(#paint0_linear_201_85)'
            />

          <defs>
            <linearGradient id="paint0_linear_201_85" x1="-9" y1="82" x2="145" y2="178" gradientUnits="userSpaceOnUse">
              <stop stop-color="#CE9FFC"/>
              <stop offset="1" stop-color="#7367F0"/>
            </linearGradient>
          </defs>
        </svg>

        <div className="content">
          <h3>{(percentageYear * 10).toString()}%</h3>
          <p>dos usuários</p>
        </div>
        </div>
        <div className="bottom">
          <div className="item">
            <span>Esperado:</span>
            <span>{expectedUsersPerYear.toString().substring(0, 3)}mil</span>
          </div>
          <div className="item">
            <span>Alcançado:</span>
            <span>{currentUsersPerYear.toString().substring(0, 3)}mil</span>
          </div>
        </div>
      </div>
      <div className='box ocurrency grid'>
        <div className="top text-left">Frequência de usuários por semana</div>
        <div className="wrapper">
          <div className="left grid">
            <div className="day-less">
              <span>Dia(s) com menos acessos:</span>
              <br /><br />
              <strong>Domingo, segunda-feira e quarta-feira</strong>
            </div>
            <div className="day-more">
              <span>Dia(s) com mais acessos:</span>
              <br /><br />
              <strong>Sexta-feira</strong>
            </div>
          </div>
          <div className="right">
            <div className="bars">
              {weekDays.map(day=>(
                  <HoverCard.Root openDelay={50} closeDelay={10}>
                    <HoverCard.Trigger>
                      <div className="bar-wrapper" key={day.id}>
                      <div className={clsx('bar', 
                      {'less-5': day.users > 0 && day.users < 5 ,
                        'less-10': day.users >= 5 && day.users < 10,
                        'less-12': day.users >= 10 && day.users < 13,
                        'less-25': day.users >= 13 && day.users < 15,
                        'less-50': day.users >= 23 && day.users <= 40,
                      }
                      )}></div>
                      <span>{day.day}</span>
                    </div>
                    </HoverCard.Trigger>
                    <HoverCard.Portal>
                      <HoverCard.Content side='left' avoidCollisions={true} className='hovercard-content'>
                        <BsFillSquareFill color='#90F7EC' className='icon'/>
                        <p>Acessos: {day.users}mil</p>
                      </HoverCard.Content>
                    </HoverCard.Portal>
                  </HoverCard.Root>
              ))}
            </div>
          </div>
        </div>
      </div>
    </main>
  )                       
}

export default App