export function ContentRow({ title, body, visual, copyFooter, className, id, bareVisual }) {
  return (
    <article
      id={id}
      className={`v2-content-row${className ? ` ${className}` : ''}`}
    >
      <div className="v2-content-row__copy">
        <h3 className="v2-content-row__title">
          {title}
        </h3>
        {body ? <p className="v2-content-row__body v2-body-text">{body}</p> : null}
        {copyFooter ? <div className="v2-content-row__footer">{copyFooter}</div> : null}
      </div>
      {bareVisual ? (
        <div className="v2-content-row__visual v2-content-row__visual--animation">
          {visual}
        </div>
      ) : (
        <div className="v2-content-row__visual">{visual}</div>
      )}
    </article>
  );
}
