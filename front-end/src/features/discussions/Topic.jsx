import styled from "styled-components";
import {
  CiTextAlignLeft,
  CiTextAlignJustify,
  CiTextAlignRight,
} from "react-icons/ci";
import Button from "../../ui/Button";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const StyledTopic = styled.div`
  .container {
    box-shadow: var(--shadow-dark--light);
  }

  .posts {
    background-color: var(--color-grey--light);
    border-top-left-radius: var(--border-radius--medium);
    border-top-right-radius: var(--border-radius--medium);
    overflow: hidden;
  }

  .post {
    background-color: var(--color-grey);
    padding: 6rem 3rem 9rem;

    &:first-of-type {
      border-top-left-radius: var(--border-radius--medium);
      border-top-right-radius: var(--border-radius--medium);
    }

    &:last-of-type {
      padding-bottom: 10.5rem;
      border-bottom-left-radius: 175px;
      border-bottom-right-radius: 175px;
    }

    &:not(:last-child) {
      border-bottom: 3px solid var(--color-black--light);
    }

    .post-header {
      display: flex;
      justify-content: center;

      .timestamp {
        margin-bottom: 2rem;
        font-size: 1.2rem;
        font-style: italic;
        position: relative;

        &::after,
        &::before {
          content: "";
          position: absolute;
          top: 50%;
          transform: translateY(-50%);
          height: 0.5px;
          width: 10rem;
          background-color: var(--color-white);
        }

        &::after {
          left: 105%;
        }

        &::before {
          right: 105%;
        }
      }
    }

    .main-content {
      display: flex;
      gap: 3rem;

      .author {
        width: 20rem;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        align-items: center;

        .avatar {
          width: 10rem;
          border-radius: 50%;
          margin-bottom: 2rem;
        }
      }

      .post-text {
        flex-grow: 1;
      }
    }
  }

  .editor {
    background-color: var(--color-grey--light);
    padding: 6rem 10%;
    border-bottom-left-radius: var(--border-radius--medium);
    border-bottom-right-radius: var(--border-radius--medium);
    text-align: center;
    display: flex;
    flex-direction: column;

    &__area {
      box-shadow: var(--shadow-dark--light);
      margin-bottom: 3rem;
      border-radius: var(--border-radius--tiny);

      .line {
        background-color: #fed7aa6c;
        padding: 1rem 0;
        display: flex;
        justify-content: center;
        gap: 1rem;
        font-size: 2rem;
      }

      .text-input-area {
        min-height: 20rem;
        display: block;

        border: none;
        resize: none;
        padding: 1rem;
        font-family: inherit;
        font-size: inherit;
        color: var(--color-grey);
        width: 100%;

        &:focus {
          outline: none;
        }
      }
    }

    button {
      align-self: center;
    }
  }

  .topic-header {
    display: flex;
    flex-direction: row;
    gap: 1rem;
    padding-bottom: 2rem;
    justify-content: space-between;

    .topic-title {
      text-transform: uppercase;
    }

    .pagination {
      display: flex;
      align-items: center;
      color: white;
      gap: 0.5rem;

      &__header {
        margin-right: 3rem;
      }

      .rotate {
        transform: rotate(180deg);
        transform-origin: center;
      }

      .icon {
        font-size: 2rem;
        display: flex;
        align-items: center;
        color: inherit;

        &.increase-more {
          font-size: 4rem;
        }
      }

      &.fixed {
        position: fixed;
        top: 0;
        right: 16px;
        width: calc(100% - 41.6rem);
        display: flex;
        justify-content: center;
        padding: 1rem 0;
        background-color: #00000036;
        backdrop-filter: blur(50px);
      }
    }
  }
`;
import { BiSkipNext } from "react-icons/bi";
import { TbPlayerTrackNextFilled } from "react-icons/tb";

