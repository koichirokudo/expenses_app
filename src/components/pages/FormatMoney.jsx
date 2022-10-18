import React from "react";

/**
 * 数字を3桁カンマ区切りにする
 * @param money
 * @returns {string}
 * @constructor
 */
export const formatMoney = (money) => {
  return Number(money).toLocaleString();
};
