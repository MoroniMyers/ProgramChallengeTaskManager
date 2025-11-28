# General

Estimated time to complete: 4-5 Hours (for your own sake, please don't exceed five hours.)

# Getting Started

First, you should fork this repository. After completing the missions, please submit your work to me by emailing me a link to your repository (github or gitlab, either is fine). Please contact me directly if you have trouble getting started on this project. This is a new concept for Parsec. tim@parseceducation.com

### Prerequisites

You need to have the following installed:

- NodeJS ([Download](https://nodejs.org/en/download))
- Docker and Docker Compose ([Guide](https://docs.docker.com/compose/install/))

### Starting the project

In order to limit the number of dependencies in this project, our implementation requires you to run three processes in parallel.

**Turning on the database:**
1. From the root of this project, run the command below. Please note that this will turn on a postgres database on port :5432. If you already have a postgres database running on :5432, turn it off in order to use this docker image. Alternatively, you can use your own Postgres database if you don't mind tables being generated in the `postgres` db within your Postgres instance. Environment variables such as database name can be changed in `./api/.env`
```
docker compose up
```
2. Navigate to the `./api` directory and run `npm run migrate:latest`. This will create a `tasks` table.
3. From the `./api` directory, run `npm run seed:run`. This will create three tasks in your table, and will initialize the records needed for the SQL Challenge in Mission Three.

**Running the API**
1. Navigate to the `./api` directory.
2. Run `npm install`
3. Run `npm run dev`

**Running the Vue app**
1. Navigate to the `./client` directory.
2. Run `npm install`
3. Run `npm run dev`

If you find an error in this documentation, please promptly reach out to me at tim@parseceducation.com


# Your Mission

Your mission, should you choose to accept it, comes in three parts. They are each documented below. Before I dive into the details, you should know a few things:

1. Don't spend more than an hour or two on each mission. We hope that you can accomplish these tasks within a total of about four or five hours.
2. If you think that this is way more work than four or five hours, just accomplish whatever you can and focus on quality of implementation instead of quantity.
3. You are permitted and _encouraged_ to use every tool at your disposable--i.e. google things, AI coding assistants, StackOverflow, whatever you want. Go crazy. The aim of this project is to be a close-to-real-world test of your programming ability.
4. Colors and font sizes are all in `./client/src/assets/base.scss`. Use `--color-accent-one` for blue, and `--color-text` for grey/black.

Specific judgement criteria are specified below. In addition to this, your overall implementatio decisions will be judged out of ten points:

**Decision making - 5 points**
- Are your intentions clear?
- Are concerns clearly separated?

**Work quality - 5 points**
- Are your commits small and clean? (Ironically, my git history is embarassingly unclean. Use `git log` to see how not to write small, clean commits.)
- Will the work you leave behind still be understandable if nobody touches/looks at it for six months?

### Mission One: Add a task input

Complete this mission in:
- `./client/src/components/TaskInput.vue` (see `./client/src/components/Challenge.vue` for details, too)

Design:

![An animated gif displaying the desired input behavior](https://gitlab.com/tim386/programming-challenge/-/raw/main/random/mission-one.gif?ref_type=heads&inline=false)

**Definition of done:**
- [ ] User can type into the input
- [ ] A button with the text "Add" is visible
- [ ] User can click the button to submit the input

Your submission will be judged out of ten points based on the following criteria:

**Design fidelity - 5 points total**
- Does the component look like the design? (e.g. padding, margin -- see /random/mission-one.gif) - 2 points
- Is there good interaction feedback? (e.g. hover, focus, active states) - 3 points

**Code quality - 5 points**
- Are concerns clearly separated? (e.g. clear responsibilities for functions, etc.) - 3 point
- Is the code easy to read and understand? - 2 points


### Mission two: Insert a task into the database.

Complete this mission in:
- `./client/src/composables/useSubmitTask.ts` (see `./client/src/composables/useGetTasks.ts` for inspiration/example of how this approach works)
- `./api/src/index.ts`

After you've completed Mission One which handles the display of the task submission interface, you will need to make the interface functional. That will require you to create an endpoint in the API (`./api/src/index.ts`) and the front-end submission functionality to send data to the endpoint from the front end (`./client/src/composables/useSubmitTask.ts`).

**Definition of done:**
- [ ] The function sends a post request to the server.
- [ ] The state of the request is somehow indicated to the user.
- [ ] Errors are handled properly.
- [ ] The server inserts the task into the database.
- [ ] The newly inserted task is placed into the tasks list in the client.

Your submission will be judged out of 20 points based on the following criteria:

**Front-end Submission Functionality - 10 points**
- **Works as expected - 5 points**
  - Does the function send a post request to the server?
  - Is the state of the request properly tracked (loading, error, etc)?
  - Are errors handled correctly?
  - Is the response from the server correctly placed into the tasks list?
  - Can I submit several tasks in a row without issues?
- **Code quality - 5 points**
  - Is the code clean and easy to read?
  - Are there any obvious bugs?
  - Are there any obvious performance issues?
  - Are there comments where necessary?

**API Endpoint - 10 points**
- **Works as expected - 5 points**
  - Is the task actually inserted into the database?
  - Is the inserted task returned in the response for display in the UI?
  - Are errors handled correctly?
- **Code quality - 5 points**
  - Is the code clean and easy to read?
  - Are there any obvious performance issues?
  - Are there any obvious bugs?
  - Are there comments where necessary?


### Mission three: Analyze student attendance.

Complete this mission in:
- `./api/src/database/scripts/sql_challenge.sql`

Write a postgres SQL query to complete the following analysis:

```
Table: attendance
+-------------------+---------+
| Column Name       | Type    |
+-------------------+---------+
| id                | int     |
| attendance_date   | date    |
| periods_missed    | int     |
+-------------------+---------+

Each row of this table contains the attendance date and id to the 
date with the number of periods missed.


Write a solution to display the records with three or more rows with 
consecutive id's, and the number of periods missed is greater than or equal 
to 500 for each.

Return the result table ordered by attendance date in ascending order.

The result format is in the following example.
Example 1:

Input:
Attendance table:
+------+-----------------+-------------------+
| id   | attendance_date | periods_missed    |
+------+-----------------+-------------------+
| 1    | 2017-01-01      | 456               |
| 2    | 2017-01-02      | 585               |
| 3    | 2017-01-03      | 664               |
| 4    | 2017-01-04      | 215               |
| 5    | 2017-01-05      | 549               |
| 6    | 2017-01-06      | 599               |
| 7    | 2017-01-07      | 641               |
| 8    | 2017-01-09      | 596               |
+------+-----------------+-------------------+

Output:
+------+-----------------+-------------------+
| id   | attendance_date | periods_missed    |
+------+-----------------+-------------------+
| 5    | 2017-01-05      | 549               |
| 6    | 2017-01-06      | 599               |
| 7    | 2017-01-07      | 641               |
| 8    | 2017-01-09      | 596               |
+------+-----------------+-------------------+

Explanation:
The four rows with ids 5, 6, 7, and 8 have consecutive ids and each of them 
has >= 500 periods missed. Note that row 8 was included even though the 
attendance_date was not the next day after row 7.

The rows with ids 2 and 3 are not included because we need at least three consecutive ids.
```

**To test your query, navigate to `/api` and use `npm run sql`**

**To run the challenge, use `npm run sql:challenge`**

**Definition of done:**
- [ ] the query returns the id, attendance_date, and periods_missed
- [ ] the output is identical to desired output

Your submission will be judged out of 10 points based on the following criteria:

**Works as expected - 5 points**
- The output of the query is identical to the desired result

**Code quality - 5 points**
- Is the code clean and easy to read?
- Were the requirements fulfilled and efficient?
