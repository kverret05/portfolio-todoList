The option selected: Option 1
The components implemented and how they meet the requirements (e.g. parameters, state and input components): 

Hint Component: 
Uses the useState hook to manage two state variables: showHint, which is initially set to false and determines whether the modal should be displayed or not, and hintCount, which is initially set to 0 and keeps track of how many hints have been used.
Renders a button that displays a modal when pressed. The modal contains a hint for a question, as well as a message indicating how many hints have been used, and a close button.

Score Card Component:
Takes in two props: questionData, which is an array of objects containing information about each question, and userChoices, which is an array of the user's choices for each question.
Uses the useState hook to manage two state variables: currentScore, which is initially set to 0 and keeps track of the user's current score, and totalScore, which is initially set to 0 and represents the total possible score.
This does not have an input component, only text.

Links (above) to repositor(ies) on GitHub and Portfolio: https://drive.google.com/file/d/1g1KDGm5KP27Z4ySpMjz2U8VSCjLIb24g/view?usp=sharing
