import { Router } from 'express';
import { reviewController } from '../controller';
import { ReviewDto } from '../dto';
import { DtoValidatorMiddleware } from '../middlewares';
import { asyncHandler } from '../utils';

export const reviewRouter = Router();

reviewRouter.get('/', asyncHandler(reviewController.getReview));
reviewRouter.patch(
  '/write', asyncHandler(reviewController.writeReview)
);
reviewRouter.patch(
  '/grade',
  asyncHandler(reviewController.gradeReview)
);
reviewRouter.patch(
  '/bookmark',
  asyncHandler(reviewController.reviewBookmark)
);
reviewRouter.get(
  '/bookmark',
  asyncHandler(reviewController.bookmark)
);
