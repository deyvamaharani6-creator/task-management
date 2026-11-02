import { Request, Response } from "express";
import { Post } from "../types/post";

const datapost = [
  { id: 1, title: "Postingan 1", content: "content 1" },
  { id: 7, title: "Postingan 2", content: "Content 2" },
  { id: 3, title: "Postingan 3", content: "Content 3" },
];

export class PostController {
  // READ POSTS
  getPosts = async (req: Request, res: Response) => {
    res.status(200).json({
      status: true,
      message: "Get Data Posts Success",
      data: {
        posts: datapost,
      },
    });
  };

  // CREATE POSTS
  createPosts = async (req: Request, res: Response) => {
    console.log("Request Body:", req.body);

    const { title, content } = req.body || {};

    if (!title || !content) {
      return res.status(400).json({
        success: false,
        message: "Create Data Posts Failed",
      });
    }

    const newId =
      datapost.length > 0
        ? Math.max(...datapost.map((post) => post.id)) + 1
        : 1;

    const newPost: Post = {
      id: newId,
      title: title,
      content: content,
    };

    datapost.push(newPost);

    return res.status(201).json({
      status: true,
      message: "Create Post Success",
      data: {
        post: newPost,
      },
    });
  };

  // UPDATE POSTS
  updatePosts = async (req: Request, res: Response) => {
    const id = Number(req.params.id);
    const { title, content } = req.body || {};

    const post = datapost.find((post) => post.id === id);

    if (!Number.isInteger(id) || !post) {
      return res.status(404).json({
        status: false,
        message: "Post tidak ditemukan",
      });
    }

    if (!title || !content) {
      return res.status(400).json({
        status: false,
        message: "Title dan content wajib diisi",
      });
    }

    post.title = title;
    post.content = content;

    return res.status(200).json({
      status: true,
      message: "Update Post Success",
      data: {
        post: post,
      },
    });
  };

  // DELETE POSTS
  deletePosts = async (req: Request, res: Response) => {
    const id = Number(req.params.id);

    const index = datapost.findIndex((post) => post.id === id);

    if (!Number.isInteger(id) || index === -1) {
      return res.status(404).json({
        status: false,
        message: "Post tidak ditemukan",
      });
    }

    const deletedPost = datapost.splice(index, 1)[0];

    return res.status(200).json({
      status: true,
      message: "Delete Post Success",
      data: {
        post: deletedPost,
      },
    });
  };
}

export default new PostController();
