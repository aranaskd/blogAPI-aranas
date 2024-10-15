const Post = require("../models/Post");

module.exports.createPost = (req, res) => {
    const { title, content} = req.body;
    const userId = req.user.id;
    const { email, username } = req.user;
    const isAdmin = req.user.isAdmin;

    if(isAdmin) {
        return res.status(401).send({ message: 'Admin is Unathorized' });
    }

    if(!title || !content) {
        return res.status(409).send({ error: "All fields must be filled." });
    }

    let newPost = new Post({
        userId,
        title,
        content,
        author: {
            name: username,
            email: email
        },
        comment: []
    })

    return newPost.save()
    .then(savedPost => {
        if (savedPost) {
            return res.status(201).send({ message: "Added Successfully"});
        }

        return res.status(404).send({ error: "Post not added" });
    })
    .catch(err => res.status(500).send({ error: "Error in Saving Post" }));

}

module.exports.getPost = (req, res) => {

    const { postId } = req.params;

    return Post.findById(postId)
    .then(post => {
        if (post) {
            return res.status(200).send(post);
        }

        return res.status(404).send({ message: "Post not Found" });
    })
    .catch(err => res.status(500).send({ error: "Error in Fetching Post" }));

} 

module.exports.getAllPost = (req, res) => {

    return Post.find({})
    .then(post => {
        if (post.length !== 0) {
            return res.status(200).send(post);
        }

        return res.status(404).send({ message: "Post not Found" });
    })
    .catch(err => res.status(500).send({ error: "Error in Fetching Post" }));
    
} 

module.exports.updatePost = (req, res) => {

    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const { postId } = req.params;
    const { title, content } = req.body;

    if(isAdmin) {
        return res.status(401).send({ message: 'Admin is Unathorized' });
    }

    let updatePost = {
        title,
        content
    }

    return Post.findByIdAndUpdate({_id: postId, userId}, updatePost, {new:true})
    .then(updatedPost => {
        if (!updatedPost) {
            return res.status(404).send({ message: "Post not found" })
        }

        return res.status(200).json(updatedPost);
    })
    .catch(err => res.status(500).send({ error: "Error in Fetching Post" }))

}

module.exports.deletePost = (req, res) => {
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const { postId } = req.params;


    const deleteCriteria = isAdmin ? { _id: postId } : { _id: postId, userId };

    Post.findOneAndDelete(deleteCriteria)
        .then(deletedPost => {
            if (!deletedPost) {
                return res.status(404).send({ message: "Post not found" });
            }

            return res.status(200).send({ message: "Deleted Successfully" });
        })
        .catch(err => res.status(500).send({ error: "Error in Deleting Post" }));
};


module.exports.addComment = (req, res) => {
    const userId = req.user.id
    const { postId } = req.params;
    const { comment } = req.body;

    return Post.findById(postId)
        .then(post => {
            if (!post) {
                return res.status(404).send({ message: "Post not found" });
            }

            post.comments.push({
                userId,
                comment
            });

            return post.save()
                .then(savedPost => {
                    return res.status(201).send({ message: "Comment Added Successfully" });
                });
        })
        .catch(err => res.status(500).send({ error: "Error adding comment" }));
};

module.exports.viewComment = (req, res) => {

    const { postId } = req.params;

    return Post.findById(postId)
    .then(post => {
        if (!post) {
            return res.status(404).send({ message: "Post not Found" });
        }

        return res.status(200).send({comments: post.comments});
    })
    .catch(err => res.status(500).send({ error: "Error fetching comment" }));
}

module.exports.updateComment = (req, res) => {
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin;
    const { postId, commentId } = req.params;
    const { comment } = req.body;

    if(isAdmin) {
        return res.status(401).send({ message: 'Admin is Unathorized' });
    }

    return Post.findById(postId)
        .then(post => {
            if (!post) {
                return res.status(404).send({ error: "Post not found" });
            }

            const findComment = post.comments.find(
                (commentItem) => commentItem._id.toString() === commentId && commentItem.userId.toString() === userId
            );

            if (!findComment) {
                return res.status(401).send({ message: "Unauthorized User" });
            }

            findComment.comment = comment;

            return post.save()
                .then(savedPost => {
                    return res.status(200).send({ 
                        message: "Comment updated successfully", 
                        savedPost 
                    });
                });
        })
        .catch(err => res.status(500).send({ error: "Error updating comment" }));
};

module.exports.removeComment = (req, res) => {
    const userId = req.user.id;
    const isAdmin = req.user.isAdmin; 
    const { postId, commentId } = req.params;

    Post.findById(postId)
        .then(post => {
            if (!post) {
                return res.status(404).send({ error: "Post not found" });
            }

            // Find the index of the comment. If the user is not an admin, check for ownership
            const commentIndex = post.comments.findIndex(
                (comment) => comment._id.toString() === commentId && (isAdmin || comment.userId.toString() === userId)
            );

            if (commentIndex === -1) {
                return res.status(401).send({ message: "Unauthorized or comment not found" });
            }

            post.comments.splice(commentIndex, 1);

            return post.save()
                .then(() => res.status(200).send({ message: "Comment deleted successfully" }))
                .catch(err => res.status(500).send({ error: "Error saving changes after deleting comment" }));
        })
        .catch(err => res.status(500).send({ error: "Error deleting comment" }));
};

    







