// manage comments
const deleteCommentBtn = document.querySelector('#delete-comment');
const editCommentBtn = document.querySelector('#edit-comment');

const deleteMyComment = async (event) => {
    event.preventDefault();
    // verifies user wants to delete
    const areYouSure = confirm('Are you sure you want to delete this comment?');
    if (areYouSure) {
        const commentId = document.querySelector('.comment-post').id;
        const username = document.querySelector('.comment-username').id;
        const response = await fetch(`/api/${username}/blogs/${commentId}`, {
            method: 'DELETE',
            headers: { 'content-type': 'application/json'}
        });
        if (response.ok) {
            document.location.replace('/');
        } else {
            alert('Failed to delete blog');
        }
    }
};

const editMyComment = async () => {
    console.log('hello edit')

};

deleteCommentBtn.addEventListener('click', deleteMyComment);
editCommentBtn.addEventListener('click', editMyComment);