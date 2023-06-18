import { Types } from 'mongoose';

type ObjectIdValue = Parameters<typeof Types.ObjectId.isValid>[0];

export function ObjectIdIsValid(source: ObjectIdValue) {
  return Types.ObjectId.isValid(source);
}
