import psycopg
from psycopg.rows import namedtuple_row

from models import Course, Lesson


conn = psycopg.connect(
    host="127.0.0.1",
    port=5432,
    user="python_sql_user",
    password="python_sql_password",
    dbname="python_sql_db",
    row_factory=namedtuple_row,
)


def commit(conn):
    conn.commit()


def save_course(conn, course):
    with conn.cursor(row_factory=namedtuple_row) as cur:
        if course.id is None:
            cur.execute(
                "INSERT INTO courses (name, description) VALUES (%s, %s) RETURNING id;",
                (course.name, course.description),
            )
            course.id = cur.fetchone().id
        else:
            cur.execute(
                "UPDATE courses SET name = %s, description = %s WHERE id = %s;",
                (course.name, course.description, course.id),
            )
    return course.id


def find_course(conn, course_id):
    with conn.cursor(row_factory=namedtuple_row) as cur:
        cur.execute("SELECT * FROM courses WHERE id = %s;", (course_id,))
        result = cur.fetchone()
        if result:
            return Course(
                id=result.id,
                name=result.name,
                description=result.description,
            )
    return None


def get_all_courses(conn):
    courses = []
    with conn.cursor(row_factory=namedtuple_row) as cur:
        cur.execute("SELECT * FROM courses;")
        for row in cur.fetchall():
            courses.append(
                Course(id=row.id, name=row.name, description=row.description)
            )
    return courses


# BEGIN (write your solution here)
def save_lesson(conn, lesson):
    with conn.cursor(row_factory=namedtuple_row) as cur:
        if lesson.id is None:
            cur.execute(
                "INSERT INTO lessons (name, text, course_id) VALUES (%s, %s, %s) RETURNING id",
                (lesson.name, lesson.text, lesson.course_id),
            )
            lesson.id = cur.fetchone().id
        else:
            cur.execute(
                "UPDATE lessons SET name = %s, text = %s, course_id = %s WHERE id = %s",
                (lesson.name, lesson.text, lesson.course_id, lesson.id),
            )
    return lesson.id


def find_lesson(conn, lesson_id):
    with conn.cursor(row_factory=namedtuple_row) as cur:
        cur.execute("SELECT id, name, text, course_id FROM lessons WHERE id = %s", (lesson_id,))
        row = cur.fetchone()
        return Lesson(id=row.id, name=row.name, text=row.text, course_id=row.course_id) if row else None


def get_course_lessons(conn, course_id):
    with conn.cursor(row_factory=namedtuple_row) as cur:
        cur.execute("SELECT id, name, text, course_id FROM lessons WHERE course_id = %s ORDER BY id", (course_id,))
        return [Lesson(id=row.id, name=row.name, text=row.text, course_id=row.course_id) for row in cur.fetchall()]
# END
