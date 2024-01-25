import React, { useEffect, useState } from 'react'
import axios from 'axios';
import Card from './Card';
import styled from 'styled-components';


const Container = styled.div`
  flex: 2;
`;
const Recommendation = ({ tags }) => {

  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const videores = await axios.get(`/video/tags?tags=${tags}`)
        setVideos(videores.data)
        console.log(videores.data);
      } catch (error) {

      }
    }
    fetchData()
  }, [tags])
  return (
    <Container>
      {videos?.map(video=>(
        <Card type={"sm"} key={video?._id} video={video}/>
      ))}
    </Container>
  )
}

export default Recommendation
