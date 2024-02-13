import React from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
const index = ({resultData}) => {
  console.log("Result Data", resultData)
  const router = useRouter()
  const {category,sub_category} = router.query
  console.log("category : ", category)
  console.log("subcategory :", sub_category)
  return (
    <div>Sub Category Page</div>
  )
}

export default index



export async function getServerSideProps(context) {
  const { category, sub_category } = context.query;
  console.log("category:", category);
  console.log("subcategory:", sub_category);
  const ApiUrl = process.env.NEXT_PUBLIC_API_URL;


  try{
    const data = await axios.post(ApiUrl+ "posts?slug=" +sub_category)
    return {
      props: {
        resultData : data
      },
    };
  }catch(error){
    console.log("error while fetching th data")
  }
  
}
