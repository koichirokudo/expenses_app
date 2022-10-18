import React from "react";

/**
 * 日付を YYYY-MM-DD の形式で返す
 * @param date
 * @returns {string}
 */
export const dbFormatDate = (date) => {
  return (
    date.getFullYear() +
    "-" +
    ("00" + (date.getMonth() + 1)).slice(-2) +
    "-" +
    ("00" + date.getDate()).slice(-2)
  );
};

/**
 * 日付を YYYY/MM/DD の形式で返す
 * @param date
 * @returns {string}
 */
export const formatDate = (date) => {
  const d = new Date(date);
  return (
    d.getFullYear() +
    "/" +
    ("00" + (d.getMonth() + 1)).slice(-2) +
    "/" +
    ("00" + d.getDate()).slice(-2)
  );
};
