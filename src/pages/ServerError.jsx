import ErrorShell from '../components/ErrorShell';

export default function ServerError() {
  return (
    <ErrorShell
      code="500"
      title="Something went wrong"
      description="We couldn’t complete that request. Please try again in a few moments. If the problem continues, contact support with what you were trying to do."
      documentTitle="Server error | Simple Screen Recorder"
      showReload
    />
  );
}
