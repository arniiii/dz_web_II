from sqlalchemy import Integer, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column, sessionmaker


class Base(DeclarativeBase):
    pass


class Book(Base):
    __tablename__ = "books"

    id: Mapped[int] = mapped_column(primary_key=True)
    title: Mapped[str] = mapped_column(String, nullable=False)
    author: Mapped[str] = mapped_column(String, nullable=False)
    published_year: Mapped[int] = mapped_column(Integer, nullable=False)


# BEGIN (write your solution here)
def add_books(engine):
    with sessionmaker(bind=engine).begin() as session:
        session.add_all([
            Book(title="To Kill a Mockingbird", author="Harper Lee", published_year=1960),
            Book(title="1984", author="George Orwell", published_year=1949),
        ])
# END

