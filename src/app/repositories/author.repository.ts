import { Types } from 'mongoose';
import { Author } from '@interfaces/author';
import { AuthorModel } from '@models/author.model';

export class AuthorRepository {
  async addAuthor({ name }: Author) {
    const author = new AuthorModel({
      _id: new Types.ObjectId(),
      name
    });
    await author.save();

    return author;
  }

  addAuthorRange(authors: Author[]) {
    return AuthorModel.insertMany(authors);
  }

  async addBookToAuthor(authorId: Types.ObjectId, bookId: Types.ObjectId) {
    await AuthorModel.updateOne(
      { _id: authorId },
      { $addToSet: { books: bookId } }
    ).exec();
  }

  async addBooksToAuthor(authorId: Types.ObjectId, bookIds: Types.ObjectId[]) {
    await AuthorModel.updateOne(
      { _id: authorId },
      { $addToSet: { books: { $each: bookIds } } }
    );
  }

  async addBookToAuthors(authorIds: Types.ObjectId[], bookId: Types.ObjectId) {
    await AuthorModel.updateMany(
      { _id: { $in: authorIds } },
      { $addToSet: { books: bookId } }
    );
  }

  findAuthorById(authorId: Types.ObjectId) {
    return AuthorModel.findById(authorId)
      .populate('books', '-authors')
      .exec();
  }

  getAuthors() {
    return AuthorModel.find()
      .populate('books', "-authors")
      .exec();
  }
}
