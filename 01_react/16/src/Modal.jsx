import cn from 'classnames';
import React from 'react';

// BEGIN (write your solution here)
const Modal = ({ isOpen, children }) => (
  <div className={cn('modal', { fade: isOpen, show: isOpen })} style={{ display: isOpen ? 'block' : 'none' }} role="dialog">
    <div className="modal-dialog"><div className="modal-content">{children}</div></div>
  </div>
);
Modal.Header = ({ toggle, children }) => (
  <div className="modal-header">
    <div className="modal-title">{children}</div>
    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={toggle} />
  </div>
);
Modal.Body = ({ children }) => <div className="modal-body">{children}</div>;
Modal.Footer = ({ children }) => <div className="modal-footer">{children}</div>;
export default Modal;
// END
