const router = require('express').Router()
const Post = require('../models/Post')
const Comment = require('../models/Comment')
const User = require('../models/User')
const verify = require('./verify')

// http://localhost:5000/api/post/


// post comments
router.post('/:id/comments', verify, async (req, res) => {
  const newCom = new Comment({
    userId: req.user.id,
    desc: req.body.desc,
    commentToId: req.params.id,
  })
  console.log(newCom)
  try {
    if (!newCom) {
      res.status(422).json({ error: 'Post is Empty' })
    } else {
      const savedCom = await newCom.save()
      const onePost = await Post.findById(req.params.id)
      if (onePost) {
        const comToPostUpdate = await onePost.updateOne({
          $push: { commentId: '' + savedCom._id + '' },
        })
      }
      res.status(200).json(savedCom)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
//post
router.post('/', verify, async (req, res) => {
  const newPost = new Post(req.body)
  try {
    if (!newPost) {
      res.status(422).json({ error: 'Post is Empty' })
    } else {
      const savedPost = await newPost.save()
      res.status(200).json(savedPost)
    }
  } catch (err) {
    res.status(500).json(err)
  }
})
// get post comment
router.get('/:id/comments', verify, async (req, res) => {

    console.log('here')
    const com = await Comment.find({ commentToId: req.params.id })
    res.status(200).json(com)
})
router.get('/:id', verify, async (req, res) => {

    console.log('here')
    const com = await Post.findById(req.params.id);
    res.status(200).json(com)
})
//Get All Post
router.get('/', verify, async (req, res) => {
  console.log('3')
  const role = req.query.role
  const userPosts = req.query.user
  const uniPosts = req.query.uni
  const clubPosts = req.query.club
  const studyPosts = req.query.study
  // try{
  console.log('here')
  let posts
  if (userPosts) {
    console.log('herere')
    posts = await Post.find({ userId: userPosts })
    res.status(200).json(posts)
  } else if (role) {
    posts = await Post.find({
      role: {
        $in: [role],
      },
    })
    res.status(200).json(posts)
  } else if (uniPosts) {
    posts = await Post.find({
      postToId: {
        $in: [uniPosts],
      },
    })
    res.status(200).json(posts)
  } else if (clubPosts) {
    posts = await Post.find({
      postToId: {
        $in: [clubPosts],
      },
    })
    res.status(200).json(posts)
  } else if (studyPosts) {
    posts = await Post.find({
      postToId: {
        $in: [studyPosts],
      },
    })
    res.status(200).json(posts)
  } else {
    console.log('else here')

    posts = await Post.find()

    com = await Comment.find()
    console.log({postandcom:[{post:posts},{com:com}]})
    // res.status(200).json([{ posts: posts }, { comments: com }])
        res.status(200).json(posts)
  }

  console.log('bototm here')
})

router.put('/:id/comments', verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.userId === req.user.id || req.user.isAdmin) {
      if (req.body.desc) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          )
          res.status(200).json(updatedPost)
        } catch (err) {
          res.status(500).json(err)
        }
      } else {
        res.status(403).json('Post descripton is empty!')
      }
    } else {
      res.status(403).json('You can only update your own post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
  // const commentsId = req.query.comments
  // if (commentsId) {
  //   const com = await Comment.find({ _id: commentsId })
  //   console.log('come1 put1')
  //   console.log(com)
  //   if (com.userId === req.user.id || req.user.isAdmin) {
  //     if (req.body.desc) {
  //       try {
  //         const updatedCom = await Comment.findByIdAndUpdate(
  //           commentsId,
  //           {
  //             $set: req.body,
  //           },
  //           { new: true }
  //         )
  //         console.log(updatedCom)
  //         res.status(200).json(updatedCom)
  //       } catch (err) {
  //         res.status(500).json(err)
  //       }
  //     } else {
  //       res.status(403).json('Post descripton is empty!')
  //     }
  //   } else {
  //     res.status(403).json('You can only update your own comment!')
  //   }
  // } else {

  // }
})

router.put('/:id', verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)

    if (post.userId === req.user.id || req.user.isAdmin) {
      if (req.body.desc) {
        try {
          const updatedPost = await Post.findByIdAndUpdate(
            req.params.id,
            {
              $set: req.body,
            },
            { new: true }
          )
          res.status(200).json(updatedPost)
        } catch (err) {
          res.status(500).json(err)
        }
      } else {
        res.status(403).json('Post descripton is empty!')
      }
    } else {
      res.status(403).json('You can only update your own post!')
    }
  } catch (err) {
    res.status(500).json(err)
  }
  // const commentsId = req.query.comments
  // if (commentsId) {
  //   const com = await Comment.find({ _id: commentsId })
  //   console.log('come1 put1')
  //   console.log(com)
  //   if (com.userId === req.user.id || req.user.isAdmin) {
  //     if (req.body.desc) {
  //       try {
  //         const updatedCom = await Comment.findByIdAndUpdate(
  //           commentsId,
  //           {
  //             $set: req.body,
  //           },
  //           { new: true }
  //         )
  //         console.log(updatedCom)
  //         res.status(200).json(updatedCom)
  //       } catch (err) {
  //         res.status(500).json(err)
  //       }
  //     } else {
  //       res.status(403).json('Post descripton is empty!')
  //     }
  //   } else {
  //     res.status(403).json('You can only update your own comment!')
  //   }
  // } else {

  // }
})

// like Post
router.put('/:id/like', verify, async (req, res) => {
  // try {
    const post = await Post.findById(req.params.id)
    if (!post.likes.includes(req.user.id)) {
      await post.updateOne({ $push: { likes: req.user.id } })
      res.status(200).json('The post has been liked')
    } else {
      await post.updateOne({ $pull: { likes: req.user.id } })
      res.status(200).json('The post has been unliked')
    }
  // } catch (err) {
  //   res.status(500).json(err)
  // }
  // const commentsId = req.query.comments
  // if (commentsId) {
  //   console.log(commentsId)
  //   console.log('here like')
  //   try {
  //     const com = await Comment.findById(commentsId)
  //     console.log(com)
  //     if (!com.likes.includes(req.user.id)) {
  //       await com.updateOne({ $push: { likes: req.user.id } })
  //       res.status(200).json('The post has been liked')
  //     } else {
  //       await com.updateOne({ $pull: { likes: req.user.id } })
  //       res.status(200).json('The post has been unliked')
  //     }
  //   } catch (err) {
  //     res.status(500).json(err)
  //   }
  // } else {
  // }
})


router.delete('/:id', verify, async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
    if (post.userId === req.user.id || req.user.isAdmin) {
      post.delete()
      // await User.deleteMany({
      //   userId: post._id
      // });
      res.status(200).json('The post has been deleted!')
    } else {
      res.status(401).json('You can delete only your post!')
    }
  } catch (err) {
    res.status(500).json(err)
}
})

module.exports = router
