import React, { useEffect, useState } from "react";
import axios from "axios"
import styled from "styled-components";
import Card from "../components/Card";

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const Home = ({ type }) => {

  const [Videos, setVideos] = useState([])

  useEffect(() => {
    const fetchVideos = async () => {
      const res = await axios.get(`/video/${type}`);
      setVideos(res.data)
    }
    fetchVideos()
  }, [type])

  return (
    <Container>
      {Videos?.map((video) => (
        <Card key={video._id} video={video} />
      ))}

    </Container>
  );
};

export default Home;
