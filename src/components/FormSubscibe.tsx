import React, { useState } from 'react';
import Link from 'next/link';

const FormSubscribe: React.FC<any> = ({ data }) => {
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const validateEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = () => {
    if (validateEmail(email)) {
      setIsSubmitted(true);
      setError('');
    } else {
      setError('Please enter a valid email address.');
    }
  };

  return (
    <div className="box-subscription container mt-0 mb-20">
      <div className="border-t border-b !py-8 border-slate-300">
        {isSubmitted ? (
          <p>Thank you for subscribing! Your new go-tos are waiting to be discovered.</p>
        ) : (
          <>
            <p>Your new go-tos are waiting to be discovered.</p>
            <div className="form-sub my-3 flex items-center">
              <input
                type="text"
                name='email'
                placeholder="Pop in your email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button className="text-white bg-black" onClick={handleSubmit}>
                SHOP THEM NOW.
              </button>
            </div>
            {error && <p className="text-red-500 text-xs mb-2">{error}</p>}
            <p className="text-xs leading-5 font-light">
              By signing up, I agree to the <Link href="/term-of-use" className="underline">Terms of Use</Link> (including the <Link href="/" className="underline">dispute resolution procedures</Link>) and have reviewed the <Link href="/privacy-policy" className="underline">Privacy Notice</Link>.
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default FormSubscribe;
