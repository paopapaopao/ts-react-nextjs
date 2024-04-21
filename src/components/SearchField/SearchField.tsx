'use client';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { type ChangeEvent, type ReactNode } from 'react';

const SearchField = (): ReactNode => {
  const searchParams = useSearchParams();
  const pathname = usePathname();
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
