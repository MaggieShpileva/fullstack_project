import Post from "./post.js";

class PostController {
  async create(req, res) {
    try {
      const { author, title, content } = req.body;
      const newPost = await Post.create({ author, title, content });
      res.json(newPost);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getAll(req, res) {
    try {
      const posts = await Post.find();
      return res.json(posts);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async getOne(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json("Неправильный id");
      }
      const post = await Post.findById(id);
      return res.json(post);
    } catch (error) {
      if (error.path === "_id") {
        res.status(500).json("id не найден");
      }
      res.status(500).json(error.message);
    }
  }

  async updatePost(req, res) {
    try {
      const newPost = req.body;
      if (!newPost._id) {
        return res.status(400).json("Неправильный id");
      }

      const updatePost = await Post.findByIdAndUpdate(newPost._id, newPost, { new: true });
      return res.json(updatePost);
    } catch (error) {
      res.status(500).json(error.message);
    }
  }

  async delete(req, res) {
    try {
      const { id } = req.params;
      if (!id) {
        return res.status(400).json("Неправильный id");
      }
      const post = await Post.findByIdAndDelete(id);
      return res.json("Пост удален");
    } catch (error) {
      if (error.path === "_id") {
        res.status(500).json("id не найден");
      }
      res.status(500).json(error.message);
    }
  }
}

export default new PostController();
