# Movie API - Documentation

## Resources

- App Base Url

  - https://localhost:3000

- Admin User
  - email: "admin@mail.com"
  - password: "admin123"

## References

## Endpoints

### Users

#### [POST] - "/users/login"

- Sample Request Body

  ```json
  {
    "email": "sample@mail.com",
    "password": "samplePw123"
  }
  ```

#### [POST] - "/users/register"

- Sample Request Body

  ```json
  {
    "email": "sample@mail.com",
    "username": "sample",
    "password": "samplePw123"
  }
  ```

#### [POST] - "/users/details"

- No Request Body

### Posts

#### [POST] - "/posts/createPost"

- Sample Request Body

  ```json
  {
    "title": "test 1",
    "content": "test comment 1"
  }
  ```

#### [GET] - "/post/getAllPost"

- No Request Body

#### [GET] - "/posts/getPost/:id"

- No Request Body

#### [PATCH] - "/posts/updatePost/:id"

- Sample Request Body

  ```json
  {
    "title": "Updated title 1",
    "content": "Updated Content 1"
  }
  ```

#### [DELETE] - "/posts/deletePost/:id"

- No Request Body

#### [PATCH] - "/posts/addComment/:id/comments"

- Sample Request Body

  ```json
  {
    "comment": "Sample 1: The First Comment Sample."
  }
  ```

#### [GET] - "/posts/getComments/:id/comments"

- No Request Body

#### [PATCH] - "/posts/updateComment/:postId"/comments/commentsId

- Sample Request Body

  ```json
  {
    "comment": "Update 1: Updated Comment Sample."
  }
  ```

#### [DELETE] - "/posts/deleteComment/:postId"/comments/commentsId

- No Request Body
