// manage comments
const deleteCommentBtn = document.querySelector('#delete-comment');
const editCommentBtn = document.querySelector('#edit-comment');

const deleteMyComment = async (event) => {
    event.preventDefault();
    // verifies user wants to delete
    const areYouSure = confirm('Are you sure you want to delete this comment?');
    if (areYouSure) {
        const blogId = document.querySelector('.blog-post').id;
        const blogUsername = document.querySelector('.user').id;
        const commentId = document.querySelector('.comment-post').id;
        console.log('blogId', blogId)
        console.log('blogUsername', blogUsername)
        console.log('commentId', commentId)
        const response = await fetch(`/api/${blogUsername}/blogs/${blogId}/comments/${commentId}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json' }
        });
        console.log(response)
        if (response.ok) {
            document.location.replace(`${blogUsername}/blogs/${blogId}`);
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