function Topic() {
  const { ref, inView, entry } = useInView();
  const [fixedNow, setFixedNow] = useState(false);

  useEffect(() => {
    setFixedNow(!inView);
  }, [inView]);

  console.log(fixedNow);

  return (
    <StyledTopic>
      <header ref={ref} className="topic-header">
        <h1 className="topic-title secondary-heading">Hello everyone!</h1>
        <nav className={`pagination ${fixedNow ? "fixed" : ""}`}>
          <h3 className="pagination__header">Current page: </h3>
          <Link className="rotate icon">
            <TbPlayerTrackNextFilled />
          </Link>
          <Link className="rotate icon increase-more">
            <BiSkipNext />
          </Link>
          <span>2</span>
          <Link className="icon increase-more">
            <BiSkipNext />
          </Link>
          <Link className="icon">
            <TbPlayerTrackNextFilled />
          </Link>
        </nav>
      </header>

      <div className="container">
        <ul className="posts">
          <li className="post">
            <article>
              <header className="post-header">
                <p className="timestamp">09/07/2024 16:23</p>
              </header>
              <div className="main-content">
                <aside className="author">
                  <img className="avatar" src="/avatar.jpg" alt="avatar" />
                  <p className="join-date">
                    <span className="sub-heading">Joined: </span>09 07 2024
                  </p>
                  <p className="messages-total">
                    <span className="sub-heading">Total messages: </span> {`26`}
                  </p>
                </aside>
                <section className="post-text">
                  <button>Prev</button>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  quas reiciendis quasi sunt quam quibusdam rem doloremque
                  exercitationem rerum non, laboriosam sint, iure blanditiis,
                  aperiam similique nam quis? Soluta, assumenda. Commodi ipsum
                  beatae voluptates. Amet quo dolor, autem possimus, reiciendis
                  ab reprehenderit tenetur provident distinctio vel nisi illum,
                  cupiditate ipsam nesciunt rem nostrum quidem? Ducimus fugiat
                  atque doloremque eos commodi! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ab quas reiciendis quasi sunt
                  quam quibusdam rem doloremque exercitationem rerum non,
                  laboriosam sint, iure blanditiis, aperiam similique nam quis?
                  Soluta, assumenda. Commodi ipsum beatae voluptates. Amet quo
                  dolor, autem possimus, reiciendis ab reprehenderit tenetur
                  provident distinctio vel nisi illum, cupiditate ipsam nesciunt
                  rem nostrum quidem? Ducimus fugiat atque doloremque eos
                  commodi
                </section>
              </div>
            </article>
          </li>
          <li className="post">
            <article>
              <header className="header">
                <p className="timestamp">09/07/2024 16:23</p>
              </header>
              <div className="main-content">
                <aside className="author">
                  <img className="avatar" src="/avatar.jpg" alt="avatar" />
                  <p className="join-date">
                    <span className="sub-heading">Joined: </span>09 07 2024
                  </p>
                  <p className="messages-total">
                    <span className="sub-heading">Total messages: </span> {`26`}
                  </p>
                </aside>
                <section className="post-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  quas reiciendis quasi sunt quam quibusdam rem doloremque
                  exercitationem rerum non, laboriosam sint, iure blanditiis,
                  aperiam similique nam quis? Soluta, assumenda. Commodi ipsum
                  beatae voluptates. Amet quo dolor, autem possimus, reiciendis
                  ab reprehenderit tenetur provident distinctio vel nisi illum,
                  cupiditate ipsam nesciunt rem nostrum quidem? Ducimus fugiat
                  atque doloremque eos commodi! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ab quas reiciendis quasi sunt
                  quam quibusdam rem doloremque exercitationem rerum non,
                  laboriosam sint, iure blanditiis, aperiam similique nam quis?
                  Soluta, assumenda. Commodi ipsum beatae voluptates. Amet quo
                  dolor, autem possimus, reiciendis ab reprehenderit tenetur
                  provident distinctio vel nisi illum, cupiditate ipsam nesciunt
                  rem nostrum quidem? Ducimus fugiat atque doloremque eos
                  commodi
                </section>
              </div>
            </article>
          </li>
          <li className="post">
            <article>
              <header className="header">
                <p className="timestamp">09/07/2024 16:23</p>
              </header>
              <div className="main-content">
                <aside className="author">
                  <img className="avatar" src="/avatar.jpg" alt="avatar" />
                  <p className="join-date">
                    <span className="sub-heading">Joined: </span>09 07 2024
                  </p>
                  <p className="messages-total">
                    <span className="sub-heading">Total messages: </span> {`26`}
                  </p>
                </aside>
                <section className="post-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  quas reiciendis quasi sunt quam quibusdam rem doloremque
                  exercitationem rerum non, laboriosam sint, iure blanditiis,
                  aperiam similique nam quis? Soluta, assumenda. Commodi ipsum
                  beatae voluptates. Amet quo dolor, autem possimus, reiciendis
                  ab reprehenderit tenetur provident distinctio vel nisi illum,
                  cupiditate ipsam nesciunt rem nostrum quidem? Ducimus fugiat
                  atque doloremque eos commodi! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ab quas reiciendis quasi sunt
                  quam quibusdam rem doloremque exercitationem rerum non,
                  laboriosam sint, iure blanditiis, aperiam similique nam quis?
                  Soluta, assumenda. Commodi ipsum beatae voluptates. Amet quo
                  dolor, autem possimus, reiciendis ab reprehenderit tenetur
                  provident distinctio vel nisi illum, cupiditate ipsam nesciunt
                  rem nostrum quidem? Ducimus fugiat atque doloremque eos
                  commodi
                </section>
              </div>
            </article>
          </li>
          <li className="post">
            <article>
              <header className="header">
                <p className="timestamp">09/07/2024 16:23</p>
              </header>
              <div className="main-content">
                <aside className="author">
                  <img className="avatar" src="/avatar.jpg" alt="avatar" />
                  <p className="join-date">
                    <span className="sub-heading">Joined: </span>09 07 2024
                  </p>
                  <p className="messages-total">
                    <span className="sub-heading">Total messages: </span> {`26`}
                  </p>
                </aside>
                <section className="post-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  quas reiciendis quasi sunt quam quibusdam rem doloremque
                  exercitationem rerum non, laboriosam sint, iure blanditiis,
                  aperiam similique nam quis? Soluta, assumenda. Commodi ipsum
                  beatae voluptates. Amet quo dolor, autem possimus, reiciendis
                  ab reprehenderit tenetur provident distinctio vel nisi illum,
                  cupiditate ipsam nesciunt rem nostrum quidem? Ducimus fugiat
                  atque doloremque eos commodi! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ab quas reiciendis quasi sunt
                  quam quibusdam rem doloremque exercitationem rerum non,
                  laboriosam sint, iure blanditiis, aperiam similique nam quis?
                  Soluta, assumenda. Commodi ipsum beatae voluptates. Amet quo
                  dolor, autem possimus, reiciendis ab reprehenderit tenetur
                  provident distinctio vel nisi illum, cupiditate ipsam nesciunt
                  rem nostrum quidem? Ducimus fugiat atque doloremque eos
                  commodi
                </section>
              </div>
            </article>
          </li>
          <li className="post">
            <article>
              <header className="header">
                <p className="timestamp">09/07/2024 16:23</p>
              </header>
              <div className="main-content">
                <aside className="author">
                  <img className="avatar" src="/avatar.jpg" alt="avatar" />
                  <p className="join-date">
                    <span className="sub-heading">Joined: </span>09 07 2024
                  </p>
                  <p className="messages-total">
                    <span className="sub-heading">Total messages: </span> {`26`}
                  </p>
                </aside>
                <section className="post-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  quas reiciendis quasi sunt quam quibusdam rem doloremque
                  exercitationem rerum non, laboriosam sint, iure blanditiis,
                  aperiam similique nam quis? Soluta, assumenda. Commodi ipsum
                  beatae voluptates. Amet quo dolor, autem possimus, reiciendis
                  ab reprehenderit tenetur provident distinctio vel nisi illum,
                  cupiditate ipsam nesciunt rem nostrum quidem? Ducimus fugiat
                  atque doloremque eos commodi! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ab quas reiciendis quasi sunt
                  quam quibusdam rem doloremque exercitationem rerum non,
                  laboriosam sint, iure blanditiis, aperiam similique nam quis?
                  Soluta, assumenda. Commodi ipsum beatae voluptates. Amet quo
                  dolor, autem possimus, reiciendis ab reprehenderit tenetur
                  provident distinctio vel nisi illum, cupiditate ipsam nesciunt
                  rem nostrum quidem? Ducimus fugiat atque doloremque eos
                  commodi
                </section>
              </div>
            </article>
          </li>
          <li className="post">
            <article>
              <header className="header">
                <p className="timestamp">09/07/2024 16:23</p>
              </header>
              <div className="main-content">
                <aside className="author">
                  <img className="avatar" src="/avatar.jpg" alt="avatar" />
                  <p className="join-date">
                    <span className="sub-heading">Joined: </span>09 07 2024
                  </p>
                  <p className="messages-total">
                    <span className="sub-heading">Total messages: </span> {`26`}
                  </p>
                </aside>
                <section className="post-text">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab
                  quas reiciendis quasi sunt quam quibusdam rem doloremque
                  exercitationem rerum non, laboriosam sint, iure blanditiis,
                  aperiam similique nam quis? Soluta, assumenda. Commodi ipsum
                  beatae voluptates. Amet quo dolor, autem possimus, reiciendis
                  ab reprehenderit tenetur provident distinctio vel nisi illum,
                  cupiditate ipsam nesciunt rem nostrum quidem? Ducimus fugiat
                  atque doloremque eos commodi! Lorem ipsum dolor sit amet
                  consectetur adipisicing elit. Ab quas reiciendis quasi sunt
                  quam quibusdam rem doloremque exercitationem rerum non,
                  laboriosam sint, iure blanditiis, aperiam similique nam quis?
                  Soluta, assumenda. Commodi ipsum beatae voluptates. Amet quo
                  dolor, autem possimus, reiciendis ab reprehenderit tenetur
                  provident distinctio vel nisi illum, cupiditate ipsam nesciunt
                  rem nostrum quidem? Ducimus fugiat atque doloremque eos
                  commodi
                </section>
              </div>
            </article>
          </li>
        </ul>
        <div className="editor">
          <div className="editor__area">
            <div className="line">
              <CiTextAlignLeft />
              <CiTextAlignJustify />
              <CiTextAlignRight />
            </div>
            <textarea className="text-input-area" />
          </div>
          <Button>Post message</Button>
        </div>
      </div>
    </StyledTopic>
  );
}

export default Topic;

export async function action() {}
