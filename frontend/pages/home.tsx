import React from 'react';
import { fetchAPI } from '../lib/api';
const home = ({movies}) => {
    console.log(",xdd",movies)
  return <div></div>;
};


export async function getServerSideProps(){
    const {API_URL} = process.env 
    // const res = await fetch(`${API_URL}/ingredient`)
    
    const res = await fetch(`http://localhost:1337/api/articles`)
    const articlesRes = await fetchAPI("/articles")

    const data = await res.json()
    console.log(res,articlesRes)
    return{
        props:{
            movies:data
        }
    }
}

export default home;
