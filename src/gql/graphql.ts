/* eslint-disable */
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
export type MakeEmpty<T extends { [key: string]: unknown }, K extends keyof T> = { [_ in K]?: never };
export type Incremental<T> = T | { [P in keyof T]?: P extends ' $fragmentName' | '__typename' ? T[P] : never };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: { input: string; output: string; }
  String: { input: string; output: string; }
  Boolean: { input: boolean; output: boolean; }
  Int: { input: number; output: number; }
  Float: { input: number; output: number; }
};

export type Circuit = {
  __typename?: 'Circuit';
  Location: Location;
  circuitId: Scalars['String']['output'];
  circuitName: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type Constructor = {
  __typename?: 'Constructor';
  constructorId: Scalars['String']['output'];
  name: Scalars['String']['output'];
  nationality: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type ConstructorStandingEntity = {
  __typename?: 'ConstructorStandingEntity';
  points: Scalars['String']['output'];
  position: Scalars['String']['output'];
  team: Constructor;
  wins: Scalars['String']['output'];
};

export type Day = {
  __typename?: 'Day';
  date: Scalars['String']['output'];
  time: Scalars['String']['output'];
};

export type Driver = {
  __typename?: 'Driver';
  code: Scalars['String']['output'];
  dateOfBirth: Scalars['String']['output'];
  driverId: Scalars['String']['output'];
  familyName: Scalars['String']['output'];
  givenName: Scalars['String']['output'];
  nationality: Scalars['String']['output'];
  permanentNumber: Scalars['String']['output'];
  url: Scalars['String']['output'];
};

export type DriverStandingEntity = {
  __typename?: 'DriverStandingEntity';
  driver: Driver;
  points: Scalars['String']['output'];
  position: Scalars['String']['output'];
  team: Constructor;
  wins: Scalars['String']['output'];
};

export type Location = {
  __typename?: 'Location';
  country: Scalars['String']['output'];
  lat: Scalars['String']['output'];
  locality: Scalars['String']['output'];
  long: Scalars['String']['output'];
};

export type Query = {
  __typename?: 'Query';
  constructors: Array<ConstructorStandingEntity>;
  getDriverStandings: Array<DriverStandingEntity>;
  getSchedule: Array<Schedule>;
};

export type Schedule = {
  __typename?: 'Schedule';
  Circuit: Circuit;
  FirstPractice: Day;
  Qualifying: Day;
  SecondPractice: Day;
  ThirdPractice: Day;
  date: Scalars['String']['output'];
  raceName: Scalars['String']['output'];
  round: Scalars['String']['output'];
  season: Scalars['String']['output'];
  time: Scalars['String']['output'];
  url: Scalars['String']['output'];
};
