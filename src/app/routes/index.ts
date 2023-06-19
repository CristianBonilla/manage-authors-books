import { Router } from 'express';
import { AuthorDomain } from '@domain/author.domain';
import { BookDomain } from '@domain/book.domain';
import { AuthorRepository } from '@repos/author.repository';
import { BookRepository } from '@repos/book.repository';
import { AuthorRoute } from '@routes/author.route';
import { BookRoute } from '@routes/book.route';
import { logger } from 'src/logger';

export class IndexRoute {
  private readonly _prefixRoute = '/';
  private readonly _router: Router;
  private readonly _authorRepository = new AuthorRepository();
  private readonly _bookRepository = new BookRepository();
  private readonly _authorDomain = new AuthorDomain(
    this._authorRepository,
    this._bookRepository
  );
  private readonly _bookDomain = new BookDomain(
    this._bookRepository,
    this._authorRepository
  );

  get router() {
    return this._router;
  }

  constructor() {
    this._router = Router();
    this.routes();
  }

  private routes() {
    const route = this._router.route(this._prefixRoute);
    route.get((_request, response) => {
      response.status(200).send({
        message: '[API] Connected...'
      });
    });
    const authorRoute = new AuthorRoute(this._router, this._authorDomain);
    authorRoute.routes();
    const bookRoute = new BookRoute(this._router, this._bookDomain);
    bookRoute.routes();

    logger.info('[API] Routes are initialized');
  }
}
