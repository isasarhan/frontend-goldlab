"use client"

import { useState } from "react";

const OffCanvas = () => {
  const [showOffcanvas, setShowOffcanvas] = useState(false);

  return (
    <div>
      <button
        className="btn btn-primary"
        type="button"
        onClick={() => setShowOffcanvas(true)}
        data-bs-toggle="offcanvas"
        data-bs-target="#offcanvasScrolling"
        aria-controls="offcanvasScrolling"
      >
        Enable body scrolling
      </button>

      <div
        className={`offcanvas offcanvas-start${showOffcanvas ? ' show' : ''}`}
        data-bs-scroll="true"
        data-bs-backdrop="false"
        tabIndex="-1"
        id="offcanvasScrolling"
        aria-labelledby="offcanvasScrollingLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="offcanvasScrollingLabel">Offcanvas with body scrolling</h5>
          <button type="button" className="btn-close" onClick={() => setShowOffcanvas(false)} aria-label="Close"></button>
        </div>
        <div className="offcanvas-body">
          <p>Try scrolling the rest of the page to see this option in action.</p>
        </div>
      </div>
    </div>
  );
};

export default OffCanvas;
