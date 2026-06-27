/**
 * Shown only on /sandbox — preview of repositioned LP before merge to /.
 */
export function SandboxBanner() {
  return (
    <div className="sandbox-banner" role="status">
      <p>
        <strong>Preview sandbox</strong> — repositioned copy and layout for review. Current homepage:{' '}
        <a href="/">simple-screen-recorder.com/</a>
      </p>
    </div>
  );
}
