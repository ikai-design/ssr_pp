import ErrorShell from '../components/ErrorShell';

export default function NotFound() {
  return (
    <ErrorShell
      code="404"
      title="Page not found"
      description="The page you requested doesn’t exist or may have been moved. Check the URL, or return to the homepage."
      documentTitle="Page not found (404) | Simple Screen Recorder"
    />
  );
}
