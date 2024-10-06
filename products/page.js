
"use client"
import { Stack,Box, Button, TextField} from "@mui/material"
import { blue } from '@mui/material/colors'

import { useState } from "react"

const apiKey = "Qz8N1LwVD3CRuf1qPZhkMXX4"

export default  function Products() {

const [data,setdata] = useState("")
const [img,updateimage] = useState("")
const [name,updatename] = useState("")
const [regularprice,updateregprice] = useState("")
const [saleprice,updatesaleprice] = useState("")
const [upc,updateupc] = useState("")
const [inputvalue,setinput] = useState("")
let newupc;

    const changeval = (event) => {
        if(!isNaN(Number(event.target.value))){
            setinput(event.target.value)
        }
        
    }

    const getProducts = async () => {
        // Look up a specific sku
        // Testing with individual sku
        // const response = await fetch(`https://api.bestbuy.com/v1/products/6529899.json?apiKey=${apiKey}`)
        // Testing with input value sku
        const response = await fetch(`https://api.bestbuy.com/v1/products/${inputvalue}.json?apiKey=${apiKey}`)
        // Testing product availability
        // const response = await fetch(`https://api.bestbuy.com/v1/stores(area(46250,25))+products(sku=6534615)?apiKey=${apiKey}&format=json`)

        
        let json_data = await response.json()
        setdata(json_data)
        updateimage(json_data["images"][3].href)
        updatename(json_data["name"])
        updateregprice(json_data["regularPrice"])
        if(json_data["salePrice"] !== json_data["regularPrice"]){
            updatesaleprice(json_data["salePrice"])
        }
        // Fix this to show last for of upc or bold the last four 
        updateupc(json_data["upc"].slice((json_data["upc"].length -4),(json_data["upc"].length)))



        
        
    }
    
    return (
        
        <>
            {/* Header of the page */}
            <Box sx = {{width : "100vw",height: "125px", bgcolor: "darkblue"}}
                display={"flex"} 
                justifyContent= {"center"} 
                alignItems={"center"} 
                color = {"white"} 
                position={"fixed"} 
                zIndex={"999"} 
                overflow={"auto"}
            >
                <Stack direction={"row"}  spacing={"10px"}>
                    <Box  paddingRight={"50px"} display={"flex"} justifyContent={"center"} alignItems={"center"}><h1>Best Buy</h1></Box>
                    <Box>
                        <Stack direction = "row" spacing={"20px"} >
                            {/* <h1>Best Buy</h1> */}
                            <Stack direction = "row" spacing={"-5px"}> 
                            <TextField sx = {{width : "500px",height: "55px", bgcolor: "white",borderRadius: "5px"}}  
                            variant="filled" 
                            label = "Enter Product" 
                            value = {inputvalue} 
                            onChange={changeval}
                            />
                            {/* If button is pressed without value inside then dont allow search and print error message */}
                            <Button sx={{bgcolor:"white",color:"black"}} variant = "contained" onClick = {getProducts}>GO</Button >
                            </Stack>
                            <Box paddingRight={"275px"}>
                            <Stack direction = "row" spacing={"-5px"}>
                            <TextField sx = {{width : "250px",height: "55px", bgcolor: "white",borderRadius: "5px"}}  
                            variant="filled" 
                            label = "Enter SKU" 
                            value = {inputvalue} 
                            onChange={changeval}
                            /> 
                            <Button sx={{bgcolor:"white",color:"black"}} variant = "contained" onClick = {getProducts}>GO</Button >
                            </Stack>
                            </Box>
                           
                        </Stack>
                    </Box>
                </Stack>
                
            </Box>

            {/* Body */}
            <Box bgcolor={"white"} width = "100vw" height = "100vh" display = "flex" alignItems={"center"} justifyContent={"center"} mt={"120px"}>

                <Stack color= {"black"} direction = "column" alignItems={"center"} spacing = "20px">
                {/* Figure out the best way to place a picture */}
                {/* <Box paddingTop={"200px"} height = {"300px"} width = {"500px"}  src = {img} component = {"img"} border = "2px"></Box> */}
                <Box width={"75vw"} display={"flex"} alignItems={"center"} justifyContent={"center"} overflow={"auto"}>
                    <h1>{data["name"]}</h1>
                </Box>
                
                
                <Box sx={{border: '1px solid black',borderRadius:"5px"}} borderColor={"black"} width={"75vw"} height = {"600px"} bgcolor={"white"} overflow={"auto"}>
                   <Stack direction={`column`} >
                    {/* Find a good spot to put the upc based on feedback */}
                        {/* <Box>
                            <h1>Last four of Upc: {upc}</h1>
                        </Box> */}
                            {
                            Object.keys(data).map((key,index) => {
                                
                                if((key === "sku" || key === "regularPrice" || key === "department" || key === "mobileUrl")){
                                    return (
                                        <Stack>
                                            <Box overflow={"auto"} bgcolor={"white"} height={"50px"} display = {"flex"} alignItems={"center"}>
                                            <h1>{key}:</h1>
                                            </Box>
                                            <Box overflow={"auto"} bgcolor={blue[50]} height={"150px"} display = {"flex"} alignItems={"center"}>
                                            <h1>{data[key]}</h1>
                                            </Box>
                                        </Stack>
                                        

                                        
                                    )
                                }else if((key === "salePrice" && data["salePrice"] !== data["regularPrice"])){
                                    return(
                                        <Stack>
                                            <Box overflow={"auto"} bgcolor={"white"} height={"50px"} display = {"flex"} alignItems={"center"}>
                                            <h1>{key}:</h1>
                                            </Box>
                                            <Box overflow={"auto"} bgcolor={blue[50]} color={"red"}  height={"150px"} display = {"flex"} alignItems={"center"}>
                                            <h1>{data[key]}</h1>
                                            </Box>
                                        </Stack>
                                    )
                                }else if((key === "upc")){
                                    return(
                                        <Stack>
                                            <Box overflow={"auto"} bgcolor={"white"} height={"50px"} display = {"flex"} alignItems={"center"}>
                                            <h1>{key}:</h1>
                                            </Box>
                                            <Box overflow={"auto"} bgcolor={blue[50]} color={"black"}  height={"150px"} display = {"flex"} alignItems={"center"}>
                                            <h1>{data[key]}</h1>
                                            </Box>
                                        </Stack>
                                    )
                                }
                            })}
                   </Stack>
                    
                </Box>
                    
                        {/* <h1>Find Product Information</h1>
                        <Stack direction = "row" spacing = "10px">
                            <TextField label = "Enter SKU" value = {inputvalue} onChange={changeval}>Hello</TextField>
                            <Button variant = "contained" onClick = {getProducts}>GO</Button >
                        </Stack>
                        
                        <Box >Product: {name}</Box>
                        <Box>Regularprice: ${regularprice}</Box>
                            {
                                saleprice !== "" &&(
                                <Box color={"red"}>Saleprice: ${saleprice}</Box>
                            )}
                        
                        
                        <Box>Upc: {upc}</Box>
                        <Box height = {"300px"} width = {"500px"}  src = {img} component = {"img"} border = "2px">
                        </Box> */}
                        
                    
                    
                </Stack>
                
            </Box>
            
        </>
    )
}
