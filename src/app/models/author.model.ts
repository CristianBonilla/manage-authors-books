import { Schema, model } from 'mongoose';
import { AUTHOR_MODEL_NAME, BOOK_MODEL_NAME } from '@const/models';
import { Author } from '@interfaces/author';

const AuthorSchema = new Schema<Author>({
  name: {
    type: String,
    required: true
  },
  books: [
    {
      type: Schema.Types.ObjectId,
      ref: BOOK_MODEL_NAME
    }
  ]
});

export const AuthorModel = model<Author>(
  AUTHOR_MODEL_NAME,
  AuthorSchema,
  AUTHOR_MODEL_NAME
);
