import { useState } from 'react';
import axios from 'axios';

export function CommentCreate({ postId }) {
  const [content, setContent] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`http://comments.blog.com/posts/${postId}/comments`, { content });
    setContent('');
  };
  return (
    <form>
      <div className="form-group py-2">
        <input type="text" className="form-control" value={content} onChange={(e) => setContent(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleSubmit}>
        Add comment
      </button>
    </form>
  );
}
