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
    for (const book of author.books) {
      const addedBook = await this._bookRepository.addBook(book);
      await this._authorRepository.addBookToAuthor(addedAuthor._id, addedBook._id);
      await this._bookRepository.addAuthorToBook(addedBook._id, addedAuthor._id);
    }

    return this._authorRepository.findAuthorById(addedAuthor._id);
  }

  getAuthors() {
    return this._authorRepository.getAuthors();
  }
}
