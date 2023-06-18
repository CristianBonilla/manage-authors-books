import { Router } from 'express';
import { BookDomain } from '@domain/book.domain';
import { Book } from '@interfaces/book';

export class BookRoute {
  private readonly _prefixRoute = '/book';

  constructor(
    private _router: Router,
    private _bookDomain: BookDomain
  ) {
    this.accessControl();
  }

  routes() {
    const route = this._router.route(this._prefixRoute);
    route.post(async (request, response) => {
      const book: Book = request.body;
      try {
        const addedBook = await this._bookDomain.addBook(book);
        response.status(200)
          .send({
            status: 'OK',
            statusCode: 200,
            data: {
              book: addedBook
            }
          });
      } catch (error) {
        response.status(400)
          .send({
            status: 'BadRequest',
            statusCode: 400,
            errors: [
              error ?? 'Some error occurred while creating the Book'
            ]
          });
      }
    });

    route.get(async (_request, response) => {
      try {
        const books = await this._bookDomain.getBooks();
        response.status(200)
          .send({
            status: 'OK',
            statusCode: 200,
            data: {
              books
            }
          });
      } catch (error) {
        response.status(400)
          .send({
            status: 'BadRequest',
            statusCode: 400,
            errors: [
              error ?? 'Could not find books'
            ]
          });
      }
    });

    this._router.get(`${this._prefixRoute}/:bookId`, async (request, response) => {
      const { bookId } = request.params;
      try {
        const averagePagesPerChapter = await this._bookDomain.getAveragePagesPerChapter(bookId);
        if (!!averagePagesPerChapter) {
          response.status(200)
            .send({
              status: 'OK',
              statusCode: 200,
              data: {
                averagePagesPerChapter
              }
            });
        }
      } catch (error) {
        response.status(400)
          .send({
            status: 'BadRequest',
            statusCode: 400,
            errors: [
              error
            ]
          });
      }
    });
  }

  private accessControl() {
    this._router.use(this._prefixRoute, (_request, response, next) => {
      response.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
      response.setHeader('Access-Control-Allow-Methods', 'GET,POST');
      response.setHeader('Access-Control-Allow-Headers', 'Authorization, X-PINGOTHER, Origin, X-Requested-With, Content-Type, Accept');
      next();
    });
  }
}
