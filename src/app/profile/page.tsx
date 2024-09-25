import clsx from 'clsx';
import Image from 'next/image';
import React from 'react';
import { getUser } from '@/apis';
import { type User } from '@/types';
import styles from './Profile.module.css';

const USER_ID: number = 1;

const Page = async (): Promise<JSX.Element> => {
  const user: User | null = await getUser(USER_ID);

  const classNames: string = clsx(
    'profile-page',
    'p-8 flex flex-col items-center gap-8'
  );

  return (
    <main className={classNames}>
      <h1 className="text-xl font-bold">Profile</h1>
      <Image
        src="https://tr.rbxcdn.com/38c6edcb50633730ff4cf39ac8859840/420/420/Hat/Png"
        alt="Default profile photo"
        width={256}
        height={256}
        className={styles['profile-picture']}
      />
      <div className="grid grid-cols-4 gap-8">
        <span className="font-bold">Name:</span>
        <span>{user?.name}</span>
        <span className="font-bold">Username:</span>
        <span>{user?.username}</span>
        <span className="font-bold">Email:</span>
        <a href={`mailto:${user?.email}`}>{user?.email}</a>
        <span className="font-bold">Phone:</span>
        <a href={`tel:${user?.phone}`}>{user?.phone}</a>
        <span className="font-bold">Address:</span>
        <span>
          {`${user?.address.suite}, ${user?.address.street}, ${user?.address.city}, ${user?.address.zipcode} (${user?.address.geo.lat}, ${user?.address.geo.lng})`}
        </span>
        <span className="font-bold">Website:</span>
        <a href={`http://${user?.website}`} target="_blank" rel="noreferrer">
          {user?.website}
        </a>
        <span className="font-bold">Company:</span>
        <div className="grid grid-cols-2 gap-4">
          <span className="font-bold">Name:</span>
          <span>{user?.company.name}</span>
          <span className="font-bold">Catch Phrase:</span>
          <span>{user?.company.catchPhrase}</span>
          <span className="font-bold">BS:</span>
          <span>{user?.company.bs}</span>
        </div>
      </div>
    </main>
  );
};

export default Page;
