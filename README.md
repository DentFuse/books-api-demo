# Node.js Backend Developer Challenge
---

## Endpoints
- ### **/addbook**
    **Method:** POST
    **Body:** JSON Object in the following format
    ```json
    {
        "title": "Harry Potter 1",
        "id": 1,
        "author": "JK Rowling",
        "summary": "Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him."
    }
    ```
    **Response:** JSON Object with `status` and `message`
- ### **/getbook?id=[id]**
    **Method:** GET
    **Response:** JSON Object with `status`, `message` and `data` containing the book
- ### **/getallbooks**
    **Method:** GET
    **Response:** JSON Object with `status`, `message` and `data` all the books
- ### **/updatebook**
    **Method:** POST
    **Body:** JSON Object in the following format
    ```json
    {
        "title": "Harry Potter and the Philosopher's Stone",
        "id": 1,
        "author": "JK Rowling",
        "summary": "Harry Potter, an eleven-year-old orphan, discovers that he is a wizard and is invited to study at Hogwarts. Even as he escapes a dreary life and enters a world of magic, he finds trouble awaiting him."
    }
    ```
    Or just one field
    ```json
    {
        "title": "Harry Potter and the Philosopher's Stone",
        "id": 1,
    }
    ```
    **Response:** JSON Object with `status` and `message`
- ### **/deletebook?id=[id]**
    **Method:** GET
    **Response:** JSON Object with `status` and `message`
---
## Running locally
1. Clone this repo with `git clone`.
2. Install the dependencies using `npm i`/`pnpm i`/`bun i`
3. Set the Environment variable `DBCONNECT` to the connection string for your MongoDB instance
4. Start with `node index.js`

## Deploying on a linux server
1. Clone this repo with `git clone`.
2. Install the dependencies using `npm i`/`pnpm i`/`bun i`
3. Set the Environment variable `DBCONNECT` to the connection string for your MongoDB instance
4. (Optional) Set the `PORT` environment variable to run the server at a specific port.
5. Start with `node index.js`

## Assumptions
- The book's ID is already known by the user
