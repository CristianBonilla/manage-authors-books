import { Types } from 'mongoose';
import { Book } from '@interfaces/book';
import { AuthorRepository } from '@repos/author.repository';
import { BookRepository } from '@repos/book.repository';
import { ObjectIdIsValid } from '@utils/object-id.util';

export class BookDomain {
  constructor(
    private _bookRepository: BookRepository,
    private _authorRepository: AuthorRepository
  ) {}

  async addBook(book: Book) {
    const addedBook = await this._bookRepository.addBook(book);
    for (const author of book.authors) {
      const addedAuthor = await this._authorRepository.addAuthor(author);
      await this._authorRepository.addBookToAuthor(addedAuthor._id, addedBook._id);
      await this._bookRepository.addAuthorToBook(addedBook._id, addedAuthor._id);
    }

    return this._bookRepository.findBookById(addedBook._id);
  }

  getBooks() {
    return this._bookRepository.getBooks();
  }

  async getAveragePagesPerChapter(bookId: string) {
    if (!ObjectIdIsValid(bookId)) {
      throw `ObjectId "${bookId}" is invalid`;
    }

    return await this._bookRepository.getAveragePagesPerChapter(
      new Types.ObjectId(bookId)
    );
  }
}
