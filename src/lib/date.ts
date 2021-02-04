function ConvertDate(date: Date) {
  const utc = date.getTime() + date.getTimezoneOffset() * 60 * 1000;

  // UTC to KST (UTC+9)
  const KR_TIME_DIFF = 9 * 60 * 60 * 1000;
  const current_time_KR = new Date(utc + KR_TIME_DIFF);

  return current_time_KR;
}

export default ConvertDate;
