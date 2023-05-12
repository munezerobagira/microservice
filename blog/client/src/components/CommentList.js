export function CommentList({ comments }) {
  return (
    <>
      <h1>
        {comments.length} comment{comments.length > 1 ? 's' : ''}
      </h1>
      <ul>
        {comments.map((comment) => {
          if (comment.status === 'rejected') {
            comment.content = 'This comment have been rejected';
          } else if (comment.status === 'pending') {
            comment.content = 'This comment is waiting moduration';
          }
          return <li key={comment.id}>{comment.content}</li>;
        })}
      </ul>
    </>
  );
}
