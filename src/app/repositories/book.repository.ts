import { Types } from 'mongoose';
import { Book } from '@interfaces/book';
import { BookModel } from '@models/book.model';

export class BookRepository {
  async addBook({ title, chapters, pages }: Book) {
    const book = new BookModel({
      _id: new Types.ObjectId(),
      title,
      chapters,
      pages
    });
    await book.save();

    return book;
  }

  addBookRange(books: Book[]) {
    return BookModel.insertMany(books);
  }

  async addAuthorToBook(bookId: Types.ObjectId, authorId: Types.ObjectId) {
    await BookModel.updateOne(
      { _id: bookId },
      { $addToSet: { authors: authorId } }
    ).exec();
  }

  async addAuthorsToBook(bookId: Types.ObjectId, authorIds: Types.ObjectId[]) {
    await BookModel.updateOne(
      { _id: bookId },
      { $addToSet: { authors: { $each: authorIds } } }
    ).exec();
  }

  async addAuthorToBooks(bookIds: Types.ObjectId[], authorId: Types.ObjectId) {
    await BookModel.updateMany(
      { _id: { $in: bookIds } },
      { $addToSet: { authors: authorId } }
    ).exec();
  }

  findBookById(bookId: Types.ObjectId) {
    return BookModel.findById(bookId)
      .populate('authors', '-books')
      .exec();
  }

  getBooks() {
    return BookModel.find()
      .populate('authors', '-books')
      .exec();
  }

  async getAveragePagesPerChapter(bookId: Types.ObjectId) {
    const book = await this.findBookById(bookId);
    if (!!book) {
      return {
        bookId,
        value: (book.pages / book.chapters).toFixed(2)
      };
    }

    throw new Error('Could not get average pages per chapter');
  }
}
