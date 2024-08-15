import { useEffect, useRef, useState } from "react";
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
  const PATH_TO_SERVER = `http://localhost:8080/images/`;
  const defaultAvatarUrl = PATH_TO_SERVER + "default_avatar.jpg";

  // null (if null, then want to render defaultAvatarUrl) or actual image-name.jpg
  const userAvatar = useSelector((state) => state.auth.user.avatar);

  // actual bytes of image that we attach to the FormData
  const [imageFile, setImageFile] = useState(null);

  // initState === userAvatarUrl
  // if imagePreview == null, THEN defaultAvatar will be rendered
  const [imagePreview, setImagePreview] = useState(() =>
    userAvatar ? PATH_TO_SERVER + userAvatar : null
  );

  /* Had to introduce this state too, cause otherwise the preview will have an avatar, but input.value will have no image-file
   * and upon clicking UPLOAD, the null image will be sent to the server ==> user will end up with the default avatar.. Not the desired behaviour.
   * Only render the upload button, if the suer uploaded / deleted custom avatar (so there is a change compared to data state on the server)
   */
  const [actionPerformed, setActionPerformed] = useState(false);

  const dispatch = useDispatch();

  /* null = do not render a message
   * "success" / "false" messages
   * self-disappearing after 2.5s or on changing the preview (it only should be referring to the status of "upload to server" action
   * not changing the preview before comitting changes to the server)
   */
  const [resultStatus, setResultStatus] = useState(null);

  const inputField = useRef();

  function handleImageUpload(e) {
    setResultStatus(null); // result is available on actual upload to the server, not file / preview change to not confuse the user image was udpated pre-maturely
    const image = e.target.files[0]; // null is a valid option in my implementation
    const reader = new FileReader();
    reader.onloadend = () => {
      setImagePreview(reader.result); // this is a result of readingDataUrl for preview
    };
    reader.readAsDataURL(image);
    setImageFile(image);
    setActionPerformed(true);
  }

  function handleRemovingTheImage() {
    setResultStatus(null); // result is avaialable on actual upload to the server, not file / preview change to not confuse the user image was udpated pre-maturely
    setImagePreview(null);
    inputField;
    setImageFile(null);
    setActionPerformed(true);
    inputField.current.value = "";
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
        userAvatar ? PATH_TO_SERVER + userAvatar : defaultAvatarUrl
      );
      console.log("💥 ERROR LOG on uloading the image:", e);
    }
    // wil require another upload / delete (a new change) in order to upload again
    setActionPerformed(false);
  }

  useEffect(() => {
    let id;
    if (resultStatus !== null) {
      id = setTimeout(() => {
        setResultStatus(null);
      }, 2500);
    }
    return () => clearTimeout(id);
  }, [resultStatus]);

  return (
    <StyledDiv>
      <form className="settings__avatar" onSubmit={uploadAvatarToServer}>
        <h2 className="tertiary-heading settings__heading">Appearance</h2>
        <div className="row">
          <img
            src={imagePreview || defaultAvatarUrl}
            alt="Profile picture"
            className="avatar"
          />
          <div className="avatar__description">
            <p className="warning">
              In order for the profile picture to appear correctly choose file
              with the same dimensions (width = height)
            </p>
            <input
              ref={inputField}
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
              {imagePreview && (
                <MdDeleteForever
                  onClick={handleRemovingTheImage}
                  className="delete-avatar"
                />
              )}
              {actionPerformed &&
                !(imagePreview === null && userAvatar === null) && (
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
