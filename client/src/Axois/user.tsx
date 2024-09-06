import axiosInstance from './Axois';

const user = localStorage.getItem('user');
const parsedUser = user ? JSON.parse(user) : null;

export const Post = async (title: string, content: string, photo: File) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('photo', photo);
    formData.append('author', parsedUser?.id); // Add the author's ID

    const response = await axiosInstance.post('/post/posts/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    
    return response.data;
  } catch (error: any) {
    throw error;
  }
};


