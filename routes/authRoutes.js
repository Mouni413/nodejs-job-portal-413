import express from "express";
import {
  loginController,
  registerController,
} from "../controllers/authController.js";
import { rateLimit } from "express-rate-limit";

//ip limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: "draft-7", // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
  // store: ... , // Redis, Memcached, etc. See below.
});

const router = express.Router();
/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - name
 *         - lastname
 *         - email
 *         - password
 *         - location
 *       properties:
 *         id:
 *           type: string
 *           description: The Auto-generated id of user collection
 *         name:
 *           type: string
 *           description: User name
 *         lastname:
 *           type: string
 *           description: User Last Name
 *         email:
 *           type: string
 *           description: User Email Address
 *         password:
 *           type: string
 *           description: User password should be greater than 6 characters
 *         location:
 *           type: string
 *           description: User location city or country
 *       example:
 *         id: KSHDFIOOSI
 *         name: Jhnon
 *         lastname: Doe
 *         email: jhondoe@gmail.com
 *         password: test@123
 *         location: Mumbai
 */

/**
 * @swagger
 * tags:
 *     name: Auth
 *     description: Authentication APIs
 */

/**
 * @swagger
 * /api/v1/auth/register:
 *    post:
 *      summary: register new user
 *      tags: [Auth]
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      responses:
 *        200:
 *          description: user created successfully
 *          content:
 *            application/json:
 *              schema:
 *                $ref: '#/components/schemas/User'
 *        500:
 *          description: Internal Server Error
 */

router.post("/register", limiter, registerController);

/**
 * @swagger
 * /api/v1/auth/login:
 *  post:
 *    summary: login page
 *    tags: [Auth]
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *          schema:
 *            $ref: '#/components/schemas/User'
 *    responses:
 *      200:
 *        description: Login Successful
 *        content:
 *          applicarion/json:
 *            schema:
 *              $ref: '#/components/schemas/User'
 *      500:
 *        description: Some thing Went Wrong
 */

router.post("/login", limiter, loginController);

export default router;
