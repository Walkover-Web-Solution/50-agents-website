'use client';

import React, { useLayoutEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { Box } from '@mui/material';
import Cookies from 'js-cookie';

export default function LoginClient() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();
  const proxy_auth_token = searchParams.get('proxy_auth_token') as string | undefined;
  const autoClose = (searchParams.get('autoclose')?.toLowerCase() === 'true') as boolean;
  const state = JSON.parse(searchParams.get('state') || '{}');

  async function runEffect() {
    if (localStorage.getItem('proxy_auth_token')) {
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
      localStorage.setItem('proxy_auth_token', proxy_auth_token);
      Cookies.set('proxy_auth_token', proxy_auth_token, { expires: 365 });
      if (state.autoClose) {
        window.close();
      } else {
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

    const configuration = {
      referenceId: '870623b1736406370677f756255301',
      state: JSON.stringify({ autoClose }),
      theme: 'light',
      addInfo: {
        redirect_path: '/login',
      },
      success: (data: unknown) => {
        console.dir('success response', data);
      },
      failure: (error: Error) => {
        console.error('failure reason', error);
      },
    };

    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.onload = () => {
      const checkInitVerification = setInterval(() => {
        if (typeof (window as unknown as { initVerification?: (c: typeof configuration) => void }).initVerification === 'function') {
          clearInterval(checkInitVerification);
          (window as unknown as { initVerification: (c: typeof configuration) => void }).initVerification(configuration);
        }
      }, 100);
    };
    script.src = 'https://proxy.msg91.com/assets/proxy-auth/proxy-auth.js';
    document.body.appendChild(script);
  }

  useLayoutEffect(() => {
    runEffect();
  }, []);

  return (
    <Box className="w-screen flex justify-center items-center pb-16">
      {loading ? (
        <Box>loading...</Box>
      ) : (
        <Box className="dark:bg-white p-20 rounded-xl shadow-lg" id="870623b1736406370677f756255301" />
      )}
    </Box>
  );
}