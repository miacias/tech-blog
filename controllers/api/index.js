const router = require('express').Router();
const userRoutes = require('./user-connection.js');
const { User, Blog, Comment } = require('../../models');
const withAuth = require('../../utils/auth.js');

// handles sign up, sign out, log in
router.use('/users', userRoutes);

// creates a new blog
router.post('/blogs', async (req, res) => {
    try {
        const newBlog = await Blog.create({
            title: req.body.blogTitle,
            text_content: req.body.blogText,
            user_id: req.session.user_id
        });
        if (newBlog.title && newBlog.text_content && newBlog.user_id) {
            res.status(201).json(newBlog);
        };
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// adds a comment to a specific blog
router.post('/:username/blogs/:id/comments', withAuth, async (req, res) => {
    try {
        const newComment = await Comment.create({
            text_content: req.body.commentText, // comment text
            user_id: req.session.user_id, // commenter ID
            blog_id: req.params.id, // blog ID
        });
        if (newComment.text_content && newComment.user_id && newComment.blog_id) {
            res.status(201).json(newComment);
        } else {
            res.status(400).json({message: 'unable to add comment'});
        }
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// edit a comment by ID
router.put('/:username/blogs/:id/comments/:comment_id', withAuth, async (req, res) => {
    try {
        const updatedComment = await Comment.update({
            text_content: req.body.commentEdits.text_content, // comment text
            user_id: req.session.user_id, // commenter ID
            blog_id: req.params.id, // blog ID 
        },
        {
            where: {
                id: req.body.commentEdits.id, // comment ID
            }
        });
        if (!updatedComment) {
            return res.status(404).json({ message: 'Comment not found!' })
        }
        return res.status(200).json(updatedComment);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// deletes a blog
router.delete('/:username/blogs/:id', withAuth, async (req, res) => {
    try {
        const blogData = await Blog.destroy({
            where: {
                id: req.params.id, // blog ID
                user_id: req.session.user_id // username
            }
        });
        if (!blogData) {
            res.status(404).json({ message: 'Blog not found!' })
            return;
        }
        res.status(200).json(blogData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

// deletes a comment
router.delete('/:username/blogs/:id/comments/:comment_id', withAuth, async (req, res) => {
    try {
        const commentData = await Comment.destroy({
            where: {
                blog_id: req.params.id, // blog ID
                user_id: req.session.user_id // commenter ID
            }
        });
        if (!commentData) {
            res.status(400).json({ message: 'No comment found with this ID!' });
            return;
        }
        res.status(200).json(commentData);
    } catch (err) {
        console.error(err);
        res.status(500).json(err);
    }
});

module.exports = router;