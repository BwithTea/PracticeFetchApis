"use client"
import { Box, Button, Stack, TextField } from "@mui/material"
import { useState } from "react"
export default  function Pokemon() {
    const [inputval,setinput] = useState("")
    const [data,setdata] = useState({})
    const [sprite,setsprite] = useState("")

    
    const changeval = (event) => {
        setinput(event.target.value)
    }

   

    console.log("Input value: ", inputval)
    const fetchPokemon = async () => {
        if (inputval !== ""){
            try {
                let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${inputval}`)
                if (response.ok){
                    // When using a state function it queues the function, which means things will take additional time to load
                    const res = await response.json()

                    setdata(res)
                    console.log(data)
                    // Set the sprite directly from the response variable because of the delay
                    setsprite(`${res.sprites.front_default}`)
                }else {
                    throw new error("Could not fetch resource")
                }
            
            } catch(error) {
                console.log("Error: ",error)
            }
        }
            
        
    }

   

    
    return (
        <Box bgcolor={"white"} width = "100vw" height = "100vh" display = "flex" justifyContent={"center"} alignItems={"center"}>
            <Stack direction = "column" spacing = {"50px"} alignItems={"center"}>
                <Box color={"Darkgray"}><h1>Who's that Pokemon?</h1></Box>
                
                <Stack direction = "row" spacing={"10px"}>
                    <TextField label = {"Pokemon Name"} value = {inputval} onChange= {changeval}></TextField>
                    <Button variant = "contained" onClick= {fetchPokemon}>Go</Button>
                    
                </Stack> 
                <Box
                    sx={{
                    // learn how this works ****display: 'inline-block', // Ensures the border wraps tightly around the image*** 
                    border: '2px solid black', // Create the outline
                    borderRadius: '8px', // Optional: Adds rounded corners
                    padding: '4px', // Optional: Adds spacing between the image and border
                }}>
                    <Box
                    // I make this sprite appear only when the sprite is not a string
                        component = "img"
                        src = {sprite}
                        border={"2px"}
                        height = "300px"
                        width = "300px"
                    ></Box>
                </Box>
            </Stack>
        </Box>
        
    )
}