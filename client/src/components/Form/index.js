import React from 'react'

function Form({ children }) {

  const handleSubmit = (event) => {
    event.preventDefault();
  }

  return (
    <form onSubmit={handleSubmit}>
      {children}
    </form>
  );
}

export default Form;