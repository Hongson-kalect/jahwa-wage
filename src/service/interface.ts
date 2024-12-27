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

export type WorkBonus = {
  // api/luongthuong

  emp_no: string;
  name: string;
  allow_cd: string;
  allow_nm: string;
  allow: string;
  dilig_cnt?: string;
  dilig_hh?: string;
  dilig_mm?: string;
};
export type WorkDeduct = {
  // api/khautru

  emp_no: string;
  name: string;
  allow_nm: string;
  sub_cd: string;
  sub_amt: string;
};

export type WorkDate = {
  // api/lich

  emp_no: string;
  check_date: string;
  check_time: string;
  dilig_cd: string;
  dilig_nm: string;
  dilig_hh: string;
  dilig_mm: string;
};

export type WorkTime = {
  // api/ngaydilam

  emp_no: string;
  tot_day: string;
  work_day: string;
  wk_time: string;
};

export type HomeDataType = {
  bonus: WorkBonus[];
  deduct: WorkDeduct[];
  workShift: WorkShift[];
  workDate: WorkDate[];
  workTime: WorkTime;
};
