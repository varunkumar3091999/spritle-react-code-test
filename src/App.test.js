import { render, screen } from "@testing-library/react";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { shallow, configure, mount } from "enzyme";
import App from "./App";
import React from "react";

configure({ adapter: new Adapter() });

describe("App", () => {
  it("renders correctly", () => {
    shallow(<App />);
  });
});

test("add current value to balance", () => {
  const changeBalance = jest.fn();
  const app = shallow(<App onClick={changeBalance} />);
  const handleClick = jest.spyOn(React, "useState");
  handleClick.mockImplementation((balance) => [balance, setBalance]);

  app.find("#addBtn").simulate("click");
  expect(changeBalance).toBeTruthy();
});
