import { Router } from 'express';
import { AuthorDomain } from '@domain/author.domain';
import { Author } from '@interfaces/author';
import { getErrorMessage } from '@utils/error.util';

export class AuthorRoute {
  private readonly _prefixRoute = '/author';

  constructor(
    private _router: Router,
    private _authorDomain: AuthorDomain
  ) {
    this.accessControl();
  }

  routes() {
    const route = this._router.route(this._prefixRoute);
    route.post((request, response) => {
      const author = request.body as Author;
      this._authorDomain.addAuthor(author)
        .then(author =>
          response.status(200)
            .send({
              status: 'OK',
              statusCode: 200,
              data: {
                author
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
      this._authorDomain.getAuthors()
        .then(authors =>
          response.status(200)
            .send({
              status: 'OK',
              statusCode: 200,
              data: {
                authors
              }
            })
        ).catch(error =>
          response.status(400)
            .send({
              status: 'BadRequest',
              statusCode: 400,
              errors: [
                getErrorMessage(error, 'Could not find authors')
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
