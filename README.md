# Code Execution Instructions

This readme file provides instructions on how to run the code for the project. Please follow the steps below to set up and run the code successfully.

## Prerequisites
- Python 3.6 or above is installed on your system.
- pip package manager is installed.

## Installation and Setup
1. Clone the repository to your local machine or download the code as a ZIP file and extract it to a directory of your choice.
2. Open a terminal or command prompt and navigate to the project's root directory.

### Setting up a Virtual Environment
It is recommended to use a virtual environment to manage the project's dependencies. Follow these steps to set up a virtual environment:

3. Create a virtual environment by running the following command:
   ```
   python -m venv myenv
   ```

4. Activate the virtual environment:
   - For Windows:
     ```
     myenv\Scripts\activate
     ```
   - For macOS/Linux:
     ```
     source myenv/bin/activate
     ```

### Installing Dependencies
5. Install the required dependencies by running the following command:
   ```
   pip install -r requirements.txt
   ```

## Running the Code
6. Once the dependencies are installed, you can run the code using the following command:
   ```
   python manage.py runserver
   ```

7. After running the command, the server should start. Look for a message like "Starting development server at http://127.0.0.1:8000/" in the terminal.

8. Open a web browser and enter the server address provided in the previous step (e.g., http://127.0.0.1:8000/).

9. You should now be able to access the streaming service and start streaming.
