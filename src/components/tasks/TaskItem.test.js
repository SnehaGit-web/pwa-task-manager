import React from "react";
import { shallow } from "enzyme";
import Enzyme from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { TaskItem } from "@components/tasks/TaskItem";

Enzyme.configure({ adapter: new Adapter() });

// Mock Redux dispatch
jest.mock("react-redux", () => ({
  useDispatch: () => jest.fn(),
}));

const mockTask = {
  id: "task-1",
  title: "Write unit tests",
  description: "Cover reducers and components",
  priority: "high",
  dueDate: null,
  completed: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

describe("TaskItem", () => {
  it("renders the task title", () => {
    const wrapper = shallow(<TaskItem task={mockTask} />);
    expect(wrapper.find(".task-title").text()).toBe("Write unit tests");
  });

  it("renders the description", () => {
    const wrapper = shallow(<TaskItem task={mockTask} />);
    expect(wrapper.find(".task-desc").text()).toBe("Cover reducers and components");
  });

  it("applies task-item--done class when completed", () => {
    const wrapper = shallow(<TaskItem task={{ ...mockTask, completed: true }} />);
    expect(wrapper.find(".task-item--done").exists()).toBe(true);
  });

  it("does not apply task-item--done when active", () => {
    const wrapper = shallow(<TaskItem task={mockTask} />);
    expect(wrapper.find(".task-item--done").exists()).toBe(false);
  });

  it("applies priority-- class based on priority", () => {
    const wrapper = shallow(<TaskItem task={mockTask} />);
    expect(wrapper.find(".priority--high").exists()).toBe(true);
  });

  it("shows overdue indicator when past due date", () => {
    const wrapper = shallow(<TaskItem task={{ ...mockTask, dueDate: "2020-01-01" }} />);
    expect(wrapper.find(".task-due--overdue").exists()).toBe(true);
  });
});
