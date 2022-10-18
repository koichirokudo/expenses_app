import React from "react";

/**
 * 指定された次の月を返す
 * @param date
 * @returns {*}
 */
export const nextMonth = (date) => {
  const resultDate = new Date(date.getTime());
  resultDate.setMonth(date.getMonth() + 1);
  if (date.getDate() > resultDate.getDate()) {
    resultDate.setDate(0);
  }
  return resultDate;
};

/**
 * 指定された前の月を返す
 * @param date
 * @returns {*}
 */
export const prevMonth = (date) => {
  const resultDate = new Date(date.getTime());
  resultDate.setMonth(date.getMonth() - 1);
  if (date.getDate() > resultDate.getDate()) {
    resultDate.setDate(0);
  }
  return resultDate;
};
