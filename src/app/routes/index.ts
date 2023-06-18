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

  get router() {
    return this._router;
  }

  constructor() {
    this._router = Router();
    this.routes();
  }

  private routes() {
    const route = this._router.route(this._prefixRoute);
    route.get((_request, response, _next) => {
      response.status(200).send({
        message: '[API] Connected...'
      });
    });
    const authorRepository = new AuthorRepository();
    const bookRepository = new BookRepository();
    const authorDomain = new AuthorDomain(authorRepository, bookRepository);
    const authorRoute = new AuthorRoute(this._router, authorDomain);
    authorRoute.routes();
    const bookDomain = new BookDomain(bookRepository, authorRepository);
    const bookRoute = new BookRoute(this._router, bookDomain);
    bookRoute.routes();

    logger.info('[API] Routes are initialized');
  }
}
