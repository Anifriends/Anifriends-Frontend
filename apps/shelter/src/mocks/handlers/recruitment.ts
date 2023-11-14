import { delay, http, HttpResponse } from 'msw';

const DUMMY_RECRUITMENT = {
  recruitmentId: 1,
  recruitmentTitle: '봉사자를 모집합니다',
  recruitmentStartTime: '2021-11-08T11:44:30.327959',
  recruitmentEndTime: '2021-11-08T11:44:30.327959',
  recruitmentDeadline: '2023-11-20T11:44:30.327959',
  recruitmentIsClosed: true,
  recruitmentApplicantCount: 15,
  recruitmentCapacity: 15,
};

const DUMMY_RECRUITMENT_LIST = Array.from(
  { length: 4 },
  () => DUMMY_RECRUITMENT,
);

export const handlers = [
  http.get('/shelters/recruitments', async () => {
    await delay(1000);
    return HttpResponse.json(
      {
        pageInfo: {
          totalElements: 100,
          hasNext: true,
        },
        recruitments: DUMMY_RECRUITMENT_LIST,
      },
      { status: 200 },
    );
  }),
];