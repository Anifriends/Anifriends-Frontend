import { delay, http, HttpResponse } from 'msw';

const DUMMY_USER = {
  volunteerId: 1,
  applicantId: 2,
  volunteerName: '김영희',
  volunteerBirthDate: '2021-11-08',
  volunteerGender: 'FEMALE',
  volunteerPhoneNumber: '010-1234-5678',
  volunteerAttendance: true,
};

const DUMMY_USER_LIST = Array.from({ length: 8 }, () => {
  return {
    ...DUMMY_USER,
    applicantId: Math.random(),
  };
});

export const handlers = [
  http.get('/recruitments/:recruitmentId/approval', async ({ request }) => {
    console.log(request);
    await delay(200);
    return HttpResponse.json(
      {
        applicants: DUMMY_USER_LIST,
      },
      { status: 200 },
    );
  }),
];
