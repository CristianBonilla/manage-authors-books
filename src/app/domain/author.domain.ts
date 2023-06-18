import { Author } from '@interfaces/author';
import { AuthorRepository } from '@repos/author.repository';
import { BookRepository } from '@repos/book.repository';

export class AuthorDomain {
  constructor(
    private _authorRepository: AuthorRepository,
    private _bookRepository: BookRepository
  ) {}

  async addAuthor(author: Author) {
    const addedAuthor = await this._authorRepository.addAuthor(author);
    const addedBookRange = await this._bookRepository.addBookRange(author.books);
    const bookIds = addedBookRange.map(({ _id }) => _id);
    await this._authorRepository.addBooksToAuthor(addedAuthor._id, bookIds);
    await this._bookRepository.addAuthorToBooks(bookIds, addedAuthor._id);

    return this._authorRepository.findAuthorById(addedAuthor._id);
  }

  getAuthors() {
    return this._authorRepository.getAuthors();
  }
}
