import { useState } from 'react';
import axios from 'axios';

export function PostCreate() {
  const [title, setTitle] = useState('');
  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post('http://posts.blog.local/posts', {
      title,
    });
    setTitle('');
  };
  return (
    <div>
      <form className="container mx-auto">
        <div className="form-group p-2">
          <label>Title</label>
          <input type="text" className="form-control" value={title} onChange={(e) => setTitle(e.target.value)} />
        </div>
        <div className="form-group p-2">
          <button className="btn btn-primary form-control" onClick={handleSubmit}>
            Create a post
          </button>
        </div>
      </form>
    </div>
  );
}
