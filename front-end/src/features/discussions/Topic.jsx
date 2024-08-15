import styled from "styled-components";
import {
  CiTextAlignLeft,
  CiTextAlignJustify,
  CiTextAlignRight,
} from "react-icons/ci";
import Button from "../../ui/Button";
import { useInView } from "react-intersection-observer";
import { useEffect, useRef, useState } from "react";
import {
  Form,
  Link,
  redirect,
  useActionData,
  useFetcher,
  useLoaderData,
  useNavigate,
  useOutlet,
  useOutletContext,
  useParams,
  useSearchParams,
} from "react-router-dom";
import { formattedDateTime, formattedDate } from "../../helpers/helpers";

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
    padding: 6rem 3rem 6rem;

    &:first-of-type {
      border-top-left-radius: var(--border-radius--medium);
      border-top-right-radius: var(--border-radius--medium);
    }

    &:last-of-type {
      padding-bottom: 10.5rem;
      border-bottom-left-radius: 175px;
      border-bottom-right-radius: 175px;
      padding-bottom: 9em;
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
      gap: 10rem;

      .author {
        width: 20rem;
        flex-shrink: 0;
        display: flex;
        flex-direction: column;
        gap: 1rem;
        align-items: center;

        &__username {
          font-weight: 600;
          font-size: 2rem;
        }

        .avatar {
          width: 10rem;
          height: 10rem;
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
      margin-top: 3rem;
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
      z-index: 9999;

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

        &:hover {
          color: var(--color-yellow--light);
        }

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

  .error {
    margin-bottom: 1rem;
  }
`;
import { BiSkipNext } from "react-icons/bi";
import { TbPlayerTrackNextFilled } from "react-icons/tb";
import { getPostsPerTopic, publishPost } from "../../services/discussionsApi";
import StyledForm from "../../ui/StyledForm";

function Topic() {
  const { ref, inView, entry } = useInView();
  const [fixedNow, setFixedNow] = useState(false);
  const navigate = useNavigate();
  const { posts, pagesTotal } = useLoaderData();
  const { id } = useParams();

  const [searchParams] = useSearchParams();
  const page = +searchParams.get("page") || 1;

  const mainElementInDom = useOutletContext();

  useEffect(() => {
    setFixedNow(!inView);
  }, [inView]);

  useEffect(() => {
    if (posts.length === 0) {
      navigate(`/app/discussions/${id}?page=${pagesTotal}`);
    }
  }, []);

  useEffect(() => {
    mainElementInDom?.current?.scrollTo({ top: 0 });
  }, [page]);

  const actionFeedback = useActionData();

  const textarea = useRef();

  const publishedPost = searchParams.get("publishedPost");
  useEffect(() => {
    setTimeout(() => {
      if (publishedPost) {
        document
          .getElementById(`${publishedPost}`)
          .scrollIntoView({ behavior: "smooth" });
      }
      textarea.current.value = "";
    }, 500);
    //500ms tso the user can notice the transition: top first, then down to the post
  }, [publishedPost]);

  console.log(posts);

  return (
    <StyledTopic>
      <header ref={ref} className="topic-header">
        <h1 className="topic-title secondary-heading">Hello everyone!</h1>
        <nav className={`pagination ${fixedNow ? "fixed" : ""}`}>
          <h3 className="pagination__header">Current page: </h3>
          {page > 2 && (
            <Link to="/app/discussions/11?page=1" className="rotate icon">
              <TbPlayerTrackNextFilled />
            </Link>
          )}
          {page > 1 && (
            <Link
              to={`/app/discussions/11?page=${page - 1}`}
              className="rotate icon increase-more"
            >
              <BiSkipNext />
            </Link>
          )}
          <span>{page}</span>
          {page < pagesTotal && (
            <Link
              to={`/app/discussions/11?page=${page + 1}`}
              className="icon increase-more"
            >
              <BiSkipNext />
            </Link>
          )}
          {page < pagesTotal - 1 && (
            <Link
              to={`/app/discussions/11?page=${pagesTotal}`}
              className="icon"
            >
              <TbPlayerTrackNextFilled />
            </Link>
          )}
        </nav>
      </header>

      <div className="container">
        <ul className="posts">
          {posts.map((post) => (
            <li key={post.postId} id={post.postId} className="post">
              <article>
                <header className="post-header">
                  <p className="timestamp">
                    {formattedDateTime(post.postedDate)}
                  </p>
                </header>
                <div className="main-content">
                  <aside className="author">
                    <p className="author__username">{post.authorUsername}</p>
                    <img
                      className="avatar"
                      src={`http://localhost:8080/images/${
                        post.authorAvatar || `default_avatar.jpg`
                      }`}
                      alt="avatar"
                    />
                    <p className="join-date">
                      <span className="sub-heading">Joined: </span>
                      {formattedDate(post.authorJoinDateTime)}
                    </p>
                    <p className="messages-total">
                      <span className="sub-heading">Total messages: </span>{" "}
                      {post.authorTotalMessages}
                    </p>
                  </aside>
                  <section className="post-text">{post.postText}</section>
                </div>
              </article>
            </li>
          ))}
        </ul>
        <Form method="post" className="editor">
          <h2 className="tertiary-heading">Write a reply:</h2>
          <div className="editor__area">
            <div className="line">
              <CiTextAlignLeft />
              <CiTextAlignJustify />
              <CiTextAlignRight />
            </div>
            <textarea ref={textarea} name="text" className="text-input-area" />
            <input type="hidden" value={id} name="topicId" />
          </div>
          <div>
            {actionFeedback?.inputError && (
              <p className="error">{actionFeedback.message}</p>
            )}
            <Button>Post message</Button>
          </div>
        </Form>
      </div>
    </StyledTopic>
  );
}

export default Topic;

export async function loader({ params, request }) {
  const topicId = +params.id;
  if (topicId < 1) throw new Error("Invalid topicId argument ( <0)");
  const url = new URL(request.url);
  const page = url.searchParams.get("page") || 1;
  return await getPostsPerTopic(topicId, page);
}

export async function action({ request }) {
  const { text, topicId } = Object.fromEntries(await request.formData());
  if (!text || text.length < 5 || text.legnth > 1500) {
    return {
      inputError: true,
      message: "Invalid text input format: it should be 5-1500 characters long",
    };
  }
  const { pagesTotal, postId } = await publishPost(topicId, text);
  return redirect(
    `/app/discussions/${topicId}?page=${pagesTotal}&publishedPost=${postId}`
  );
}
