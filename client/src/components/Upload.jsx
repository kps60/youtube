import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useNavigate } from 'react-router-dom'
import app from "../firebase"
import axios from 'axios';
const Container = styled.div`
    width:100%;
    height:100%;
    position:absolute;
    top:0;
    left:0;
    background-color:#000000a7;
    display:flex;
    align-items: center;
    justify-content:center;
`
const Wrapper = styled.div`
    color:${({ theme }) => theme.text};
    background-color:${({ theme }) => theme.bgLighter};
    width: 600px;
    padding: 20px;
    height: 600px;
    display: flex;
    flex-direction: column;
    gap: 20px;
    position: relative;
    z-index: 5;
`
const Close = styled.div`
    position: absolute;
    top: 10px;
    right: 10px;
    cursor: pointer;
`
const Title = styled.h1`
    text-align: center;
`

const Input = styled.input`
    color:${({ theme }) => theme.text};
    border:1px solid ${({ theme }) => theme.soft};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`
const Desc = styled.textarea`
    color:${({ theme }) => theme.text};
    border:3px solid ${({ theme }) => theme.soft};
    border-radius: 3px;
    padding: 10px;
    background-color: transparent;
`
const Button = styled.button`
  border-radius: 3px;
  border: none;
  padding: 10px 20px;
  font-weight: 500;
  cursor: pointer;
  background-color: ${({ theme }) => theme.soft};
  color: ${({ theme }) => theme.textSoft};
`;
const Label = styled.label`
  font-size:14px;
`;
const Upload = ({ setOpen }) => {
    const [imgPerc, setImgPerc] = useState(0)
    const [img, setImg] = useState(undefined)
    const [videoPerc, setVideoPerc] = useState(0)
    const [video, setVideo] = useState(undefined)
    const [inputs, setInputs] = useState({})
    const [tags, setTags] = useState([])
    const navigate = useNavigate()
    const handleChange = (e) => {
        setInputs((prev) => { return { ...prev, [e.target.name]: e.target.value } })
    }
    const uploadFile = (file, urlType) => {
        const storage = getStorage(app);
        const fileName = new Date().getTime() + file.name
        const storageRef = ref(storage, fileName);

        const uploadTask = uploadBytesResumable(storageRef, file);

        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on('state_changed',
            (snapshot) => {
                // Observe state change events such as progress, pause, and resume
                // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                urlType === "imgUrl" ? setImgPerc(Math.round(progress)) : setVideoPerc(Math.round(progress));
                switch (snapshot.state) {
                    case 'paused':
                        console.log('Upload is paused');
                        break;
                    case 'running':
                        console.log('Upload is running');
                        break;
                    default:
                        break;
                }
            },
            (error) => {
                // Handle unsuccessful uploads
            },
            () => {
                // Handle successful uploads on complete
                // For instance, get the download URL: https://firebasestorage.googleapis.com/...
                getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                    setInputs((prev) => { return { ...prev, [urlType]: downloadURL }; })
                });
            })
    }

    useEffect(() => {
        video && uploadFile(video, "videoUrl")
    }, [video])
    useEffect(() => {
        img && uploadFile(img, "imgUrl")
    }, [img])

    const handleUpload = async (e) => {
        e.preventDefault();
        const res = await axios.post("/video", { ...inputs, tags })
        setOpen(false)
        res.status === 200 && navigate(`/video/${res.data._id}`)
    }
    return (
        <Container>
            <Wrapper>
                <Close onClick={() => setOpen(false)}>X</Close>
                <Title>Upload a New Video</Title>
                <Label>Video:</Label>
                {videoPerc > 0 ?
                    ("uploading" + videoPerc + "%") :
                    <Input type='file' accept='video/*' onChange={e => setVideo(e.target.files[0])} />
                }
                <Input type='text' placeholder='Title' name='title' onChange={handleChange} />
                <Desc placeholder='Discription' rows={8} name='desc' onChange={handleChange} />
                <Input type='text' placeholder='Sapparate the tags with Commas' name='tags' onChange={e => setTags(e.target.value.split(","))} />
                <Label>Image:</Label>
                {imgPerc > 0 ?
                    ("uploading" + imgPerc + "%") :
                    <Input type='file' accept='image/*' onChange={e => setImg(e.target.files[0])} />
                }
                <Button onClick={handleUpload}>Upload</Button>
            </Wrapper>

        </Container>
    )
}

export default Upload
