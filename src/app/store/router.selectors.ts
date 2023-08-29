import { RouterReducerState, getSelectors } from '@ngrx/router-store';
import { createFeatureSelector } from '@ngrx/store';

export const selectRouter = createFeatureSelector<RouterReducerState>('router');

export const {
  selectCurrentRoute,
  selectFragment,
  selectQueryParam,
  selectQueryParams,
  selectRouteData,
  selectRouteParam,
  selectRouteParams,
  selectUrl
} = getSelectors();
