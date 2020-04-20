import React, { Component } from "react";
import "./home.less";
import Api from "../../Api";
import Test from "../../components/TestComponent";
// import { arraySort } from "xl-tools";

export default class Home extends Component {
  async componentDidMount() {
    // const a = [6, 2, 3, 4];
    // console.log(arraySort(a));

    try {
      await Api.user
        .getUser({
          data: {
            name: "xgj",
            age: 123,
          },
          authUrl: "common",
        })
        .then(() => {
          // console.log(r);
        });
    } catch (error) {
      // console.log(error, 1231);
    }

    // [1, 2, 3, 4, 5].map((a, _, c) => {
    // console.log(a, c);

    // });
  }
  render() {
    return (
      <div className="home">
        <Test />
        this is home ~hi xht
      </div>
    );
  }
}
