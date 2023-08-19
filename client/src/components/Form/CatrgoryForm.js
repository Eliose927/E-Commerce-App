import React from 'react'

export default function CatrgoryForm({ handleSubmit, value, setValue }) {

  return (
    <>

      <form onSubmit={handleSubmit}>
        <div classname="mb-3">

          <input type="text" classname="form-control" placeholder="Enter new category" value={value} onChange={(e) => setValue(e.target.value)} />

        </div>

        <button type="submit" classname="btn btn-primary">Submit</button>
      </form>
    </>





  );
};
