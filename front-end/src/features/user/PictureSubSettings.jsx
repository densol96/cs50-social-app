import { useEffect, useState } from "react";
import Button from "../../ui/Button";
import styled from "styled-components";

import { FaFileDownload } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

import { uploadAvatar } from "../../services/settingsApi";
import { useDispatch, useSelector } from "react-redux";

import { updateAvatar } from "./authSlice";

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

  .upload-result {
    margin-top: 6rem;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 8rem;
    border-radius: var(--border-radius--medium);
    animation-name: moveInFromRight;
    animation-duration: 1s;

    &--success {
      background-color: var(--color-success-transparent);
    }

    &--error {
      background-color: var(--color-error-transparent);
    }
  }
`;

const resultType = {
  SUCCESS: "success",
  ERROR: "error",
};

function PictureSubSettings() {
  const pathToImageStorageOnServer = `http://localhost:8080/images/`;
  const defaultAvatarUrl = pathToImageStorageOnServer + "default_avatar.jpg";
  const userAvatar = useSelector((state) => state.auth.user.avatar);

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(() =>
    userAvatar ? pathToImageStorageOnServer + userAvatar : defaultAvatarUrl
  );
  const [actionPerformed, setActionPerformed] = useState(false);

  const dispatch = useDispatch();

  const [resultStatus, setResultStatus] = useState(null);

  function handleImageUpload(e) {
    setResultStatus(null); // result is available on actual upload to the server, not file / preview change to not confuse the user image was udpated pre-maturely
    const image = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // Store image data in state
    };
    reader.readAsDataURL(image);
    setImageFile(image);
    setActionPerformed(true);
  }

  function handleRemovingTheImage() {
    setResultStatus(null); // result is avaialable on actual upload to the server, not file / preview change to not confuse the user image was udpated pre-maturely
    setImagePreview(defaultAvatarUrl);
    setImageFile(null);
    setActionPerformed(true);
  }

  async function uploadAvatarToServer(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append("image", imageFile);
    try {
      dispatch(updateAvatar(await uploadAvatar(formData)));
      setResultStatus(resultType.SUCCESS);
    } catch (e) {
      setResultStatus(resultType.ERROR);
      setImageFile(null);
      setImagePreview(
        userAvatar ? pathToImageStorageOnServer + userAvatar : defaultAvatarUrl
      );
      console.log("💥 ERROR LOG on uloading the image:", e);
    }
    // wil require another upload / delete (a new change) in order to upload again
    setActionPerformed(false);
  }

  useEffect(() => {
    if (resultStatus !== null) {
      setTimeout(() => {
        setResultStatus(null);
      }, 2500);
    }
  }, [resultStatus]);

  return (
    <StyledDiv>
      <form className="settings__avatar" onSubmit={uploadAvatarToServer}>
        <h2 className="tertiary-heading settings__heading">Appearance</h2>
        <div className="row">
          <img src={imagePreview} alt="Profile picture" className="avatar" />
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
              {(userAvatar || imageFile) && (
                <MdDeleteForever
                  onClick={handleRemovingTheImage}
                  className="delete-avatar"
                />
              )}
              {actionPerformed && (
                <Button className="btn--upload" size="small" type="submit">
                  Upload
                </Button>
              )}
            </div>
          </div>
        </div>
      </form>
      {resultStatus === resultType.SUCCESS && (
        <p key={new Date()} className="upload-result upload-result--success">
          Your profile picture has sucessfully been updated!
        </p>
      )}
      {resultStatus === resultType.ERROR && (
        <p key={new Date()} className="upload-result upload-result--error">
          Image upload service is curretnly down! Try again later 😿
        </p>
      )}
    </StyledDiv>
  );
}

export default PictureSubSettings;
