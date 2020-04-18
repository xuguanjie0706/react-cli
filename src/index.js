if (module.hot) {
  // 实现热更新
  module.hot.accept();
}
import ReactDom from "react-dom";
import getRouter from "./route/index";
import "./styles/index.css";

ReactDom.render(getRouter(), document.getElementById("root"));
