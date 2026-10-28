import datetime

from sqlalchemy import CheckConstraint, Date, Float, String
from sqlalchemy.orm import DeclarativeBase, Mapped, mapped_column


# BEGIN (write your solution here)
class Base(DeclarativeBase):
    pass


class Book(Base):
    __tablename__ = "books"
    __table_args__ = (CheckConstraint("rating >= 0 AND rating <= 10", name="book_rating_range"),)

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    title: Mapped[str] = mapped_column(String(256), unique=True)
    author: Mapped[str] = mapped_column(String(128))
    published_date: Mapped[datetime.date] = mapped_column(Date)
    pages: Mapped[int]
    genre: Mapped[str] = mapped_column(String(64))
    rating: Mapped[float] = mapped_column(Float)
# END
