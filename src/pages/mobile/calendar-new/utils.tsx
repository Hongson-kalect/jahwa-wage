import { calDateValue } from "./api";
import { WorkShift, WorkType } from "./interface";

export const mergeWorkDateAndShift = (
  workData: WorkType[],
  workShifts: WorkShift[],
) => {
  const sortArray: {
    date: string;
    time?: string;
    shift: string;
    data: WorkType[];
  }[] = [];
  workData.map((work) => {
    //get work shift
    let workShift = "1";
    workShifts.map((shift) => {
      if (calDateValue(shift.chang_dt) <= calDateValue(work.check_date))
        workShift = shift.wk_type;
      else return;
    });

    let matchDate = sortArray.find((item) => {
      return item.date === work.check_date;
    });
    if (!matchDate) {
      matchDate = {
        date: work.check_date,
        time: work.check_time,
        shift: workShift,
        data: [],
      };
      sortArray.push(matchDate);
    }
    matchDate.data.push(work);
    // if(sortArray.some((item)=>{item.month===work.month}))
  });
  return sortArray;
};

export const getSelectedDateDetail = (selectedDate: {
  date: string;
  time?: string;
  data: WorkType[];
  shift: string;
}) => {
  const tempDetail = {
    ot: 0,
    eb: 0,
    of: "",
    half: 0,
    comeLate: 0,
    leaveSoon: 0,
  };
  if (selectedDate) {
    selectedDate.data.map((detail) => {
      if ([33, 31, 47, 40, 38].includes(Number(detail.dilig_cd)))
        tempDetail.ot += Number(detail.dilig_hh) * 60 + Number(detail.dilig_mm);
      if ([55, 56, 57, 58, 59, 60].includes(Number(detail.dilig_cd)))
        tempDetail.eb += Number(detail.dilig_hh) * 60 + Number(detail.dilig_mm);
      if ([13].includes(Number(detail.dilig_cd)))
        tempDetail.comeLate +=
          Number(detail.dilig_hh) * 60 + Number(detail.dilig_mm);
      if ([14].includes(Number(detail.dilig_cd)))
        tempDetail.leaveSoon +=
          Number(detail.dilig_hh) * 60 + Number(detail.dilig_mm);
      if (
        [1, 2, 4, 5, 8, 10, 15, 18, 19, 20, 21].includes(
          Number(detail.dilig_cd),
        )
      )
        tempDetail.of = detail.dilig_nm || "Nghỉ";
      if ([9].includes(Number(detail.dilig_cd))) tempDetail.half += 1;
    });
  }
  return tempDetail;
};
