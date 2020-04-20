// console.log();

import { isProduction } from "./index";
const authUrls = {
  common: isProduction ? "http://localhost:3000" : "http://localhost:3001",
  fp: isProduction ? "http://localhost:3002" : "http://localhost:3003",
};
export default authUrls;
