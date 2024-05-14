### useDebounce()

- Debouncing is a programming practice used to ensure that time-consuming tasks do not fire so often, making them more efficient. In the context of onInput events, debouncing is often applied to delay the execution of certain actions (e.g., sending requests) until after a user has stopped typing for a specific duration.

- take example of search bar when we are firing req every second but insted of doing this if user is not press anykey after he presses last key in 200ms so after that we are pushing req on server

- on seachbar example if user is typing constantly means we are not going to send req that time 
- but when user stop for 200ms after pressing key so that time we are going to send req

