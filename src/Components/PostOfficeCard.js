import React from "react";
import "../styles/postOfficeCard.scss";

const PostOfficeCard = ({ postOffice }) => {
  return (
    <div className="post_office_card">
      <p>
        Name: <span>{postOffice.Name}</span>
      </p>
      <p>
        Branch Type: <span>{postOffice.BranchType}</span>
      </p>
      <p>
        Delivery Status: <span>{postOffice.DeliveryStatus}</span>
      </p>
      <p>
        District: <span>{postOffice.District}</span>
      </p>
      <p>
        state: <span>{postOffice.State}</span>
      </p>
    </div>
  );
};

export default PostOfficeCard;
