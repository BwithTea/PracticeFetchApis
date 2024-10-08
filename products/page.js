
    "use client"
    import { Stack,Box, Button, TextField, Typography, Hidden} from "@mui/material"
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
            updateimage(json_data["images"][0].href)
            updatename(json_data["name"])
            updateregprice(json_data["regularPrice"])
            if(json_data["salePrice"] !== json_data["regularPrice"]){
                updatesaleprice(json_data["salePrice"])
            }
            // Fix this to show last for of upc or bold the last four 
            updateupc(json_data["upc"].slice((json_data["upc"].length -4),(json_data["upc"].length)))



            
            
        }
        console.log(data)
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
                    {/* Work on optimizing the code */}
                    <Stack direction={"row"}  spacing={"10px"}>
                        <Box  paddingRight={"50px"} display={"flex"} justifyContent={"center"} alignItems={"center"}><h1>Best Buy</h1></Box>
                        <Box>
                            <Stack direction = "row" spacing={"20px"} >
                                {/* <h1>Best Buy</h1> */}
                                {/* Product field */}
                                <Stack direction = "row" spacing={"-5px"}> 
                                    <TextField sx = {{width : "500px",height: "55px", bgcolor: "white",borderRadius: "5px"}}
                                    disabled 
                                    variant="filled" 
                                    label = "Enter Product" 
                                    // value = {inputvalue} 
                                    onChange={changeval}
                                    />
                                {/* If button is pressed without value inside then dont allow search and print error message */}
                                    <Button sx={{bgcolor:"white",color:"black"}} variant = "contained" onClick = {getProducts}>GO</Button >
                                </Stack>
                                {/* Sku field */}
                                <Box paddingRight={"50px"}>
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
                                <Box display={"flex"} justifyContent={"center"} alignItems={"center"}><h3>Employee</h3></Box>
                            
                            </Stack>
                        </Box>
                    </Stack>
                    
                </Box>





                
                {/* Bottom of page */}
                <Box bgcolor={"white"} width = "100vw" height = "100vh" display = "flex" alignItems={"center"} justifyContent={"center"} mt={"120px"} >
                    <Stack direction = "row">
                        {/* Left Main box */}
                        <Box width={"25vw"} height={"100vh"} bgcolor={"white"}  marginTop={"53px"} >
                            <Stack direction={"column"}>
                                {/* Product Extra Header */}
                                {/* This is a good spot for the picture */}
                                <Box  color={"black"} width={"25vw"} height={"200px"} bgcolor={blue[50]} border={"2px solid black"} borderRadius={"2px"} display={"flex"} justifyContent={"center"} alignItems={"center"} zIndex={998} >
                                    <img src={img} alt="product" style={{ width: "auto ", height: "175px", objectFit: "cover" }} />
                                </Box>
                                {/* Product Extra Data */}
                                
                                <Box color={"black"} bgcolor={"white"} border={"1px solid black"} borderRadius={"2px"} height={"550px"} width={"25vw"} overflow={"auto"} sx={{overflowX:"hidden"}}>
                                        
                                    {/* Key product information categories */}
                                    <Stack direction={"column"}>
                                        {/* Category 1 */}
                                        <Box Box width={"25vw"} height={"150px"} bgcolor={blue[50]} border={"1px solid black"} display={"flex"} justifyContent={"center"}>
                                           <Stack direction={"column"}>
                                                {/* Category Header */}
                                                <Box width={"25vw"} height= {"30px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                    <h2>Customer Ratings</h2>
                                                </Box>
                                                <Box border={"1px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Review Average: {data["customerReviewAverage"]}
                                                </Box>
                                                <Box border={"1px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Review Count: {data["customerReviewCount"]}
                                                </Box>

                                                
                                           </Stack>
                                        </Box>
                                        {/* Category 2 */}
                                        <Box Box width={"25vw"} height={"150px"} bgcolor={blue[50]} border={"1px solid black"}>
                                            <Stack direction={"column"}>
                                                {/* Category Header */}
                                                <Box width={"25vw"} height= {"30px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                    <h2>Product Dimensions</h2>
                                                </Box>
                                                <Box border={"1px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Depth: {data["depth"]}
                                                </Box>
                                                <Box border={".5px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Width: {data["width"]}
                                                </Box>
                                                <Box border={"1px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Height: {data["height"]}
                                                </Box>
                                           </Stack>
                                        </Box>
                                        {/* Category 3 */}
                                        <Box Box width={"25vw"} height={"150px"} bgcolor={blue[50]} border={".5px solid black"}>
                                            <Stack direction={"column"}>
                                                {/* Category Header */}
                                                <Box width={"25vw"} height= {"30px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                    <h2>Warranty Information</h2>
                                                </Box>
                                                <Box border={"1px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Depth: {data["depth"]}
                                                </Box>
                                                <Box border={".5px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Width: {data["width"]}
                                                </Box>
                                                <Box border={"1px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Height: {data["height"]}
                                                </Box>
                                           </Stack>
                                        </Box>
                                        {/* Category 4 */}
                                        <Box Box width={"25vw"} height={"150px"} bgcolor={blue[50]} border={".5px solid black"}>
                                            <Stack direction={"column"}>
                                                {/* Category Header */}
                                                <Box width={"25vw"} height= {"30px"} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                                                    <h2>Product Details</h2>
                                                </Box>
                                                <Box border={"1px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Manufacturer: {data["manufacturer"]}
                                                </Box>
                                                <Box border={".5px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Model Number: {data["modelNumber"]}
                                                </Box>
                                                <Box border={"1px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Availability: {data["orderable"]}
                                                </Box>
                                                <Box border={"1px solid black"} width={"25vw"} display={"flex"} justifyContent={"center"}>
                                                    Purchase Limit: {data["quantityLimit"]}
                                                </Box>
                                           </Stack>
                                        </Box>
                                        

                                    </Stack>
                               
                                </Box>

                                
                            </Stack>
                        </Box>

                        {/* Right Main Box */}
                        <Box width={"75vw"} height={"100vh"} bgcolor={"white"} marginTop={"100px"}>
                            {/* Product Data Header */}
                            <Stack color= {"black"} direction = "column" spacing = "20px">
                                <Box bgcolor={"white"} width={"75vw"} display={"flex"} alignItems={"center"} justifyContent={"center"} overflow={"auto"} marginTop={"25px"}>
                                    <h1>Find Key Product Information</h1>
                                </Box>  
                                {/* Figure out the best way to place a picture */}
                                {/* <Box paddingTop={"200px"} height = {"300px"} width = {"500px"}  src = {img} component = {"img"} border = "2px"></Box> */}
                    
                                {/* Main Data Box */}
                                <Box sx={{border: '1px solid black',borderRadius:"5px"}} borderColor={"black"} width={"75vw"} height = {"500px"} bgcolor={"white"} overflow={"auto"}>
                                    <Stack direction={`column`} >
                                        <Stack direction={"column"} display={"flex"} alignItems={"center"} justifyContent={"center"}>
                                            {/* Product Name */}
                                            <Box overflow={"auto"} bgcolor={"white"} height={"50px"} display = {"flex"} alignItems={"center"} justifyContent={"center"}>
                                                <h3>{data["name"]}</h3>
                                            </Box>
                                            <Stack direction={"row"}>
                                                <Box bgcolor={"white"} width={"37.5vw"} height={"50px"} display = {"flex"} alignItems={"center"} justifyContent={"center"} border={"1px solid black"}>
                                                    <h3>Selling Price: {data["salePrice"] !== data["regularPrice"] ? data["salePrice"] : data["regularPrice"]}</h3>
                                                </Box>
                                                <Box bgcolor={"white"} width={"37.5vw"} height={"50px"} display = {"flex"} alignItems={"center"} justifyContent={"center"} border={"1px solid black"}>
                                                    <h3>Regular Price: {data["regularPrice"]}</h3>
                                                </Box>
                                                
                                            </Stack>
                                            
                                        </Stack>
                                        
                                        {/* Category 1 */}
            
                                        <Box overflow={"auto"} bgcolor={blue[50]} height={"150px"} display = {"flex"} alignItems={"center"} justifyContent={"center"} border={".5px solid black"}>
                                            <h1> SKU: {data["sku"]}</h1>
                                        </Box>

                                        <Box overflow={"auto"} bgcolor={blue[50]} height={"150px"} display = {"flex"} alignItems={"center"} justifyContent={"center"} border={".5px solid black"}>
                                            <h1> UPC: {data["upc"]}</h1>
                                        </Box>

                                        <Box overflow={"auto"} bgcolor={blue[50]} height={"150px"} display = {"flex"} alignItems={"center"} justifyContent={"center"} border={".5px solid black"}>
                                            <h1> RegularPrice: {data["regularPrice"]}</h1>
                                        </Box>
                                        {/* {
                                            Object.keys(data).map((key,index) => {
                                    
                                                if((key === "sku" || key === "regularPrice" || key === "department" || key === "mobileUrl")){
                                                    return (
                                                        <Stack>
                                                            <Box overflow={"auto"} bgcolor={"white"} height={"50px"} display = {"flex"} alignItems={"center"} justifyContent={"center"}>
                                                            <h1>{key}:</h1>
                                                            </Box>
                                                            <Box overflow={"auto"} bgcolor={blue[50]} height={"100px"} display = {"flex"} alignItems={"center"} justifyContent={"center"}>
                                                            <h2>{data[key]}</h2>
                                                            </Box>
                                                        </Stack>
                                            

                                            
                                                    )   
                                                }else if((key === "salePrice" && data["salePrice"] !== data["regularPrice"])){
                                                    return(
                                                        <Stack>
                                                            <Box overflow={"auto"} bgcolor={"white"} height={"50px"} display = {"flex"} alignItems={"center"} justifyContent={"center"}>
                                                            <h1>{key}:</h1>
                                                            </Box>
                                                            <Box overflow={"auto"} bgcolor={blue[50]} color={"red"}  height={"100px"} display = {"flex"} alignItems={"center"} justifyContent={"center"}>
                                                            <h2>{data[key]}</h2>
                                                            </Box>
                                                        </Stack>
                                                    )
                                                }else if((key === "upc")){
                                                    return(
                                                        <Stack display={"flex"} >
                                                            <Box overflow={"auto"} bgcolor={"white"} height={"50px"} display = {"flex"} alignItems={"center"} justifyContent={"center"}>
                                                            <h1>{key}:</h1>
                                                            </Box>
                                                            <Box overflow={"auto"} bgcolor={blue[50]} color={"black"}  height={"100px"} display = {"flex"} alignItems={"center"} justifyContent={"center"}>
                                                            <h2>{data[key]}</h2>
                                                            </Box>
                                                        </Stack>
                                                    )
                                                }
                                            })} */}
                                    </Stack>
                        
                                </Box>
                        
                        
                            
                        
                        
                            </Stack>
                        </Box>
                        
                    </Stack>
                </Box>
                
                
                
                
                
            </>
        )
    }
