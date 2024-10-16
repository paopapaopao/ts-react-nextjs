'use client';

import React, { type ReactNode } from 'react';
import { Button } from '../Button';

interface Props {
  action: (formData: FormData) => void;
}

const PostForm = ({ action }: Props): ReactNode => {
  return (
    <form
      action={action}
      className="p-8 flex flex-col gap-4 bg-white rounded shadow-md"
    >
      <label className="flex flex-col gap-2 text-sm font-medium leading-6 text-gray-900">
        Title
        <input
          name="title"
          placeholder="Enter title"
          className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00'
        />
      </label>
      <label className="flex flex-col gap-2 text-sm font-medium leading-6 text-gray-900">
        Body
        <input
          name="body"
          placeholder="Enter body"
          className='block w-full rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" placeholder="0.00'
        />
      </label>
      <Button>Submit</Button>
    </form>
  );
};

export default PostForm;
