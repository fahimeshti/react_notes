import React, { useRef } from 'react';

import classes from './AddMovie.module.css';

function AddMovie(props) {
  const titleRef = useRef('');
  const openingTextRef = useRef('');
  const releaseDateRef = useRef('');

  function submitHandler(event) {
    event.preventDefault();

    // Auto Time stamp
    const tym = new Date()
    const mday = tym.getDate()
    const Tmonth = tym.getMonth() + 1
    const Wyear = tym.getFullYear()
    const wholeDate = `${mday}-${Tmonth}-${Wyear}`

    // could add validation here...

    const movie = {
      title: titleRef.current.value,
      openingText: openingTextRef.current.value,
      releaseDate: wholeDate,
    };

    props.onAddMovie(movie);
    titleRef.current.value = ''
    openingTextRef.current.value = ''
    releaseDateRef.current.value = ''
  }
  

  return (
    <form onSubmit={submitHandler}>
      <div className={classes.control}>
        <label htmlFor='title'>Title</label>
        <input type='text' id='title' ref={titleRef} placeholder="Type title here..." required/>
      </div>
      <div className={classes.control}>
        <label htmlFor='opening-text'>Note</label>
        <textarea rows='5' id='opening-text' ref={openingTextRef} placeholder="Type your text here..." required></textarea>
      </div>
      <div className={classes.control}>
        {/* <label htmlFor='date'>Date</label> */}
        <input type='hidden' id='date' ref={releaseDateRef} />
      </div>
      <button>Add Note</button>
    </form>
  );
}

export default AddMovie;
