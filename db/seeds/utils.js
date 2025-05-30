const db = require("../../db/connection");

exports.convertTimestampToDate = ({ created_at, ...otherProperties }) => {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
};



exports.createRef = (array, keyField, valueField) => {
  const lookup = {};
  array.forEach((item) => {
    lookup[item[keyField]] = item[valueField];
  });
  return lookup;
};