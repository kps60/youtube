import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    currentVideo: null,
    loading: false,
    error: false
}

export const videoSlice = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchfailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        Like: (state, action) => {
            if (!state.currentVideo.Likes.includes(action.payload)) {
                state.currentVideo.Likes.push(action.payload)
                state.currentVideo.Dislikes.splice(state.currentVideo.Dislikes.findIndex(userId => userId === action.payload), 1)
            }
        },
        Dislike: (state, action) => {
            if (!state.currentVideo.Dislikes.includes(action.payload)) {
                state.currentVideo.Dislikes.push(action.payload)
                state.currentVideo.Likes.splice(state.currentVideo.Likes.findIndex(userId => userId === action.payload), 1)
            }
        },
        
    }
})


export const { fetchStart, fetchSuccess, fetchfailure, Like, Dislike } = videoSlice.actions
export default videoSlice.reducer