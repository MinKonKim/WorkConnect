export const SCHEDULER_RESPONSE = {
  FAILED_TO_GET: '스케줄러 조회에 실패했습니다.',
  UNAUTHORIZED: '스케줄러 조회에 실패했습니다.'
};

export const SCHEDULER_RESPONSE_SUCCESS = {
  status: true,
  data: [],
  message: ''
};

export const SCHEDULER_RESPONSE_GET_FAILED = {
  ...SCHEDULER_RESPONSE_SUCCESS,
  status: false,
  message: SCHEDULER_RESPONSE.FAILED_TO_GET
};

export const SCHEDULER_RESPONSE_UNAUTHORIZED = {
  ...SCHEDULER_RESPONSE_SUCCESS,
  status: false,
  message: SCHEDULER_RESPONSE.UNAUTHORIZED
};
