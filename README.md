# Task API — CRUD To-Do API (BE-01)

A small in-memory REST API for managing tasks, built for FlyRank's Backend AI
Engineering track (BE-01 — Build your first CRUD API). Built with Node.js
and Express, documented with Swagger UI.

## Run it

```bash
npm install
node index.js
```

Server starts at `http://localhost:3000`. Swagger UI (interactive docs) is
at `http://localhost:3000/docs`.

## Endpoints

| Method | Path | Description |
|---|---|---|
| GET | `/` | API info |
| GET | `/health` | Health check |
| GET | `/tasks` | List all tasks (supports `?done=true` and `?search=term`) |
| GET | `/tasks/:id` | Get a single task by id |
| POST | `/tasks` | Create a task — body: `{ "title": "..." }` |
| PUT | `/tasks/:id` | Update a task's `title` and/or `done` |
| DELETE | `/tasks/:id` | Delete a task |
| GET | `/stats` | `{ total, done, open }` counts |
| POST | `/reset` | Reset tasks back to the 3 seed items |

## Example

```
$ curl -i -X POST http://localhost:3000/tasks -H "Content-Type: application/json" -d '{"title":"Buy milk"}'

HTTP/1.1 201 Created
Content-Type: application/json; charset=utf-8

{"id":4,"title":"Buy milk","done":false}
```

## Notes

- Data is **in-memory only** — restarting the server resets it to the 3 seed
  tasks. This is intentional for this stage of the program; persistence
  (a real database) comes in the following week.
- Every write endpoint (`POST`, `PUT`) validates input and returns `400`
  with a JSON error message on bad input, never a silent failure.
- Unknown ids return `404` with a JSON error, never an empty `200`.

## The mortality experiment

Creating a task, restarting the server, and calling `GET /tasks` again shows
only the original 3 seed tasks — the new one is gone. This happens because
the task list lives in a plain JavaScript variable in memory, and nothing
about that variable is written to disk. When the Node process exits, that
memory is freed and everything in it disappears. It's the reason real
applications use a database (or at least a file) for anything that needs to
survive a restart — which is exactly what next week's assignment adds.
