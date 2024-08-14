import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";

import { FaFileDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";
import { useFetcher } from "react-router-dom";

const StyledDiv = styled.div`
  .settings__avatar {
    .row {
      display: flex;
      align-items: center;
      gap: 5rem;

      .avatar {
        width: 15rem;
        height: 15rem;
        border-radius: 50%;
        border: 1rem solid var(--color-grey);
      }

      .avatar__description {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        text-align: center;

        .file-input {
          display: none;
        }

        .warning {
          max-width: 40rem;
          padding: 1rem 2rem;
          background-color: var(--color-success-transparent);
          font-size: var(--font-size--xs);
          display: flex;
          justify-content: center;
          align-items: center;
          text-align: center;
        }

        .avatar__actions {
          display: flex;
          justify-content: center;
          align-items: center;
          margin-top: 2rem;
          gap: 2rem;

          .download-avatar,
          .delete-avatar {
            transition: all 300ms;

            &:hover {
              color: var(--color-yellow--light);
              cursor: pointer;
            }
          }

          .download-avatar {
            font-size: 4rem;
            transform: translateY(3px);
          }

          .delete-avatar {
            font-size: 5.5rem;
          }
        }
      }
    }
  }
`;

function PictureSubSettings() {
  const [avatar, setAvatar] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  function handleImageUpload(e) {
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Store image data in state
    };
    reader.readAsDataURL(image);
    setAvatar(image);
  }

  function handleRemovingTheImage() {
    setImagePreview(null);
    setAvatar(null);
  }

  const fetcher = useFetcher();

  return (
    <StyledDiv>
      <form className="settings__avatar">
        <h2 className="tertiary-heading settings__heading">Appearance</h2>
        <div className="row">
          <img
            src={imagePreview || `/avatar.jpg`}
            alt="Profile picture"
            className="avatar"
          />
          <div className="avatar__description">
            <p className="warning">
              In order for the profile picture to appear correctly choose file
              with the same dimensions (width = height)
            </p>
            <input
              onChange={handleImageUpload}
              className="file-input"
              id="avatar"
              type="file"
              accept="image/*"
              name="image"
            />
            <div className="avatar__actions">
              <label className="avatar__label" name="avatar" htmlFor="avatar">
                <FaFileDownload className="download-avatar" />
              </label>
              <MdDeleteForever
                onClick={handleRemovingTheImage}
                className="delete-avatar"
              />
              <Button className="btn--upload" size="small" type="submit">
                Upload
              </Button>
            </div>
          </div>
        </div>
      </form>
      <img src="http://localhost:8080/avatar.jpg" alt="" />
    </StyledDiv>
  );
}

export default PictureSubSettings;
