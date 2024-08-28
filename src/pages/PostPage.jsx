import React, { useState, useEffect } from "react";
import { useDbUpdate, useStorageUpload } from "../utilities/firebase";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const PostPage = () => {
  const { user } = useAuth();

  const [formData, setFormData] = useState({
    id: "",
    name: "", // mandatory
    description: "", // mandatory
    contactInfo: "", // mandatory,
    location: "", // mandatory
    image: "", // optional
    hidden: false,
    lostOrFound: "lost",
  });

  const [selectedOption, setSelectedOption] = useState("lost");
  let post_id = Date.now();

  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const [updateFoundPosts, resultFoundPosts] = useDbUpdate(
    `/foundPosts/${post_id}`
  );

  const [updateLostPosts, resultLostPosts] = useDbUpdate(
    `/lostPosts/${post_id}`
  );

  let navigate;
  if (user) {
    navigate = useNavigate();
  }

  const handleOptionChange = (e) => {
    setSelectedOption(e.target.value);
    handleInputChange(e);
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);
    const file = e.target.files[0]; // Get the first selected file
    if (file && file.type.match("image.*")) {
      // Optional: check if the file is an image
      // Now you have a reference to the selected image file
      // You can pass it to `handleInputChange` or handle it directly within this function
      // Or, if you want to pass the file to `handleInputChange`:
      // Create a new event object with the necessary information
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: [value, file] });
    } else {
      console.error("Please select an image file.");
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  useEffect(() => {
    const { name, description, contactInfo, location } = formData;
    const isFormValid = name && description && contactInfo && location;
    setIsSubmitDisabled(!isFormValid);
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("In submit");
    console.log("Form data submitted:", formData);
    const path = formData.image[0];
    const file = formData.image[1];
    let imageUrl = "";
    if (file || path) {
      await useStorageUpload(file, path)
        .then((url) => {
          console.log("Image uploaded successfully! Download URL:", url);
          imageUrl = url;
        })
        .catch((error) => {
          console.error("Error uploading image:", error);
        });
    }

    // only go through this process if a user exists (testing is going on)
    if (user) {
      const posts = {
        id: post_id,
        name: formData.name,
        description: formData.description,
        contactInfo: formData.contactInfo,
        location: formData.location,
        image: imageUrl,
        hidden: false,
        uid: user.uid,
      };

      if (formData.lostOrFound === "found") {
        updateFoundPosts({
          ...posts,
          lostOrFound: "found",
        });
        navigate("/");
      } else if (formData.lostOrFound === "lost") {
        const input = {
          ...posts,
          lostOrFound: "lost",
        };
        console.log(input);
        updateLostPosts(input);
        navigate("/lostpage");
      }
    }
  };

  return (
    <div className="container">
      <h2>Post Lost or Found Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description:</label>
          <input
            type="text"
            className="form-control"
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="contactInfo">Contact Info:</label>
          <input
            type="text"
            className="form-control"
            id="contactInfo"
            name="contactInfo"
            value={formData.contactInfo}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="location">Location Found/Lost:</label>
          <textarea
            className="form-control"
            id="location"
            name="location"
            value={formData.location}
            onChange={handleInputChange}
            required
          ></textarea>
        </div>
        <div className="form-group">
          <label htmlFor="image">Image (optional):</label>
          <input
            type="file"
            className="form-control"
            id="image"
            name="image"
            value={formData.image[0]}
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <br></br>
          <div>
            <label className="radio-inline">
              <input
                type="radio"
                name="lostOrFound"
                value="lost"
                checked={selectedOption === "lost"}
                onChange={handleOptionChange}
                className="mx-2"
              />
              Lost
            </label>
            <label className="radio-inline">
              <input
                type="radio"
                name="lostOrFound"
                value="found"
                checked={selectedOption === "found"}
                onChange={handleOptionChange}
                className="mx-2"
              />
              Found
            </label>
          </div>
        </div>
        <div className="form-group">
          <button
            type="submit"
            className="btn btn-primary my-2"
            disabled={isSubmitDisabled}
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PostPage;
