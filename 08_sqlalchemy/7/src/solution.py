from models import Director


# BEGIN (write your solution here)
def delete_director(session, director_id):
    director = session.get(Director, director_id)
    if director is None:
        return False
    session.delete(director)
    session.commit()
    return True
# END

