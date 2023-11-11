import axiosInstance from '../axiosInstance';

type PageInfo = {
  totalElements: number;
  hasNext: boolean;
};

type Recruitment = {
  recruitmentId: number;
  recruitmentTitle: string;
  recruitmentStartTime: string;
  recruitmentEndTime: string;
  recruitmentDeadline: string;
  recruitmentIsClosed: boolean;
  recruitmentApplicantCount: number;
  recruitmentCapacity: number;
};

type RecruitSearchParams = {
  keyword: string;
  startDate: string;
  endDate: string;
  isClosed: boolean;
  content: boolean;
  title: boolean;
  pageSize: number;
  pageNumber: number;
};

type PostRecruitmentParams = {
  title: string;
  startTime: string;
  endTime: string;
  deadline: string;
  capacity: number;
  content: string;
  imageUrls: string[];
};

type AttendanceStatus = {
  applicantId: number;
  attendance: boolean;
};

type Gender = 'MALE' | 'FEMALE';
type RecruitementStatus = 'PENDING' | 'REFUSED' | 'APPROVED';

export const getRecruitments = (recruitSearchParams: RecruitSearchParams) =>
  axiosInstance.get<
    {
      pageInfo: PageInfo;
      recruitments: Recruitment[];
    },
    RecruitSearchParams
  >('shelters/recruitments', {
    params: recruitSearchParams,
  });

export const createRecruitment = (recruitmentParams: PostRecruitmentParams) =>
  axiosInstance.post<unknown, PostRecruitmentParams>(
    `/shelters/recruitments`,
    recruitmentParams,
  );

export const updateRecruitment = (
  recruitmentId: number,
  recruitmentParams: PostRecruitmentParams,
) =>
  axiosInstance.patch<unknown, PostRecruitmentParams>(
    `/shelters/recruitments/${recruitmentId}`,
    recruitmentParams,
  );

export const deleteRecruitment = (recruitmentId: number) =>
  axiosInstance.delete<unknown, unknown>(
    `/shelters/recruitments/${recruitmentId}`,
  );

export const closeRecruitment = (recruitmentId: number) =>
  axiosInstance.patch<unknown, unknown>(
    `/shelters/recruitments/${recruitmentId}/close`,
  );

export const getRecruitmentApplicants = (recruitmentId: number) =>
  axiosInstance.get<{
    applicants: {
      applicantId: number;
      volunteerId: number;
      volunteerName: string;
      volunteerBirthDate: string;
      volunteerGender: Gender;
      completedVolunteerCount: number;
      volunteerTemperature: number;
      applicantStatus: RecruitementStatus;
    }[];
    recruitmentCapacity: number;
  }>(`/shelters/recruitments/${recruitmentId}/applicants`);

export const updateRecruitmentApplicant = (
  recruitmentId: number,
  applicantId: number,
) =>
  axiosInstance.patch<
    unknown,
    {
      status: RecruitementStatus;
    }
  >(`/shelters/recruitments/${recruitmentId}/applicants/${applicantId}`);

export const getApprovedRecruitmentApplicants = (recruitmentId: number) =>
  axiosInstance.get<{
    applicants: {
      volunteerId: number;
      applicantId: number;
      volunteerName: string;
      volunteerBirthDate: string;
      volunteerGender: Gender;
      volunteerPhoneNumber: string;
      volunteerAttendance: boolean;
    }[];
  }>(`/shelters/recruitments/${recruitmentId}/approval`);

export const updateApplicantsApproval = (
  recruitmentId: number,
  applicants: AttendanceStatus[],
) =>
  axiosInstance.patch<
    unknown,
    {
      applicants: AttendanceStatus[];
    }
  >(`/shelters/recruitments/${recruitmentId}/approval`, {
    applicants,
  });
