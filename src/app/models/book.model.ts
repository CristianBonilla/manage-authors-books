import { Schema, model } from 'mongoose';
import { AUTHOR_MODEL_NAME, BOOK_MODEL_NAME } from '@const/models';
import { Book } from '@interfaces/book';

const BookSchema = new Schema<Book>({
  title: {
    type: String,
    required: true
  },
  chapters: {
    type: Number,
    required: true
  },
  pages: {
    type: Number,
    required: true
  },
  authors: [
    {
      type: Schema.Types.ObjectId,
      ref: AUTHOR_MODEL_NAME
    }
  ]
});

export const BookModel = model<Book>(
  BOOK_MODEL_NAME,
  BookSchema,
  BOOK_MODEL_NAME
);
