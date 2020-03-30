import React from 'react';
import Link from 'next/link';
// import styled from 'styled-components';

// import Layout from '../components/layouts/marketing';

const SignUp = () => {
  return (
    <div>
      <p>Sign In</p>

      <p>
        Don't have an account? Not a problem,{' '}
        <Link href="/sign-up">Sign Up here</Link>.
      </p>
    </div>
  );
};

export default SignUp;
