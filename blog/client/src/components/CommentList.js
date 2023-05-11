import { useEffect, useState } from 'react';
import axios from 'axios';
import { CommentCreate } from './CommentCreate';

export function CommentList({ postId }) {
  const [comments, setComments] = useState([]);
  const fetchComments = async () => {
    const res = await axios.get(`http://localhost:4001/posts/${postId}/comments`);
    setComments(res.data);
  };
  useEffect(() => {
    fetchComments();
  }, []);
  return (
    <>
      <h1>
        {comments.length} comment{comments.length > 1 ? 's' : ''}
      </h1>
      <ul>
        {comments.map((comment) => (
          <p>{comment.content}</p>
        ))}
      </ul>
      <CommentCreate postId={postId} />
    </>
  );
}
