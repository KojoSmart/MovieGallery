
import './App.css';
import React, {useState, useEffect} from "react"
import {Input, Typography, List, Card, Image, Space } from 'antd';
import { isVisible } from '@testing-library/user-event/dist/utils';
import Item from 'antd/es/list/Item';

function App() {
  const[searchText, setSearchText]= useState("")
  const[datsource, setDataSource]= useState([])
  const[loading, setLoading]= useState(false)
  const[previewImages, setPreviewImages]= useState([])
  useEffect(()=>{
    
    fetch(`https://dummyjson.com/products/search?q=${searchText}`)
.then(res => res.json())
    
.then(response=>{
  setDataSource(response.products)
});
                

  }, [searchText])
  return (
    <Space style={{padding: "0px 16px"}} direction="vertical">
     <Typography.Title style={{textAlign: "center", fontFamily: "monospace"}}>Joseph Gallery</Typography.Title>
     <Input.Search style={{maxWidth:500, display: "flex", margin: "auto"}}
      onSearch={(value)=>{
      setSearchText(value)
      }}
     ></Input.Search>
     <Typography.Text >Showing results for:{searchText|| "All"}</Typography.Text>
     <List
     
     dataSource={datsource} 
     grid={{xs:1, sm:2, md:3, lg:4, xl:5, xxl:6}}
     renderItem={(item=>{
       return <Card hoverable key={item.id} style={{height: 500, margin: 12, overflow: "hidden"}} >
        <Image src={item.thumbnail} preview={{visible:false}} onClick={()=>{
          setPreviewImages(item.images)
        }}></Image>
       </Card>
     })}>

     </List>
     {
      previewImages.length>0?(
      <Image.PreviewGroup preview={{visible: previewImages.length, onVisibleChange:(value)=>{
        if(!value){
          setPreviewImages([])
        }
      }}}>
      {previewImages.map((image)=>{
        return <Image src={image}/>

      })}

      </Image.PreviewGroup>):null
     }
    </Space>
  );
}

export default App;
