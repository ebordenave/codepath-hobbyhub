import {useEffect} from "react";
import supabase from "../config/client.js";


export const Login = () => {
  useEffect(() => {
    supabase.auth.getSession().then(({data:{session}}) => {
      setSession(session)
    })
  }, []);
  return <></>;
};