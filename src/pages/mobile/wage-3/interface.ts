export type WorkType = {
  emp_no: string;
  check_date: string;
  check_time?: string;
  dilig_cd?: string;
  dilig_nm?: string;
  dilig_hh?: string;
  dilig_mm?: string;
};
export type WorkShift = {
  chang_dt: string;
  wk_type: string;
};
export type WorkList = {
  work: WorkType[];
  shift: WorkShift[];
};
