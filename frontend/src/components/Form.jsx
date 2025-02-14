import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";

const Form = () => {
  const [prompt, setPrompt] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
  
    try {
      console.log("Sending prompt:", prompt); // Log the prompt
  
      const response = await axios.post(
        `http://localhost:5000/api/generate-image`, // Fixed URL
        { prompt }
      );
  
      setImageUrl(response.data.imageUrl);
    } catch (err) {
      console.error(err);
      alert("Failed to generate image");
    }
  
    setIsLoading(false);
  };
  
  const handleDownload = () => {
    if (imageUrl) {
      const link = document.createElement("a");
      link.href = imageUrl;
      link.download = "generated-image.png";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  };

  return (
    <StyledWrapper>
      <div className="container">
        <div className="form-container">
          <form className="form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Enter Prompt</label>
              <input
                type="text"
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Enter a prompt to generate an image..."
                required
              />
            </div>
            <button
              className="form-submit-btn"
              type="submit"
              disabled={isLoading}
            >
              {isLoading ? "Generating..." : "Generate"}
            </button>
          </form>
        </div>
        <div className="image-container">
        {imageUrl && (
                <>
                    <img src={imageUrl} alt="Generated" />
                    <button className="download-btn" onClick={handleDownload}>Download</button>
                </>
            )}
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .container {
    display: flex;
    align-items: center;
    justify-content: space-between; /* Pushes content to edges */
    gap: 80px; /* Increases space between form and image */
    padding: 40px;
  }

  .image-container {
    flex-grow: 1; /* Expands image container */
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 450px; /* Increase width */
    height: auto; /* Adjust height proportionally */
    border-radius: 10px;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.3);
  }

  .download-btn {
    margin-top: 15px;
    padding: 10px 20px;
    background: #313131;
    border: 1px solid #414141;
    border: none;
    color: #717171;
    font-family: inherit;
    font-size: inherit;
    font-weight: bold;
    border-radius: 8px;
    cursor: pointer;
    transition: 0.3s;
  }

  .download-btn:hover {
    background-color: #fff;
    border-color: #fff;
  }

  .form-container {
    width: 400px;
    background: linear-gradient(#212121, #212121) padding-box,
      linear-gradient(145deg, #e81cff, #40c9ff) border-box;
    border: 2px solid transparent;
    padding: 32px 24px;
    font-size: 14px;
    font-family: inherit;
    color: white;
    display: flex;
    flex-direction: column;
    gap: 20px;
    box-sizing: border-box;
    border-radius: 16px;
    margin-left: 70px;
  }

  .form-container button:active {
    scale: 0.95;
  }

  .form-container .form {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .form-container .form-group {
    display: flex;
    flex-direction: column;
    gap: 2px;
  }

  .form-container .form-group label {
    display: block;
    margin-bottom: 5px;
    color: #717171;
    font-weight: 600;
    font-size: 12px;
  }

  .form-container .form-group input {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    color: #fff;
    font-family: inherit;
    background-color: transparent;
    border: 1px solid #414141;
  }

  .form-container .form-group textarea {
    width: 100%;
    padding: 12px 16px;
    border-radius: 8px;
    resize: none;
    color: #fff;
    height: 96px;
    border: 1px solid #414141;
    background-color: transparent;
    font-family: inherit;
  }

  .form-container .form-group input::placeholder {
    opacity: 0.5;
  }

  .form-container .form-group input:focus {
    outline: none;
    border-color: #e81cff;
  }

  .form-container .form-group textarea:focus {
    outline: none;
    border-color: #e81cff;
  }

  .form-container .form-submit-btn {
    display: flex;
    align-items: flex-start;
    justify-content: center;
    align-self: flex-start;
    font-family: inherit;
    color: #717171;
    font-weight: 600;
    width: 40%;
    background: #313131;
    border: 1px solid #414141;
    padding: 12px 16px;
    font-size: inherit;
    gap: 8px;
    margin-top: 8px;
    cursor: pointer;
    border-radius: 6px;
  }

  .form-container .form-submit-btn:hover {
    background-color: #fff;
    border-color: #fff;
  }

  @media (max-width: 1024px) {
    .container {
        flex-direction: column;
        gap: 40px; /* Reduces gap */
        align-items: center;
        padding: 30px;
    }

    .form-container {
        width: 90%; /* Makes form scale well */
        margin-left: 0; /* Centers the form */
    }

    img {
        width: 80%; /* Reduces image size on smaller screens */
    }
}

@media (max-width: 768px) {
    .form-container {
        width: 100%;
        padding: 24px;
    }

    .form-container .form-submit-btn {
        width: 100%;
    }
}

@media (max-width: 480px) {
    .container {
        padding: 20px;
    }

    .form-container {
        padding: 20px;
    }

    img {
        width: 100%; /* Makes image full width */
    }
}
`;

export default Form;
