'use client';

import React, { Suspense, useLayoutEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';

function Login() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const proxy_auth_token = searchParams.get('proxy_auth_token') as string | undefined;
  const autoClose = (searchParams.get('autoclose')?.toLowerCase() === 'true') as boolean;
  const state = JSON.parse(searchParams.get('state') || '{}');

  async function runEffect() {
    if (localStorage.getItem('proxy_auth_token')) {
      // Check for stored redirect URL first
      const redirectUrl = localStorage.getItem('redirectAfterLogin');
      if (redirectUrl) {
        localStorage.removeItem('redirectAfterLogin');
        router.push(redirectUrl);
        return;
      }

      router.push('/org');
      return;
    }

    if (proxy_auth_token) {
      setLoading(true);
      // setInCookies('prod', proxy_auth_token || "")
      localStorage.setItem('proxy_auth_token', proxy_auth_token);
      Cookies.set('proxy_auth_token', proxy_auth_token, { expires: 365 });
      if (state.autoClose) {
        window.close();
      } else {
        // Check for stored redirect URL first
        const redirectUrl = localStorage.getItem('redirectAfterLogin');
        if (redirectUrl) {
          localStorage.removeItem('redirectAfterLogin');
          router.push(redirectUrl);
        } else {
          router.push('/org');
        }
      }
      setLoading(false);
      return;
    }

    // If the user has not logged in, redirect the user to the login page
    const configuration = {
      referenceId: '870623b1736406370677f756255301',
      state: JSON.stringify({ autoClose }),
      theme: 'light',
      addInfo: {
        redirect_path: '/login',
      },
      success: (data: any) => {
        // Called when the user is successfully authenticated
        // Get the verified token in response
        console.dir('success response', data);
      },
      failure: (error: Error) => {
        // Called when there is an error
        // Handle the error
        console.error('failure reason', error);
      },
    };

    // Load the login script from msg91

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => {
      const checkInitVerification = setInterval(() => {
        if (typeof (window as any).initVerification === 'function') {
          clearInterval(checkInitVerification);
          (window as any).initVerification(configuration); // Initialize the login
        }
      }, 100);
    };
    script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js';
    document.body.appendChild(script); // Add the script to the page
  }
  useLayoutEffect(() => {
    runEffect();
  }, []);

  return (
    <Box className=" w-screen h-full flex justify-center items-center">
      {loading ? (
        <Box>loading...</Box>
      ) : (
        <Box className="dark:bg-white p-20 rounded-xl shadow-lg" id="870623b1736406370677f756255301" />
      )}
    </Box>
  );
}
export default function loginPage() {
  return (
    <Suspense fallback="loading...">
      <Login />
    </Suspense>
  );
}
