import { Router } from "express";
import PostController from "../controllers/post-controller";

const routes = Router();

routes.get('/', PostController.getPosts);
routes.post('/', PostController.createPosts);
routes.patch('/:id', PostController.updatePosts);
routes.delete('/:id', PostController.deletePosts);

export default routes;