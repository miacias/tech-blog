// manage comments
const deleteCommentBtn = document.querySelector('#delete-comment');
const editCommentBtn = document.querySelector('#edit-comment');

const deleteMyComment = async (event) => {
    event.preventDefault();
    // verifies user wants to delete
    const areYouSure = confirm('Are you sure you want to delete this comment?');
    if (areYouSure) {
        const blogId = document.querySelector('.blog-post').id; 
        const bloggerUsername = document.querySelector('.user').id;
        const commenterId = document.querySelector('.comment-post').id;
        const commentId = document.querySelector('.comment-date').id;
        console.log('commentId', commentId) // getting ID of commenter instead of comment by mistake
        const response = await fetch(`/api/${bloggerUsername}/blogs/${blogId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        });
        console.log(response)
        if (response.ok) {
            document.location.reload();
        } else {
            alert('Failed to delete comment');
        }
    }
};

const editMyComment = async () => {
    console.log('hello edit')

};

deleteCommentBtn.addEventListener('click', deleteMyComment);
editCommentBtn.addEventListener('click', editMyComment);