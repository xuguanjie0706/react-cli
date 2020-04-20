// console.log(a);

// import React from "react";

export function isProduction() {
  return global.process.env.NODE_ENV === "production";
}
