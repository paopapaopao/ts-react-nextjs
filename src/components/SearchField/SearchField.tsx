'use client';

import {
  type ReadonlyURLSearchParams,
  usePathname,
  useRouter,
  useSearchParams
} from 'next/navigation';
import React, { type ChangeEvent, type ReactNode } from 'react';

const SearchField = (): ReactNode => {
  const searchParams: ReadonlyURLSearchParams = useSearchParams();
  const pathname: string = usePathname();
  const { replace } = useRouter();

  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const params: URLSearchParams = new URLSearchParams(searchParams);

    if (event.target.value !== '') {
      params.set('query', event.target.value);
    } else {
      params.delete('query');
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <input
      type="text"
      defaultValue={searchParams.get('query')?.toString()}
      id="search"
      className="border"
      onChange={handleChange}
    />
  );
};

export default SearchField;
