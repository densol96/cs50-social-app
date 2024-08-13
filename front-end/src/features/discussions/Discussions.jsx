import styled from "styled-components";
import StyledForm from "../../ui/StyledForm";
import Button from "../../ui/Button";
import AnimatedLink from "../../ui/AnimatedLink";
import { FaArrowRightToBracket } from "react-icons/fa6";
import {
  getAllDiscussions,
  createNewTopic,
} from "../../services/discussionsApi";
import {
  Form,
  useFetcher,
  useLoaderData,
  useSearchParams,
} from "react-router-dom";
import { useInView } from "react-intersection-observer";
import Spinner from "../../ui/Spinner";
import { useEffect, useRef, useState } from "react";
import ProblemMessage from "../../ui/ProblemMessage";
import { getActiveUsers } from "../../services/authApi";
import { formattedDateTime } from "../../helpers/helpers";
import {
  CiTextAlignLeft,
  CiTextAlignJustify,
  CiTextAlignRight,
} from "react-icons/ci";
import Switch from "../../ui/Switch";

const StyledDiscussions = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4.8rem;

  .header {
    display: flex;
    flex-direction: column;
    gap: 3rem;

    .stats {
      padding: 0 0 3rem;
      position: relative;
      margin-top: 3rem;

      &::after {
        position: absolute;
        content: "";
        height: 2px;
        width: 30rem;
        background-color: var(--color-white);
        bottom: 0;
        left: 50%;
        transform: translateX(-50%);
      }

      &__heading {
        margin-bottom: var(--spacing-s);
        text-transform: uppercase;
        letter-spacing: 2px;
      }

      .users {
        display: flex;
        flex-wrap: wrap;
        flex-direction: row;
        gap: 1rem;
        justify-content: center;
      }
    }

    .search {
      display: flex;
      justify-content: space-between;

      &__input {
        color: var(--color-grey);
        font-size: 1.8rem;
        width: 30rem;
      }
    }
  }

  .topics {
    &__list {
      display: flex;
      flex-direction: column;
      gap: 5rem;
    }

    .topic {
      background-color: var(--color-grey);

      display: flex;
      flex-direction: column;
      gap: 2rem;

      padding: 3rem;
      border-radius: 7px;

      box-shadow: var(--shadow-dark--light);

      &__stats {
        display: grid;
        grid-template-columns: 1fr 1fr;
      }

      &__subheading {
        font-weight: 700;
      }

      &__link {
        text-transform: uppercase;
        display: flex;
        align-self: center;
        gap: 2rem;
      }

      &__icon {
        margin-left: 0.5rem;
        display: flex;
        align-items: center;
      }

      &__description {
        display: flex;
        flex-direction: column;
        height: 10rem;
        overflow-y: auto;
      }
    }
  }

  .loader {
    text-align: center;
    margin-top: 3rem;
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
      margin-top: 3rem;
    }
  }

  .form-container {
    overflow-y: hidden;
    transition: all 500ms ease-out;
    border-radius: var(--border-radius--medium);
    box-shadow: var(--shadow-dark--light);
  }

  .name-topic-text-input {
    font-family: inherit;
    font-size: 1.6rem;
    padding: 0.5rem 1rem;
    margin-top: 1.5rem;
    color: var(--color-grey);
    outline: none;
  }
