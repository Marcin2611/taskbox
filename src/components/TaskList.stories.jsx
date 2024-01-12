import TaskList from "./TaskList.jsx";
import * as TaskStories from "./Task.stories.jsx";
import PropTypes from "prop-types";
import Task from "./Task";
import {Provider} from "react-redux";
import {configureStore, createSlice} from "@reduxjs/toolkit";

export const MockedState = {
  tasks: [
    {...TaskStories.Default.args.task, id: '1', title: 'Task 1'},
    {...TaskStories.Default.args.task, id: '2', title: 'Task 2'},
    {...TaskStories.Default.args.task, id: '3', title: 'Task 3'},
    {...TaskStories.Default.args.task, id: '4', title: 'Task 4'},
    {...TaskStories.Default.args.task, id: '5', title: 'Task 5'},
    {...TaskStories.Default.args.task, id: '6', title: 'Task 6'},
  ],
  status: 'idle',
  error: null,
};

const Mockstore = ({taskboxState, children}) => (
  <Provider store={configureStore({
    reducer: {
      taskbox: createSlice({
        name: 'taskbox',
        initialState: taskboxState,
        reducers: {
          updateTaskState: (state, action) => {
            const {id, newTaskState} = action.payload;
            const task = state.tasks.findIndex((task) => task.id === id);

            if (task >= 0) state.tasks[task].state = newTaskState;
          }
        }
      }).reducer
    }
  })}>
    {children}
  </Provider>
);

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{padding: '3rem'}}>{story()}</div>],
  tags: ['autodocs'],
  excludeStories: /.*MockedState$/,
}

export const Default = {
  decorators: [
    (story) => <Mockstore taskboxState={MockedState}>{story()}</Mockstore>
  ]
};

export const WithPinnedTasks = {
  decorators: [
    (story) => {
      const pinnedTasks = [
        ...MockedState.tasks.slice(0, 5),
        {id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED'},
      ];

      return (
        <Mockstore
          taskboxState={{
            ...MockedState,
            tasks: pinnedTasks,
          }}>{story()}</Mockstore>
      );
    },
  ]
};

export const Loading = {
  decorators: [
    store => (<Mockstore taskboxState={{...MockedState, status: 'loading'}}>{store()}</Mockstore>)
  ]
};

export const Empty = {
  decorators: [
    story => (
      <Mockstore taskboxState={{
        ...MockedState,
        tasks: []
      }}>
        {story()}
      </Mockstore>
    )
  ]
};

TaskList.propTypes = {
  /** Checks if it's in loading state */
  loading: PropTypes.bool,
  /** The list of tasks */
  tasks: PropTypes.arrayOf(Task.propTypes.task).isRequired,
  /** Event to change the task to pinned */
  onPinTask: PropTypes.func,
  /** Event to change the task to archived */
  onArchiveTask: PropTypes.func,
};
TaskList.defaultProps = {
  loading: false,
};
