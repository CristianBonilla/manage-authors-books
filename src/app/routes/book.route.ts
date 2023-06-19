import { Router } from 'express';
import { BookDomain } from '@domain/book.domain';
import { Book } from '@interfaces/book';
import { getErrorMessage } from '@utils/error.util';

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
    route.post((request, response) => {
      const book = request.body as Book;
      this._bookDomain.addBook(book)
        .then(book =>
          response.status(200)
            .send({
              status: 'OK',
              statusCode: 200,
              data: {
                book
              }
            })
        ).catch(error =>
          response.status(400)
            .send({
              status: 'BadRequest',
              statusCode: 400,
              errors: [
                getErrorMessage(error, 'Some error occurred while creating the Book')
              ]
            })
        );
    });

    route.get((_request, response) => {
      this._bookDomain.getBooks()
        .then(books =>
          response.status(200)
            .send({
              status: 'OK',
              statusCode: 200,
              data: {
                books
              }
            })
        ).catch(error =>
          response.status(400)
            .send({
              status: 'BadRequest',
              statusCode: 400,
              errors: [
                getErrorMessage(error, 'Could not find books')
              ]
            })
        );
    });

    this._router.get(`${this._prefixRoute}/:bookId`, (request, response) => {
      const { bookId } = request.params;
      this._bookDomain.getAveragePagesPerChapter(bookId)
        .then(averagePagesPerChapter =>
          response.status(200)
            .send({
              status: 'OK',
              statusCode: 200,
              data: {
                averagePagesPerChapter
              }
            })
        ).catch(error =>
          response.status(400)
            .send({
              status: 'BadRequest',
              statusCode: 400,
              errors: [
                getErrorMessage(error)
              ]
            })
        );
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
