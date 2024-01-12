import TaskList from "./TaskList.jsx";
import * as TaskStories from "./Task.stories.jsx";
import PropTypes from "prop-types";
import Task from "./Task";

export default {
  component: TaskList,
  title: 'TaskList',
  decorators: [(story) => <div style={{padding: '3rem'}}>{story()}</div>],
  tags: ['autodocs']
}

export const Default = {
  args: {
    // Shaping the stories through args composition.
    // The data was inherited from the Default story in Task.stories.jsx.
    tasks: [
      {...TaskStories.Default.args.task, id: '1', title: 'Task 1'},
      {...TaskStories.Default.args.task, id: '2', title: 'Task 2'},
      {...TaskStories.Default.args.task, id: '3', title: 'Task 3'},
      {...TaskStories.Default.args.task, id: '4', title: 'Task 4'},
      {...TaskStories.Default.args.task, id: '5', title: 'Task 5'},
      {...TaskStories.Default.args.task, id: '6', title: 'Task 6'},
    ],
  },
};

export const WithPinnedTasks = {
  args: {
    tasks: [
      ...Default.args.tasks.slice(0, 5),
      {id: '6', title: 'Task 6 (pinned)', state: 'TASK_PINNED'},
    ],
  },
};

export const Loading = {
  args: {
    tasks: [],
    loading: true,
  },
};

export const Empty = {
  args: {
    // Shaping the stories through args composition.
    // Inherited data coming from the Loading story.
    ...Loading.args,
    loading: false,
  },
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