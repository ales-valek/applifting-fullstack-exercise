import ButtonLink from 'components/button-link';

const NotFoundPage = () => {
  return (
    <>
      <h1>Page was not found</h1>
      <ButtonLink variant="link-primary" to="/">
        Back to homepage
      </ButtonLink>
    </>
  );
};

export default NotFoundPage;
