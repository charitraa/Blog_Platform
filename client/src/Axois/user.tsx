import axiosInstance from './Axois';

export const Post = async (title: string, content: string, photo: File, userId: string) => {
  try {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    formData.append('photo', photo);
    formData.append('author', userId); // Add the author's ID

    const response = await axiosInstance.post('/post/posts/', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  } catch (error) {
    console.error('Error posting data:', error);
    throw error;
  }
};
