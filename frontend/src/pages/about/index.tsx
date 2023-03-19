import { useLayoutEffect } from 'react';

const AboutPage = () => {
  useLayoutEffect(() => {
    document.title = 'About | Applifting Blog';
  }, []);
  return (
    <>
      <h1>About page</h1>
    </>
  );
};

export default AboutPage;
