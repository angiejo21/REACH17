<!-- PROJECT LOGO -->

<a name="readme-top"></a>

<br />
<div align="center">
  <a href="https://reach17-ri2v.onrender.com/api/v1/courses" target='blank'>
    <img src="./public/img/logo_full_lightBack.svg" alt="Logo" width="100" height="100">
  </a>
<h3 align="center">REACH17 | NodeJS JSON RESTful API</h3>
  <p align="center">
    Reach17 is an educational platform offering courses from different institutions
  </p>

[![MIT License][license-shield]][license-url]
[![LinkedIn][linkedin-shield]][linkedin-url]

</div>

<details>
  <summary>Index</summary>
  <ol>
    <li>
      <a href="#about-the-project">About The Project</a>
      <ul>
        <li><a href="#the-assignment">The assignment</a></li>
        <li><a href="#requirements">Requirements</a></li>
      </ul>
    </li>
    <li>
      <a href="#development">Development</a>
      <ul>
        <li><a href="#built-with">Built With</a></li>
        <li>
          <a href="#apis-reference">APIs Reference</a>
          <ul>
            <li><a href="#course-api">Course</a></li>
            <li><a href="#school-api">School</a></li>
            <li><a href="#subject-api">Subject</a></li>
          </ul>
        </li>
      </ul>
    </li>
    <li><a href="#license">License</a></li>
    <li><a href="#contact">Contact</a></li>
  </ol>
</details>

<!-- ABOUT THE PROJECT -->

## About The Project

_REACH17 | NodeJS JSON RESTful API_ is the final project for [start2impact](https://www.start2impact.it/)'s module "NodeJS" in the Full-stack developer course.

### The assignment:

Reach17 is an educational platform that was inspired by the **UN** _Sustainable Development Goals for 2030_, and it needs to create a catalog of the courses it will offer.

### Requirements:

- The API should follow the REST architecture (naming, methods, and status codes)
- The API should allow the creation, update, and deletion of a subject with the following characteristics: name.
- The API should allow the creation, update, and deletion of a course with the following characteristics: name and subject.
- The API should allow the creation, update, and deletion of a school with the following characteristics: name.
- The API should allow to associate a course with a school. Note: A course can be associated with more schools.
- The API should allow to visualize all courses and their school, and filter by name and subject.
- MySQL or MongoDB can be used to store the database. Remember to protect against SQL Injection and NoSQL Injection.

<p align="right">(<a href="#readme-top">back to top</a>)</p>

## Development

### Built With

- NodeJS
- Express
- MongoDB

> Live on [Render](https://reach17-ri2v.onrender.com/api/v1/courses)

### Installation

`Git bash` and `Node.js` are required for correct installation.

- Clone the repository:

```bash
   git clone https://github.com/angiejo21/REACH17.git

   cd REACH17
```

- install dependencies:

```bash
npm install
```

- Start:

```bash
npm run dev
```

### Environmental Variables

To run this project, the following environmental variables will need to be set in your .env file.

`NODE_ENV`, `PORT`, `DATABASE_URL`, `DATABASE_PASSWORD`

## APIs Reference

All APIs support filtering, sorting and pagination in all GET All routes as well as an additional one:

```http
GET/route/search?parameter=value&parameter=value
```

| Parameter   | Example                | Description                                                                                                               |
| :---------- | :--------------------- | :------------------------------------------------------------------------------------------------------------------------ |
| `parameter` | `name=math`            | Filters the documents to match the parameter.                                                                             |
| `page`      | `page=2`               | Skips results based on the limit parameter. Default is 1.                                                                 |
| `limit`     | `limit=10`             | Limits results per response. Default is 50.                                                                               |
| `sort`      | `sort=name,-createdAt` | Sorts results by multiple fields separated by comma, "-" inverts the order. Default is `-createdAt`                       |
| `fields`    | `fields=name`          | Allows to receive or remove specific fields of the document, separated by comma. Default removes the MongoDB `__v` field. |

#### In the query filter, reference to `courses`, `schools` or `subjects` is always made by ID

### Course API

#### Document Structure

| Parameter          | Type         | Description                                              |
| :----------------- | :----------- | :------------------------------------------------------- |
| `name`             | `string`     | **Required**. Course name (max 100 char).                |
| `shortDescription` | `string`     | **Required**. Course's short description (max 250 char). |
| `longDescription`  | `string`     | **Required**. Course's summary.                          |
| `subject`          | `[ObjectId]` | **Required**. Course's subjects array.                   |
| `school`           | `[ObjectId]` | **Required**. Course's schools array.                    |
| `teachers`         | `[string]`   | Course's teachers array.                                 |

#### Get All courses

```http
GET/api/v1/courses
```

#### Get one course

```http
GET/api/v1/courses/:id
```

#### Create one course

```http
POST/api/v1/courses/
```

#### Update one course

```http
PATCH/api/v1/courses/:id
```

#### Delete one course

```http
DELETE/api/v1/courses/:id
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### School API

#### Document Structure

| Parameter          | Type         | Description                                              |
| :----------------- | :----------- | :------------------------------------------------------- |
| `name`             | `string`     | **Required**. School name.                               |
| `shortDescription` | `string`     | **Required**. School's short description (max 250 char). |
| `longDescription`  | `string`     | School's description.                                    |
| `courses`          | `[ObjectId]` | School's courses array.                                  |
| `slug`             | `string`     | Automatically created                                    |

#### Get All schools

```http
GET/api/v1/schools
```

#### Get one school

```http
GET/api/v1/schools/:slug
```

#### Get all school's subjects

```http
GET/api/v1/schools/:slug/subjects
```

#### Create one school

```http
POST/api/v1/schools/
```

#### Update one school

```http
PATCH/api/v1/schools/:slug
```

#### Delete one school

```http
DELETE/api/v1/schools/:slug
```

<p align="right">(<a href="#readme-top">back to top</a>)</p>

### Subject API

#### Document Structure

| Parameter | Type         | Description                               |
| :-------- | :----------- | :---------------------------------------- |
| `name`    | `string`     | **Required**. Subject name (max 50 char). |
| `courses` | `[ObjectId]` | **Required**. Subject courses array.      |
| `slug`    | `string`     | Automatically created                     |

#### Get All subjects

```http
GET/api/v1/subjects
```

#### Get one subject

```http
GET/api/v1/subjects/:slug
```

#### Create one subject

```http
POST/api/v1/subjects/
```

#### Update one subject

```http
PATCH/api/v1/subjects/:slug
```

#### Delete one subject

```http
DELETE/api/v1/subjects/:slug
```

<!-- LICENSE -->

## License

Distributed under the MIT License. See `LICENSE.txt` for more information.

<!-- CONTACT -->

## Contact

Angela Bellò - [Portfolio](https://bello.codes)

Project Link: [https://github.com/angiejo21/REACH17](https://github.com/angiejo21/REACH17)

<p align="right">(<a href="#readme-top">back to top</a>)</p>

<!-- MARKDOWN LINKS & IMAGES -->
<!-- https://www.markdownguide.org/basic-syntax/#reference-style-links -->

[license-shield]: https://img.shields.io/github/license/angiejo21/REACH17.svg?style=for-the-badge
[license-url]: https://github.com/angiejo21/REACH17/blob/master/LICENSE
[linkedin-shield]: https://img.shields.io/badge/-LinkedIn-black.svg?style=for-the-badge&logo=linkedin&colorB=555
[linkedin-url]: https://www.linkedin.com/in/angelabello/
