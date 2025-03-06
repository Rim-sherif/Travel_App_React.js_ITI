import { createSlice } from "@reduxjs/toolkit";

const token = "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3YzhjZjhlMzU2NWZhZWNjYmNiZWFiNiIsImlzTG9nZ2VkSW4iOnRydWUsImlhdCI6MTc0MTIxNzUyMSwiZXhwIjoxNzUxNTg1NTIxfQ.lh7sfHPjXVQDbmH-e09f3_4ZbLGVXqVv7npoFvVvk20"

const tokenSlice = createSlice({
    name: "token",
    initialState: token,
});

export default tokenSlice.reducer