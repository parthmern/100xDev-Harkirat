### useRef()

```javascript

import React, { useRef } from 'react';

function MyComponent() {
  // Create a ref using useRef
  const contentRef = useRef(null);

  // Function to update inner HTML of the div
  const updateContent = () => {
    contentRef.current.innerHTML = 'New Content';
  };

  return (
    <div>
      {/* Attach the ref to the div element */}
      <div ref={contentRef}>Initial Content</div>
      {/* Button to update inner HTML */}
      <button onClick={updateContent}>Update Content</button>
    </div>
  );
}

export default MyComponent;


```