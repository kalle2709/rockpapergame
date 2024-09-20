
import React, { useEffect, useState } from 'react'
import rock from '../../images/rock.jpeg'
import paper from '../../images/paper.png'
import scissor from '../../images/scissor.png'
import win from '../../images/win.jpeg'
import lost from '../../images/lost.png'
import { Button, Stack, Typography } from '@mui/material'

import  "./Layout.css"

const Layout = () => {

    const[playerMove , setPlayerMove] = useState<string>('');
    const[computerMove , setComputerMove] = useState<string>('');
    const[moveDisplay , setMoveDisplayWin] = useState<boolean>(false);
    const[resultText , setResultText] = useState<string>('Start Your Turn');
    const[rockBtnClicked, setRockBtnClicked] = useState<boolean>(false);
    const[paperBtnClicked, setPaperBtnClicked] = useState<boolean>(false);
    const[scissorBtnClicked, setScissorBtnClicked] = useState<boolean>(false);


    const moveNum = Math.floor(Math.random() * 5) + 1;
    const [resultObject,setResultObj] = useState({
        wins : 0,
        looses: 0
    })
  
    const computerMoveHandler = (playerMoveIs: string) =>
    {
        setPlayerMove(playerMoveIs);
        setMoveDisplayWin(true);
        if(playerMoveIs === 'Rock') {
            setRockBtnClicked(true);
            setPaperBtnClicked(false);
            setScissorBtnClicked(false);

        }
        else if(playerMoveIs === 'Paper') {
            setRockBtnClicked(false);
            setPaperBtnClicked(true);
            setScissorBtnClicked(false);
        }
        else {
            setRockBtnClicked(false);
            setPaperBtnClicked(false);
            setScissorBtnClicked(true);
        }        
        if(moveNum >= 0 && moveNum < 2.33){
                    
            setComputerMove('Rock')

        }
        else if(moveNum >= 2.33 && moveNum < 3.66){
            setComputerMove('Paper')

        }
        else{
            setComputerMove('Scissors')
        }       
        
    }

    useEffect(() => {
        if (playerMove && computerMove) {
          winHandler(playerMove, computerMove);
        }
      }, [playerMove, computerMove]);

    const winHandler = (playerMoveIs: string, computerMove: string) =>
    {
        if(playerMove === computerMove){
            setResultText("Congrats! You Won")
            setResultObj(prevState => ({
                ...prevState, 
                wins: prevState.wins + 1 
            }));
        }
            
        else{
            setResultText("OOPS! You Lost")
            setResultObj(prevState => ({
                ...prevState,
                looses: prevState.looses + 1
            }))

        }      

    }


  return (
    <Stack direction = 'column' spacing = {3} className = "outline" alignItems='center' >
        <Stack direction='row' spacing={3}>
            <Button onClick = {
                () => {computerMoveHandler('Rock')}
            }
            style={{backgroundColor: rockBtnClicked ? 'green' : 'white'}}
            >
               <img
                    src={rock}
                    style={{ width: 150, height: 150 }}
               />
            </Button>
            <Button onClick = {
                () => {computerMoveHandler('Paper')}
            }
            style={{backgroundColor: paperBtnClicked ? 'green' : 'white'}}
            >
                <img
                    src={paper}
                    style={{ width: 150, height: 150 }}
               />
            </Button>
            <Button onClick = {
                () => {computerMoveHandler('Scissors')}
            }
            style={{backgroundColor: scissorBtnClicked ? 'green' : 'white'}}
            >
                <img
                    src={scissor}
                    style={{ width: 150, height: 150 }}
               />
            </Button>
        </Stack>
        { 
            moveDisplay && 
            <Stack direction='column' className = 'displayBox'>
                <Typography variant = {'h6'} style = {{fontWeight: 700}}>Your Move: <span className = 'moveText' style={{color:'brown'}}> {playerMove} </span></Typography>
                <Typography variant = {'h6'} style = {{fontWeight: 700}}>Computer Move: <span className = 'moveText' style = {{color: 'green'}}> {computerMove} </span></Typography>
                <Stack direction = 'row' spacing={3}>
                    <Typography variant = {'h5'} style = {{fontWeight: 700, color: 'Green'}}>{`Wins: ${resultObject.wins}`}</Typography>
                    <Typography variant = {'h5'} style = {{fontWeight: 700, color: 'Brown'}}>{`Defeats: ${resultObject.looses}`}</Typography>
                </Stack>
            </Stack>
        }
        <Stack direction = 'row' spacing={3}>
            {resultText === 'Congrats! You Won' ? <img
                    src = {win}
                    style={{ width: 50, height: 50 }}
                />
                :
                resultText === 'OOPS! You Lost' &&
                <img
                    src = {lost}
                    style={{ width: 50, height: 50}}
                />
                }
            <Typography variant = {'h4'} style = {{paddingTop: '0.5rem'}}>
                {resultText}
            </Typography>
        </Stack>
        
    </Stack>
  )
}

export default Layout