`;

function Discussions() {
  const { topics, pagesTotal: pagesTotalOnLoad, activeUsers } = useLoaderData();
  const { ref, inView, entry } = useInView();
  const [currentPage, setCurrentPage] = useState(1);
  const [discussions, setDiscussions] = useState(topics);
  const [pagesTotal, setPagesTotal] = useState();
  const [searchParams] = useSearchParams();
  const [searchTitle, setSearchTitle] = useState(
    () => searchParams.get("searchTitle") || ""
  );

  // errorElement is catching the exceptions, no need for additional error handling in the logic
  useEffect(() => {
    if (inView) {
      (async () => {
        const { topics } = await getAllDiscussions(
          currentPage + 1,
          searchTitle
        );
        setCurrentPage(currentPage + 1);
        setDiscussions((state) => [...state, ...topics]);
      })();
    }
  }, [inView]);

  useEffect(() => {
    (async () => {
      const { topics, pagesTotal } = await getAllDiscussions(1, searchTitle);
      setCurrentPage(1);
      setDiscussions(topics);
      setPagesTotal(pagesTotal);
    })();
  }, [searchTitle]);

  const createTopicSection = useRef();
  const [formOpen, setFormOpen] = useState(false);
  const fetcher = useFetcher();

  // After creating a new post via action
  useEffect(() => {
    if (!fetcher?.data?.invalidInputError) {
      setFormOpen(false);
      const switchIntheChildComponent = document.getElementById("switch");
      switchIntheChildComponent.click();
    }
    setTimeout(() => {
      setDiscussions(topics);
      setCurrentPage(1);
      setPagesTotal(pagesTotalOnLoad);
    }, 1000);
  }, [topics, pagesTotalOnLoad]);

  return (
    <StyledDiscussions>
      <header className="header">
        <h1 className="hidden">Discussions</h1>
        <section className="stats text-center">
          <h2 className="stats__heading">
            Currently active users {`{ ${activeUsers.length} }`}:
          </h2>
          <p className="users">
            {activeUsers?.map((user, i) => (
              <>
                {`${i === 0 ? "" : "-"}`}
                <span key={user}>{user}</span>
              </>
            ))}
          </p>
        </section>
        <form className="search" onSubmit={(e) => e.preventDefault()}>
          <input
            onChange={(e) => setSearchTitle(e.target.value)}
            value={searchTitle}
            placeholder="Search a topic by title..."
            className="search__input search-input"
            type="text"
          />
          <Switch onClick={() => setFormOpen(!formOpen)} />
        </form>
      </header>
      <section
        ref={createTopicSection}
        className={`create-topic form-container`}
        style={
          formOpen
            ? { height: createTopicSection.current.scrollHeight }
            : { height: 0 }
        }
      >
        <fetcher.Form method="post" className="editor">
          <h2 className="tertiary-heading">Create a new topic:</h2>
          <input
            name="title"
            className="name-topic-text-input"
            type="text"
            placeholder="Name a topic"
          />
          <div>
            {fetcher.data?.title && (
              <p key={new Date()} className="error">
                {fetcher.data.title}
              </p>
            )}
          </div>

          <div className="editor__area">
            <div className="line">
              <CiTextAlignLeft />
              <CiTextAlignJustify />
              <CiTextAlignRight />
            </div>
            <textarea
              placeholder="Compose a message"
              name="text"
              className="text-input-area"
            />
          </div>
          {fetcher.data?.text && (
            <p key={new Date()} className="error">
              {fetcher.data.text}
            </p>
          )}
          <div>
            <Button>Post message</Button>
          </div>
        </fetcher.Form>
      </section>
      <section className="topics">
        <ul className="topics__list">
          {discussions?.length === 0 && (
            <ProblemMessage>
              There are no any discussions at present 😥
            </ProblemMessage>
          )}
          {discussions?.length !== 0 &&
            discussions.map((discussion) => (
              <li key={discussion.id}>
                <article className="topic">
                  <h2 className="topic__title tertiary-heading">
                    {discussion.title}
                  </h2>
                  <div className="topic__stats">
                    <p>
                      Author:{" "}
                      <span className="topic__subheading">
                        {discussion.author.username}
                      </span>
                    </p>
                    <p>
                      Total messages:{" "}
                      <span className="topic__subheading">
                        {discussion.totalMessages}
                      </span>
                    </p>
                    <p>
                      Created:{" "}
                      <span className="topic__subheading">
                        {formattedDateTime(discussion.createdAt)}
                      </span>
                    </p>
                    <p>
                      Last updated:{" "}
                      <span className="topic__subheading">
                        {formattedDateTime(discussion.updatedAt)}
                      </span>
                    </p>
                  </div>
                  <p className="topic__description custom-scrollbar">
                    <span className="topic__subheading">Discussion:</span>{" "}
                    <span>{discussion.originalPost}</span>
                  </p>
                  <p className="topic__link">
                    <AnimatedLink
                      size="medium"
                      to={`/app/discussions/${discussion.id}`}
                    >
                      Open the topic{" "}
                      <span className="topic__icon">
                        <FaArrowRightToBracket />
                      </span>
                    </AnimatedLink>
                  </p>
                </article>
              </li>
            ))}
        </ul>
        {currentPage < pagesTotal && (
          <div ref={ref} className="loader">
            <Spinner />
          </div>
        )}
      </section>
    </StyledDiscussions>
  );
}

export default Discussions;

export async function loader({ request }) {
  console.log("I run");
  const page = 1;
  const url = new URL(request.url);
  const searchTitle = url.searchParams.get("searchTitle");
  const data = await getAllDiscussions(page, searchTitle);
  data.activeUsers = await getActiveUsers();
  return data;
}

export async function action({ request }) {
  const { title, text } = Object.fromEntries(await request.formData());
  try {
    await createNewTopic(title, text);
  } catch (e) {
    const errors = e.response.data.errors;
    errors.invalidInputError = true;
    return errors;
  }
  return null;
}
