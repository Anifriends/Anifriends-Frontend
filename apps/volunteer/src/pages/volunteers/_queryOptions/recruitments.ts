import {
  InfiniteData,
  infiniteQueryOptions,
  UseInfiniteQueryOptions,
} from '@tanstack/react-query';
import { AxiosError, AxiosResponse } from 'axios';
import { ErrorResponseData } from 'shared/types/apis/error';

import { getRecruitments } from '@/apis/recruitment';
import {
  RecruitementsResponse,
  RecruitmentSearchFilter,
} from '@/types/apis/recruitment';

type RecruitmentQueryOptions = {
  all: () => UseInfiniteQueryOptions<
    AxiosResponse<RecruitementsResponse>,
    AxiosError<ErrorResponseData>,
    InfiniteData<AxiosResponse<RecruitementsResponse>, unknown>,
    AxiosResponse<RecruitementsResponse>,
    string[],
    number
  >;
  search: (
    searchFilter: Partial<RecruitmentSearchFilter>,
    isKeywordSearched: boolean,
  ) => UseInfiniteQueryOptions<
    AxiosResponse<RecruitementsResponse>,
    AxiosError<ErrorResponseData>,
    InfiniteData<AxiosResponse<RecruitementsResponse>, unknown>,
    AxiosResponse<RecruitementsResponse>,
    (string | Partial<RecruitmentSearchFilter>)[],
    number
  >;
};

const recruitmentQueryOptions: RecruitmentQueryOptions = {
  all: () =>
    infiniteQueryOptions({
      queryKey: ['recruitments'],
      queryFn: ({ pageParam }) =>
        getRecruitments({
          page: pageParam,
          size: 10,
        }),
      initialPageParam: 0,
      getNextPageParam: ({ data: { pageInfo } }, _, lastPageParam) =>
        pageInfo.hasNext ? lastPageParam + 1 : null,
    }),
  search: (
    searchFilter: Partial<RecruitmentSearchFilter>,
    isKeywordSearched: boolean,
  ) =>
    infiniteQueryOptions({
      enabled: isKeywordSearched,
      queryKey: ['recruitments', searchFilter],
      queryFn: ({ pageParam }) =>
        getRecruitments({
          ...searchFilter,
          page: pageParam,
          size: 10,
        }),
      initialPageParam: 0,
      getNextPageParam: ({ data: { pageInfo } }, _, lastPageParam) =>
        pageInfo.hasNext ? lastPageParam + 1 : null,
    }),
};

export default recruitmentQueryOptions;
