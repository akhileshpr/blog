import { commonAPI } from "./common";
import SERVER_URL from "./server";

export const registerAPI=async(user,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/register`,user,reqHeader)
}

export const loginApi=async(user)=>{
    return await commonAPI("POST",`${SERVER_URL}/login`,user,"")
}

// post blogs
export const postBlogApi=async(reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-blog`,reqBody,reqHeader)
}

export const getBlogsApi = async (page, limit, reqHeader) => {
    return await commonAPI("GET", `${SERVER_URL}/all-blog?page=${page}&limit=${limit}`, "", reqHeader);
};

export const getUserBlogApi=async(userId, page, limit, reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/user-blog/${userId}?page=${page}&limit=${limit}`, "", reqHeader);
}
export const getSinglePostApi=async( postId,reqHeader)=>{
    return await commonAPI("GET", `${SERVER_URL}/single-post/${postId}`, "", reqHeader);
}

export const updateBlogApi=async(id,data,reqHeader)=>{
    return await commonAPI("PUT",`${SERVER_URL}/update-blog/${id}`,data,reqHeader);
}
export const deleteBlogApi=async(id)=>{
    return await commonAPI("DELETE",`${SERVER_URL}/delete-blog/${id}`,{},"");
}
export const updateLikeApi=async(id,data,reqHeader)=>{
    return await commonAPI("PATCH",`${SERVER_URL}/update-like/${id}`,data,reqHeader);
}

//comments
export const postCommentApi=async(postId,id,reqBody,reqHeader)=>{
    return await commonAPI("POST",`${SERVER_URL}/add-comment/${postId}/${id}`,reqBody,reqHeader)
}
export const getCommentApi=async(postId,reqHeader)=>{
    return await commonAPI("GET",`${SERVER_URL}/get-comment/${postId}`,"",reqHeader)
}