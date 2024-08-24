import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loader from "../Loader/Loader";
import "../styles/PostOffices.scss";
import PostOfficeCard from "./PostOfficeCard";

const PostOffices = () => {
  //Extracting pincode from path parameter.
  const { pincode } = useParams();
  //setting message state for showing message.
  const [message, setMessage] = useState("");
  // Setting data state for holding fetched data.
  const [data, setData] = useState([]);
  // Setting filteredArray for managing filtered data.
  const [filteredArray, setFilteredArray] = useState([]);
  //Setting apiStatus state for showing loader and Error messages
  const [apiStatus, setApiStatus] = useState("pending");

  // fetchData for fetching data from the API.
  const fetchData = async () => {
    try {
      const res = await axios(
        ` https://api.postalpincode.in/pincode/${pincode}`
      );
      if (res.data[0].Status === "Success") {
        //If status is success then setting the states.
        setData(res.data[0].PostOffice);
        setFilteredArray(res.data[0].PostOffice);
        setApiStatus("success");
        setMessage(res.data[0].Message);
      } else {
        // If status is not success then throwing the error
        throw new Error(res.data[0].Message);
      }
    } catch (error) {
      // Catching the error and setting the apiStatus as failed to show the message.
      setApiStatus("failed");
      setMessage(error.message);
      console.log(error);
    }
  };

  // filterData function to filter the data based on the input.
  const filterData = (e) => {
    const value = e.target.value.toLowerCase();
    const newData = data.filter((item) =>
      item.Name.toLowerCase().includes(value)
    );
    setFilteredArray(newData);
  };

  // Using useEffect hook for fetching data when the component is mounted.
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      {/* If apiStatus is pending then showing the loader */}
      {apiStatus === "pending" && <Loader />}
      {/* If apiStatus is failed then showing the failed message. */}
      {apiStatus === "failed" && <h2 className="not_found_error">{message}</h2>}
      {/* If apiStatus is success then showing the post offices. */}
      {apiStatus === "success" && (
        <div id="post_container">
          <div className="header">
            <h1>
              Pincode: <span>{pincode}</span>
            </h1>
            <h1>
              Message: <span className="message">{message}</span>
            </h1>
          </div>
          <div className="filter">
            <span className="material-icons">search</span>
            <input type="text" placeholder="Filter" onInput={filterData} />
          </div>

          {/* mapping the data for showing the post offices. */}
          {Boolean(filteredArray.length) ? (
            <div className="post_offices">
              {filteredArray.map((postOffice, index) => (
                <PostOfficeCard key={index} postOffice={postOffice} />
              ))}
            </div>
          ) : (
            // If filteredArray have no Data object then showing this message.
            <h2 className="not_found_error">
              Couldn’t find the postal data you’re looking for…
            </h2>
          )}
        </div>
      )}
    </>
  );
};

export default PostOffices;
