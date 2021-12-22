import { useReducer } from 'react';
import { Link, LoaderFunction, MetaFunction, Scripts, useCatch, useLoaderData } from 'remix';
import styled from 'styled-components';
import { db } from '~/utils/db.server';
import { getUser, requireUserId } from '~/utils/session.server';

export const  meta: MetaFunction = () => {
  return {
    title: 'I am doing this for SEO With meta tags',
    description: 'Remix is a React-based web framework for building web applications.'
  }
}


export let loader: LoaderFunction =  async ({request}) => {
  let user = await getUser(request);
  console.log(user);
  let data = await db.reports.findMany({})
  return {reports : data, user: user};
} 

export default function ReportsRoute() {
  let data = useLoaderData();
  console.log(data);
  return <div>
      <h1>Current week Reports for user {' :->  '}{data.user.username} </h1>
      <script/>
      <ul>
          {data.reports.map(report => (
              <li>{report.jiraId}{' '}{report.jiraContext}</li>
          ))}
      </ul>
  </div>
}

export function CatchBoundary() {
    const caught = useCatch();
  
    if (caught.status === 404) {
      return (
        <div className="error-container">
          There are no Reports to display.
        </div>
      );
    }
    if (caught.status === 401) {
      return (
        <div className="error-container">
         no user exist , please Login
        </div>
      );
    }
    throw new Error(
      `Unexpected caught response with status: ${caught.status}`
    );
}


export function ErrorBoundary({error} : {error : Error}) {
    return (
      <div className="error-container">
        Woooo, Some error occured.It wasn't expected <br/>
        {error.message}
      </div>
    );
}
  

