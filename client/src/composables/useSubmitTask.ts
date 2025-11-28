import api from '../utils/axios';

export const useSubmitTask = () => {
  /**
   * Mission two: Insert a task into the database.
   * 
   * The goal for this composable is to include all of the functionality
   * related to sending a new task to the server to be inserted into the
   * database.
   *
   * You will want to use the `api` object imported at the top of this file
   * to send a POST request to the server. You should track the state of this
   * request (loading, error, etc) in this file and expose it to the components
   * 
   * Definition of done:
   * [ ] the function sends a post request to the server
   * [ ] the state of the request is properly tracked (loading, error, etc)
   * [ ] errors are handled correctly
   * [ ] the server inserts the task into the database
   * [ ] the newly inserted task is placed into the tasks list and displayed
   * 
   * Your submission will be judged out of 10 points based on
   * the following criteria:
   * 
   * - Works as expected - 5 points
   *   - Does the function send a post request to the server?
   *   - Is the state of the request properly tracked (loading, error, etc)?
   *   - Are errors handled correctly?
   *   - Is the response from the server correctly placed into the tasks list?
   *   - Can I submit several tasks in a row without issues?
   * - Code quality - 5 points
   *   - Is the code clean and easy to read?
   *   - Are there any obvious bugs?
   *   - Are there any obvious performance issues?
   *   - Are there comments where necessary?
   */
};
