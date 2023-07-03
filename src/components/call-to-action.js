import React from "react"

const CallToAction = ({ title, body, image, link }) => {
  return (
    <div className="call-to-action">
      <div className="call-to-action-overlay">
        <div className="call-to-action-content boxed-regular">
          <h2>{ title }</h2>
          <p>{ body }</p>
          { link }
        </div>
      </div>
      <div className="call-to-action-image">
        { image }
      </div>
    </div>
  );
}

export default CallToAction