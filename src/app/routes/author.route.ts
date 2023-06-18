import { Router } from 'express';
import { AuthorDomain } from '@domain/author.domain';
import { Author } from '@interfaces/author';

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
    route.post(async (request, response) => {
      const author: Author = request.body;
      try {
        const addedAuthor = await this._authorDomain.addAuthor(author);
        response.status(200)
          .send({
            status: 'OK',
            statusCode: 200,
            data: {
              author: addedAuthor
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
        const authors = await this._authorDomain.getAuthors();
        response.status(200)
          .send({
            status: 'OK',
            statusCode: 200,
            data: {
              authors
            }
          });
      } catch (error) {
        response.status(400)
          .send({
            status: 'BadRequest',
            statusCode: 400,
            errors: [
              error ?? 'Could not find authors'
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
